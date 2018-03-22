import { TestBase, TestCase } from "./base";

export class DatabaseSample extends TestBase {

    database: NS.Database

    viewDidLoad() {
        super.viewDidLoad()
        this.title = 'Database'
    }

    openTests(_: TestCase) {
        _.isAsync = true
        this.database = new NS.Database("fooDatabase")
        this.database.open().then(() => {
            _.asyncResolover()
        }).catch(() => {
            _.asyncRejector(Error("Failure"))
        })
    }

}