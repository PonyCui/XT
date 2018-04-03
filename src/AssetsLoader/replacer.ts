declare var require: any
var ts = require('typescript');

export default function (source: string) {
    return source.replace(/UI\.Image\.fromSource\((.*?)\)/g, 'require($1)')
}