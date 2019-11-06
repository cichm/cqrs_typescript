export class BidEvent {
    constructor(
        public readonly bidTransactionGUID: string,
        public readonly bidUser: string,
        public readonly raiseID: string,
        public readonly bidAmount: number,
    ){}
}

export class BidEventSuccess {
    constructor(
       public readonly bidTransactionGUID: string,
       public readonly raiseID: string,
       public readonly bidAmount: number,
       public readonly user: { email: string, id: string },
    ){}
}

export class BidEventFail {
    constructor(
       public readonly bidTransactionGUID: string,
       public readonly error: object,
    ) {}
}
