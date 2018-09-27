import { Notification } from './notification';
import IData from '../model/data';
import Config from '../../config.yml'

export default class Discord implements Notification {
    private webhook(content: string) {
        Logger.log(`Discordに通知します [${content}]`)
        UrlFetchApp.fetch(Config.DISCORD.WEBHOOK, {
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
