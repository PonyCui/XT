declare var require: any
var { JSDOM } = require('jsdom')
import { Body } from './body';

export default function (source: string) {
    try {
        const dom = new JSDOM(source)
        const body = new Body(dom.window.document.querySelector('body'));
        // console.log(body.toCode());
        return body.toCode();
    } catch (error) {
        console.error(error);
    }
    return "";
}