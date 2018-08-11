import React, { Component } from 'react';
import './Game.css';
import BigGameStartButton from "../BigGameStartButton";
import GameDisplay from "../GameDisplay";
import AudioControl from "../../utils/AudioControl";
import callServer from "../../utils/callServer";

class Game extends Component {

    state = {
        isGameStarted: false,
        problems: null,
        proficiency: 0
    };

    componentDidMount() {
        console.log("Game:componentDidMount()");
        console.log(this.props.userID);
        console.log(this.props.match.params.operation);

        this.audio = new AudioControl("#gameSound");
        this.audio.setPlayList(["/songs/rootsSmall.mp3",
            "/songs/moveAndShakeSmall.mp3",
            "/songs/thunderClapSmall.mp3"]);

        callServer.getLearnerFactsStats(this.props.userID, this.props.match.params.operation)
            .then((data) => {
                console.log(data);
                this.setState({ proficiency: data.data[0] });
            });
    }

    handleStartGameClick = (event) => {
        this.audio.playRandomSong();

        callServer.getLearnerFacts(this.props.userID, this.props.match.params.operation)
            .then((res) => {
                console.log("callServer.setUser succeeded");
                console.log(res);
                this.setState({ problems: res.data, isGameStarted: true });
            })
            .catch((err) => { console.log(err) });  // database problem? create problems just for kicks?
    }

    handleGameIsDone = () => {
        this.audio.stop();
        this.setState({ isGameStarted: false });
        callServer.getLearnerFactsStats(this.props.userID, this.props.match.params.operation)
            .then((data) => {
                console.log(data);
                this.setState({ proficiency: data.data[0] });
            });
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    componentWillUnmount() {
        this.audio.stop();
    }

    render() {
        return (
            <div className="Game">
                {!this.state.isGameStarted ?
                    <div>
                        Current {this.capitalizeFirstLetter(this.props.match.params.operation)} Facts Proficiency:
                        {this.state.proficiency.averageProficiencyPercent}
                        <BigGameStartButton onClick={this.handleStartGameClick} />
                    </div>
                    : <GameDisplay problems={this.state.problems}
                        handleGameIsDone={this.handleGameIsDone} />}
            </div>
        );
    }

}

export default Game;