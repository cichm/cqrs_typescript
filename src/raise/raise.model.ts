import { AggregateRoot } from "@nestjs/cqrs";
import { IRaiseInterface } from "./raise.interface";
import { BidEventFail, BidEventSuccess } from "../bid/bid.events";
import { RaiseEventsPostponed } from "./raise.events";

export class RaiseModel extends AggregateRoot {
    constructor(private readonly raise: IRaiseInterface) {
        super();
    }

    postponeRaise() {
        // validation etc.
        // ...

        const raise = { ...this.raise };

        this.apply(new RaiseEventsPostponed(raise));
    }

    bidOnRaise(bidTransactionGUID: string, userID: string, amount: number) {
        // validation etc.
        // ...

        try {
            // business logic
            // ...

            this.apply(new BidEventSuccess(bidTransactionGUID, this.raise.id, amount, { email: 'test@mail.com', id: userID }));
        }
        catch (e) {
            this.apply(new BidEventFail(bidTransactionGUID, e));
        }
    }
}
