import React, { Component } from 'react';
import './Home.css';
import Footer from "../Footer";
import GameButtonList from "../GameButtonList";
import { GoogleLogin } from 'react-google-login';
import Header from "../Header";
import Advert from "../Advert";
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

                        <div className="cell advertising-section">
                            <div className="grid-x grid-padding-x grid-margin-x">
                                <div className="cell medium-6">
                                    <Advert image="/images/hotTator.gif"
                                        url="https://hotmathtator.herokuapp.com"
                                        title="Hot Mathtator!"
                                        description="Want to practice math facts with friends?  Play Hot Mathtator!" />
                                </div>
                                <div className="cell medium-6">
                                    <Advert image="/images/brainReact.png"
                                        url="https://brainreact.herokuapp.com"
                                        title="BrainReact"
                                        description="Want to practice to increase your memory?  Play one of BrainReacts various levels and see how much you can remember!" />
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                <Footer />
            </div>
        );
    }

}

export default Home;