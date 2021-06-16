import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ActivityNav from "./activitynav"

class UpdateActivity extends Component { 
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
      public:"off"
    }
  }
  
  componentDidMount() { 
    var activity_data = this.getData(this.props.location.state.id);
  }
  
  getData(id) { 
    console.log(id);
    fetch('https://msidhu5finalbackend.herokuapp.com/id/?id=' + id)
      .then(res => res.json())
      .then(data => {
        console.log(data.info);
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
  
  handleSubmit = (event) => {
    event.preventDefault();
    // update playlist data in MongoDB
    let data =  {id: this.props.location.state.id, name: this.state.name, user: sessionStorage.getItem("email"), desc: this.state.desc, 
    notes: this.state.notes, danceability: this.state.danceability, acousticness: this.state.acousticness,
    energy: this.state.energy, instrumentalness: this.state.instrumentalness, speechiness: this.state.speechiness,
    valence: this.state.valence, playlistname: this.state.playlistname, public: this.state.public};
    let options ={
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    fetch('https://msidhu5finalbackend.herokuapp.com/', options).then();
    this.props.history.push('/dashboard')
    
  }
  
  myChangeHandler = (event) => {
   let id = event.target.id;
   let val = event.target.value;
   this.setState({[id]: val});
 }
  
  render() {
  return(  
    <body>
    <ActivityNav/>
    <div className="container">
      <div className="row-md top-buffer">
        <form id="text-boxes" onSubmit={this.handleSubmit}>
          <h2> Activity Info </h2>
          <div className="form-floating mb-3">
            <label for="name">Activity Name</label>
            <input type="text"  className="form-control form-control-" id="name" maxlength="20" defaultValue={this.state.name} onChange={this.myChangeHandler}/>
          </div>

          <div className="form-floating mb-3">
            <label for="desc">Activity Description</label>
            <input type="text" className="form-control" id="desc" maxlength="35" defaultValue={this.state.desc} onChange={this.myChangeHandler}></input>
          </div>


          <div className="form-floating mb-3">
            <label for="notes">Additional Notes</label>
            <input type="text" className="form-control" id="notes" maxlength="35" defaultValue={this.state.notes} onChange={this.myChangeHandler}></input>
          </div>

      
          <h2> Musical Attributes </h2>
          <label for="danceability" className="form-label">Danceability</label>
          <div>
            <label for="" class="float-left">Not Danceable</label>
            <label for="" class="float-right">Highly Danceable</label>
            <input type="range" className="form-range" id="danceability" defaultValue={this.state.danceability} onChange={this.myChangeHandler}></input>
          </div>

          <label for="acousticness" className="form-label">Acousticness</label>
          <div>
            <label for="" class="float-left">Not Acoustic</label>
            <label for="" class="float-right">Heavily Acoustic</label>
            <input type="range" className="form-range" id="acousticness" defaultValue={this.state.acousticness} onChange={this.myChangeHandler}></input>
          </div>

          <label for="energy" className="form-label">Energy</label>
          <div>
            <label for="" class="float-left">Slow & Rhytmic</label>
            <label for="" class="float-right">Fast & Intense</label>
            <input type="range" className="form-range" id="energy" defaultValue={this.state.energy} onChange={this.myChangeHandler}></input>
          </div>

          <label for="instrumentalness" className="form-label">Instrumentalness</label>
          <div>
            <label for="" class="float-left">Heavy Vocals</label>
            <label for="" class="float-right">No Vocals</label>
            <input type="range" className="form-range" id="instrumentalness" defaultValue={this.state.instrumentalness} onChange={this.myChangeHandler}></input>
          </div>

          <label for="speechiness" className="form-label">Speechiness</label>
          <div>
            <label for="" class="float-left">Singing</label>
            <label for="" class="float-right">Spoken-Word</label>
            <input type="range" className="form-range" id="speechiness" defaultValue={this.state.speechiness} onChange={this.myChangeHandler}></input>
          </div>

          <label for="valence" className="form-label">Valence</label>
          <div>
            <label for="" class="float-left">Sad</label>
            <label for="" class="float-right">Happy</label>
            <input type="range" className="form-range" id="valence" defaultValue={this.state.valence} onChange={this.myChangeHandler}></input>
          </div>
      

    
          <h2> Playlist Settings </h2>
          <div className="form-floating mb-3">
            <label for="playlistname">Playlist Name</label>
            <input type="text" className="form-control" id="playlistname" maxlength="20" defaultValue={this.state.playlistname} onChange={this.myChangeHandler}></input>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="public" defaultValue={this.state.public} onChange={this.myChangeHandler}></input>
            <label className="form-check-label" for="public">Public Playlist</label>
          </div>
            
          <input
            type='submit' className="btn btn-primary" 
          />
          
          </form>
        </div>

    </div>

    </body>
    );
  }
}

export default UpdateActivity;