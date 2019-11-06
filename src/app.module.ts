import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AppController } from './app.controller';
import { BidSaga } from "./bid/bid.saga";
import { RaiseHandler } from "./raise/raise.handler";
import { GetRaiseHandler } from "./raise/raise.query";
import { RaiseRepository } from "./raise/raise.repository";
import {MailHandler} from "./mail/mail.handler";
import {RaiseSaga} from "./raise/raise.saga";
import {BidHandler} from "./bid/bid.handler";


@Module({
  imports: [
    CqrsModule,
  ],
  controllers: [AppController],
  providers: [
    MailHandler,
    RaiseSaga,
    BidHandler,
    BidSaga,
    RaiseHandler,
    GetRaiseHandler,
    RaiseRepository,
  ],
})
export class AppModule {}
