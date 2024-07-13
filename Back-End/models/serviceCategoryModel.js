const mongoose = require("mongoose");

const serviceCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: false }
);

const ServiceCategory = mongoose.model(
  "ServiceCategory",
  serviceCategorySchema
);

module.exports = ServiceCategory;
