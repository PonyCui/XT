#!/usr/bin/env node
declare var require: any
declare var process: any
declare var global: any
var fs = require('fs')
var { JSDOM } = require('jsdom')
import { Body } from './body';

function parse(source: string) {
    try {
        const dom = new JSDOM(source)
        const body = new Body(dom.window.document.querySelector('body'));
    } catch (error) {
        console.error(error);
    }
}

function exec(file: string) {
    (global as any).viewOutlets = {};
    parse(fs.readFileSync(file));
    const propTypes = Object.keys((global as any).viewOutlets).map(it => {
        return it + ": " + (global as any).viewOutlets[it]
    }).join("\n        ")
    const codeTypes = `/**
 * Generate By create-xtml-types Command line tool
 */
declare module "*/`+ file + `" {

    export default class Body extends XT.View {
        
        `+ propTypes + `

    }

}
    `
    fs.writeFileSync('./' + file.replace(".xtml", ".d.ts"), codeTypes);
}

fs.readdirSync("./").filter((file: any) => file.endsWith(".xtml")).forEach((file: any) => {
    exec(file)
})

if (process.argv.indexOf("-w") > 0) {
    fs.watch("./", (err: Error, file: string) => {
        if ((file as any).endsWith(".xtml")) {
            exec(file)
        }
    })
}