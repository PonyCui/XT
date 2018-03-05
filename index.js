if (typeof window === "object") {
    window.XTFrameworkLoader = {
        distUrl: "https://cdn.jsdelivr.net/npm/xt-studio@0.1.0/dist",
        componentsUrl: {
            "XT": function () { return window.XTFrameworkLoader.distUrl + "/Core/xt.core.web.min.js" },
            "NS": function () { return window.XTFrameworkLoader.distUrl + "/Foundation/xt.foundation.web.min.js" },
            "UI": function () { return window.XTFrameworkLoader.distUrl + "/UIKit/xt.uikit.web.min.js" },
            "SparkMD5": function () { return "https://cdn.jsdelivr.net/npm/spark-md5@3.0.0/spark-md5.min.js" },
            "sha1": function () { return "https://cdn.jsdelivr.net/npm/js-sha1@0.6.0/build/sha1.min.js" },
            "pako": function () { return "https://cdn.jsdelivr.net/npm/pako@1.0.6/dist/pako.min.js" },
        },
        loadUrl: function (url, onLoad) {
            var codeRequest = new XMLHttpRequest();
            codeRequest.open("GET", url, true);
            codeRequest.addEventListener("loadend", function () {
                if (codeRequest.readyState == 4 && codeRequest.status < 400) {
                    var code = codeRequest.responseText;
                    this.loadComponents(code, ["XT", "UI"], function () {
                        onLoad(URL.createObjectURL(new Blob([code], { type: "text/plain" })));
                    });
                }
            }.bind(this));
            codeRequest.send();
        },
        loadComponents: function (code, components, completion) {
            if (code.indexOf("NS.") >= 0) {
                components.push("NS");
            }
            if (code.indexOf(".md5()") >= 0) {
                components.push("SparkMD5")
            }
            if (code.indexOf(".sha1()") >= 0) {
                components.push("sha1")
            }
            if (code.indexOf("FileManager") >= 0) {
                components.push("pako")
            }
            var loadedCount = 0;
            var onLoad = function () {
                loadedCount++;
                if (loadedCount == components.length) {
                    completion();
                }
            }
            for (var index = 0; index < components.length; index++) {
                if (window[components[index]] === undefined) {
                    var element = document.createElement("script");
                    element.src = window.XTFrameworkLoader.componentsUrl[components[index]]();
                    element.onload = onLoad;
                    document.body.appendChild(element);
                }
                else {
                    onLoad()
                }
            }
        },
        autoload: function () {
            var elements = document.querySelectorAll('.UIContext')
            for (var index = 0; index < elements.length; index++) {
                (function (element) {
                    if (element.xtloaded === true) { return; }
                    element.xtloaded = true
                    XTFrameworkLoader.loadUrl(element.getAttribute('src'), function (sourceURL) {
                        var options = {}
                        try {
                            options = JSON.parse(element.getAttribute('options'))
                        } catch (error) { }
                        UI.Context.startWithURL(sourceURL, options, function (_, context) {
                            context.attachTo(element)
                        })
                    })
                })(elements[index])
            }
        }
    };
    setTimeout(window.XTFrameworkLoader.autoload, 100);
}
