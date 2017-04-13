import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { AdvertisementSearchService } from '../_services/advertisement-search.service';
import {SearchProposal, ProposalType} from './search-proposal';

@Component({
  selector: 'adit-advertisementsearch',
  templateUrl: './advertisement-search.component.html',
  styleUrls: ['./advertisement-search.component.scss'],
  providers: [AdvertisementSearchService]
})
export class AdvertisementSearchComponent implements OnInit {
  searchProposals: Observable<SearchProposal[]>;

  private searchTerms = new Subject<string>();

  constructor(private advertisementSearchService: AdvertisementSearchService,
              private router: Router) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
      console.log("Searchproposals now: ",this.searchProposals);
  }

  ngOnInit(): void {
    this.searchProposals = this.searchTerms
      .debounceTime(300)       // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term ? this.advertisementSearchService.search(term) : Observable.of<SearchProposal[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<SearchProposal[]>([]);
      });

      this.searchProposals.subscribe(results => results ? this.handleNotification(results) : Observable.of<SearchProposal[]>([]));
  }

    private handleNotification(results) {
        let advertisements = results[0];
        let proposals: SearchProposal[] = [];
        proposals = proposals.concat(this.addToProposals(advertisements, ProposalType.advertisement));
        let tags = results[1];
        proposals = proposals.concat(this.addToProposals(tags, ProposalType.tag));
        let categories = results[2];
        proposals = proposals.concat(this.addToProposals(categories, ProposalType.category));
        console.log("wait for me ", proposals);

        proposals = proposals.filter(p=>p!=undefined);
        proposals.sort((p1,p2)=> p1.type-p2.type);

        this.searchProposals = Observable.of<SearchProposal[]>(proposals);
    }

    private addToProposals(toAdd: any[], proposalType : ProposalType) {
        if(!toAdd || toAdd.length===0) return;
        let proposals: SearchProposal[] = [];
        if(proposalType == ProposalType.advertisement){
            toAdd.forEach(ad => proposals.push({id:ad.id, name:ad.title, type:proposalType }));
        } else {
            toAdd.forEach(item => proposals.push({id:item.id, name:item.name, type:proposalType }));
        }
        return proposals;
    }

  gotoInfo(searchProposal: SearchProposal): void {
    let link = ['/advertisementinfo', searchProposal.id];
    this.router.navigate(link);
  }
}
