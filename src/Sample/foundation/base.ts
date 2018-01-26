export interface TestCase {
    name: string
    level: number
    isAsync: boolean
    isAsyncRejected: boolean
    asyncRejector: (err: Error) => void
    asyncResolover: () => void
}

export class TestBase extends UI.ViewController {

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.showNavigationBar()
        this.view.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        try {
            this.setup();
        } catch (error) {
            this.log(false, "Setup", 0);
        }
        this.run();
    }

    setup() { }

    private funcList: Function[] | undefined = undefined

    run() {
        if (this.funcList === undefined) {
            this.funcList = []
            for (const funcName in this) {
                if ((this as any)[funcName] instanceof Function && funcName.indexOf('Tests') > 0) {
                    (this as any)[funcName].__name = funcName
                    this.funcList.push((this as any)[funcName])
                }
            }
        }
        const currentTask = this.funcList.shift()
        if (currentTask) {
            const isAsync = this.runFunc(currentTask)
            if (!isAsync) {
                this.run()
            }
        }
        else {
            this.log(true, "All Tests", 0)
        }
    }

    runFunc(func: Function) {
        let _ = {
            name: (func as any).__name || "Noname Test Case", level: 0, isAsync: false, isAsyncRejected: false, asyncRejector: (error: Error) => {
                _.isAsyncRejected = true
                this.log(false, _.name + " " + error.message, _.level)
            }, asyncResolover: () => {
                this.stopRunning()
                if (_.isAsyncRejected) {
                    this.log(false, _.name, 0)
                }
                else {
                    this.log(true, _.name, 0)
                    this.run()
                }
            }
        }
        try {
            func.call(this, _)
            if (!_.isAsync) { this.log(true, _.name, _.level) }
            else { this.startRunning() }
            return _.isAsync
        } catch (error) {
            this.log(false, _.name + " " + error.message, _.level)
            return false
        }
    }

    private currentY = 8.0

    running(description: string, level: number) {
        const resultLabel = new UI.Label()
        resultLabel.frame = UI.RectMake(15.0, this.currentY, UI.Screen.mainScreen().bounds().width, 28)
        resultLabel.font = UI.Font.systemFontOfSize(17)
        resultLabel.textColor = UI.Color.grayColor
        resultLabel.text = "Running - " + description
        this.currentY += 28.0
        this.view.addSubview(resultLabel)
    }

    log(result: boolean, description: string, level: number) {
        const resultLabel = new UI.Label()
        resultLabel.frame = UI.RectMake(15.0, this.currentY, UI.Screen.mainScreen().bounds().width, 28)
        resultLabel.font = UI.Font.systemFontOfSize(17)
        if (result) {
            resultLabel.textColor = new UI.Color(0x3f / 0xff, 0x69 / 0xff, 0x1e / 0xff)
            resultLabel.text = "Pass >>> " + description
        }
        else {
            resultLabel.textColor = UI.Color.redColor
            resultLabel.text = "Fail >>> " + description
        }
        this.currentY += 28.0
        this.view.addSubview(resultLabel)
    }

    assert(condition: boolean, message: string = "", _: TestCase | undefined = undefined) {
        if (!condition) {
            if (_) {
                _.asyncRejector(new Error(message))
            }
            else {
                throw new Error(message)
            }
        }
    }

    private runningLabel = new UI.Label()

    startRunning() {
        this.runningLabel.frame = UI.RectMake(15.0, this.currentY, UI.Screen.mainScreen().bounds().width, 28)
        this.runningLabel.font = UI.Font.systemFontOfSize(17)
        this.runningLabel.textColor = UI.Color.grayColor
        this.runningLabel.text = "Runing..."
        this.view.addSubview(this.runningLabel)
    }

    stopRunning() {
        this.runningLabel.removeFromSuperview()
    }

}