const Counter = require("../models/counterModel");
const fs = require("fs");

exports.add = async (req, res) => {
  try {
    const image = req?.file?.filename;
    if (!image) {
      return res.status(400).json({
        success: false,
        error: "background image is required",
      });
    }

    const data = {
      ...req.body,
      bgImage: image,
    };

    const result = await Counter.create(data);

    res.status(201).json({
      success: true,
      message: "Counter created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });

    fs.unlink(`./uploads/counter/${contact?.bgImage}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await Counter.find({});

    res.status(200).json({
      success: true,
      message: "Counter found successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const image = req?.file?.filename;
  const data = req?.body;
  const id = req?.params?.id;

  try {
    const counter = await Counter.findById(id);

    let newData;

    if (image) {
      newData = {
        ...data,
        bgImage: image,
      };

      fs.unlink(`./uploads/counter/${counter?.bgImage}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } else {
      newData = {
        ...data,
        bgImage: counter?.bgImage,
      };
    }
    const result = await Counter.findByIdAndUpdate(id, newData, { new: true });

    res.status(200).json({
      success: true,
      message: "Counter updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });

    fs.unlink(`./uploads/counter/${image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};
