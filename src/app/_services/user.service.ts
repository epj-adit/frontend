import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { User } from "../data-classes/user";



@Injectable()
export class UserService {
  private usersUrl = 'api/users';  // URL to web api
  private userUrl = 'api/user/';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getUserss(): Observable<User[]> {
    return this.http.get(this.usersUrl)
      .map(response => response.json().data as User[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getUser(id: number): Observable<User> {
    return this.http.get(this.usersUrl + id)
      .map(response => response.json() as User)
      .catch(err => this.handleError(err));
  }

  // TODO: add advertiser, created, updated
  create(user: User): Observable<User> {
    return this.http
      .post(this.userUrl, JSON.stringify(user), {headers: this.headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  // TODO: update, delete
}
