import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Advertisement } from '../data-classes/advertisement';
import { AdvertisementService } from '../_services/advertisement.service';

@Component({
  selector: 'adit-useradvertisements',
  templateUrl: './user-advertisements.component.html',
  styleUrls: ['./user-advertisements.component.scss']
})
export class UserAdvertisementsComponent implements OnInit {
  advertisements: Advertisement[];

  constructor(private router: Router,
              private advertisementService: AdvertisementService) {
  }

  getAdvertisements(): void {
    this.advertisementService.getAdvertisements().subscribe(advertisements => this.advertisements = advertisements);
  }

  edit(advertisement: Advertisement): void {
    this.advertisementService.currentAdvertisement = advertisement;
    let link = ['/advertisement', advertisement.id];
    this.router.navigate(link);
  }

  delete(advertisement:Advertisement): void {

  }

  ngOnInit(): void {
    this.getAdvertisements();
  }
}
