import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from "../../utils/authentication.service";
import { ValidatorService } from '../../utils/validator.service';
import { StatusMessageService} from '../../utils/status-message.service';
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
                private statusMessageService: StatusMessageService){
        this.form = this.formBuilder.group({
            'email': ['', [Validators.required, ValidatorService.validateHsrUsername]],
            'plaintextPassword': ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(value) {
        value.email += "@hsr.ch";

        this.authenticationService.login(value as Credential)
            .subscribe(
                authenticationSuccess => {
                    if(authenticationSuccess) {
                        this.router.navigate(['/']);
                    } else {
                        this.statusMessageService.error("LOGIN.wrongCredentials");
                    }
                },
                err => {
                    this.statusMessageService.error("STATUS.errorOccurred", { details: err.detailMessage });
                    console.error(err);
                }
            );
    }

    displayHelp(): void {
        this.emailHelpDisplay = this.emailHelpDisplay == 'inline-block' ? 'none' : 'inline-block';
    }

}
