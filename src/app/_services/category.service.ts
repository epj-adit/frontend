import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from "rxjs";
import 'rxjs/add/observable/forkJoin'

import { Category } from "../data-classes/category";
import { AppSettings } from "../app.settings";

@Injectable()
export class CategoryService {
  private apiUrl = AppSettings.API_ENDPOINT;
  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: Http) {
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get(this.apiUrl + "/categories")
      .map(res => res.json() as Category[])
      .catch(err => this.handleError(err));
  }

  createOrUpdate(categories: Category[]): Observable<Category[]> {
    let observableBatch: Observable<Category>[] = [];

    categories.forEach((category, index) => {
      if (category.id) {
        observableBatch.push(this.http.put(this.apiUrl + "/category/" + category.id, JSON.stringify(category)).map((res) => res.json() as Category));
      } else {
        observableBatch.push(this.http.post(this.apiUrl + "/category", JSON.stringify(category)).map((res) => res.json() as Category));
      }
    });
    return Observable.forkJoin(observableBatch);
  }

  deleteCat(category: Category): Observable<any>{
    return this.http.delete(this.apiUrl+"/category/"+category.id);
  }
}
