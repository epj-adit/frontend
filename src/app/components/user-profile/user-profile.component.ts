import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";
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
  user: User;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private statusMessageService: StatusMessageService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.getUser().subscribe(user => {
      this.user = user;
      this.form = this.formBuilder.group({
        'username': [user.username, [Validators.required, Validators.minLength(5)]],
        'password': ['', [Validators.required, Validators.minLength(6)]]
      });
    });
  }

  onSubmit(value) {
    this.user.username = value.username;
    this.user.email = value.email + "@hsr.ch";
    this.user.passwordPlaintext = value.password;

    this.userService.update(this.user)
      .subscribe(
        () => {
          this.authenticationService.setUser(this.user).subscribe(() => {
            this.statusMessageService.success("PROFILE.updateSuccess");
          });
        },
        err => {
          this.statusMessageService.error("STATUS.errorOccurred", { details: err.detailMessage });
        });
  }

  displayHelp(): void {
    this.emailHelpDisplay = this.emailHelpDisplay == 'inline-block' ? 'none' : 'inline-block';
  }

}
