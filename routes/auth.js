const router = require('express').Router();
const userController = require('../controllers/userController');

/* REGISTER PAGE */
router.post('/register', userController.register_post);

/* LOGIN PAGE */
router.post('/login', userController.login_post);

module.exports = router;