import { Injectable } from "@nestjs/common";
import { ICommand, ofType, Saga } from "@nestjs/cqrs";
import { Observable } from "rxjs";
import { BidEvent, BidEventSuccess } from "./bid.events";
import { flatMap, map } from "rxjs/operators";
import { BidCommand } from "./bid.command";
import { MailCommand } from "../mail/mail.command";
import { PostponeRaiseCommand } from "../raise/raise.command";

@Injectable()
export class BidSaga {

    @Saga()
    createBid = (events$: Observable<any>): Observable<ICommand> =>
        events$.pipe(
            ofType(BidEvent),
            map((event: BidEvent) => new BidCommand(event.bidTransactionGUID, event.bidUser, event.raiseID, event.bidAmount))
        );

    @Saga()
    createBidSuccess = (events$: Observable<any>): Observable<ICommand> =>
        events$.pipe(
            ofType(BidEventSuccess),
            flatMap((event: BidEventSuccess) => [
                new MailCommand(event.user.email, {
                    title: 'You dod it...',
                    message: 'Congrats',
                }),
                new PostponeRaiseCommand(event.raiseID),
                // Create activity command
            ])
        )
}
