/// <reference path="../../src/xt.d.ts" />

export class ImageViewSample extends XT.ViewController {

    contentView = new XT.ScrollView()

    viewDidLoad() {
        super.viewDidLoad()
        this.navigationBar.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.navigationBar.title = "ImageView"
        this.showNavigationBar()
        this.view.backgroundColor = new XT.Color(0xf6 / 0xff, 0xf6 / 0xff, 0xf6 / 0xff)
        this.contentView.alwaysBounceVertical = true
        this.view.addSubview(this.contentView)
        this.addTestCases()
    }

    viewWillLayoutSubviews() {
        super.viewWillLayoutSubviews()
        this.contentView.frame = this.view.bounds
    }

    addTestCases() {
        this.addLocalImage()
        this.addRemoteImage()
        this.addScaleToFillImageView()
        this.addAspectFitImageView()
        this.addAspectFillImageView()
        this.contentView.contentSize = XT.SizeMake(0, 1200)
    }

    addLocalImage() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 0, 999, 140)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Load Image to ImageView \nframe = {0, 66, 78, 78} \nimage.fromAssets = success"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.ImageView()
        view.frame = XT.RectMake(0, 66, 78, 78)
        XT.Image.fromAssets("success", (it) => {
            view.image = it
        })
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addRemoteImage() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 160, 999, 220)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Load Remote Image to ImageView \nframe = {0, 66, 182, 129}"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.ImageView()
        view.frame = XT.RectMake(0, 66, 182, 129)
        XT.Image.fromURL('http://img5.dwstatic.com/www/1512/313433690773/1515031232199.jpg', (it) => {
            view.image = it
        })
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addScaleToFillImageView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 380, 999, 220)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Load Remote Image to ImageView \nframe = {0, 66, 300, 129} \ncontentMode=ScaleToFill"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.ImageView()
        view.frame = XT.RectMake(0, 66, 300, 129)
        view.contentMode = XT.ContentMode.ScaleToFill
        XT.Image.fromURL('http://img5.dwstatic.com/www/1512/313433690773/1515031232199.jpg', (it) => {
            view.image = it
        })
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addAspectFitImageView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 600, 999, 220)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Load Remote Image to ImageView \nframe = {0, 66, 300, 129} \ncontentMode=ScaleAspectFit"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.ImageView()
        view.frame = XT.RectMake(0, 66, 300, 129)
        view.contentMode = XT.ContentMode.ScaleAspectFit
        XT.Image.fromURL('http://img5.dwstatic.com/www/1512/313433690773/1515031232199.jpg', (it) => {
            view.image = it
        })
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

    addAspectFillImageView() {
        const wrapper = new XT.View()
        wrapper.frame = XT.RectMake(15, 820, 999, 220)
        const summary = new XT.Label()
        summary.frame = XT.RectMake(0, 8, 999, 44)
        summary.font = XT.Font.systemFontOfSize(11)
        summary.textColor = XT.Color.grayColor
        summary.numberOfLines = 0
        summary.text = "Load Remote Image to ImageView \nframe = {0, 66, 300, 129} \ncontentMode=ScaleAspectFill clipsToBounds=true"
        wrapper.addSubview(summary)
        // Sample Code {
        const view = new XT.ImageView()
        view.frame = XT.RectMake(0, 66, 300, 129)
        view.contentMode = XT.ContentMode.ScaleAspectFill
        view.clipsToBounds = true
        XT.Image.fromURL('http://img5.dwstatic.com/www/1512/313433690773/1515031232199.jpg', (it) => {
            view.image = it
        })
        // } Sample Code 
        wrapper.addSubview(view)
        this.contentView.addSubview(wrapper)
    }

}