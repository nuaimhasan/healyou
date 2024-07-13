const ServiceCategory = require("../../models/serviceCategoryModel");

exports.addCategory = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const result = await ServiceCategory.create(data);

    res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    let categories = await ServiceCategory.find({}).sort({ order: 1 });

    res.status(200).json({
      success: true,
      message: "All service categories get success",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await ServiceCategory.findOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Category found successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req?.params;
    const data = req?.body;

    const category = await ServiceCategory.findById(id);

    if (!category) {
      res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    const result = await ServiceCategory.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req?.params;

    const category = await ServiceCategory.findById(id);
    if (!category) {
      res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    await ServiceCategory.deleteOne({ _id: id });

    res.status(200).json({
      success: true,
      message: "Category delete success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
