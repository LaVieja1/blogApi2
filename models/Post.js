const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true, min: 1 },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image: {data: Buffer, contentType: String},
    date: { type: Date, default: Date.now, required: true },
    text: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
},
    { toJSON: { virtuals: true }, timestamps: false }
);

postSchema.virtual('date_formatted').get(function () {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Post', postSchema);