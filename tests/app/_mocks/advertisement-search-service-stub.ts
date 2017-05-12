import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { getAdvertisementMocks } from "../data/mock-advertisements";
import { getTagMocks } from "../data/mock-tags";
import { getCategoriesMocks } from "../data/mock-categories";

@Injectable()
export class AdvertisementSearchServiceStub {
    search(term: string): Observable<any[]> {
        let arr = [];
        arr[0]= getAdvertisementMocks();
        arr[1]= getTagMocks();
        arr[2]= getCategoriesMocks();
        return Observable.of(arr);
    }
}