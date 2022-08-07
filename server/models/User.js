const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [3, 'Your name is too short'],
    },
    lastName: {
      type: String,
      required: true,
      minLength: [3, 'Your name is too short'],
    },
    nickname: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [8, 'Try something stronger'],
    },
    profilePicture: {
      type: String,
      default: null,
    },
    biography: {
      type: String,
      default: null,
      maxLength: [250, 'Lets keep it short and to the point'],
    },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    pendingFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

exports.UserModel = UserModel;
