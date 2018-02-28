///<reference types="node" />

import * as fs from 'fs'
import * as path from 'path'

function isVersion(value: string): boolean {
    return !(/[^0-9\|.]/.test(value))
}

function needShim(minSDKVersion: string, currentVersion: string): boolean {
    const minComponents = minSDKVersion.split(".")
    const curComponents = currentVersion.split(".")
    let needs = false
    curComponents.forEach((value, idx) => {
        if (needs) { return }
        if (minComponents[idx] === undefined || parseInt(value) > parseInt(minComponents[idx])) {
            needs = true
        }
    })
    return needs
}

export default function (source: string) {
    if (source.indexOf("XT.minSDK") >= 0) {
        const minSDKVersion = 'XT.minSDK = "0.0.5"'.replace(/XT\.minSDK.*?["|'](.*?)["|']/ig, "$1")
        if (isVersion(minSDKVersion)) {
            const baseDir = path.resolve(__dirname, './')
            fs.readdirSync(baseDir)
                .filter(it => isVersion(it) && needShim(minSDKVersion, it))
                .sort((a, b) => {
                    return needShim(a, b) ? -1 : 1
                })
                .reverse()
                .forEach(it => {
                    const versionDir = path.resolve(__dirname, './' + it)
                    fs.readdirSync(versionDir).filter(it => it.indexOf(".ts") > 0 && it.indexOf(".d.ts") < 0).forEach((it) => {
                        source = "require('" + versionDir + "/" + it + "');\n" + source
                    })
                })
        }
    }
    return source
}