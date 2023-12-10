const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: [true, "title is required"],
    },
    author: {
      type: String,
      required: [true, "author is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booklist", bookSchema);
