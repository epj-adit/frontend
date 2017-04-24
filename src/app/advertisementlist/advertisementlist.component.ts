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

  getAdvertisements(): void {
    if(this.tagId!=undefined){
      this.advertisementService.getAdvertisementsQuery(`'?tagId={this.tagId`);
    }else {
    this.advertisementService.getAdvertisements().then(advertisements => this.advertisements = advertisements);}
  }

  gotoInfo(advertisement: Advertisement): void {
    let link = ['/advertisementinfo', advertisement.id];
    this.router.navigate(link);
  }

  ngOnInit(): void {
    this.route.queryParams.switchMap(par => {console.log("PAR:",par['tagId']);return this.advertisementService.getAdvertisementsQuery(`/?tagId=0`);}).subscribe(ads => this.advertisements = ads);
    // var obsComb = Observable.combineLatest(this.route.params, this.route.queryParams,
    //     (params, qparams) => ({ params, qparams }));
    // obsComb.subscribe(params=>{
    //   this.tagId = params.qparams['tagId'];
    //   if(params.params.queryParams)
    //   console.log('qp: ', params.params.queryParams);
    // });

    console.log("Got tagId: ", this.tagId);
    //this.getAdvertisements();
  }
}
