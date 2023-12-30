const router = require('express').Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const verifyToken = require('../validation/verifyToken');

//USER
/* REGISTER PAGE */
router.post('/register', userController.register_post);

/* LOGIN PAGE */
router.post('/login', userController.login_post);

// POSTS
/* GET ALL POSTS */
router.get('/posts', postController.all_posts);

/* GET SINGLE POST */
router.get('/posts/:postid', postController.single_post);

/* CREATE POST */
router.post('/posts', verifyToken, postController.create_post);

/* UPDATE POST */
router.put('/posts/:postid', verifyToken, postController.update_post);

/* DELETE POST */
router.delete('/posts/:postid', verifyToken, postController.delete_post);

module.exports = router;