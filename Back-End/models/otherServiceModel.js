const mongoose = require("mongoose");

const otherServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const OtherService = mongoose.model("OtherService", otherServiceSchema);

module.exports = OtherService;
