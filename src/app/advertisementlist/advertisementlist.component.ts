import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import { Advertisement } from '../data-classes/advertisement';
import { AdvertisementService } from '../_services/advertisement.service';
import {Observable} from "rxjs";

@Component({
  selector: 'adit-advertisementlist',
  templateUrl: './advertisementlist.component.html',
  styleUrls: ['./advertisementlist.component.scss']
})
export class AdvertisementListComponent implements OnInit {
  private advertisements: Advertisement[];
  private tagId: Observable<number>;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private advertisementService: AdvertisementService) {
  }


  gotoInfo(advertisement: Advertisement): void {
    let link = ['/advertisementinfo', advertisement.id];
    this.router.navigate(link);
  }

  ngOnInit(): void {
    this.route.params.switchMap(par => {
      let tagId=par['tagId'];
      if (tagId){
        return this.advertisementService.getAdvertisementsQuery(`/?tagId=`+tagId).then(advertisements => this.advertisements = advertisements)
      } else {
        return this.advertisementService.getAdvertisements().then(advertisements => this.advertisements = advertisements)
      }
    })
      .subscribe(ads => {
        console.log(ads);
        return this.advertisements = ads;
      } );
  }
}
