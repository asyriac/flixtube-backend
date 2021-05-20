const express = require('express');
const { getAllVideos } = require('../controllers/videos.controller');
const router = express.Router();

router.
    route('/')
    .get(getAllVideos);

module.exports = router;