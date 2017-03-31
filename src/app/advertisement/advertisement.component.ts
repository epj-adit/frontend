import { Component } from '@angular/core';

import { AdvertisementService } from '../_services/advertisement.service';

@Component({
  selector: 'adit-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
  providers: [AdvertisementService]
})
export class AdvertisementComponent {

}