const Counter = require("../models/counterModel");

exports.add = async (req, res) => {
  try {
    const data = req?.body;

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
  const data = req?.body;
  const id = req?.params?.id;

  try {
    const result = await Counter.findByIdAndUpdate(id, data, { new: true });

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
  }
};
