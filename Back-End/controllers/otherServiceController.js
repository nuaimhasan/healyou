const OtherService = require("../models/otherServiceModel");

exports.add = async (req, res) => {
  try {
    const data = req?.body;

    const result = await OtherService.create(data);

    res.status(201).json({
      success: true,
      message: "OtherService created successfully",
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
    const result = await OtherService.find({});

    res.status(200).json({
      success: true,
      message: "OtherService found successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.destoy = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await OtherService.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "OtherService delete successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
