import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from "./navbar"

class Features extends Component { 
  
  render() {
  return(  
    <body>
      <NavBar/>
      <div className="container">
        <div className="row justify-content-center top-buffer">
          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="card" >
              <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" className="card-img-top" alt="Activity Based Curation"></img>
              <div className="card-body">
                <h5 className="card-title">Activity Based Playlist Creation</h5>
                <p className="card-text">Create the perfect playlist for every activity in your day.
                  Whether you're looking for music for a chill study session, an upbeat workout,
                  or anything in between you can fine tune different music attributes of your playlist
                  to get the perfect songs to match what you're doing. </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="card" >
              <img src="https://images.unsplash.com/photo-1496293455970-f8581aae0e3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1601&q=80" className="card-img-top" alt="Activity Based Curation"></img>
              <div className="card-body">
                <h5 className="card-title">Personalized Song Choices</h5>
                <p className="card-text">Nobody wants to listen to workout or study
                  playlists made by someone else where you don't like most of the songs.
                  This tool will use your most listened to artists and tracks to make sure
                  you are listening to music that you actually like.</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 d-flex align-items-stretch">
            <div className="card">
              <img src="https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fG11c2ljfGVufDB8fDB8&auto=format&fit=crop&w=800&q=60" className="card-img-top" alt="Activity Based Curation"></img>
              <div className="card-body">
                <h5 className="card-title">Stay Motivated With Music</h5>
                <p className="card-text">By being able to quickly make playlists that match the different activities
                  in your day, you can focus on being as productive as possible. Enter the duration of your activity
                  to make a playlist thats the perfect length. After that,
                  you can save the playlist directly to your account with the single click.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body> );
  }
}

export default Features;