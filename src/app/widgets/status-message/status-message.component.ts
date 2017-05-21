import { Component } from '@angular/core';
import { StatusMessageService } from '../../utils/status-message.service';

@Component({
    selector: 'adit-status-message',
    templateUrl: './status-message.component.html',
    styleUrls: ['./status-message.component.scss']
})

export class StatusMessageComponent {
    message: string;

    constructor(private statusMessageService: StatusMessageService){}

    ngOnInit(){
        this.statusMessageService.getMessage().subscribe(message => {this.message = message});
    }
}
