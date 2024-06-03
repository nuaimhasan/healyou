const fs = require("fs");
const Favicon = require("../models/faviconModel");

exports.addFavicon = async (req, res) => {
  const icon = req?.file?.filename;
  try {
    const result = await Favicon.create({ icon });

    res.status(200).json({
      success: true,
      message: "Favicon added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message,
    });

    fs.unlink(`./uploads/favicon/${icon}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

exports.getFavicons = async (req, res) => {
  try {
    const favicons = await Favicon.find({});

    if (!favicons) {
      return res.status(404).json({
        success: false,
        error: "Favicon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Favicon found successfully",
      data: favicons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateFavicon = async (req, res) => {
  const icon = req?.file?.filename;
  try {
    if (!icon) {
      return res.status(400).json({
        success: false,
        error: "Favicon is required",
      });
    }

    const id = req?.params?.id;
    const isFavicon = await Favicon.findOne({ _id: id });

    if (isFavicon) {
      await Favicon.findByIdAndUpdate(id, { icon: icon }, { new: true });

      fs.unlink(`./uploads/favicon/${isFavicon?.icon}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      res.status(200).json({
        success: true,
        message: "Favicon updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });

    fs.unlink(`./uploads/favicon/${icon}`, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};
