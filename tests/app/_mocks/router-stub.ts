import { Injectable } from "@angular/core";
import { NavigationEnd } from "@angular/router";
import { Observable } from "rxjs/Observable";
@Injectable()
export class RouterStub {
  url = "";

  navigate(url: string) {
    return url;
  }
  public ne = new NavigationEnd(0, 'http://localhost:9045/login', 'http://localhost:9045/login');
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });
}