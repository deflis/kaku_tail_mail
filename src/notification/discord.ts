import { Notification } from './notification';
import IData from '../model/data';
import DiscordService from '../discord/discord'

export default class Discord implements Notification {

    notification(data: IData) {
        DiscordService.webhook(`[${data.count}] ${data.name} さんが参加を表明しました`)
    }
}
