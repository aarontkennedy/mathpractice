import React, { Component } from 'react';
import Game from "./Game";

class IntegersPractice extends Component {

    render() {

        if (!this.props.signOut) {
            throw new Error("IntegersPractice: signOut is null.");
        }

        return (
            <Game problemType="integers"
                userID={this.props.userID}
                signOut={this.props.signOut} />
        );
    }

}

export default IntegersPractice;