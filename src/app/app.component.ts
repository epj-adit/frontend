
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from "@angular/router";

import { Advertisement } from './data/advertisement';
import { AdvertisementService } from './services/advertisement.service';

/**
 * Styles required here are common for all components (SASS/SCSS versions of normalize.css and flexboxgrid),
 * so encapsulation is not used. Other components have their styles scoped with `ViewEncapsulation.Emulated`.
 */
@Component({
  selector: 'adit-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [],
  //host: {'(input-blur)':'onInputBlur($event)'},

})
export class AppComponent {
  advertisements: Advertisement[] = [];
  @ViewChild('menuToggle') menuToggle;

  constructor(private advertisementService: AdvertisementService, private translate: TranslateService, private router: Router) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('de');
    translate.use('de');
    router.events.subscribe(()=>{
      this.menuToggle.nativeElement.checked = false;
    });
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }

}