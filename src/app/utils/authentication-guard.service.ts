import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuardService implements CanActivate {
    
    constructor(private authentication: AuthenticationService, private router: Router) {}

    canActivate() {
        if(this.authentication.authenticationActive()) {
            return true;
        } else {
            this.router.navigate( ['/login'] );
            return false;
        }
    }
}
