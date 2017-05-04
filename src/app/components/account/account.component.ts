import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from "../../_services/user.service";
import { ValidatorService } from '../../_services/validator.service';
import { User } from "../../data-classes/user";


@Component({
  selector: 'adit-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {

  }
}