const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    short_description: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: false }
);

const Blogs = mongoose.model("Blogs", blogsSchema);

module.exports = Blogs;
