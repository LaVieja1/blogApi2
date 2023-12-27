const router = require('express').Router();
const verify = require('../validation/verifyToken');

router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'my first post',
            description: 'random data'
        },
        user: req.user
    });
});

module.exports = router;