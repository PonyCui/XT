export class DatabaseResultSet extends XT.BaseObject {

    intValue(column: number): number { throw "Not Implemented!" }
    longValue(column: number): number { throw "Not Implemented!" }
    longlongValue(column: number): number { throw "Not Implemented!" }
    boolValue(column: number): boolean { throw "Not Implemented!" }
    stringValue(column: number): string { throw "Not Implemented!" }

}

export class Database extends XT.BaseObject {

    static ResultSet: typeof DatabaseResultSet

    constructor(name: string) {
        super(undefined, false)
        this.objectRef = _XTFDatabase.create(name)
    }

    open(): Promise<boolean> {
        return new Promise<boolean>((resolver, rejector) => {
            _XTFDatabase.xtr_openWithResolverRejectorObjectRef(() => {
                resolver(true)
            }, () => {
                rejector()
            }, this.objectRef)
        })
    }
    
    executeQuery(sql: string, ...values: any[]): Promise<typeof Database.ResultSet> { throw "Not Implemented!" }
    executeStatements(sql: string, ...values: any[]): Promise<boolean> { throw "Not Implemented!" }

}