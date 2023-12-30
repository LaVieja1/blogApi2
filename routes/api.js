const router = require('express').Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const verifyToken = require('../validation/verifyToken');

/* REGISTER PAGE */
router.post('/register', userController.register_post);

/* LOGIN PAGE */
router.post('/login', userController.login_post);

/* GET ALL POSTS */
router.get('/posts', verifyToken, postController.all_posts);

/*CREATE POST*/
router.post('/posts', verifyToken, postController.create_post);

module.exports = router;