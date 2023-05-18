const {check, validationResult} = require('express-validator');
/*
fields required for creating:
    title (string, required),
    description (string, required),
    skills (array, required),
    type (string['full-time', 'part-time', 'service'], required),
    location (string, required),
    salary (integer, required),
    duration (integer, required),
 */
/*
fields required for updating:
    title (string, optional),
    description (string, optional),
    skills (array, optional),
    type (string['full-time', 'part-time', 'service'], optional),
    location (string, optional),
    salary (integer, optional),
    duration (integer, optional),
 */
exports.validate_job_post_create = [
    check('title')
        .notEmpty().withMessage('job title required!')
        .isString().withMessage("Invalid job title")
        .trim().isLength({min: 3, max: 30}).withMessage('job title must be between 3 and 20 characters!'),
    check('description')
        .notEmpty().withMessage('job description required!')
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
        .notEmpty().withMessage('job location required!')
        .isString().withMessage("Invalid location")
        .isLength({min: 3, max: 20}).withMessage('Salary must be between 3 and 20 characters'),

    check('salary')
        .notEmpty().withMessage('job salary required!')
        .isString().withMessage("Invalid salary, it should sent in string")
        .isLength({min: 1, max: 6}).withMessage('Salary must be between 1 and 6 characters'),

    check('duration')
        .optional()
        .isString().withMessage("Invalid duration, it should sent in string")
        .isLength({min: 1, max: 6}).withMessage('Job duration must be between 1 and 6 characters'),


]


exports.validate_job_post_update = [
    check('title')
        .optional()
        .isString().withMessage("Invalid job title")
        .trim().isLength({min: 3, max: 30}).withMessage('job title must be between 3 and 20 characters!'),
    check('description')
        .optional()
        .isString().withMessage("Invalid job description")
        .isLength({min: 3, max: 200}).withMessage('Job description must be between 3 and 200 characters'),
    check('skills')
        .optional()
        .isArray().withMessage('Skills must be an array'),
    check('type')
        .optional()
        .isString().withMessage("Invalid job type")
        .trim()
        .isIn(['full-time', 'part-time', 'service']).withMessage('job type must be full-time, part-time or service'),
    check('location')
        .optional()
        .isString().withMessage("Invalid location")
        .isLength({min: 3, max: 20}).withMessage('Salary must be between 3 and 20 characters'),

    check('salary')
        .optional()
        .isString().withMessage("Invalid salary, it should sent in string")
        .isLength({min: 1, max: 6}).withMessage('Salary must be between 1 and 6 characters'),

    check('duration')
        .optional()
        .isString().withMessage("Invalid duration, it should sent in string")
        .isLength({min: 1, max: 6}).withMessage('Job duration must be between 1 and 6 characters'),

]

exports.job_post_validation = (req, res, next) => {
    const result = validationResult(req).array();
    console.log(result)
    if (!result.length) return next();
    const error = result[0].msg;
    return res.status(401).json({message: error});
}
