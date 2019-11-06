import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {MailCommand} from "./mail.command";

@CommandHandler(MailCommand)
export class MailHandler implements ICommandHandler<MailCommand> {

    async execute(command: MailCommand): Promise<any> {
        const {mailAddress, mailDTO } = command;

        console.log(`send email to ${mailAddress}`);

        // logic for sending email

        return {
            sent: true,
            payload: {
                mailAddress, mailDTO
            }
        };
    }
}
