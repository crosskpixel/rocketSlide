"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = (schema) => (req, res, next) => {
    req.check(schema);
    req.getValidationResult()
        .then(result => {
        if (result.isEmpty() !== true) {
            res.status(422).json(result.array());
            return;
        }
        next();
    })
        .catch(ex => {
        next(ex);
    });
};
