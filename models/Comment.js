const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    date: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
},
    { toJSON: { virtuals: true }, timestamps: false }
);

commentSchema.virtual('date_formatted').get(function () {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Comment', commentSchema);