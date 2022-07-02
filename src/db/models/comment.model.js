const { Schema, model } = require('mongoose');

const CommentSchema = new Schema({
    user: {
       type: Schema.Types.ObjectId,
       ref: "User"
    },
    blog: {
       type: Schema.Types.ObjectId,
       ref: "Blog"
    },
    body: String
 })

 const Comment = model('Comment', CommentSchema);

module.exports = Comment;