/// <reference path="../../src/xt.d.ts" />

export class TextViewSample extends UI.ViewController {

    contentView = new UI.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.title = "TextView"
        this.showNavigationBar()
        this.view.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.view.addSubview(this.contentView)
        this.addTestCases()
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.contentView.frame = this.view.bounds
    }

    addTestCases() {
        this.addMultipleLineTextView()
    }

    addMultipleLineTextView() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 0, 999, 240)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "MultipleLine TextView - Editable \nframe = {0, 66, 200, 120}"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.TextView()
        view.frame = UI.RectMake(0, 66, 200, 120)
        view.backgroundColor = UI.Color.whiteColor
        view.font = UI.Font.systemFontOfSize(14)
        view.text = "JAVASCRIPT WAS ORIGINALLY created in 1995 to give web pages a little more pep than the <blink> tag could provide. Today it has far more powerful uses. Companies like Google and Facebook build complex, desktop-like web applications with JavaScript; since the launch of Node.js in 2009, it’s also become one of the most popular languages for building server-side software. Today, even the web isn’t big enough to contain JavaScript’s versatility: it’s now making its way into applications for the desktop. \n Electron is a software development platform created by Github that lets developers use JavaScript along with other web technologies like HTML and CSS to create desktop applications that can run on Windows, Macintosh OS X, and Linux. The company released the first full version of Electron yesterday. But some of tech’s biggest names have already put the tool to work to push JavaScript beyond the browser."
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}