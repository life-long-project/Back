const express = require('express');
const router = express.Router();


router.get(
    '/test-secure-data',
    (req, res, next) => {
        res.json({
            message: 'You made it to the secure route',
            user: req.user,
            auth_token: req.query.auth_token
        })
        // to print the user token extraction
        console.log(req.user);
    }
);

module.exports = router;