const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
  movieid: {
    type: String,
    required: true,
  },
  data: [
    {
      userid: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      rate: {
        type: Number,
        required: true,
      },
      review: {
        type: String,
        required: true,
      },
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Movie", movieSchema);