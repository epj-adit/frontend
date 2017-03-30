import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { AdvertisementSearchService } from '../_services/advertisement-search.service';
import { Advertisement } from '../data-classes/advertisement';

@Component({
  selector: 'adit-advertisementsearch',
  templateUrl: './advertisement-search.component.html',
  styleUrls: ['./advertisement-search.component.scss'],
  providers: [AdvertisementSearchService]
})
export class AdvertisementSearchComponent implements OnInit {
  advertisements: Observable<Advertisement[]>;
  private searchTerms = new Subject<string>();

  constructor(private advertisementSearchService: AdvertisementSearchService,
              private router: Router) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.advertisements = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.advertisementSearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Advertisement[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Advertisement[]>([]);
      });
  }
}
