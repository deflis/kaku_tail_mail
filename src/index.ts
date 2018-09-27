import execute from "./executor/iexecutor"
import { IExecutor } from './executor/iexecutor';
import SendMail, { MailTemplate } from './sendmail/sendmail';
import { FormMailSender } from './executor/form_mail_sender';

const sender = new FormMailSender

global.execute = () => execute(sender)