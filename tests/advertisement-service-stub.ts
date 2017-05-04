import { Injectable } from "@angular/core";
import { Advertisement } from "../src/app/data-classes/advertisement";
import { Observable } from "rxjs/Observable";
import { getAdvertisementMocks } from "./app/data/mock-advertisements";

@Injectable()
export class AdvertisementServiceStub {
  currentAdvertisement: Advertisement;

  getAdvertisement(id: number): Observable<Advertisement> {
    return Observable.of(getAdvertisementMocks()[0]);
  }

  getAdvertisements(id: number): Observable<Advertisement[]> {
    return Observable.of(getAdvertisementMocks());
  }

  getAdvertisementsQuery(string: string): Observable<Advertisement[]> {
    return Observable.of(getAdvertisementMocks());
  }
}