import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Home from "./components/pages/Home";
import Game from "./components/pages/Game";
import AdditionQuestion from "./quizGenerators/AdditionQuestion";
import PrivateRoute from "./components/PrivateRoute";
import callServer from "./utils/callServer";
import Header from "./components/Header";

class App extends Component {

  state = {
    googleID: "",
    firstName: "",
    lastName: "",
    email: "",
    imageURL: ""
  };

  successfulSignIn = (response) => {
    alert("successfulSignIn");
    console.log(response);
    console.log(response.profileObj);
    this.setState({
      signedIn: true,
      googleID: response.profileObj.googleId,
      first: response.profileObj.givenName,
      last: response.profileObj.familyName,
      email: response.profileObj.email,
      imageURL: response.profileObj.imageUrl
    });
    callServer.setUser({
      googleID: response.profileObj.googleId,
      first: response.profileObj.givenName,
      last: response.profileObj.familyName,
      email: response.profileObj.email,
      imageURL: response.profileObj.imageUrl
    });
  }

  unsuccessfulSignIn = (response) => {
    console.log("unsuccessfulSignIn");
    console.log(response);

    // what else should I do? 
  }

  signOut = (response) => {
    console.log("signOut");
    console.log(response);
    this.setState({
      signedIn: false,
      googleID: "",
      firstName: "",
      lastName: "",
      email: "",
      imageURL: ""
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header
            userID={this.state.googleID}
            signOut={this.signOut} />
          <Switch>
            <PrivateRoute path="/game/additionFacts"
              component={Game}
              userID={this.state.googleID}
            />
            <Route exact path="/"
              render={(props) => <Home {...props}
                successfulSignin={this.successfulSignIn}
                unsuccessfulSignIn={this.unsuccessfulSignIn}
                userID={this.state.googleID} />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
