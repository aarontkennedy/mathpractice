import React, { Component } from 'react';
import Game from "./Game";

class FactsPractice extends Component {

    render() {
        return (
            <Game problemType="facts" userID={this.props.userID} />
        );
    }

}

export default FactsPractice;