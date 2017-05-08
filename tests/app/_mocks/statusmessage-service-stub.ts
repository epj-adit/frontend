import { Injectable } from "@angular/core";

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class StatusmessageServiceStub{
    private subject = new Subject<any>();

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string) {
        this.subject.next({ type: 'success', text: message });
    }
    error(message: string) {
        this.subject.next({ type: 'error', text: message });
    }

}