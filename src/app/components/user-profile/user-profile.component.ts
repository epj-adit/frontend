import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from "../../services/user.service";
import { ValidatorService } from '../../utils/validator.service';
import { User } from "../../data/user";
import { AuthenticationService } from "../../utils/authentication.service";
import { StatusMessageService } from "../../utils/status-message.service";

@Component({
  selector: 'adit-userprofil',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  form: FormGroup;
  emailHelpDisplay = 'none';
  isSubmitted = false;
  hasError = false;
  user: User;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private authenticationService: AuthenticationService,
              private translate: TranslateService,
              private statusMessageService: StatusMessageService) {

    this.authenticationService.getUser().subscribe(user => {
      this.user = user;
      this.form = this.formBuilder.group({
        'username': [user.username, [Validators.required, Validators.minLength(5)]],
        'email': [user.email.split("@")[0], [Validators.required, ValidatorService.validateHsrUsername]],
        'password': ['', [Validators.required, Validators.minLength(6)]]
      });
    });
  }

  ngOnInit(): void {
    this.authenticationService.getUser().subscribe(user => this.user)
  }

  onSubmit(value) {
    this.user.username = value.username;
    this.user.email = value.email + "@hsr.ch";
    this.user.passwordPlaintext = value.password;

    this.userService.update(this.user)
      .subscribe(res => {
          this.authenticationService.setUser(this.user);
          let successMessage: string;
          this.translate.get("STATUS.success").subscribe(msg=>successMessage = msg);
          this.statusMessageService.success(successMessage);
          console.log("User was upated.");
          this.isSubmitted = true;
        },
        err => {
          this.hasError = true;
          let errorMessage: string;
          this.translate.get("STATUS.errorOccurred").subscribe(msg=>errorMessage = msg);
          this.statusMessageService.error(errorMessage);
        });
  }

  displayHelp(): void {
    this.emailHelpDisplay = this.emailHelpDisplay == 'inline-block' ? 'none' : 'inline-block';
  }

}
