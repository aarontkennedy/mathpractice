import React, { Component } from 'react';
import Game from "./Game";

class FactsPractice extends Component {

    render() {

        if (!this.props.signOut) {
            throw new Error("FactsPractice: signOut is null.");
        }

        return (
            <Game problemType="facts"
                userID={this.props.userID}
                signOut={this.props.signOut}
            />
        );
    }

}

export default FactsPractice;