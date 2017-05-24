import { Injectable } from '@angular/core';

import { Observable } from "rxjs";
import 'rxjs/add/observable/forkJoin'

import { ApiCallService } from "../utils/api-call.service";
import { Category } from "../data/category";

@Injectable()
export class CategoryService {

  constructor(private apiCall: ApiCallService) {
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  create(category: Category): Observable<Category>{
    return this.apiCall.post("category", category).map(res => res as Category)
      .catch(err => this.handleError(err));
  }

  getCategories(): Observable<Category[]> {
    return this.apiCall.get("categories/").map(res => res as Category[])
      .catch(err => this.handleError(err));
  }

  createOrUpdate(categories: Category[]): Observable<Category[]> {
    let observableBatch: Observable<Category>[] = [];

    categories.forEach((category, index) => {
      if (category.id) {
        observableBatch.push(this.apiCall.put("category/" + category.id, category).map(res => res as Category));
      } else {
        observableBatch.push(this.apiCall.post("category", category).map(res => res as Category));
      }
    });
    return Observable.forkJoin(observableBatch);
  }

  deleteCat(category: Category): Observable<any>{
    return this.apiCall.delete("category/"+category.id);
  }
}
