import * as Mustache from "mustache"

export default class SendMail {
    private cc: string
    private template: MailTemplate;
    subject: string;
    constructor(cc: string, template: MailTemplate, subject: string) {
        this.cc = cc
        this.template = template
        this.subject = subject
    }
    send(to: string, params: MailParams) {
        const body = this.template.body(params)
        const htmlBody = this.template.htmlBody(params)
        const _params: SendEmailParameters = {
            to,
            cc: this.cc,
            subject: this.subject,
            body,
            htmlBody
        }
        Logger.log(`メールを送信します\ntext:\n${body}\n\nhtml:\n${htmlBody}`)
        MailApp.sendEmail(_params)
    }
}

export class MailTemplate {
    private html: string;
    private text: string;
    constructor(html: string, text: string) {
        this.html = html
        this.text = text
    }
    
    body(params: MailParams): string {
        return Mustache.render(this.text, params)
    }
    htmlBody(params: MailParams): string {
        return Mustache.render(this.html, params)
    }


}

import IData from '../model/data';

export interface MailParams extends IData {}

interface SendEmailParameters{
    to: string
    cc: string
    subject: string
    body: string
    htmlBody: string
}