import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import albums from './albums.gif'
import spotify from './spotify.png'

import ActivityNav from "./activitynav"
  
class Dashboard extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      activityCreated: false,
      data : [],
      user: "",
    }
    
    this.goToActivity = this.goToActivity.bind(this);
  }
  componentDidMount() { 
    this.getData();
  }
  
  // get the entire database 
  getData() {
    fetch('https://msidhu5finalbackend.herokuapp.com/')
      .then(res => res.json())
      .then(data => {
        this.setState(
          (prevState) => { return { data: data.info } }
        )
      });
  }
  
  goToActivity(activity_id) {
    
    this.props.history.push({
             pathname: '/activity',
             state:
             {
               id: activity_id,
             }
         })
  }
  
  updateActivity(activity_id) {
    this.props.history.push({
             pathname: '/update',
             state:
             {
               id: activity_id,
             }
         })
  }
  
  gatherUserActivities() {
    var data = this.state.data;
    var user_data = [];
    var i;
    var user = sessionStorage.getItem("email");
    for (i = 0; i < data.length; i++) {
      if(data[i].user === user) {
        user_data.push(data[i]);
      }
    }
    return user_data;
  }
  
  render() {
  var user_activities = this.gatherUserActivities();
  return(  
    <body>
    <ActivityNav/>
    <div className="container">
      <div className="row top-buffer">
        <h1> Your Activities </h1>
      </div>
      <div className="row">
      <p id="activity-italics">If Activites are not updated, refresh the page</p>
      </div>
      <div className="row">
        <div className="col-md-auto" id="result">
        </div>
      </div>
      <div className="row">
      {user_activities.map((activity) => (
        <div className="col-md-auto" id="result">
          <div className="card" > 
          <img src={spotify} className="card-img-top" alt="..."/> 
          <div className="card-body"> <p className="card-text"> {activity.name} </p>
          <div className="row">
          <div className="col-3">
            <button onClick={() => {this.goToActivity(activity._id)}} className="btn btn-primary">View</button>
          </div>
          <div className="col-3">
            <button onClick={() => {this.updateActivity(activity._id)}} className="btn btn-primary" > Update </button>
          </div>
          </div>
          </div>
          </div>
        </div>
    ))}
    </div>

      <div className="row top-buffer">
        <div className="col-md-auto">
          <a href="/addactivity" role="button" className="btn btn-primary"> Add New Activity </a>
        </div>
      </div>
    </div>

    </body>
    );
  }
}

export default Dashboard;