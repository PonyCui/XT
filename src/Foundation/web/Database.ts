export class Database extends XT.BaseObject {

    private databaseQueue: any
    private inTransaction: boolean = false
    private inTransactionRollback: boolean = false
    private transactionExecutions: ((db: any) => Promise<any>)[] = []

    constructor(readonly name: string, readonly location: "document" | "cache" | "tmp" = "document") {
        super(undefined, false)
    }

    open(): Promise<boolean> {
        return new Promise<boolean>((resolver, rejector) => {
            try {
                this.databaseQueue = (window as any).openDatabase(this.location + "_" + this.name, '', "XT Database", 5 * 1024 * 1024)
                resolver()
            } catch (error) {
                rejector(rejector)
            }
        })
    }

    executeQuery(sql: string, ...values: any[]): Promise<{ [key: string]: any }[]> {
        if (this.inTransaction) {
            return new Promise<any>((resolver, rejector) => { rejector("Do not executeQuery while runing transaction.") })
        }
        return new Promise<{ [key: string]: any }[]>((resolver, rejector) => {
            this.databaseQueue.transaction((db: any) => {
                try {
                    db.executeSql(sql, values, (_: any, results: any) => {
                        var finalResults = []
                        for (let index = 0; index < results.rows.length; index++) {
                            const element = results.rows.item ? results.rows.item(index) : results.rows[index];
                            finalResults.push(element)
                        }
                        resolver(finalResults)
                    })
                } catch (error) {
                    rejector(error.message)
                }
            })
        })
    }

    executeUpdate(sql: string, ...values: any[]): Promise<boolean> {
        if (this.inTransaction) {
            this.transactionExecutions.push((db: any) => {
                return new Promise<any>((resolver, rejector) => {
                    db.executeSql(sql, values, () => {
                        resolver()
                    }, (db: any, error: any) => {
                        rejector(error)
                        return this.inTransactionRollback
                    })
                })
            })
            return new Promise<boolean>(() => { })
        }
        return new Promise<boolean>((resolver, rejector) => {
            this.databaseQueue.transaction((db: any) => {
                try {
                    db.executeSql(sql, values)
                    resolver(true)
                } catch (error) {
                    rejector(error.message)
                }
            })
        })
    }

    executeStatements(sql: string): Promise<boolean> {
        if (this.inTransaction) {
            this.transactionExecutions.push((db: any) => {
                return new Promise<any>((resolver, rejector) => {
                    db.executeSql(sql, [], () => {
                        resolver()
                    }, (db: any, error: any) => {
                        rejector(error)
                        return this.inTransactionRollback
                    })
                })
            })
            return new Promise<boolean>(() => { })
        }
        return new Promise<boolean>((resolver, rejector) => {
            this.databaseQueue.transaction((db: any) => {
                try {
                    db.executeSql(sql)
                    resolver(true)
                } catch (error) {
                    rejector(error.message)
                }
            })
        })
    }

    executeTransaction(exec: () => void, rollback: boolean): Promise<boolean> {
        if (this.inTransaction) {
            return new Promise<boolean>((resolver, rejector) => { rejector("Already inTransaction.") })
        }
        this.inTransaction = true
        this.inTransactionRollback = rollback
        return new Promise<boolean>((resolver, rejector) => {
            exec()
            this.databaseQueue.transaction((db: any) => {
                Promise.all(this.transactionExecutions.map(it => it(db))).then(() => {
                    this.clearTransaction()
                    resolver(true)
                }).catch(e => {
                    this.clearTransaction()
                    rejector(e.message)
                })
            })
        })
    }

    private clearTransaction() {
        this.inTransaction = false
        this.inTransactionRollback = false
        this.transactionExecutions = []
    }

    async destory(): Promise<boolean> {
        await this.open()
        this.databaseQueue.transaction((db: any) => {
            db.executeSql("delete from sqlite_master where type in ('table', 'index', 'trigger');")
        })
        return true
    }

}