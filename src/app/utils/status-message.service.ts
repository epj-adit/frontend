import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class StatusMessageService {
    private subject = new Subject<any>();


    constructor(private translate: TranslateService) { }

    private hide(displayTime: number) {
        Observable.of(null).delay(displayTime).subscribe(() => this.subject.next());
    }

    success(expr: string, params?: any, displayTime?: number) {
        this.translate.get(expr, params).subscribe(message => {
            this.subject.next({ type: 'success', text: message });
            if(displayTime) {
                this.hide(displayTime);
            }
        });
    }

    error(expr: string, params?: any, displayTime?: number) {
        this.translate.get(expr, params).subscribe(message => {
            this.subject.next({type: 'error', text: message});
            if(displayTime) {
                this.hide(displayTime);
            }
        });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}