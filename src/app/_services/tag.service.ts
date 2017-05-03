import { Injectable } from '@angular/core';

import { Tag } from "../data-classes/tag";
import { Observable } from "rxjs";
import { ApiCallService } from "../utils/api-call.service";

@Injectable()
export class TagService {

  constructor(private apiCall: ApiCallService) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  create(tags: Tag[]): Observable<Tag[]>{
   return this.apiCall.post("tags/", tags).map(res => res as Tag[])
        .catch(err => this.handleError(err));
    }
}
