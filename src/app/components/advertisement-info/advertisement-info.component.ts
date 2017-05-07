import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AdvertisementService } from '../../services/advertisement.service';
import { Advertisement } from '../../data/advertisement';
import { AdvertisementState } from "../../data/advertisement-state";
import { StatusmessageService } from "../../utils/statusmessage.service";
@Component({
  selector: 'adit-advertisementinfo',
  templateUrl: './advertisement-info.component.html',
  styleUrls: ['./advertisement-info.component.scss'],
  //providers: [AdvertisementService]
})
export class AdvertisementInfoComponent implements OnInit {
  advertisement: Advertisement;
  url: string;

  constructor(private advertisementService: AdvertisementService,
              private route: ActivatedRoute,
              private router: Router,
              private translate: TranslateService,
              private statusmessageService: StatusmessageService) {
    this.url = this.router.url;
  }

  ngOnInit(): void {
    // supress unnecessary server request, if we already have ad-object
    if (this.advertisementService.currentAdvertisement) {
      this.advertisement = this.advertisementService.currentAdvertisement;
    } else {
      let statusMessage: string;
      this.translate.get("STATUS.errorOccurred").subscribe(msg => statusMessage = msg);
      this.route.params
        .switchMap((params: Params) => this.advertisementService.getAdvertisement(+params['id']))
        .subscribe(advertisement => this.advertisement = advertisement, err => this.statusmessageService.error(statusMessage + err.detailMessage));
    }
  }

  changeState(state: AdvertisementState){
    let statusMessage: string;
    this.translate.get("STATUS.errorOccurred").subscribe(msg => statusMessage = msg);
    this.advertisementService.createOrUpdate(this.advertisement, this.advertisement.tags, state)
      .subscribe(
        res => {
          this.router.navigate(["supervisorpanel", "manageAdvertisements"]);
        },
        err => {
          this.statusmessageService.error(statusMessage + err.detailMessage);
          console.log("error", err);
        }
      );
  }
}
