const { Schema, model } = require('mongoose');

const BlogSchema = new Schema({
    title: String,
    user: {
       type: Schema.Types.ObjectId,
       ref: "User"
    },
    body: String,
    comments: [{
       type: Schema.Types.ObjectId,
       ref: "Comment"
    }]
 })

const Blog = model('Blog', BlogSchema);

module.exports = Blog;