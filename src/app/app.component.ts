import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";

import { Advertisement } from './data/advertisement';
import { AuthenticationService } from './utils/authentication.service';

/**
 * Styles required here are common for all components (SASS/SCSS versions of normalize.css and flexboxgrid),
 * so encapsulation is not used. Other components have their styles scoped with `ViewEncapsulation.Emulated`.
 */
@Component({
  selector: 'adit-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: []
})
export class AppComponent {
  advertisements: Advertisement[] = [];

  constructor(private translate: TranslateService,
              private authenticationService: AuthenticationService, private router: Router) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('de');
    translate.use('de');
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }

  isAuthenticated(): boolean {
    return this.authenticationService.authenticationActive();
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate([ "login" ]);
  }

}