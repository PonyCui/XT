import { TestBase, TestCase } from "./base";

export class DatabaseSample extends TestBase {

    database: NS.Database

    viewDidLoad() {
        super.viewDidLoad()
        this.title = 'Database'
    }

    tearDown() {
        this.database.destory()
    }

    async openTests(_: TestCase) {
        _.isAsync = true
        this.database = new NS.Database("foo.sqlite")
        await this.database.destory()
        this.database.open().then(() => {
            _.asyncResolover()
        }).catch(() => {
            _.asyncRejector(Error("Failure"))
        })
    }

    createTableTests(_: TestCase) {
        _.isAsync = true
        this.database.executeStatements("CREATE TABLE car (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);").then(() => {
            _.asyncResolover()
        }).catch(() => {
            _.asyncRejector(Error("Failure"))
        })
    }

    insertRowTests(_: TestCase) {
        _.isAsync = true
        this.database.executeUpdate("INSERT INTO car VALUES (?, ?)", null, "Crosstour").then(() => {
            _.asyncResolover()
        }).catch(() => {
            _.asyncRejector(Error("Failure"))
        })
    }

    selectRowTests(_: TestCase) {
        _.isAsync = true
        this.database.executeQuery("SELECT * FROM car WHERE name = ?", "Crosstour").then((rows) => {
            this.assert(rows[0]["name"] === "Crosstour")
            _.asyncResolover()
        }).catch(() => {
            _.asyncRejector(Error("Failure"))
        })
    }

    async transactionTests(_: TestCase) {
        _.isAsync = true
        try {
            await this.database.executeTransaction(() => {
                this.database.executeUpdate("INSERT INTO car VALUES (?, ?)", null, "CRV")
                this.database.executeUpdate("INSERT INTO car VALUES (?, ?)", null, "XRV")
                this.database.executeUpdate("INSERT INTO car VALUES (?, ?)", null, "冠道")
            }, false)
            const rows = await this.database.executeQuery("SELECT * FROM car WHERE name = ?", "冠道")
            this.assert(rows[0]["name"] === "冠道")
            _.asyncResolover()
        } catch (error) {
            _.asyncRejector(error)
        }
    }

    async trnasactionRollbackTests(_: TestCase) {
        _.isAsync = true
        try {
            try {
                await this.database.executeTransaction(() => {
                    this.database.executeUpdate("INSERT INTO car VALUES (?, ?)", 1, "XXX")
                    this.database.executeUpdate("INSERT INTO car VALUES (?, ?)", null, "皇冠")
                }, true)
            } catch (error) {
                const rows = await this.database.executeQuery("SELECT * FROM car WHERE name = ?", "皇冠")
                this.assert(rows.length == 0)
                _.asyncResolover()
            }
        } catch (error) {
            _.asyncRejector(error)
        }
    }

}