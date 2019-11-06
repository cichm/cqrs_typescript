import { Controller, Get } from '@nestjs/common';
import { EventBus, QueryBus } from '@nestjs/cqrs';
import * as uuid from 'uuid';

import { BidEvent } from "./bid/bid.events";
import { GetRaiseQuery } from "./raise/raise.query";

@Controller()
export class AppController {
  constructor(private readonly eventBus: EventBus, private queryBus: QueryBus) {}

  @Get("/bid")
  async bid(): Promise<object> {
    const bidTransactionGUID = uuid.v4();

    this.eventBus.publish(
        new BidEvent(
            bidTransactionGUID, 'd50d11e0-e780-11e9-81b4-2a2ae2dbcce4', 'd50d15a0-e780-11e9-81b4-2a2ae2dbcce4', 4000
        )
    );

    return {
      status: 'PENDING',
    };
  }

  @Get('/audiences')
  async getAudiences() {
    const allRaises = await this.queryBus.execute(new GetRaiseQuery());

    return allRaises;
  }
}
