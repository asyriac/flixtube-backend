const mongoose = require("mongoose");

// const PlaylistSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: "title cannot be empty",
//   },
//   videos: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Video",
//     },
//   ],
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
// });

const PlaylistSchema = new mongoose.Schema({
  liked: {
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  bookmarked: {
    videos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  customlists: [
    {
      title: {
        type: String,
        required: "title cannot be empty",
      },
      videos: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video",
        },
      ],
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = { Playlist };
