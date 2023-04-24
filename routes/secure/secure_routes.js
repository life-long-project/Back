const express = require('express');
const router = express.Router();


router.get(
    '/profile',
    (req, res, next) => {
        res.json({
            message: 'You made it to the secure route',
            user: req.user,
            token: req.query.secret_token
        })
        // to print the user token extraction
        console.log(req.user);
    }
);

module.exports = router;