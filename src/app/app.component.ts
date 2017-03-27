import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Advertisement } from './data-classes/advertisement';
import { AdvertisementService } from './advertisements/advertisement.service';
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
export class AppComponent implements OnInit {
  advertisements: Advertisement[] = [];

  constructor(private advertisementService: AdvertisementService, private translate: TranslateService) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('de');
    translate.use('de');
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
    this.advertisementService.getAdvertisements()
      .then(advertisements => this.advertisements = advertisements);
  }
}
