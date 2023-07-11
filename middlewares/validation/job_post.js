const {check, validationResult} = require('express-validator');
/*
fields required for creating:
    title (string => "test name", required),
    description (string => "test description", required),
    skills (array => ["test skill 1","test skill 2"], required),
    type (string => "full-time", required),
    location (string => "cairo", optional),
    required_experience (string => "beginner", optional)
    salary (string => "100", required),
    duration (string => "20", optional),
    images (images => one or multiple images,optional)
 */
/*
fields required for updating:
    title (string => "test name", optional),
    description (string => "test description", optional),
    skills (array => ["test skill 1","test skill 2"], optional),
    type (string => "full-time", optional),
    location (string => "cairo", optional),
    required_experience (string => "beginner", optional)
    salary (string => "100", optional),
    duration (string => "20", optional),
    images (images => one or multiple images,optional),
    is_active (boolean => true, optional)
    is_hidden (boolean => true, optional)
 */
exports.validate_job_post_create = [
    check('title')
        .notEmpty().withMessage('job title required!')
        .isString().withMessage("Invalid job title, must be string")
        .trim()
        .isLength({min: 3, max: 50}).withMessage('job title must be between 3 and 50 characters!'),

    check('description')
        .notEmpty().withMessage('job description required!')
        .isString().withMessage("Invalid job description, must be string")
        .trim()
        .isLength({min: 3, max: 400}).withMessage('Job description must be between 3 and 400 characters'),

    check('skills')
        .notEmpty().withMessage('skills required!')

    // .isArray().withMessage('Skills must be an array of strings')
    ,

    check('type')
        .notEmpty().withMessage('Job type required! as "full-time" , "part-time", "service".')
        .isString().withMessage("Invalid job type, must be string")
        .trim()
        .isIn(['full-time', 'part-time', 'service']).withMessage('job type must be full-time, part-time or service'),

    check('location')
        .optional()
        .trim()
        .isString().withMessage("Invalid location, must be string"),

    check("required_experience")
        .optional()
        .trim()
        .isString().withMessage("Invalid required experience, must be string")
        .isIn(['ALL', 'beginner', 'intermediate', 'expert']).withMessage('required experience should be on of [\'ALL\', \'beginner\', \'intermediate\', \'expert\']'),

    check('salary')
        .notEmpty().withMessage('job salary required!')
        .isString().withMessage("Invalid salary, must be string as '100'")
        .trim()
        .isLength({min: 1, max: 6}).withMessage('Salary must be between 1 and 6 characters'),


    check('duration')
        .optional({nullable: true})
        .isString().withMessage("Invalid duration, must be string as '100'")
        .isLength({min: 1, max: 6}).withMessage('Job duration must be between 1 and 6 characters'),


]


exports.validate_job_post_update = [
    check('title')
        .optional()
        .isString().withMessage("Invalid job title, must be string")
        .trim()
        .isLength({min: 3, max: 50}).withMessage('job title must be between 3 and 50 characters!'),

    check('description')
        .optional()
        .isString().withMessage("Invalid job description, must be string")
        .trim()
        .isLength({min: 3, max: 400}).withMessage('Job description must be between 3 and 400 characters'),

    check('skills')
        .optional()
        .isArray().withMessage('Skills must be an array of strings'),

    check('type')
        .optional()
        .isString().withMessage("Invalid job type, must be string")
        .trim()
        .isIn(['full-time', 'part-time', 'service']).withMessage('job type must be full-time, part-time or service'),

    check('location')
        .optional()
        .trim()
        .isString().withMessage("Invalid location, must be string"),

    check("required_experience")
        .optional()
        .trim()
        .isString().withMessage("Invalid required experience, must be string"),

    check('salary')
        .optional()
        .isString().withMessage("Invalid salary, must be string as '100'")
        .trim()
        .isLength({min: 1, max: 6}).withMessage('Salary must be between 1 and 6 characters'),

    check('duration')
        .optional()
        .isString().withMessage("Invalid duration, must be string as '100'")
        .isLength({min: 1, max: 6}).withMessage('Job duration must be between 1 and 6 characters'),

]

exports.job_post_validation = (req, res, next) => {
    const result = validationResult(req).array();
    console.log(result)
    if (!result.length) return next();
    const error = result[0].msg;
    return res.status(401).json({message: error});
}
