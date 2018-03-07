const fs = require('fs')
const version = JSON.parse(fs.readFileSync("package.json", { encoding: "utf-8" })).version
{
    const content = fs.readFileSync("src/Core/ios/main.ts", { encoding: "utf-8" })
    const newContent = content.replace(/currentSDK: ".*?",/, 'currentSDK: "' + version + '",')
    fs.writeFileSync("src/Core/ios/main.ts", newContent)
}
{
    const content = fs.readFileSync("src/Core/android/main.ts", { encoding: "utf-8" })
    const newContent = content.replace(/currentSDK: ".*?",/, 'currentSDK: "' + version + '",')
    fs.writeFileSync("src/Core/android/main.ts", newContent)
}
{
    const content = fs.readFileSync("src/Core/web/main.ts", { encoding: "utf-8" })
    const newContent = content.replace(/currentSDK: ".*?",/, 'currentSDK: "' + version + '",')
    fs.writeFileSync("src/Core/web/main.ts", newContent)
}
{
    const content = fs.readFileSync("src/Core/web/main.ts", { encoding: "utf-8" })
    const newContent = content.replace(/currentSDK: ".*?",/, 'currentSDK: "' + version + '",')
    fs.writeFileSync("src/Core/web/main.ts", newContent)
}
{
    const content = fs.readFileSync("index.js", { encoding: "utf-8" })
    const newContent = content.replace(/xt-studio@.*?\/dist/, 'xt-studio@' + version + '/dist')
    fs.writeFileSync("index.js", newContent)
}
{
    const content = fs.readFileSync("XT.podspec", { encoding: "utf-8" })
    const newContent = content.replace(/s.version      = ".*?"/, 's.version      = "' + version + '"')
    fs.writeFileSync("XT.podspec", newContent)
}