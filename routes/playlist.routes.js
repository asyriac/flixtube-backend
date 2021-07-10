const express = require("express");
const {
  createPlaylist,
  viewUserPlaylists,
  addVideoToCustomPlaylist,
  addToLikedVideos,
  addToBookmarkedVideos,
} = require("../controllers/playlist.controller");
const router = express.Router();

router.route("/").get(viewUserPlaylists).post(createPlaylist);

router.route("/liked").post(addToLikedVideos);

router.route("/bookmarked").post(addToBookmarkedVideos);

router.route("/:playlistID").post(addVideoToCustomPlaylist);

module.exports = router;
