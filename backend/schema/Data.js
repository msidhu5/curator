const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema(
  {
    id:Number,
    user:String,
    name:String,
    desc:String,
    notes:String,
    danceability:String,
    acousticness:String,
    energy:String,
    instrumentalness:String,
    speechiness:String,
    valence:String,
    playlistname:String,
    public:String
  }
)


module.exports = mongoose.model("Data", DataSchema);