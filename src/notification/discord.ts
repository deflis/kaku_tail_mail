import { Notification } from './notification';
import IData from '../model/data';

const url = "****"

export default class Discord implements Notification {
    private webhook(content: string) {
        Logger.log(`Discordに通知します [${content}]`)
        UrlFetchApp.fetch(url, {
                "method": "post",
                "headers": {"Content-Type": "application/json"},
                "payload": JSON.stringify({content})
            }
        )
    }

    notification(data: IData) {
        this.webhook(`[${data.count}] ${data.name} さんが参加を表明しました`)
    }
}