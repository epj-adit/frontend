import { Injectable } from '@angular/core';
import { Headers, RequestOptionsArgs } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ApiCallService } from "../utils/api-call.service";
import { AuthenticationService } from "../utils/authentication.service"

import { Observable } from "rxjs/Observable";
import { User } from "../data/user";

@Injectable()
export class UserService {

  constructor(private apiCall: ApiCallService, private authenticationService: AuthenticationService) { }

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
  register(user: User): Observable<User> {
    let options : RequestOptionsArgs = { headers: new Headers({ "Content-Type" : "application/json" }) };

    if(this.authenticationService.authenticationActive()) {
      options.headers = this.apiCall.appendAuthorizationHeader(options.headers);
    }

    return this.apiCall.post("register", user, options).map(res => res as User)
      .catch(this.handleError);
  }

  update(user: User): Observable<User> {
    return this.apiCall.put("user/" + user.id, user).map(res => res as User)
      .catch(this.handleError)
  }
}
