import { Component } from '@angular/core';
import { StatusmessageService } from '../utils/statusmessage.service';

@Component({
    selector: 'statusmessage',
    templateUrl: './statusmessage.component.html',
    styleUrls: ['./statusmessage.component.scss']
})

export class StatusmessageComponent {
    message: string;

    constructor(private statusmessageService: StatusmessageService){}

    ngOnInit(){
        this.statusmessageService.getMessage().subscribe(message => {this.message = message});
    }
}