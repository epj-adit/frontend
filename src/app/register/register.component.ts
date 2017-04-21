import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../_services/user.service";


@Component({
  selector: 'adit-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  emailHelpDisplay = 'none';

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService) {
    this.form = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.minLength(5)]],
      'email': ['', [Validators.required, this.validateEmail]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {

  }

  validateEmail(c: FormControl) {
    let regex = new RegExp('^[a-z0-9]{3,8}$');
    return regex.test(c.value) ? null : {
      validateEmail: {
        valid: false
      }
    }
  }

  onSubmit(value) {
    this.userService.create(value);
  }

  displayHelp(): void {
    this.emailHelpDisplay = this.emailHelpDisplay == 'inline-block' ? 'none' : 'inline-block';
  }

}
