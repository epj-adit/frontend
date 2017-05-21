import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { ValidatorService } from '../../utils/validator.service';
import { User } from "../../data/user";
import { StatusMessageService } from "../../utils/status-message.service";

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
              private statusMessageService: StatusMessageService) {
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
        () => {
          this.router.navigate(['/login']);
        },
        err => {
          this.statusMessageService.error("STATUS.errorOccurred", { details: err.detailMessage });
          console.error(err);
          this.errorStatus = err.status
        }
      );
  }

  displayHelp(): void {
    this.emailHelpDisplay = this.emailHelpDisplay == 'inline-block' ? 'none' : 'inline-block';
  }

}
