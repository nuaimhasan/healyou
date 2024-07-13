const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    charge: {
      type: Number,
      required: true,
    },
    short_description: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "ServiceCategory",
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
