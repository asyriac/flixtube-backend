const express = require("express");
const router = express.Router();

const { registerUser, loginUser, logoutUser, protectedRoute, currentUser } = require("../controllers/user.controller");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/current-user", protectedRoute, currentUser);

const videos = require("./videos.routes");
router.use("/videos", videos);

const playlists = require("./playlist.routes");
router.use("/playlists", protectedRoute, playlists);

module.exports = router;
