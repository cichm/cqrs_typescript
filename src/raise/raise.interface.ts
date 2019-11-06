export interface IRaiseInterface {
    id: string;
    started?: Date,
    end?: Date;
    currentBid?: number;
    currentBidID?: string;
    history?: object[];
}
