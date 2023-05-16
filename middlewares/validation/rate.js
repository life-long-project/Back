const {check, validationResult} = require('express-validator');

// todo: add validation for creating rate

/*
fields required for rating a user
    rating [int, required]
    feedback [string, optional]

fields required for rating a job
    rating [int, required]
    feedback [string, optional]


 */

exports.validate_job_rate=[
    // check('rated_job_id')
    //     .notEmpty().withMessage('rated_job_id is required')
    //     .trim()
    //     .isMongoId().withMessage('Invalid job id'),
    check('rating')
        .notEmpty().withMessage('rating is required')
        .isInt({min: 1, max: 5}).withMessage('Rating must be between 1 and 5'),
    check('feedback')
        .optional()
        .trim()
        .isString().withMessage('Feedback must be a string'),
]


exports.validate_user_rate=[
    // check('rated_id')
    //     .notEmpty().withMessage('rated_id is required')
    //     .trim()
    //     .isMongoId().withMessage('Invalid user id'),
    check('rating')
        .notEmpty().withMessage('rating is required')
        .isInt({min: 1, max: 5}).withMessage('Rating must be between 1 and 5'),
    check('feedback')
        .optional()
        .trim()
        .isString().withMessage('Feedback must be a string'),
]


exports.user_validation = (req, res, next) => {
    const result = validationResult(req).array();
    console.log(result)
    if (!result.length) return next();
    const error = result[0].msg;
    return res.status(401).json({message: error});
}