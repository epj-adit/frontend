import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Advertisement } from '../data-classes/advertisement';
import { AdvertisementService } from '../_services/advertisement.service';

@Component({
  selector: 'adit-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.scss']
})
export class AdvertisementComponent implements OnInit {
  advertisements: Advertisement[];

  constructor(private router: Router,
              private advertisementService: AdvertisementService) {
  }

  getAdvertisements(): void {
    this.advertisementService.getAdvertisements().then(advertisements => this.advertisements = advertisements);
  }

  gotoInfo(advertisement: Advertisement): void {
    let link = ['/advertisement', advertisement.id];
    this.router.navigate(link);
  }

  ngOnInit(): void {
    this.getAdvertisements();
  }
}
