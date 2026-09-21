const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},
    name: {
      type: String,
      required: true,
      trim: true,
    },

    totalPages: {
      type: Number,
      required: true,
      min: 1,
    },

    currentPage: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);