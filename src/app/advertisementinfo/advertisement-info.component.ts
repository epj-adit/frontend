import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';

import { AdvertisementService } from '../_services/advertisement.service';
import { Advertisement } from '../data-classes/advertisement';

@Component({
  selector: 'adit-advertisementinfo',
  templateUrl: './advertisement-info.component.html',
  styleUrls: ['./advertisement-info.component.scss'],
  providers: [AdvertisementService]
})
export class AdvertisementInfoComponent implements OnInit {
  advertisement: Advertisement;
  url: string;

  constructor(private advertisementService: AdvertisementService,
              private route: ActivatedRoute,
              private router: Router) {
    this.url = this.router.url;
    console.log(this.url);
  }

  ngOnInit(): void {
    // supress unnecessary server request, if we already have ad-object
    if (this.advertisementService.currentAdvertisement) {
      this.advertisement = this.advertisementService.currentAdvertisement;
    } else {
      this.route.params
        .switchMap((params: Params) => this.advertisementService.getAdvertisement(+params['id']))
        .subscribe(advertisement => this.advertisement = advertisement);
    }
  }

  getMedia(filename: string): string {
    // TODO: change mock to real deal
    return '/assets/images/logo-adit.png';
  }
}
