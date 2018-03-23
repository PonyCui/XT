export class Database extends XT.BaseObject {

    constructor(name: string, location: "document" | "cache" | "tmp" = "document") {
        super(undefined, false)
        this.objectRef = _XTFDatabase.createLocation(name, location)
    }

    open(): Promise<boolean> {
        return new Promise<boolean>((resolver, rejector) => {
            _XTFDatabase.xtr_openWithResolverRejectorObjectRef(() => {
                resolver(true)
            }, (reason: string) => {
                rejector(reason)
            }, this.objectRef)
        })
    }

    executeQuery(sql: string, ...values: any[]): Promise<{ [key: string]: any }[]> {
        return new Promise<{ [key: string]: any }[]>((resolver, rejector) => {
            _XTFDatabase.xtr_executeQueryValuesResolverRejectorObjectRef(sql, values, (results: any[]) => {
                resolver(results)
            }, (reason: string) => {
                rejector(reason)
            }, this.objectRef)
        })
    }

    executeUpdate(sql: string, ...values: any[]): Promise<boolean> {
        return new Promise<boolean>((resolver, rejector) => {
            _XTFDatabase.xtr_executeUpdateValuesResolverRejectorObjectRef(sql, values, () => {
                resolver(true)
            }, (reason: string) => {
                rejector(reason)
            }, this.objectRef)
        })
    }

    executeStatements(sql: string): Promise<boolean> {
        return new Promise<boolean>((resolver, rejector) => {
            _XTFDatabase.xtr_executeStatementsResolverRejectorObjectRef(sql, () => {
                resolver(true)
            }, (reason: string) => {
                rejector(reason)
            }, this.objectRef)
        })
    }

    executeTransaction(exec: () => void, rollback: boolean): Promise<boolean> {
        return new Promise<boolean>((resolver, rejector) => {
            _XTFDatabase.xtr_executeTransactionRollbackResolverRejectorObjectRef(exec, rollback, () => {
                resolver(true)
            }, (reason: string) => {
                rejector(reason)
            }, this.objectRef)
        })
    }

    destory(): Promise<boolean> {
        return new Promise<boolean>((resolver, rejector) => {
            _XTFDatabase.xtr_destoryWithResolverRejectorObjectRef(() => {
                resolver(true)
            }, (reason: string) => {
                rejector(reason)
            }, this.objectRef)
        })
    }

}