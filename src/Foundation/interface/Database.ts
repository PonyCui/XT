export class Database extends XT.BaseObject {

    constructor(name: string, location: "document" | "cache" | "tmp" = "document") { super() }

    open(): Promise<boolean> { throw "Not Implemented!" }
    executeQuery(sql: string, ...values: any[]): Promise<{ [key: string]: any }[]> { throw "Not Implemented!" }
    executeUpdate(sql: string, ...values: any[]): Promise<boolean> { throw "Not Implemented!" }
    executeStatements(sql: string): Promise<boolean> { throw "Not Implemented!" }
    executeTransaction(exec: () => void, rollback: boolean): Promise<boolean> { throw "Not Implemented!" }
    destory(): Promise<boolean> { throw "Not Implemented!" }

}