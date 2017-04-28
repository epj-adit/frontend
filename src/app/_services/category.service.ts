import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Observable } from "rxjs";
import { Category } from "../data-classes/category";
import { AppSettings } from "../app.settings";

@Injectable()
export class CategoryService {
  private apiUrl = AppSettings.API_ENDPOINT;  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: Http) {
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  create(category: Category): Observable<Category>{
    return this.http
      .post(this.apiUrl + "/category", JSON.stringify(category), {headers: this.headers})
      .map(res => res.json() as Category)
      .catch(err => this.handleError(err));
  }

  getCategories(): Observable<Category[]>{
    return this.http.get(this.apiUrl + "/categories/")
      .map(res => res.json() as Category[])
      .catch(err => this.handleError(err));
  }
}
