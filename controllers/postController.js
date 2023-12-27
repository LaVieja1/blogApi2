const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const {  } = require('../validation/validationJoi');

exports.all_posts = async(req, res) => {
    res.json({
        posts: {
            title: 'my first post',
            description: 'random data'
        },
        user: req.user
    });
}