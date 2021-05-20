const express = require('express');
const router = express.Router();

const videos = require('./videos.routes');
router.use('/videos',videos);

module.exports = router;