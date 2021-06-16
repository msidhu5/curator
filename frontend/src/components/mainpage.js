import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import albums from './albums.gif'
import NavBar from "./navbar"

class MainPage extends Component { 
  constructor(props){
    super(props);
    this.state = {
      token : ""
    }
    this.login = this.login.bind(this);
  }
  // Spotify Implicit Authrntication Code taken from: https://stackoverflow.com/questions/48645827/how-to-get-implicit-grant-flow-access-token
  login() {
      // Get the hash of the url
      const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
      window.location.hash = '';

      // Set token
      let _token = hash.access_token;
      if (_token) {
      // Set token

      this.setState({
        token: _token
      });
    }

      const authEndpoint = 'https://accounts.spotify.com/authorize';

      // Replace with your app's client ID, redirect URI and desired scopes
      const clientId = '';
      const redirectUri = 'https://msidhu5finalfrontend.herokuapp.com/signedin';
      const scopes = ['user-read-private', 'user-read-email','playlist-modify-public','playlist-modify-private', 'user-library-read', 'user-top-read']


      // If there is no token, redirect to Spotify authorization
      if (!_token) {
        window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
      }
      
  }
  
  render() {
  return(  
    <body>
      <NavBar/>
      <div class="container overflow-hidden">
        <div class="row gy-5 top-buffer">
          <div class="col-6">
            <h1> MAKE THE PERFECT PLAYLIST FOR EVERY ACTIVITY </h1>
            <p id="main-description"> Having the right music for every activity is essential.
              From chill study playlists to upbeat workout music, this tool will generate playlists
              using your favorite tracks and artists to fit every occasion. Log in with your Spotify account to get
              started! </p>
            <button onClick={this.login} class="btn btn-primary"> Log in with Spotify </button>
          </div>
          <div class="col-6">
            <img src={albums} alt="Albums" id="albums"></img>
          </div>
        </div>
      </div>
    </body> );
  }
}

export default MainPage;