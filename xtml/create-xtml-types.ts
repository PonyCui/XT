#!/usr/bin/env node
import * as fs from 'fs';
import { JSDOM } from 'jsdom';
import { Body } from './body';

function parse(source) {
    try {
        const dom = new JSDOM(source)
        const body = new Body(dom.window.document.querySelector('body'));
    } catch (error) {
        console.error(error);
    }
}

function exec(file) {
    (global as any).viewOutlets = {};
    parse(fs.readFileSync(file));
    const propTypes = Object.keys((global as any).viewOutlets).map(it => {
        return it + ":" + (global as any).viewOutlets[it]
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

fs.readdirSync("./").filter(file => file.endsWith(".xtml")).forEach(file => {
    exec(file)
})

if (process.argv.indexOf("-w") > 0) {
    fs.watch("./", (err, file) => {
        if (file.endsWith(".xtml")) {
            exec(file)
        }
    })
}