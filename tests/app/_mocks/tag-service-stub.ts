import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { getTagMocks } from "../data/mock-tags";
import { Tag } from "../../../src/app/data/tag";

@Injectable()
export class TagServiceStub {
  create(tags: Tag[]): Observable<Tag[]>{
    return Observable.of(getTagMocks());
  }
}