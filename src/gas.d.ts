declare var global: any
declare function require(name: string): any

declare module '*.html' {
    const value: string
    export default value
}

declare module '*.txt' {
    const value: string
    export default value
}