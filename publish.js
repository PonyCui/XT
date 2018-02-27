const fs = require('fs')
const version = JSON.parse(fs.readFileSync("package.json", { encoding: "utf-8" })).version
{
    const content = fs.readFileSync("android/core/src/main/java/com/opensource/xt/core/XTCore.kt", { encoding: "utf-8" })
    const newContent = content.replace(/val version = ".*?"/, 'val version = "' + version + '"')
    fs.writeFileSync("android/core/src/main/java/com/opensource/xt/core/XTCore.kt", newContent)
}
{
    const content = fs.readFileSync("ios/Sources/Core/XTCore.m", { encoding: "utf-8" })
    const newContent = content.replace(/return @".*?"; \/\/version/, 'return @"' + version + '"; //version')
    fs.writeFileSync("ios/Sources/Core/XTCore.m", newContent)
}
{
    const content = fs.readFileSync("src/UIKit/web/Device.ts", { encoding: "utf-8" })
    const newContent = content.replace(/xtRuntimeVersion: string = ".*?"/, 'xtRuntimeVersion: string = "' + version + '"')
    fs.writeFileSync("src/UIKit/web/Device.ts", newContent)
}