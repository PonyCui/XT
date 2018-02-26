/// <reference path="../../xt.d.ts" />

export class CanvasSample extends UI.ViewController {

    contentView = new UI.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = UI.Color.blackColor
        this.navigationBar.lightContent = true
        this.title = "Canvas"
        this.showNavigationBar()
        this.view.backgroundColor = new UI.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.contentView.alwaysBounceVertical = true
        this.view.addSubview(this.contentView)
        this.addTestCases()
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.contentView.frame = this.view.bounds
    }

    addTestCases() {
        this.addFillStyleTest()
        this.addStrokeStyleTest()
        this.addLineCapTest()
        this.addLineJoinTest()
        this.addMiterLimitTest()
        this.addFillPathTest()
        this.addClosePathTest()
        this.addQuadraticCurveToTest()
        this.addBezierCurveToTest()
        this.addArc90ToTest()
        this.addArc145CCWToTest()
        this.addIsPointInPathTest()
        this.addScaleTest()
        this.addRotateTest()
        this.addTranslateTest()
        this.addTransformTest()
        this.addSetTransformTest()
        this.addSaveTest()
        this.contentView.contentSize = UI.SizeMake(0, 280 * 18)
    }

    addFillStyleTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 0, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "fillStyle & fillRect Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 200, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.fillStyle = UI.Color.blueColor;
        view.fillRect(20, 20, 150, 100);
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addStrokeStyleTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "strokeStyle & strokeRect Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 200, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.strokeStyle = UI.Color.blueColor;
        view.strokeRect(20, 20, 150, 100);
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addLineCapTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280 * 2, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "lineCap Test \nframe = {0, 66, 44, 44} \nlineCap = round"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 200, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.beginPath();
        view.moveTo(20, 20);
        view.lineTo(160, 20);
        view.strokeStyle = UI.Color.blackColor
        view.lineWidth = 10
        view.lineCap = "round";
        view.stroke();
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addLineJoinTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280 * 3, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "lineJoin Test \nframe = {0, 66, 44, 44} \nlineJoin = round"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 200, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.beginPath();
        view.moveTo(20, 20);
        view.lineTo(100, 50);
        view.lineTo(20, 100);
        view.strokeStyle = UI.Color.blackColor
        view.lineWidth = 10
        view.lineJoin = "round";
        view.stroke();
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addMiterLimitTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280 * 4, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "miterLimit Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 200, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.beginPath();
        view.moveTo(20, 20);
        view.lineTo(50, 27);
        view.lineTo(20, 34);
        view.strokeStyle = UI.Color.blackColor
        view.lineWidth = 10
        view.lineJoin = "miter";
        view.miterLimit = 5;
        view.stroke();
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addFillPathTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280 * 5, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "fillPath Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 200, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.beginPath();
        view.rect(20, 20, 150, 100);
        view.fillStyle = UI.Color.redColor;
        view.fill();
        view.beginPath();
        view.rect(40, 40, 150, 100);
        view.fillStyle = UI.Color.blueColor;
        view.fill();
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addClosePathTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280 * 6, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "closePath Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 200, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.beginPath();
        view.moveTo(20, 20);
        view.lineTo(20, 100);
        view.lineTo(70, 100);
        view.closePath();
        view.strokeStyle = UI.Color.blackColor
        view.stroke();
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addQuadraticCurveToTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280 * 7, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "quadraticCurveTo Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 300, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.beginPath();
        view.moveTo(20, 20);
        view.quadraticCurveTo(20, 100, 200, 20);
        view.strokeStyle = UI.Color.blackColor
        view.stroke();
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addBezierCurveToTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280 * 8, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "bezierCurveTo Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 300, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.beginPath();
        view.moveTo(20, 20);
        view.bezierCurveTo(20, 100, 200, 100, 200, 20);
        view.strokeStyle = UI.Color.blackColor
        view.stroke();
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addArc90ToTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280 * 9, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "arc 90 degree Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 300, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.beginPath();
        view.moveTo(0, 0);
        view.arc(100, 75, 50, 0, 90 * Math.PI / 180);
        view.strokeStyle = UI.Color.blackColor
        view.stroke();
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addArc145CCWToTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280 * 10, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "arc 145 degree Test \nframe = {0, 66, 44, 44} \nccw = true"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 300, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.beginPath();
        view.moveTo(0, 0);
        view.arc(100, 75, 50, 0, 145 * Math.PI / 180, true);
        view.strokeStyle = UI.Color.blackColor
        view.stroke();
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addIsPointInPathTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280 * 11, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "isPointInPath Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 300, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.rect(20, 20, 150, 100);
        if (view.isPointInPath(20, 50)) {
            view.strokeStyle = UI.Color.blackColor
            view.stroke();
        };
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addScaleTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280 * 12, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "scale Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 300, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.strokeStyle = UI.Color.blackColor
        view.strokeRect(5, 5, 25, 15);
        view.postScale(2, 2);
        view.strokeRect(5, 5, 25, 15);
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addRotateTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280 * 13, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "rotate Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 300, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.postRotate(20 * Math.PI / 180);
        view.fillStyle = UI.Color.blackColor
        view.fillRect(50, 20, 100, 50);
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addTranslateTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280 * 14, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "translate Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 300, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.fillStyle = UI.Color.blackColor
        view.fillRect(10, 10, 100, 50);
        view.postTranslate(70, 70);
        view.fillRect(10, 10, 100, 50);
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addTransformTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280 * 15, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "transform Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 300, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.fillStyle = UI.Color.yellowColor;
        view.fillRect(0, 0, 250, 100)
        view.postTransform(1, 0.5, -0.5, 1, 30, 10);
        view.fillStyle = UI.Color.redColor;
        view.fillRect(0, 0, 250, 100);
        view.postTransform(1, 0.5, -0.5, 1, 30, 10);
        view.fillStyle = UI.Color.blueColor;
        view.fillRect(0, 0, 250, 100);
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addSetTransformTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280 * 16, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "setTransform Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 300, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.fillStyle = UI.Color.yellowColor;
        view.fillRect(0, 0, 250, 100)
        view.setTransform(1, 0.5, -0.5, 1, 30, 10);
        view.fillStyle = UI.Color.redColor;
        view.fillRect(0, 0, 250, 100);
        view.setTransform(1, 0.5, -0.5, 1, 30, 10);
        view.fillStyle = UI.Color.blueColor;
        view.fillRect(0, 0, 250, 100);
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addSaveTest() {
        const wrapper = new UI.View()
        wrapper.frame = UI.RectMake(15, 280 * 17, 999, 280)
        const summary = new UI.Label()
        summary.frame = UI.RectMake(0, 8, 999, 44)
        summary.font = UI.Font.systemFontOfSize(11)
        summary.textColor = UI.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "save Test \nframe = {0, 66, 44, 44} \n"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new UI.CanvasView()
        view.frame = UI.RectMake(0, 66, 300, 200)
        view.backgroundColor = UI.Color.whiteColor
        view.fillStyle = UI.Color.blackColor
        view.save();
        view.fillStyle = UI.Color.greenColor;
        view.fillRect(10, 10, 100, 100);
        view.restore();
        view.fillRect(150, 75, 100, 100);
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}