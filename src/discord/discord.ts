import Config from '../../config.yml'
import Log from '../logger';

export default class Discord {
    static webhook(content: string) {
        Logger.log(`Discordに通知します [${content}]`)
        Discord.request(content)
    }

    private static request(content: string, retries: number = 0) {
        Discord.getWaitTimeExp(retries)
        try {
            const response = UrlFetchApp.fetch(Config.DISCORD.WEBHOOK, {
                    "method": "post",
                    "headers": {"Content-Type": "application/json"},
                    "payload": JSON.stringify({content})
                }
            )
            if (response.getResponseCode() >= 300) {
                Log.info(`Error: ${response.getResponseCode()}\n${response.getContentText()}`)
                Log.info(`retry count:${retries}`)
                Discord.request(content, retries+1)
            }
        } catch (ex) {
            retries++
            Log.info(`Exception: ${ex}`)
            Log.info(`retry count: ${retries}`)
            Discord.request(content, retries+1)
        }
    }

    private static getWaitTimeExp(retryCount: number) {
        return Math.pow(2, retryCount) * 1000;
    }
}