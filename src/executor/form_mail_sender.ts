import { IExecutor } from './iexecutor';
import { Spreadsheet } from '../spredsheet/sperdsheet';
import SendMail from '../sendmail/sendmail';
import { MailTemplate } from '../sendmail/sendmail';
import { Notification } from '../notification/notification';
import Discord from '../notification/discord';
import Config from '../../config.yml'
import Log from '../logger';

export class FormMailSender implements IExecutor {
    name = "FormMailSender"
    sendmail: SendMail = new SendMail(Config.MAIL.ADDRESS, new MailTemplate(Config.MAIL.BODY.HTML, Config.MAIL.BODY.TEXT), Config.MAIL.SUBJECT)
    discordNotification: Notification = new Discord

    execute(): void {
        const spreadSheet = new Spreadsheet
        spreadSheet.countUp()
        const value = spreadSheet.getValue()

        try {
            this.sendmail.send(value.email, value)
            this.discordNotification.notification(value)
        } catch(ex) {
            Log.error(`処理中にエラーが発生`, value, ex)
        }
    }
}
