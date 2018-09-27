declare var global: any

declare module '*.html' {
    const value: string
    export default value
}

declare module '*.txt' {
    const value: string
    export default value
}

declare module '*config.yml' {
    interface Config {
        MAIL: {
            ADDRESS: string
            SUBJECT: string
            BODY: {
                TEXT: string
                HTML: string
            }
        }
        SPREADSHEET: {
            COLUMN: {
                NAME: number
                MAIL: number
                COUNTER: number
            }
        }
        DISCORD: {
            WEBHOOK: string
        }
    }

    const config: Config
    export default config
}