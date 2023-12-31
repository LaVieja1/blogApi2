const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const { commentValidation } = require('../validation/validationJoi');

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