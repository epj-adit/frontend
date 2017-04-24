import { Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";

@Injectable()
export class ValidatorService {
  static validateEmail(c: FormControl) {
    let regex = new RegExp('^[a-z0-9]{3,8}$');
    return regex.test(c.value) ? null : {
      validateEmail: {
        valid: false
      }
    }
  }
}
