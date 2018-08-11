import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Home.css';
import Footer from "../Footer";
import GameButtonList from "../GameButtonList";
import { GoogleLogin } from 'react-google-login';

class Home extends Component {
    render() {
        return (
            <div className="Home">
                <section className="grid-container">
                    <div className="grid-x grid-margin-x grid-padding-x">
                        <div className="cell medium-7 large-offset-1 large-6 Home-Info columns Home-Columns">
                            <h1 className="text-center">Hot Math Practice!</h1>
                            {this.props.userID ? "" :
                                <GoogleLogin
                                    clientId="954069052284-35u1c2267qsvcdt1mdfeb66ud15p6j84.apps.googleusercontent.com"
                                    buttonText="Sign in with Google"
                                    className="button large"
                                    onSuccess={this.props.onSuccess}
                                    onFailure={this.props.onFailure} />
                            }
                        </div>

                        <div className="cell medium-5 large-4 columns Home-Columns">
                            {this.props.userID ? <GameButtonList /> : ""}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }

}

export default Home;