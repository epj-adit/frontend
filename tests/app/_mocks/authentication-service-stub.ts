import { Injectable } from "@angular/core";
import { User } from "../../../src/app/data/user";
import { Observable } from "rxjs/Observable";
import { getUsersMocks } from "../data/mock-users";
import { Credential } from "../../../src/app/data/credential";

@Injectable()
export class AuthenticationServiceStub {
  getToken(): string {
    return "test";
  }

  setUser(user: User): Observable<boolean> {
    return Observable.of(true);
  }

  getUser(): Observable<User> {
    return Observable.of(getUsersMocks()[0]);
  }

  login(credential: Credential): Observable<boolean> {
    return Observable.of(true);
  }

  logout(): Observable<boolean> {
    return Observable.of(false);
  }

  authenticationActive(): boolean {
    return true;
  }

  hasPermission(permissionName: string): Observable<boolean> {
    return Observable.of(true);
  }
}