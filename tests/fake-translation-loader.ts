import { TranslateLoader } from "@ngx-translate/core";
import { Observable } from "rxjs/Observable";

export class FakeTranslationLoader implements TranslateLoader {
  translations: any = {"TEST": "This is a test"};

  getTranslation(lang: string): Observable<any> {
    return Observable.of(this.translations);
  }
}