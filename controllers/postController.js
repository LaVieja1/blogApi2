const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { postValidation } = require('../validation/validationJoi');

exports.all_posts = async(req, res) => {
    try {
        let posts = await Post.find({}, {title: 1, text: 1, date: 1, comments: 1, author: 1})
        //.populate('author', {user: 1,});

        return res.status(200).json({posts});
    } catch(err) {
        return res.status(400).json({message: 'No hay posts'});
    }
}

exports.single_post = async(req, res) => {
    try {
        let post = await Post.find({_id: req.params.postid})
        //.populate('author', {user: 1, });

        if (!post || post.length == 0) {
            return res.status(404).json({message: 'No hay post con ese id'})
        };
        return res.status(200).json({post});
    } catch(err) {
        res.json({message: 'Post no existe'});
    }
}

exports.create_post = async(req, res) => {
    const { error } = postValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if post is already in the database
    const postExist = await Post.findOne({ title: req.body.title });
    if(postExist) return res.status(400).send('Post ya existe');

    //Create new user
    const post = new Post({
        title: req.body.title,
        author: req.user._id,
        date_formatted: new Date(),
        text: req.body.text,
    });
    try {
        const savedPost = await post.save();
        res.status(200).json({post, token: req.user})
    } catch(err) {
        res.status(400).json({err});
    }
}

exports.update_post = async(req, res, next) => {
    try {
        let post = await Post.findByIdAndUpdate(req.params.postid, {
            title: req.body.title,
            text: req.body.text,
        });

        if (!post) {
            return res.status(404).json({err: `No hay posts con el id ${req.params.postid}`});
        }

        return res.status(200).json({message: `Post con el id ${req.params.postid} actualizado`, post: post });
    } catch(err) {
        return next(err);
    }
};

exports.delete_post = async (req, res, next) => {
    try {
        let post = await Post.findByIdAndDelete(req.params.postid);

        if (!post) {
            return res.status(404).json({err: `No hay posts con el id ${req.params.postid}`});
        }

        //Borrar comentarios
        let deletedComments = await Comment.deleteMany({postId: req.params.postid});
        res.status(200).json({message: `Post con el id ${req.params.postid} eliminado`, comments: deletedComments});

    } catch(err) {
        return next(err);
    }
}