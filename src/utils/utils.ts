import * as express from 'express';
import * as express_validator from 'express-validator';
export const validateSchema = (schema) => (req: express_validator.RequestValidation, res: express.Response, next: express.NextFunction) => {
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
}