import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from "../../_services/user.service";
import { ValidatorService } from '../../_services/validator.service';
import { User } from "../../data-classes/user";
import { AuthenticationService } from "../../utils/authentication.service";


@Component({
  selector: 'adit-userprofil',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserProfileComponent implements OnInit {
  form: FormGroup;
  emailHelpDisplay = 'none';
  isSubmitted = false;
  hasError = false;
  user: User;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private authenticationService: AuthenticationService) {

    this.authenticationService.getUser().subscribe(user => {
      this.user = user;
      this.form = this.formBuilder.group({
        'username': [user.username, [Validators.required, Validators.minLength(5)]],
        'email': [user.email.split("@")[0], [Validators.required, ValidatorService.validateHsrUsername]],
        'password': ['', [Validators.required, Validators.minLength(6)]],
        'isPrivate': [user.isPrivate],
        'wantsNotifications': [user.wantsNotification]
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
    this.userService.edit(this.user)
      .subscribe(res => {
        this.authenticationService.setUser(this.user);
          //TODO: Display success message.
          console.log("User was upated.");
          this.isSubmitted = true;
        },
        err => {
            this.hasError = true;
            // TODO: Proper error handling
      });
  }

  displayHelp(): void {
    this.emailHelpDisplay = this.emailHelpDisplay == 'inline-block' ? 'none' : 'inline-block';
  }

}
