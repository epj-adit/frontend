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
          this.statusMessageService.success("REGISTER.success");
          this.router.navigate(['/login']);
        },
        err => {
          switch(err.status) {
            case 409:
              this.statusMessageService.error("REGISTER.userExistsMessage");
              break;

            default:
              this.statusMessageService.error("STATUS.errorOccurred", { details: err.detailMessage });
              break;
          }
          console.error(err);
        }
      );
  }

  displayHelp(): void {
    this.emailHelpDisplay = this.emailHelpDisplay == 'inline-block' ? 'none' : 'inline-block';
  }

}
