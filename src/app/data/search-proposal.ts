export enum ProposalType{
    Category, Tag, Advert, NoResult
}
export class SearchProposal {
    name: string;
    type: ProposalType;
    displayName: string;
    id: number;
    constructor(){
    }
}