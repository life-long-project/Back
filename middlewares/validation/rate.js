const {check, validationResult} = require('express-validator');

// todo: add validation for creating rate

/*
fields required for rating from worker
    rating [int, required]
    feedback [string, optional]

fields required for rating from owner
    rating [int, required]
    feedback [string, optional]
 */

exports.validate_rate=[
    check('rating')
        .notEmpty().withMessage('rating is required')
        .isFloat({min: 1, max: 5}).withMessage('Rating must be between 1 and 5'),
    check('feedback')
        .optional()
        .trim()
        .isString().withMessage('Feedback must be a string'),
]


exports.rate_validation = (req, res, next) => {
    const result = validationResult(req).array();
    console.log(result)
    if (!result.length) return next();
    const error = result[0].msg;
    return res.status(401).json({message: error});
}