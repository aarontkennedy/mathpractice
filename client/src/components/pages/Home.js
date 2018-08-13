import React, { Component } from 'react';
import './Home.css';
import Footer from "../Footer";
import GameButtonList from "../GameButtonList";
import { GoogleLogin } from 'react-google-login';
import Header from "../Header";
import Giphy from "../giphy/Giphy";

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Header
                    userID={this.props.userID}
                    signOut={this.props.signOut} />

                <section className="grid-container">
                    <div className="grid-x grid-padding-x grid-margin-x">
                        <div className="cell medium-6">
                            <div className="Home-Definition">
                                <div className="h2">mathing</div>
                                <div>[math-ing]</div>
                                <div>verb</div>
                                <ol><li>The activity of actively using your brain to do math; from the infinitive "to math".</li></ol>
                            </div>

                            <div className="Home-Description">
                                Mathing is the place for putting in the practice to improve your math skills.  Practice for five minutes daily and you will be sharper and more confident.
                            </div>

                            <div className="text-center">
                                {this.props.userID ? "" :
                                    <GoogleLogin
                                        clientId="954069052284-35u1c2267qsvcdt1mdfeb66ud15p6j84.apps.googleusercontent.com"
                                        buttonText="Sign in with Google"
                                        className="button large"
                                        onSuccess={this.props.onSuccess}
                                        onFailure={this.props.onFailure} />
                                }
                            </div>
                        </div>

                        <div className="cell medium-6 text-center">

                            {this.props.userID ? <GameButtonList /> : ""}

                            <Giphy search="you can do it" />
                            <h4>Work Hard! You can do it!</h4>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }

}

export default Home;