import * as fs from 'fs';
export const LOAD_MIDDLEWARES = () => {
    const VALIDATORS = {};
    //customValidators
    fs.readdirSync("dist/middlewares").filter((file, key) => {
        if (file == "index.js") {
            return false;
        }
        return true;
    }).forEach((file, key) => {
        let { customValidators } = require(__dirname + "/" + file);
        Object.assign(VALIDATORS, customValidators || {});
    });
    return VALIDATORS;
}