import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from "../../services/user.service";
import { ValidatorService } from '../../utils/validator.service';
import { User } from "../../data/user";
import { StatusmessageService } from "../../utils/statusmessage.service";

@Component({
  selector: 'adit-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;
  emailHelpDisplay = 'none';
  errorStatus=0;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private translate: TranslateService,
              private statusmessageService: StatusmessageService) {
    this.form = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.minLength(5)]],
      'email': ['', [Validators.required, ValidatorService.validateHsrUsername]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(value) {
    let newUser = new User(value.username, value.email + "@hsr.ch", value.password);
    this.userService.register(newUser)
      .subscribe(
        res => {
          let link = ['/login'];
          this.router.navigate(link);
        },
        err => {
          let errorMessage: string;
          this.translate.get("STATUS.errorOccurred").subscribe(msg => errorMessage = msg);
          this.statusmessageService.error(errorMessage + err.detailMessage);
          this.errorStatus = err.status
        }
      );
  }

  displayHelp(): void {
    this.emailHelpDisplay = this.emailHelpDisplay == 'inline-block' ? 'none' : 'inline-block';
  }

}
