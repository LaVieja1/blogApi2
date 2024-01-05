const router = require('express').Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const verifyToken = require('../validation/verifyToken');
const upload = require('../services/imageUploader');

const singleUpload = upload.single('image');

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
router.post('/posts', verifyToken, singleUpload, postController.create_post);

/* UPDATE POST */
router.put('/posts/:postid', verifyToken, singleUpload, postController.update_post);

/* DELETE POST */
router.delete('/posts/:postid', verifyToken, postController.delete_post);

//COMMENTS
/* GET ALL COMMENTS */
router.get('/comments', commentController.get_all_comments);

/* GET SINGLE COMMENT */
router.get('/comments/:commentid', commentController.get_single_comment);

/* GET ALL COMMENTS ON POST */
router.get('/posts/:postid/comments', commentController.get_comments_post);

/* CREATE COMMENT */
router.post('/posts/:postid/comments', verifyToken, commentController.create_comment);

/* DELETE COMMENT */
router.delete('/posts/:postid/comments/:commentid', verifyToken, commentController.delete_comment);

module.exports = router;