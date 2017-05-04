import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { Advertisement } from '../../data/advertisement';
import { AdvertisementService } from '../../_services/advertisement.service';
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'adit-useradvertisements',
  templateUrl: './user-advertisements.component.html',
  styleUrls: ['./user-advertisements.component.scss']
})
export class UserAdvertisementsComponent implements OnInit {
  advertisements: Advertisement[];

  constructor(private router: Router,
              private advertisementService: AdvertisementService,
              overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,
              private translate: TranslateService) {
    overlay.defaultViewContainer = vcRef;
  }

  getAdvertisements(): void {
    this.advertisementService.getAdvertisements().subscribe(advertisements => this.advertisements = advertisements);
  }

  edit(advertisement: Advertisement): void {
    this.advertisementService.currentAdvertisement = advertisement;
    let link = ['/advertisement', advertisement.id];
    this.router.navigate(link);
  }

  deleteAd(advertisement: Advertisement): void {
    let translateTitle = this.translate.get('USERADVERTISEMENT.deleteConfirmTitle');
    let translateDialog = this.translate.get('USERADVERTISEMENT.deleteConfirmDialog');
    Observable.forkJoin([translateTitle, translateDialog]).subscribe(
      res => this.modal.confirm()
        .size('sm')
        .showClose(true)
        .keyboard(27)
        .title(res[0])
        .body(res[1])
        .okBtnClass('btn btn-danger')
        .cancelBtnClass('btn btn-default')
        .open()
        .then((resultPromise) => {
          return resultPromise.result.then(
            (result) => {
              if (result) this.advertisementService.deleteAd(advertisement).subscribe();
            }, () => console.log('Delete action rejected by user.'));
        })

    );
  }

  ngOnInit(): void {
    this.getAdvertisements();
  }

}
