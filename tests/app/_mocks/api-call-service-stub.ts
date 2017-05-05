import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { RequestOptionsArgs, Headers } from "@angular/http";
import { ApiCallService } from "../../../src/app/utils/api-call.service";
@Injectable()
export class ApiCallServiceStub{
  private apiEndpoint;
  public static CONTENT_TYPE = 'application/json';

  get(url: string, options?: RequestOptionsArgs): Observable<object> {
    return Observable.of({});
  }

  post(url: string, body: object, options?: RequestOptionsArgs): Observable<object> {
    return Observable.of({});
  }

  put(url: string, body: object, options?: RequestOptionsArgs): Observable<object> {
    return Observable.of({});
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<object> {
    return Observable.of({});
  }

  patch(url: string, body: object, options?: RequestOptionsArgs): Observable<object> {
    return Observable.of({});
  }

  head(url: string, options?: RequestOptionsArgs): Observable<object> {
    return Observable.of({});
  }

  buildRequestOptionsArgs(): RequestOptionsArgs {
    return {};
  }

  appendAuthorizationHeader(header: Headers): Headers {
    return new Headers();
  }

}