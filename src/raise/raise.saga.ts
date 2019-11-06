import {Injectable} from "@nestjs/common";
import {ICommand, ofType, Saga} from "@nestjs/cqrs";
import {Observable} from "rxjs";
import {RaiseEventsPostponed} from "./raise.events";
import {flatMap} from "rxjs/operators";
import {MailCommand} from "../mail/mail.command";

@Injectable()
export class RaiseSaga {

    @Saga()
    createBid = (events$: Observable<any>): Observable<ICommand> =>
        events$.pipe(
            ofType(RaiseEventsPostponed),
            flatMap((event: RaiseEventsPostponed) => {

                const bidders = [
                    new MailCommand('test1@mail.com', {
                        title: 'Hello, World!',
                        message: 'Hurry up',
                    }),
                    new MailCommand('test2@mail.com', {
                        title: 'Hello, World!',
                        message: 'Hurry up',
                    }),
                ];

                return [
                    ...bidders
                    // create activity
                ]
            })
        )
}
