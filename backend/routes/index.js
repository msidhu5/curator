var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Data = require('../schema/Data');
var cors = require('cors');
const dbRoute = '' //REMOVED


    mongoose.connect(dbRoute, { useUnifiedTopology: true });
let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.set('useFindAndModify', false);


let idAssign = 0;

// get entire database
router.get('/', function(req, res, next) {
  Data.find(function (err, data) {
      if (err) {
          return res.json({ success: false, error: err });
      } 
      return res.json({ success: true, info: data })
  });
});

// get specific entry
router.get('/id/', function(req, res, next) {
  console.log(req.query.id)
  console.log("ID: " + req.query.id);
  Data.findOne({"_id" : req.query.id},function (err, data) {
      if (err) {
          return res.json({ success: false, error: err });
      } 
      console.log(data);
      return res.json({ success: true, info: data })
  });
});


// post activity data to database
router.post('/', function (req, res, next) {
    let stuffToAdd = new Data();
    stuffToAdd.id = idAssign;
    stuffToAdd.name = req.body.name;
    stuffToAdd.user = req.body.user;
    stuffToAdd.desc = req.body.desc;
    stuffToAdd.duration = req.body.duration;
    stuffToAdd.notes = req.body.notes;
    stuffToAdd.danceability = req.body.danceability;
    stuffToAdd.acousticness = req.body.acousticness;
    stuffToAdd.energy = req.body.energy;
    stuffToAdd.instrumentalness = req.body.instrumentalness;
    stuffToAdd.speechiness = req.body.speechiness;
    stuffToAdd.valence = req.body.valence;
    stuffToAdd.playlistname = req.body.playlistname;
    stuffToAdd.library = req.body.library;
    stuffToAdd.savedalbums = req.body.savedalbums;
    stuffToAdd.public = req.body.public;

    stuffToAdd.save((err)=>{
        if(err){
            return res.json({success:false, error:err});
        }else{
            return res.json({success: true})
        }
    })


    idAssign++;
})

// delete an activity 
router.delete('/', function (req, res, next) {
  Data.findOneAndRemove({ "_id" : req.body.id }, (err) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
  });  
})

// update an activity
router.put('/', function (req, res, next) {
  Data.findOneAndUpdate({ _id: req.body.id }, { $set: { name: req.body.name, desc: req.body.desc, duration: req.body.duration,
  notes: req.body.notes, danceability: req.body.danceability, acousticness: req.body.acousticness,
  energy: req.body.energy, instrumentalness: req.body.instrumentalness, speechiness: req.body.speechiness,
  valence: req.body.valence, playlistname: req.body.playlistname, library: req.body.library,
  savedalbums: req.body.savedalbums, public: req.body.public } }, { new: true }, function(err, doc) {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
});
 
})
module.exports = router;


