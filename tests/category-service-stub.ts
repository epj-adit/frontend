import { Injectable } from "@angular/core";
import { Advertisement } from "../src/app/data-classes/advertisement";
import { Observable } from "rxjs/Observable";
import { getCategoriesMocks } from "./app/data/mock-categories";
import { Category } from "../src/app/data-classes/category";

@Injectable()
export class CategoryServiceStub {
  currentAdvertisement: Advertisement;

  getCategories(string: string): Observable<Category[]> {
    return Observable.of(getCategoriesMocks());
  }

  deleteCat(cat: Category): Observable<any> {
    return Observable.of({success: "success"});
  }

  createOrUpdate(categories: Category[]): Observable<Category[]> {
    return Observable.of(getCategoriesMocks());
  }
}