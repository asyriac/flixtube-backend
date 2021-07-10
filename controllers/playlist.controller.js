const { Playlist } = require("../models/playlist.model");
const { User } = require("../models/user.model");

const createPlaylist = async (req, res) => {
  try {
    const userID = req.decodedToken.id;
    const { title } = req.body;
    const playlist = await Playlist.findOneAndUpdate(
      { user: userID },
      {
        $set: {
          user: userID,
        },
        $push: {
          customlists: { title },
        },
      },
      { upsert: true, new: true }
    );
    return res.status(201).json({
      success: true,
      playlist: playlist.customlists[playlist.customlists.length - 1],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addVideoToCustomPlaylist = async (req, res) => {
  try {
    const userID = req.decodedToken.id;
    const { videoID } = req.body;
    const { playlistID } = req.params;

    console.log(playlistID);

    const video = await Playlist.findOne({ user: userID });
    const myPlaylist = video.customlists.find((item) => String(item._id) === playlistID);
    const isAddedToPlaylist = myPlaylist.videos.includes(videoID);
    const option = isAddedToPlaylist ? "$pull" : "$addToSet";

    await Playlist.updateOne({ user: userID, "customlists._id": playlistID }, { [option]: { "customlists.$.videos": videoID } });
    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addToLikedVideos = async (req, res) => {
  try {
    const userID = req.decodedToken.id;
    const { videoID } = req.body;

    const video = await Playlist.findOne({ user: userID });
    const isLiked = video.liked.videos.includes(videoID);
    const option = isLiked ? "$pull" : "$addToSet";

    await Playlist.updateOne({ user: userID }, { [option]: { "liked.videos": videoID } });
    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addToBookmarkedVideos = async (req, res) => {
  try {
    const userID = req.decodedToken.id;
    const { videoID } = req.body;

    const video = await Playlist.findOne({ user: userID });
    const isBookmarked = video.bookmarked.videos.includes(videoID);
    const option = isBookmarked ? "$pull" : "$addToSet";

    await Playlist.updateOne({ user: userID }, { [option]: { "bookmarked.videos": videoID } });
    return res.status(201).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const viewUserPlaylists = async (req, res) => {
  const userID = req.decodedToken.id;
  const userplaylist = await Playlist.findOne({ user: userID }).populate("customlists.videos").populate("liked.videos").populate("bookmarked.videos");
  return res.status(200).json({
    success: true,
    data: userplaylist,
  });
};

module.exports = {
  createPlaylist,
  viewUserPlaylists,
  addVideoToCustomPlaylist,
  addToLikedVideos,
  addToBookmarkedVideos,
};
