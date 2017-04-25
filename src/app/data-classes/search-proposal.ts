export enum ProposalType{
    Category, Tag, Advert
}
export class SearchProposal {
    name: string;
    type: ProposalType;
    displayName: string;
    id: number;
    constructor(){
    }
}