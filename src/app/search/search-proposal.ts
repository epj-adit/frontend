export enum ProposalType{
    category, tag, advertisement
}
export class SearchProposal {
    name: string;
    type: ProposalType;
    id: number;
    constructor(){

    }
}