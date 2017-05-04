import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from "../../utils/authentication.service";
import { ValidatorService } from '../../utils/validator.service';
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
                private authenticationService: AuthenticationService) {
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
                        // TODO: Display error message
                        console.error("Invalid user login");
                    }
                },
                err => {
                    // TODO: error handling.
                    console.error("Connection error")
                }
            );
    }

    displayHelp(): void {
        this.emailHelpDisplay = this.emailHelpDisplay == 'inline-block' ? 'none' : 'inline-block';
    }

}
