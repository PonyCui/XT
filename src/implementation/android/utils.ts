export function asArray(obj: any): any[] {
    let values: any[] = [];
    for (let index = 0; index < obj.length; index++) {
        values.push(obj[index]);
    }
    return values;
}