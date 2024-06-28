const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    banner: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    wpLink: {
      type: String,
      required: true,
    },
    messangerLink: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    facebookLink: {
      type: String,
    },
    twitterLink: {
      type: String,
    },
    linkedinLink: {
      type: String,
    },
  },
  { timestamps: false }
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
