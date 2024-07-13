const mongoose = require("mongoose");

const homeServicesSchema = new mongoose.Schema(
  {
    services: {
      type: Array,
      required: true,
    },
  },
  { timestamps: false }
);

const HomeService = mongoose.model("HomeService", homeServicesSchema);

module.exports = HomeService;
