import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { Advertisement } from '../../data/advertisement';
import { AdvertisementService } from '../../services/advertisement.service';
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs/Observable";
import { AuthenticationService } from "../../utils/authentication.service";
import { AdvertisementState } from "../../data/advertisement-state";


@Component({
    selector: 'adit-useradvertisements',
    templateUrl: './user-advertisements.component.html',
    styleUrls: ['./user-advertisements.component.scss']
})
export class UserAdvertisementsComponent implements OnInit {
    advertisements: Advertisement[];
    advertisementOrder = [AdvertisementState.active, AdvertisementState.to_review, AdvertisementState.declined, AdvertisementState.expired, AdvertisementState.closed];

    constructor(private router: Router,
                private advertisementService: AdvertisementService,
                overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal,
                private translate: TranslateService,
                private authenticationService: AuthenticationService) {
        overlay.defaultViewContainer = vcRef;
    }

    getAdvertisements(userId: number): void {
        let outerScope = this;
        this.advertisementService.getAdvertisementsQuery('/?userId=' + userId)
            .subscribe(advertisements => this.advertisements = advertisements
                .sort((a1: Advertisement, a2: Advertisement) => {
                // parseInt(toString) nötig, da zu Laufzeit das advertisementState keine Zahl mehr ist sondern ein String -> JSON
            return outerScope.advertisementOrder.indexOf(parseInt(a1.advertisementState.toString())) - outerScope.advertisementOrder.indexOf(parseInt(a2.advertisementState.toString()));
        }));
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
    this.authenticationService.getUser().subscribe(user => this.getAdvertisements(user.id));
  }

}
