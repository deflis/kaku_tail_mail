import Log from '../logger';
export interface IExecutor {
    name: string
    execute(): void
}

export default function (e: IExecutor): void {

    const docLock = LockService.getDocumentLock()
    Log.info(`Execute: ${e.name}`)
    // ドキュメントに対してLockがかかっているかチェック
    if (docLock.tryLock(30000)) {
        try {
            e.execute()
            Log.info(`End: ${e.name}`)
        } catch(ex) {
            Log.error(`Exception: ${ex}`, ex)
        } finally {
            docLock.releaseLock()
            Log.info(`Release Lock in ${e.name}`)
        }
    } else {
        Log.error(`Cannot get lock ${e.name}`)
    }

}