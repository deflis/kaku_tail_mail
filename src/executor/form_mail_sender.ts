import { IExecutor } from './iexecutor';
import { Spreadsheet } from '../spredsheet/sperdsheet';
import SendMail from '../sendmail/sendmail';
import { MailTemplate } from '../sendmail/sendmail';
import { Notification } from '../notification/notification';
import Discord from '../notification/discord';

export class FormMailSender implements IExecutor {
    name = "FormMailSender"
    sendmail: SendMail = new SendMail("****@example.com", MailTemplate, "タイトル")
    discordNotification: Notification = new Discord

    execute(): void {
        const spreadSheet = new Spreadsheet
        spreadSheet.countUp()
        const value = spreadSheet.getValue()

        this.sendmail.send(value.email, value)
        this.discordNotification.notification(value)
    }
}