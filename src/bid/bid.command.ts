export class BidCommand {
    constructor(
       public readonly bidTransactionGUID: string,
       public readonly bidUserGUID: string,
       public readonly raiseID: string,
       public readonly bidAmount: number,
    ){}
}
