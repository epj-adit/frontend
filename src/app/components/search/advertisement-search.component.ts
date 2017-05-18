import { Component, OnInit, ViewChild } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { AdvertisementSearchService } from '../../services/advertisement-search.service';
import { SearchProposal, ProposalType } from '../../data/search-proposal';
import forEach = require("core-js/fn/array/for-each");
import { Advertisement } from "../../data/advertisement";
import { Tag } from "../../data/tag";
import { Category } from "../../data/category";

@Component({
  selector: 'adit-advertisementsearch',
  templateUrl: './advertisement-search.component.html',
  styleUrls: ['./advertisement-search.component.scss'],
  providers: [AdvertisementSearchService]
})
export class AdvertisementSearchComponent implements OnInit {
  searchProposals: Observable<SearchProposal[]>;
  showNoResultsBox: boolean = false;
  private searchTerms = new Subject<string>();
  @ViewChild('searchBox') searchBox;
  @ViewChild('searchResults') searchResults;

    constructor(private advertisementSearchService: AdvertisementSearchService,
                private router: Router) {
    }

  // Push a search term into the observable stream.
  search(term: string): void {
    if(term.length>0){
      this.searchTerms.next(term);
    }
    else{
      this.searchProposals = Observable.of<SearchProposal[]>([]);
      this.showNoResultsBox = false;
    }
  }

    ngOnInit(): void {
        this.router.events.subscribe(() => {
            this.searchBox.nativeElement.value = '';
            if (this.searchResults) {
                for (let el of this.searchResults.nativeElement.children) {
                    el.style.display = 'none';
                }
            }
        });
        this.searchProposals = this.searchTerms
            .debounceTime(300)       // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term =>
                term ? this.advertisementSearchService.search(term) : Observable.of<SearchProposal[]>([]))
            .catch(error => {
                console.log(error);
                return Observable.of<SearchProposal[]>([]);
            });

    this.searchProposals.subscribe(results => results ? this.handleNotification(results) : Observable.of<SearchProposal[]>([]));
  }

    private handleNotification(results) {
        let advertisements: Advertisement[] = results[0];
        let proposals: SearchProposal[] = [];
        proposals = proposals.concat(this.addToProposals(advertisements, ProposalType.Advert));
        let tags: Tag[] = results[1];
        proposals = proposals.concat(this.addToProposals(tags, ProposalType.Tag));
        let categories: Category[] = results[2];
        proposals = proposals.concat(this.addToProposals(categories, ProposalType.Category));

        proposals = proposals.filter(p => p != undefined);
        proposals.sort((p1, p2) => p2.type - p1.type);

    this.showNoResultsBox = proposals.length == 0;

    this.searchProposals = Observable.of<SearchProposal[]>(proposals);
  }

    private addToProposals(toAdd: any[], proposalType: ProposalType) {
        if (!toAdd || toAdd.length === 0) return;
        let proposals: SearchProposal[] = [];
        if (proposalType == ProposalType.Advert) {
            toAdd.forEach(ad => proposals.push({
                id: ad.id,
                name: ad.title,
                type: proposalType,
                displayName: ProposalType[proposalType]
            }));
        } else {
            toAdd.forEach(item => proposals.push({
                id: item.id,
                name: item.name,
                type: proposalType,
                displayName: ProposalType[proposalType]
            }));
        }
        return proposals;
    }

    gotoInfo(searchProposal: SearchProposal): void {
        switch (searchProposal.type) {
            case ProposalType.Advert:
                let advertLink = ['/advertisementinfo', searchProposal.id];
                this.router.navigate(advertLink);
                break;
            case ProposalType.Tag:
                let tagLink = ['advertisements', {tagId: searchProposal.id}];
                this.router.navigate(tagLink);
                break;
            case ProposalType.Category:
                let categoryLink = ['advertisements', {categoryId: searchProposal.id}];
                this.router.navigate(categoryLink);
                break;
	   default:
		break;
        }
    }
}
