const router = require('express').Router();

router.post('/register', (req, res) => {
    res.json({ message: 'Register' });
});

module.exports = router;