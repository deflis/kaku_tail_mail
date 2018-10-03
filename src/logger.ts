import Discord from "./discord/discord"

export default class Log {
    static error(message: string, ...objs: any[]) {
        Logger.log(`[ERROR] ${message}`)
        for (const i in objs) {
            if (objs.hasOwnProperty(i)) {
                const obj = objs[i]
                Logger.log(obj)
            }
        }
        Discord.webhook(`エラーが発生しました\n${message}\n${JSON.stringify(objs, undefined, 1)}`)

    }

    static info(message: string) {
        Logger.log(`[INFO] ${message}`)
    }
}