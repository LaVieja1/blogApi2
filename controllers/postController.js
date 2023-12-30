const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { postValidation } = require('../validation/validationJoi');

exports.all_posts = async(req, res) => {
    try {
        let posts = await Post.find({}, {title: 1, text: 1, date: 1, comments: 1})
        .populate('author', {user: 1, _id: 0});

        return res.status(200).json(posts);
    } catch(err) {
        return res.status(400).json({message: 'No hay posts'});
    }
}

exports.create_post = async(req, res) => {
    const { error } = postValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if post is already in the database
    const postExist = await Post.findOne({ name: req.body.title });
    if(postExist) return res.status(400).send('Post ya existe');

    //Create new user
    const post = new Post({
        title: req.body.title,
        author: req.user._id,
        date: new Date(),
        text: req.body.text,
    });
    try {
        const savedPost = await post.save();
        res.status(200).json({post, token: req.user})
    } catch(err) {
        res.status(400).send(err);
    }
}