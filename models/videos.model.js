const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title : {
        type: String,
        required: "title cannot be empty"
    },
    url : {
        type: String,
        required: "url cannot be empty"
    },
    thumbnail : {
        type : String,
        requried: "thumbnail cannot be empty"
    },
    channelName : {
        type : String,
        required: "channel name cannot be empty"
    },
    channelImage: {
        type: String, 
        required: "channel image cannot be empty"
    }
})

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;