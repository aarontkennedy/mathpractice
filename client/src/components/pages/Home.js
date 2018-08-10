import React, { Component } from 'react';
import './Home.css';
import Footer from "../Footer";
import GameButtonList from "../GameButtonList";
import GoogleLogin from 'react-google-login';

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
                                    clientId="667983979534-5utq0hldi40eg6a06rbj57sguspooi7h.apps.googleusercontent.com"
                                    buttonText="Sign in with Google"
                                    className="btn btn-primary btn-lg"
                                    onSuccess={this.props.successfulSignin}
                                    onFailure={this.props.unsuccessfulSignin}
                                    autoLoad={this.props.autoLoadLogin}
                                />}
                        </div>

                        <div className="cell medium-5 large-4 columns Home-Columns">
                            <GameButtonList />
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        );
    }

}

export default Home;