import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class NotAuthenticatedGuardService implements CanActivate {
    
    constructor(private authentication: AuthenticationService, private router: Router) {}

    canActivate() {
        this.authentication.ngOnInit();
        if(!this.authentication.authenticationActive()) {
            return true;
        } else {
            this.router.navigate( ['/advertisements'] );
            return false;
        }
    }
}
