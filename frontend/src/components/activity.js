import React, {Component, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
var SpotifyWebApi = require('spotify-web-api-node');

var trackIds = [];

class Activity extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      desc:"",
      notes:"",
      danceability:"50",
      acousticness:"50",
      energy:"50",
      instrumentalness:"50",
      speechiness:"50",
      valence:"50",
      playlistname:"",
      public:"off",
      track_ids : [],
      playlist_id : ""
    }
    this.returnToDashboard = this.returnToDashboard.bind(this);
    this.deleteActivity = this.deleteActivity.bind(this);
    this.recommendTracks = this.recommendTracks.bind(this);
    this.addPlaylist = this.addPlaylist.bind(this);

  }
  
  componentDidMount() { 
    var activity_data = this.getData(this.props.location.state.id);
    this.recommendTracks()
  }
  
  getData(id) { 
    fetch('https://msidhu5finalbackend.herokuapp.com/id/?id=' + id)
      .then(res => res.json())
      .then(data => {
        this.setState(
          (prevState) => { return { 
            name:data.info.name,
            desc:data.info.desc,
            notes:data.info.notes,
            danceability:data.info.danceability,
            acousticness:data.info.acousticness,
            energy:data.info.energy,
            instrumentalness:data.info.instrumentalness,
            speechiness:data.info.speechiness,
            valence:data.info.valence,
            playlistname:data.info.playlistname,
            public:data.info.public
          } }
        )
      });
  }
  
  returnToDashboard() { 
    this.props.history.push({
             pathname: '/dashboard',
         })
  }
  
  deleteActivity() { 
    let data =  {id: this.props.location.state.id};
    let options ={
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('https://msidhu5finalbackend.herokuapp.com/', options);
    
    this.props.history.push({
             pathname: '/dashboard',
    })
  }
  
  recommendTracks() {
    var spotifyApi = new SpotifyWebApi({
    clientId: '',
    clientSecret: '',
    redirectUri: 'https://msidhu5finalfrontend.herokuapp.com/activity'
    });


    spotifyApi.setAccessToken(sessionStorage.getItem('token'));
    
    // get the 50 top tracks of the user
   spotifyApi.getMyTopTracks({ limit: 50 })
      .then(data => {
        let topTracks = data.body.items;
        var i;
        for (i = 0; i < topTracks.length; i++) {
          trackIds.push(topTracks[i].id);
        }
        // compile all of the track ids 
        return trackIds;
      })
      .then(trackIds => {
        //get the audio features for top 50 tracks
        spotifyApi.getAudioFeaturesForTracks(trackIds)
        .then(data => {
          var audio_features = data.body.audio_features;
          var track_score_pairs = [];
          var i;
          for (i = 0; i < audio_features.length; i++) {
            var track_score = 0; 
            var id = audio_features[i].id;
            // calculate score for each of top 50 tracks
            track_score += Math.abs(audio_features[i].acousticness - (parseInt(this.state.acousticness) / 100));
            track_score += Math.abs(audio_features[i].danceability - (parseInt(this.state.danceability) / 100));
            track_score += Math.abs(audio_features[i].energy - (parseInt(this.state.energy) / 100));
            track_score += Math.abs(audio_features[i].instrumentalness - (parseInt(this.state.instrumentalness) / 100));
            track_score += Math.abs(audio_features[i].speechiness - (parseInt(this.state.speechiness) / 100));
            track_score += Math.abs(audio_features[i].valence - (parseInt(this.state.valence) / 100));
            track_score_pairs.push({'id':id, 'track_score':track_score});
          }
          track_score_pairs = track_score_pairs.sort(function (a, b) {
            return a.track_score - b.track_score;
          });
          let res = track_score_pairs.map(x => Object.values(x)[0]);
          this.setState(
            (prevState) => { return { track_ids: res } }
          )
          return res;
        }).then(res => {
          spotifyApi.getTracks(res)
            .then(data =>  {
              var tracks = data.body.tracks;
              this.setState(
                (prevState) => { return { tracks : tracks } }
              )
            }, function(err) {
              console.log('Something went wrong!', err);
            });
        }, function(err) {
          console.error(err);
        });
      }).catch(function(error) {
      console.error(error);
    });    
    
  }
  
  gatherTrackInfo(tracks) {
    var track_info = [];
    var i;
    for(i = 0; i < tracks.length; i++) { 
      var name = tracks[i].name;
      var artist = tracks[i].artists[0].name;
      var album_cover = tracks[i].album.images[0].url;
      var preview = tracks[i].preview_url;
      track_info.push({'name':name, 'artist':artist, 'album_cover': album_cover, 'preview': preview});
    }
    return track_info;
  }
  
  addPlaylist() {
    var spotifyApi = new SpotifyWebApi({
    clientId: '',
    clientSecret: '',
    redirectUri: 'https://msidhu5finalfrontend.herokuapp.com/activity'
    });

    var tracks_to_add = [];
    var i;
    for(i = 0; i < this.state.track_ids.length; i++) {
      tracks_to_add[i] = "spotify:track:" + this.state.track_ids[i];
    }
    spotifyApi.setAccessToken(sessionStorage.getItem('token'));
    var pub = false;
    if(this.state.public === "on") {
      pub = true;
    }
    spotifyApi.createPlaylist(this.state.playlistname, { 'description': this.state.description, 'public': pub })
      .then(data =>  {
        return data.body.id
      }).then(id => {
      spotifyApi.addTracksToPlaylist(id, tracks_to_add)
        .then(function(data) {
          console.log('Added tracks to playlist!');
        }
        , function(err) {
          console.log('Something went wrong!', err)})
        })
  }
      
  render() {  
  var tracks = this.state.tracks;
  var track_info = [];
  if(tracks) {
    track_info = this.gatherTrackInfo(tracks)
  }

  return(  
    <body>
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <h1 id="no-link-nav" className="navbar-brand">CURATOR</h1>
        <span className="navbar-text">
          Logged in as {sessionStorage.name}
        </span>
      </div>
    </nav>
    <div className="container top-buffer">
      <div className="row gy-5 top-buffer">
        <div className="col-6">
          <h1 id="header"> {this.state.name}</h1>
          <p id="activity-info">Activity Description: {this.state.desc}</p>
          <p id="activity-info">  Notes: {this.state.notes}</p>
          <h1 id="header"> Musical Attributes </h1>
          <p id="activity-info"> Danceability: {this.state.danceability} </p>
          <p id="activity-info"> Acousticness: {this.state.acousticness}</p>
          <p id="activity-info"> Energy: {this.state.energy}</p>
          <p id="activity-info"> Instrumentalness: {this.state.instrumentalness}</p>
          <p id="activity-info"> Speechiness: {this.state.speechiness}</p>
          <p id="activity-info"> Valence: {this.state.valence} </p>
          <h1 id="header"> Additional Options </h1>
          <p id="activity-info"> Public Playlist: {this.state.public}</p>
          <div className="row">
          <div className="col-5">
            <button className="btn btn-primary" onClick={this.returnToDashboard}> Return to Dashboard </button>
          </div>
          <div className="col-5">
            <button className="btn btn-primary" onClick={this.addPlaylist}> Add Playlist To Spotify </button>
          </div>
          <div className="col-4">
            <button className="btn btn-danger" onClick={this.deleteActivity}> Delete Activity </button>
          </div>
          </div>
        </div>
        <div className="col-6">
        <h1 id="header"> {this.state.playlistname} </h1>
        <p id="activity-italics">If Playlist isn't loaded, refresh the page</p>
        {track_info.map((track) => (
        <div className="row-3">
          <img src={track.album_cover} width="100" height="100"/>
          <p id="player_text"> {track.name} - {track.artist}</p>
          <div className="row-3">
          <audio controls>
            <source src={track.preview} type="audio/ogg"/>
          </audio>
          </div>
        </div>
      ))}
        </div>
      </div>
    </div>
    </body>
    );
  }
}

export default Activity;