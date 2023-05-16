const {check, validationResult} = require('express-validator');

// todo: add validation for update job


/*
fields required:
    title (string, required),
    description (string, required),
    skills (array, required),
    type (string['full time', 'part time', 'service'], required),
    location (string, required),
    salary (integer, required),
    duration (integer, required),
 */

exports.validate_job_post_create = [
    check('title')
        .notEmpty().withMessage('job title required!')
        .isString().withMessage("Invalid job title")
        .trim().isLength({min: 3, max: 30}).withMessage('job title must be between 3 and 20 characters!'),
    check('description')
        .notEmpty()
        .isString().withMessage("Invalid job description")
        .isLength({min: 3, max: 200}).withMessage('Job description must be between 3 and 200 characters'),
    check('skills')
        .isArray().withMessage('Skills must be an array'),
    check('type')
        .notEmpty().withMessage('Job type required!')
        .isString().withMessage("Invalid job type")
        .trim()
        .isIn(['full-time', 'part-time', 'service']).withMessage('job type must be full-time, part-time or service'),
    check('location')
        .notEmpty()
        .isString().withMessage("Invalid location")
        .isLength({min: 3, max: 20}).withMessage('Salary must be between 3 and 20 characters'),

    check('salary')
        .notEmpty()
        .isInt().withMessage("Invalid salary")
        .isLength({min: 1, max: 6}).withMessage('Salary must be between 1 and 6 characters'),

    check('duration')
        .notEmpty()
        .isInt().withMessage("Invalid duration")
        .isLength({min: 1, max: 6}).withMessage('Job duration must be between 1 and 6 characters'),


]

exports.job_post_validation = (req, res, next) => {
    const result = validationResult(req).array();
    console.log(result)
    if (!result.length) return next();
    const error = result[0].msg;
    return res.status(401).json({message: error});
}


