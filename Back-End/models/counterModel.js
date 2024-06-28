const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
  {
    happyClient: {
      type: String,
      required: true,
    },
    sellEquepment: {
      type: String,
      required: true,
    },
    teamMember: {
      type: String,
      required: true,
    },
    award: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const Counter = mongoose.model("Counter", counterSchema);

module.exports = Counter;
