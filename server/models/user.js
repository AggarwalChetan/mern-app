const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  firstName: String,
  lastName: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  
  movies: [
    {
      movieid: {
        type: String,
      },
      rate: {
        type: Number,
      },
      review: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);