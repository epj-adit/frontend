import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AdminGuardService implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router) {
    }

    canActivate() {
        return this.authenticationService.hasPermission('administrator_permission');
    }
}
