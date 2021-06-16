import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom"
var SpotifyWebApi = require('spotify-web-api-node');
class ActivityNav extends Component { 
  
  render() {
  return(  
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/dashboard">CURATOR</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
          <Link className="navlink" to="/dashboard">Actvities</Link>
          <Link className="navlink" to="/addactivity">Add Activity</Link>
          <Link className="navlink" to="/">Logout</Link>
          </div>
        </div>
        <span className="navbar-text">
          Logged in as {sessionStorage.getItem("name")}
        </span>
      </div>
    </nav> );
  }
}

export default ActivityNav;