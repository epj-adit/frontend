import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class StatusMessageService {
    private subject = new Subject<any>();


    constructor(private translate: TranslateService) { }

    private hide() {
        Observable.of(null).delay(10000).subscribe(() => this.subject.next());
    }

    success(expr: string, params?: any) {
        this.translate.get(expr, params).subscribe(message => {
            this.subject.next({ type: 'success', text: message });
            //this.hide();
        });
    }

    error(expr: string, params?: any) {
        this.translate.get(expr, params).subscribe(message => {
            this.subject.next({type: 'error', text: message});
            //this.hide();
        });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}