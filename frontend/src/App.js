import './App.css';
import MainPage from "./components/mainpage"
import Features from "./components/features"
import Dashboard from "./components/dashboard"
import AddActivity from "./components/addactivity"
import Activity from "./components/activity"
import SignedIn from "./components/signedin"
import UpdateActivity from "./components/update"
import {Route} from "react-router-dom" 

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={MainPage}/>
      <Route exact path="/features" component={Features}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/addactivity" component={AddActivity}/>
      <Route exact path="/activity" component={Activity}/>
      <Route exact path="/signedin" component={SignedIn}/>
      <Route exact path="/update" component={UpdateActivity}/>
    </div>
  );
}

export default App;
