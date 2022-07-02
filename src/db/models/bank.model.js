const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  name: String,
  email: String,
  blogs: [{ 
     type: Schema.Types.ObjectId,
     ref: "Blog"
  }]
});

const User = model('User', UserSchema);

module.exports = User;