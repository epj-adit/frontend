import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { SearchProposal } from "../../../src/app/data/search-proposal";

@Injectable()
export class AdvertisementSearchServiceStub {
  search(term: string): Observable<SearchProposal[]> {
    let arr = [];
    arr.push(new SearchProposal());
    return Observable.of(arr);
  }
}