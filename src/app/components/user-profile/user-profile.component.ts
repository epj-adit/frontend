import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from "../../services/user.service";
import { User } from "../../data/user";
import { AuthenticationService } from "../../utils/authentication.service";


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
    let user = this.user;
    user.username = value.username;
    user.passwordPlaintext = value.password;
    this.userService.update(user).subscribe(res => {
          this.authenticationService.setUser(res as User);
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
