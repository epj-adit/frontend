import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Advertisement } from '../../data/advertisement';
import { AdvertisementService } from '../../services/advertisement.service';
import { Observable } from "rxjs";

@Component({
  selector: 'adit-advertisementlist',
  templateUrl: './advertisement-list.component.html',
  styleUrls: ['./advertisement-list.component.scss']
})
export class AdvertisementListComponent implements OnInit {
  advertisements: Advertisement[] = [];
  private tagId: Observable<number>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private advertisementService: AdvertisementService) {
  }

  gotoInfo(advertisement: Advertisement): void {
    this.advertisementService.currentAdvertisement = advertisement;
    let link = ['', advertisement.id];
    if (this.router.url == '/supervisorpanel/manageAdvertisements'){
      link[0] = '/supervisorpanel/manageAdvertisements'
    }else {
      link[0] = '/advertisementinfo';
    }
    this.router.navigate(link);
  }

  ngOnInit(): void {
    this.route.params.switchMap(par => {
      let tagId = par['tagId'];
      let categoryId = par['categoryId'];

      if (tagId) {
        return this.advertisementService
          .getAdvertisementsQuery(`/?tagId=${tagId}`)
          .map(advertisements => this.advertisements = advertisements);
      } else if (categoryId) {
        return this.advertisementService
          .getAdvertisementsQuery(`/?categoryId=${categoryId}`)
          .map(advertisements => this.advertisements = advertisements);
      } else if (this.router.url == '/supervisorpanel/manageAdvertisements'){
        return this.advertisementService
          .getAdvertisementsQuery("/?advertisementState=0")
          .map(advertisements => this.advertisements = advertisements);
      } else {
        return this.advertisementService
          .getAdvertisementsQuery("/?advertisementState=2")
          .map(advertisements => this.advertisements = advertisements);
      }
    })
      .subscribe(ads => this.advertisements = ads);
  }
}
