const mongoose = require("mongoose");

const reelSchema = new mongoose.Schema(
  {
    video: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('reel',reelSchema)
