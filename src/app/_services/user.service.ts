import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AppSettings } from "../app.settings";

import { Observable } from "rxjs/Observable";
import { User } from "../data-classes/user";

@Injectable()
export class UserService {
  private apiUrl = AppSettings.API_ENDPOINT;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get(this.apiUrl + "/users/")
      .map(response => response.json().data as User[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getUser(id: number): Observable<User> {
    return this.http.get(this.apiUrl + "/user/" + id)
      .map(response => response.json() as User)
      .catch(err => this.handleError(err));
  }

  // TODO: add advertiser, created, updated
  create(user: User): Observable<User> {
    return this.http
      .post(this.apiUrl + "/user", JSON.stringify(user), {headers: this.headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  edit(user: User): Observable<User> {
    //TODO: replace dummy -> send to server
    return Observable.of(new User("", "", ""));
  }
}
