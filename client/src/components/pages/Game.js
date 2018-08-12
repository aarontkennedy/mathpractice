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
        console.log("Game:componentDidMount(): " + this.props.userID + " " + this.props.problemType);

        this.audio = new AudioControl("#gameSound");
        this.audio.setPlayList(["/songs/rootsSmall.mp3",
            "/songs/moveAndShakeSmall.mp3",
            "/songs/thunderClapSmall.mp3"]);

        this.updateLearnerStats();
    }

    updateLearnerStats = () => {
        callServer.getLearnerStats(this.props.userID, this.props.problemType)
            .then((data) => {
                console.log(data);
                this.setState({ proficiency: data.data[0] });
            });
    }

    handleStartGameClick = (event) => {
        this.audio.playRandomSong();

        callServer.getLearnerProblems(this.props.userID, this.props.problemType)
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
        this.updateLearnerStats();
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
                        Current {this.capitalizeFirstLetter(this.props.problemType)}  Proficiency:
                        {/*this.state.proficiency.averageProficiencyPercent*/}
                        <BigGameStartButton onClick={this.handleStartGameClick} />
                    </div>
                    : <GameDisplay problemType={this.props.problemType}
                        problems={this.state.problems}
                        handleGameIsDone={this.handleGameIsDone} />}
            </div>
        );
    }

}

export default Game;