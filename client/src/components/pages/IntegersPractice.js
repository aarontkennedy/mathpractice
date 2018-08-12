import React, { Component } from 'react';
import Game from "./Game";

class IntegersPractice extends Component {

    render() {
        return (
            <Game problemType="integers" userID={this.props.userID} />
        );
    }

}

export default IntegersPractice;