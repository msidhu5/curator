import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import albums from './albums.gif'
var SpotifyWebApi = require('spotify-web-api-node');

class SignedIn extends Component { 
  componentDidMount() { 
    // Spotify Implicit Authrntication Code taken from: https://stackoverflow.com/questions/58964265/spotify-implicit-grant-flow-with-react-user-login 
    if(this.props.location.hash) {
      var access_token = this.props.location.hash.split("=")[1].split('&')[0];
      sessionStorage.setItem("token", access_token);
    }
    
    var spotifyApi = new SpotifyWebApi({
      clientId: '',
      clientSecret: '',
      redirectUri: 'https://msidhu5finalfrontend.herokuapp.com/dashboard'
    });


    spotifyApi.setAccessToken(sessionStorage.getItem('token'));

    spotifyApi.getMe()
      .then(function(data) {
        var user_email = data.body.email;
        var user_name = data.body.display_name;
        sessionStorage.setItem("email", user_email);
        sessionStorage.setItem("name", user_name);
        
      }, function(err) {
        console.log('Something went wrong!', err);
      });
  }
  
  render() {
    return(  
      <body>
        <div class="container overflow-hidden">
          <div class="row gy-5 top-buffer">
            <div class="col-6">
              <h1> SUCCESSFULLY SIGNED IN </h1>
              <p id="main-description"> Click Below to continue to Curator! </p>
              <a href="/dashboard" class="btn btn-primary"> Continue </a>
            </div>
            <div class="col-6">
              <img src={albums} alt="Albums" id="albums"></img>
            </div>
          </div>
        </div>
      </body> );
  }
}

export default SignedIn;