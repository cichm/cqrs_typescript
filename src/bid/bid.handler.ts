import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { RaiseRepository } from "../raise/raise.repository";
import { BidCommand } from "./bid.command";

@CommandHandler(BidCommand)
export class BidHandler implements ICommandHandler<BidCommand> {
    constructor(
        private readonly raiseRepository: RaiseRepository,
        private readonly publisher: EventPublisher
    ){}

    async execute(command: BidCommand) {
        const { bidTransactionGUID, bidAmount, raiseID, bidUserGUID } = command;

        console.log(`${raiseID}, with userID: ${bidUserGUID} amount: ${bidAmount}`);

        const raise = this.publisher.mergeObjectContext(
            await this.raiseRepository.getActionById(raiseID)
        );

        raise.bidOnRaise(bidTransactionGUID, bidUserGUID, bidAmount);
        raise.commit();
    }
}
