import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "../../utils/authentication.service";
import { ValidatorService } from '../../utils/validator.service';
import { StatusmessageService} from '../../utils/statusmessage.service';
import { Credential } from "../../data/credential";


@Component({
    selector: 'adit-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    form: FormGroup;
    emailHelpDisplay = 'none';

    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private authenticationService: AuthenticationService,
                private statusmessageService: StatusmessageService,
                private translate: TranslateService){
        this.form = this.formBuilder.group({
            'email': ['', [Validators.required, ValidatorService.validateHsrUsername]],
            'plaintextPassword': ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(value) {
        value.email += "@hsr.ch";
        let errorMessage:string;
        this.translate.get("STATUS.errorOccurred").subscribe(msg => errorMessage = msg);

        this.authenticationService.login(value as Credential)
            .subscribe(
                authenticationSuccess => {
                    if(authenticationSuccess) {

                        this.router.navigate(['/']);
                    } else {

                        this.statusmessageService.error(errorMessage);
                        console.error("Invalid user login");
                    }
                },
                err => {
                    this.statusmessageService.error(errorMessage + err.detailMessage);

                    console.error("Connection error");
                }
            );
    }

    displayHelp(): void {
        this.emailHelpDisplay = this.emailHelpDisplay == 'inline-block' ? 'none' : 'inline-block';
    }

}
