const mongoose = require("mongoose");

const RentSchema = new mongoose.Schema(
  {
    shipping: {
      type: Object,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: false }
);

const Rent = mongoose.model("Rent", RentSchema);

module.exports = Rent;
