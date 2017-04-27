import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from "../_services/user.service";
import { ValidatorService } from '../_services/validator.service';
import { User } from "../data-classes/user";


@Component({
  selector: 'adit-userprofil',
  templateUrl: './userprofil.component.html',
  styleUrls: ['./userprofil.component.scss']
})
export class UserProfilComponent implements OnInit {
  form: FormGroup;
  emailHelpDisplay = 'none';
  isSubmitted = false;
  hasError = false;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService) {
    this.form = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.minLength(5)]],
      'email': ['', [Validators.required, ValidatorService.validateEmail]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'isPrivate': [''],
      'wantsNotifications': ['']
    });
  }

  ngOnInit(): void {
    //TODO: get user from server and input info in form
  }

  onSubmit(value) {
    let user = new User(value.username, value.email + "@hsr.ch", value.password);
    this.userService.edit(user)
      .subscribe(
        //TODO: reroute success to login screen
        res => this.isSubmitted = true,
        err => this.hasError = true);
  }

  displayHelp(): void {
    this.emailHelpDisplay = this.emailHelpDisplay == 'inline-block' ? 'none' : 'inline-block';
  }

}
