import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

import { User } from "../../../src/app/data/user";
import { getUsersMocks } from "../data/mock-users";

@Injectable()
export class UserServiceStub {
  getUsers(): Observable<User[]> {
    return Observable.of(getUsersMocks());
  }

  getUser(id: number): Observable<User> {
    return Observable.of(getUsersMocks()[0]);
  }

  // TODO: add advertiser, created, updated
  register(user: User): Observable<User> {
    return this.getUser(1);
  }

  update(user: User): Observable<User> {
    return this.getUser(1);
  }
}
