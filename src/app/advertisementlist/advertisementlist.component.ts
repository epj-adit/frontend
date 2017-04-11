import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Advertisement } from '../data-classes/advertisement';
import { AdvertisementService } from '../_services/advertisement.service';

@Component({
  selector: 'adit-advertisementlist',
  templateUrl: './advertisementlist.component.html',
  styleUrls: ['./advertisementlist.component.scss']
})
export class AdvertisementListComponent implements OnInit {
  advertisements: Advertisement[];

  constructor(private router: Router,
              private advertisementService: AdvertisementService) {
  }

  getAdvertisements(): void {
    this.advertisementService.getAdvertisements().subscribe(advertisements => this.advertisements = advertisements);
  }

  gotoInfo(advertisement: Advertisement): void {
    this.advertisementService.currentAdvertisement = advertisement;
    let link = ['/advertisementinfo', advertisement.id];
    this.router.navigate(link);
  }

  ngOnInit(): void {
    this.getAdvertisements();
  }
}
