const HomeService = require("../../models/HomeServiceModel");

exports.add = async (req, res) => {
  try {
    const data = req.body;
    const result = await HomeService.create(data);

    res.status(200).json({
      success: true,
      message: "Home service created successfully",
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
    let result = await HomeService.find({});

    res.status(200).json({
      success: true,
      message: "All home service get success",
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
  try {
    const { id } = req?.params;
    const data = req?.body;

    const service = await HomeService.findById(id);
    if (!service) {
      res.status(404).json({
        success: false,
        error: "Home service not found",
      });
    }

    const result = await HomeService.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Home service updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
