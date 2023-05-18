const {check, validationResult} = require('express-validator');

exports.validate_message = [
    check('message')
        .notEmpty().withMessage('Message required!')
        .isString().withMessage("Invalid message")
        .trim()
]


exports.message_validation = (req, res, next) => {
    const result = validationResult(req).array();
    console.log(result)
    if (!result.length) return next();
    const error = result[0].msg;
    return res.status(401).json({message: error});
}