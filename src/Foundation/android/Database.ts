export class Database extends XT.BaseObject {

    constructor(name: string, location: "document" | "cache" | "tmp" = "document") {
        super(undefined, false)
        this.objectRef = _XTFDatabase.create(name, location)
    }

    open(): Promise<boolean> {
        return new Promise<boolean>((resolver, rejector) => {
            _XTFDatabase.xtr_open(() => {
                resolver(true)
            }, (reason: string) => {
                rejector(reason)
            }, this.objectRef)
        })
    }

    executeQuery(sql: string, ...values: any[]): Promise<{ [key: string]: any }[]> {
        return new Promise<{ [key: string]: any }[]>((resolver, rejector) => {
            _XTFDatabase.xtr_executeQuery(sql, values, (results: any[]) => {
                resolver(results)
            }, (reason: string) => {
                rejector(reason)
            }, this.objectRef)
        })
    }

    executeUpdate(sql: string, ...values: any[]): Promise<boolean> {
        return new Promise<boolean>((resolver, rejector) => {
            _XTFDatabase.xtr_executeUpdate(sql, values, () => {
                resolver(true)
            }, (reason: string) => {
                rejector(reason)
            }, this.objectRef)
        })
    }

    executeStatements(sql: string): Promise<boolean> {
        return new Promise<boolean>((resolver, rejector) => {
            _XTFDatabase.xtr_executeStatements(sql, () => {
                resolver(true)
            }, (reason: string) => {
                rejector(reason)
            }, this.objectRef)
        })
    }

    executeTransaction(exec: () => void, rollback: boolean): Promise<boolean> {
        return new Promise<boolean>((resolver, rejector) => {
            _XTFDatabase.xtr_executeTransaction(exec, rollback, () => {
                resolver(true)
            }, (reason: string) => {
                rejector(reason)
            }, this.objectRef)
        })
    }

    destory(): Promise<boolean> {
        return new Promise<boolean>((resolver, rejector) => {
            _XTFDatabase.xtr_destory(() => {
                resolver(true)
            }, (reason: string) => {
                rejector(reason)
            }, this.objectRef)
        })
    }

}