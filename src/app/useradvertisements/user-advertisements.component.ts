import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

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
              private advertisementService: AdvertisementService,
              overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal) {
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
    this.modal.confirm()
      .size('sm')
      .showClose(true)
      .keyboard(27)
      .title('Delete Advertisement')
      .body(`
            <p>Deleting an ad cannot be undone</p><p>Do you want to proceed?</p>`)
      .okBtnClass('btn btn-danger')
      .cancelBtnClass('btn btn-default')
      .open()
      .then((resultPromise) => {
        return resultPromise.result.then(
          (result) => {
            if (result) this.advertisementService.deleteAd(advertisement).subscribe();
          }, () => console.log('Delete action rejected by user.'));
      });
  }

  ngOnInit(): void {
    this.getAdvertisements();
  }

}
