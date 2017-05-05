import { Injectable } from "@angular/core";
@Injectable()
export class RouterStub {
  url = "";

  navigate(url: string) {
    return url;
  }
}