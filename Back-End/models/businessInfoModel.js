const mongoose = require("mongoose");

const businessInfoSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
    },
    businessStartYear: {
      type: Number,
      required: true,
    },
    businessType: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const BusinessInfo = mongoose.model("BusinessInfo", businessInfoSchema);

module.exports = BusinessInfo;
