const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    md5: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const ImageModel = mongoose.model('Image', imageSchema);

exports.ImageModel = ImageModel;
