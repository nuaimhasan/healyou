const Service = require("../models/serviceModel");
const fs = require("fs");

exports.addService = async (req, res) => {
  const image = req?.file?.filename;

  try {
    const data = req?.body;
    const result = await Service.create({ ...data, image });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Something went wrong",
      });
    }

    res.status(201).json({
      success: true,
      message: "Service add success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message,
    });

    fs.unlink(`./uploads/services/${image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find({});

    res.status(200).json({
      success: true,
      message: "Service get success",
      data: services,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getServicebyId = async (req, res) => {
  try {
    const id = req?.params?.id;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        error: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service get success",
      data: service,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.editService = async (req, res) => {
  const image = req?.file?.filename;

  try {
    const id = req?.params?.id;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        error: "Service not found",
      });
    }

    const data = req.body;

    if (image) {
      fs.unlink(`./uploads/services/${service?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      await Service.findByIdAndUpdate(
        id,
        { ...data, image },
        {
          new: true,
        }
      );
    } else {
      await Service.findByIdAndUpdate(
        id,
        { ...data, image: service?.image },
        {
          new: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Service updated success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message,
    });

    fs.unlink(`./uploads/services/${image}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const id = req?.params?.id;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        error: "Service not found",
      });
    }

    if (service) {
      const result = await Service.findByIdAndDelete(id);

      if (result) {
        fs.unlink(`./uploads/services/${service?.image}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }

      res.status(200).json({
        success: true,
        message: "Delete success",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message,
    });
  }
};
