const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { commentValidation } = require('../validation/validationJoi');

exports.get_comments_post = async (req, res, next) => {
    try {
        let comments = await Comment.find({postId: req.params.postid},)
        .populate('user', {user: 1});

        return res.status(200).json(comments);
    } catch(err) {
        return res.status(400).json({message: 'No hay comentarios en este post'});
    }
}

exports.get_all_comments = async (req, res, next) => {
    try {
        let comments = await Comment.find({});
        if (!comments) {
            return res.status(400).json({message: 'No hay comentarios'});
        }

        return res.status(200).json(comments);
    } catch(err) {
        return next(err);
    }
}

exports.get_single_comment = async (req, res, next) => {
    try {
        let comment = await Comment.find({_id: req.params.commentid})
        if (!comment) {
            return res.status(404).json({message: `No existe comentario con id ${req.params.commentid}`});
        }
        return res.status(200).json(comment);
    } catch(err) {
        return next(err);
    }
}

exports.create_comment = async (req, res, next) => {

    const { error } = commentValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const comment = new Comment ({
        text: req.body.text,
        user: req.user._id,
        date: new Date(),
        postId: req.params.postid,
    });

    try {
        const savedComment = await comment.save();
        res.status(200).json({message: 'Comentario guardado', comment});
        //añadir comentario al post
        await Post.findOneAndUpdate(
            {_id: req.params.postid},
            {$push: {comments: comment}},
        );
    } catch(err) {
        res.status(400).json({err});
    }
}

exports.delete_comment = async (req, res, next) => {
    try {
        let comment = await Comment.findByIdAndDelete({_id: req.params.commentid});

        if (!comment) {
            return res.status(401).json({message: `No hay un comentario con id ${req.params.commentid}`});
        }

        let deletedComment = await Post.findByIdAndUpdate(
            {_id: req.params.postid},
            {$pull: {comments: req.params.commentid}},
        );

        return res.status(200).json({message: `Eliminado comentario con id ${req.params.commentid} y removido del post ${req.params.postid}`, comment: comment, deletedComment});
    } catch(err) {
        return next(err);
    }
}