const { likeMode } = require('../enums/likeMode.enum');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: null,
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    emote: {
      type: String,
      default: '👍',
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likeMode: {
      type: String,
      enum: Object.values(likeMode),
      default: likeMode.Regular,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model('Post', postSchema);

exports.PostModel = PostModel;
