import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from "../_services/user.service";
import { ValidatorService } from '../_services/validator.service';
import { User } from "../data-classes/user";


@Component({
  selector: 'adit-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  emailHelpDisplay = 'none';
  isSubmitted = false;
  errorStatus=0;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService) {
    this.form = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.minLength(5)]],
      'email': ['', [Validators.required, ValidatorService.validateEmail]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(value) {
    let newUser = new User(value.username, value.email + "@hsr.ch", value.password);
    this.userService.create(newUser)
      .subscribe(
        //TODO: reroute success to login screen
        res => this.isSubmitted = true,
        err => {
          this.errorStatus = err.status;
        });
  }

  displayHelp(): void {
    this.emailHelpDisplay = this.emailHelpDisplay == 'inline-block' ? 'none' : 'inline-block';
  }

}
