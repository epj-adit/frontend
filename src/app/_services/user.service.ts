import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { ApiCallService } from "../utils/api-call.service";

import { Observable } from "rxjs/Observable";
import { User } from "../data-classes/user";

@Injectable()
export class UserService {

  constructor(private apiCall: ApiCallService) { }

  getUsers(): Observable<User[]> {
    return this.apiCall.get("users/").map(response => response as User[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getUser(id: number): Observable<User> {
    return this.apiCall.get("user/" + id).map(response => response as User)
      .catch(err => this.handleError(err));
  }

  // TODO: add advertiser, created, updated
  create(user: User): Observable<User> {
    return this.apiCall
      .post("user", user).map(res => res as User)
      .catch(this.handleError);
  }

  edit(user: User): Observable<User> {
    //TODO: replace dummy -> send to server
    return Observable.of(new User("", "", ""));
  }
}
