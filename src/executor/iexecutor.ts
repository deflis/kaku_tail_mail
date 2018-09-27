export interface IExecutor {
    name: string
    execute(): void
}

export default function (e: IExecutor): void {

    const docLock = LockService.getDocumentLock()
    Logger.log(`Execute: ${e.name}`)
    // ドキュメントに対してLockがかかっているかチェック
    if (docLock.tryLock(30000)) {
        try {
            e.execute()
            Logger.log(`End: ${e.name}`)
        } catch(ex) {
            Logger.log(`Eexception: ${ex}`)
        } finally {
            docLock.releaseLock()
            Logger.log(`Release Lock in ${e.name}`)
        }
    } else {
        Logger.log(`Cannot get lock ${e.name}`)
    }

}