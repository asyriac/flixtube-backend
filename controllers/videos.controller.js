const Video = require("../models/videos.model");

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.status(200).json({
      success: true,
      videos    
    });
  } catch (error) {
    return res.status(503).json({
        success: false,
        message: error.message
    });
  }
};


module.exports = {getAllVideos}