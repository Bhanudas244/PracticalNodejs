const Reel = require("../model/reel.model");
const fs = require('fs');

//get all video
exports.index = async (req, res) => {
  try {
    const reel = await Reel.find().sort({ createdAt: -1 });

    return res.status(200).json({ status: true, message: "Reels Found" ,reel});
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        status: false,
        message: error.message || "Internal Server Error!!",
      });
  }
};

//create  video
exports.store = async (req, res) => {
  try {
    if (!req.files.video || !req.body.description) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Details!" });
    }
    const reel = await Reel();
    reel.video = req.files.video[0].path;
    reel.description = req.body.description;

    await reel.save();
    return res.status(200).json({ status: true, message: "Reel created!!",reel });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        status: false,
        message: error.message || "Internal Server Error!!",
      });
  }
};

//to get particular video
exports.edit = async (req, res) => {
  try {
    if (!req.params.reelId) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Details!" });
    }
    const reel = await Reel.findById(req.params.reelId);
    if (!reel) {
      return res
        .status(403)
        .json({ status: false, message: "Reel not Found!" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Reel Found!!", reel });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        status: false,
        message: error.message || "Internal Server Error!!",
      });
  }
};

//to update particular video 
exports.update = async (req, res) => {
  try {
    console.log("update");
    if (!req.params.reelId) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid Details!" });
    }
    const reel = await Reel.findById(req.params.reelId);
    if (!reel) {
      if (req.files.video) deleteFile(req.files.video[0]);
      return res
        .status(403)
        .json({ status: false, message: "Reel not Found!" });
    }
    if (req.files.video) {
      if (fs.existsSync(reel.video)) {
        fs.unlinkSync(reel.video);  
      }
      reel.video = req.files.video
        ?  req.files.video[0].path
        : reel.video;
    }
    reel.description = req.body.description
      ? req.body.description
      : reel.description;
    await reel.save();
    return res
      .status(200)
      .json({ status: true, message: "Reel Updated!!", reel });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        status: false,
        message: error.message || "Internal Server Error!!",
      });
  }
};
//to delete particular video
exports.delete = async (req, res) => {
    try {
      if (!req.params.reelId) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid Details!" });
      }
      const reel = await Reel.findByIdAndDelete(req.params.reelId);
      if (!reel) {
        return res
          .status(403)
          .json({ status: false, message: "Reel not Found!" });
      }
      if (reel.video) {
        if (fs.existsSync(reel.video)) {
          fs.unlinkSync(reel.video);  
        }
      }
    
      return res
        .status(200)
        .json({ status: true, message: "Reel Deleted!!" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          status: false,
          message: error.message || "Internal Server Error!!",
        });
    }
  };
