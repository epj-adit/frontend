import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class StatusMessageService {
    private subject = new Subject<any>();

    private hide() {
        Observable.of(null).delay(10000).subscribe(() => this.subject.next());
    }

    success(message: string) {
        this.subject.next({ type: 'success', text: message });
        //this.hide();
    }

    error(message: string) {
        this.subject.next({ type: 'error', text: message });
        //this.hide();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}