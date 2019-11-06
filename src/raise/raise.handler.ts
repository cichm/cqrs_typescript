import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {PostponeRaiseCommand} from "./raise.command";
import {RaiseRepository} from "./raise.repository";

@CommandHandler(PostponeRaiseCommand)
export class RaiseHandler implements ICommandHandler<PostponeRaiseCommand> {
    constructor(
        private readonly raiseRepository: RaiseRepository,
        private readonly publisher: EventPublisher
    ){}

    async execute(command: PostponeRaiseCommand) {

        const { raiseID } = command;

        const raise = this.publisher.mergeObjectContext(
            await this.raiseRepository.getActionById(raiseID)
        );

        console.log('postpone it for two hours');

        raise.postponeRaise();
        raise.commit();
    }
}
