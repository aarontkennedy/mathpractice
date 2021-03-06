import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Home from "./components/pages/Home";
import FactsPractice from "./components/pages/FactsPractice";
import IntegersPractice from "./components/pages/IntegersPractice";
import PrivateRoute from "./components/PrivateRoute";
import callServer from "./utils/callServer";
import LocalProfileStorage from "./utils/LocalProfileStorage";

class App extends Component {

  state = {
    googleID: "",
    first: "",
    last: "",
    email: "",
    imageURL: ""
  };

  componentDidMount() {
    // retrieve from local storage if possible
    this.localStorage = new LocalProfileStorage();
    const alreadyLoggedInProfile = this.localStorage.retrieve();
    if (alreadyLoggedInProfile) {
      console.log("alreadyLoggedInProfile:");
      console.log(alreadyLoggedInProfile);
      this.setState(alreadyLoggedInProfile);
    }
  }

  successfulSignIn = (response) => {
    console.log(response);
    console.log(response.profileObj);
    let profile = {
      googleID: response.profileObj.googleId,
      first: response.profileObj.givenName,
      last: response.profileObj.familyName,
      email: response.profileObj.email,
      imageURL: response.profileObj.imageUrl
    }
    this.setState(profile);
    this.localStorage.add(profile);
    callServer.setLearner(profile)
    .then((res)=>{console.log("callServer.setLearner succeeded");})
    .catch((err)=>{console.log(err)});
  }

  unsuccessfulSignIn = (response) => {
    console.log(response);

    // what else should I do? 
  }

  signOut = (response) => {
    console.log("signOut");
    console.log(response);
    this.setState({
      signedIn: false,
      googleID: "",
      first: "",
      last: "",
      email: "",
      imageURL: ""
    });
    // remove form local storage
    this.localStorage.remove();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/game/facts"
              component={FactsPractice}
              userID={this.state.googleID}
              first={this.state.first}
              imageURL={this.state.imageURL}
              signOut={this.signOut}
            />
            <PrivateRoute exact path="/game/integers"
              component={IntegersPractice}
              userID={this.state.googleID}
              first={this.state.first}
              imageURL={this.state.imageURL}
              signOut={this.signOut}
            />
            <Route exact path="/signin"
              render={(props) => <Home {...props}
                userID={this.state.googleID}
                first={this.state.first}
                imageURL={this.state.imageURL}
                onSuccess={this.successfulSignIn}
                onFailure={this.unsuccessfulSignIn}
                signOut={this.signOut}
                message="Please Sign in to ..."
              />} />
            <Route exact path="/"
              render={(props) => <Home {...props}
                userID={this.state.googleID}
                first={this.state.first}
                imageURL={this.state.imageURL}
                onSuccess={this.successfulSignIn}
                onFailure={this.unsuccessfulSignIn}
                signOut={this.signOut}
                message=""
              />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
