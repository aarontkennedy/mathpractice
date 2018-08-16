import React, { Component } from 'react';
import './Game.css';
import GameDisplay from "../GameDisplay";
import AudioControl from "../../utils/AudioControl";
import callServer from "../../utils/callServer";
import BarChart from "../barChart/BarChart";
import Header from "../Header";
import Giphy from "../giphy/Giphy";

class Game extends Component {

    state = {
        isGameStarted: false,
        problems: null,
        progress: 0
    };

    componentDidMount() {
        console.log("Game:componentDidMount(): " + this.props.userID + " " + this.props.problemType);

        this.audio = new AudioControl("#gameSound");
        this.audio.setPlayList(["/songs/rootsSmall.mp3",
            "/songs/moveAndShakeSmall.mp3",
            "/songs/thunderClapSmall.mp3",
            "/songs/haveWings.mp3",
            "/songs/regulate.mp3",
            "/songs/wantedAlive.mp3"]);

        this.updateLearnerStats();
    }

    updateLearnerStats = () => {
        callServer.getLearnerStats(this.props.userID, this.props.problemType)
            .then((data) => {
                console.log(data);
                const massaged = data.data.map((obj) => {
                    let app = obj.averageProficiencyPercent;
                    app = app ? app : 0;
                    const pa = obj.percentAttempted;

                    const progress = Math.round(app * pa * 100);

                    return { type: obj.type, progress: progress };
                });
                console.log(massaged);
                this.setState({ progress: massaged });
            });
    }

    handleStartGameClick = (event) => {
        this.audio.playRandomSong();

        callServer.getLearnerProblems(this.props.userID,
            this.props.problemType)
            .then((res) => {
                console.log("callServer.setUser succeeded");
                console.log(res);
                if (res.data.length > this.props.problemsPerRound) {
                    res.data = res.data.slice(0, this.props.problemsPerRound);
                }
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

    renderGameStart() {
        return (<div className="Game">
            <Header
                userID={this.props.userID}
                firstName={this.props.firstName}
                imageURL={this.props.imageURL}
                signOut={this.props.signOut} />

            <section className="grid-container">
                <div className="grid-x grid-padding-x grid-margin-x">
                    <div className="cell medium-6 text-center" >
                        <button type="button" className="button GameStartButton" onClick={this.handleStartGameClick}>Start!</button>
                    </div>

                    <div className="show-for-medium medium-6 text-center">
                        <Giphy search="you can do it" />
                    </div>

                    <div className="cell text-center">
                        {this.state.progress ?
                            <BarChart title={`Current ${this.capitalizeFirstLetter(this.props.problemType)}  Progress`}
                                data={this.state.progress} /> : ""
                        }
                    </div>
                </div>
            </section>
        </div>);
    }

    renderActualGame() {
        return (<div className="Game">
            <Header
                userID={this.props.userID}
                firstName={this.props.firstName}
                imageURL={this.props.imageURL}
                signOut={this.props.signOut} />

            <GameDisplay problemType={this.props.problemType}
                problems={this.state.problems}
                handleGameIsDone={this.handleGameIsDone}
                timeout={this.props.timeout} 
                problemSolution={this.props.problemSolution}/>
        </div>);
    }

    render() {

        if (!this.props.signOut) {
            throw new Error("Game: signOut is null.");
        }

        if (this.state.isGameStarted) {
            return this.renderActualGame();
        }
        return this.renderGameStart();
    }

}

export default Game;