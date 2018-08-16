import React, { Component } from 'react';
import Problem from "./Problem";
import TextInput from "./TextInput";
import CalculatorInput from "./calculator/CalculatorInput";
import ShowProblemSolution from "./ShowProblemSolution";
import './GameDisplay.css';
import callServer from "../utils/callServer";

class GameDisplay extends Component {

    problems = null;
    timeoutID = null;

    state = {
        isGameOver: false,
        textInput: "",
        currentProblem: null,
        showCurrentProblemSolution: false
    };

    componentDidMount() {
        document.onkeyup = (e) => this.handleKeyPress(e);
        this.problems = this.props.problems;
        this.startGame();
    }
    /*
        componentWillReceiveProps() {
            this.startGame();
        }*/

    startGame = () => {
        this.nextProblem();
    }

    nextProblem = () => {
        if (this.problems.length) {
            console.log("nextProblem");
            const next = this.problems.pop();
            //console.log(next);
            this.setState({
                isGameOver: false,
                textInput: "",
                currentProblem: next,
                showCurrentProblemSolution: false
            });

            if (this.props.timeout > 0) {
                this.timeoutID = setTimeout(() => {
                    this.handleCheckAnswer(null, true);
                }, this.props.timeout * 1000);
            }

        }
        else {
            console.log("game over - no more problems");
            this.gameOver();
        }
    }

    handleKeyPress = (event) => {
        this.handleCalcClick(event.key);
    }

    handleCalcClick = (value) => {
        if (!this.state.isGameOver) {
            switch (value.toLowerCase()) {
                case "backspace":
                case "c":
                    this.setState({ textInput: "" });
                    break;
                case "-":
                case "±":
                    if (this.state.textInput.startsWith("-")) {
                        this.setState({ textInput: this.state.textInput.slice(1) });
                    }
                    else {
                        this.setState({ textInput: "-" + this.state.textInput });
                    }
                    break;
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    this.setState({ textInput: this.state.textInput + value });
                    break;
                case "enter":
                case "return":
                    this.handleCheckAnswer();
                    break;
                default:
            }
        }
    }

    handleCheckAnswer = (event, timedOut = false) => {
        clearTimeout(this.timeoutID);

        let currentProblemCopy = this.state.currentProblem;
        const correct = currentProblemCopy.solution ===
            parseInt(this.state.textInput, 10);

        if (correct) {
            console.log("Correct!");
            currentProblemCopy.attempts++;
            currentProblemCopy.correct++;
            currentProblemCopy.streak++;
            this.nextProblem();
        }
        else {
            currentProblemCopy.attempts++;
            currentProblemCopy.streak = 0;
            if (!currentProblemCopy.doneBefore) {
                currentProblemCopy.doneBefore = true;
                this.problems.unshift(currentProblemCopy);
            }
            this.setState({ showCurrentProblemSolution: true });
        }
        callServer.updateLearnerProblemStats(this.props.problemType, currentProblemCopy);
    }

    gameOver() {
        this.setState({ isGameOver: true });
        this.props.handleGameIsDone();
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutID);
    }

    render() {
        return (
            <div className="GameDisplay grid-x">
                <div className="cell medium-6 text-center">

                    {this.state.showCurrentProblemSolution ?
                        <ShowProblemSolution
                            problem={this.state.currentProblem}
                            problemSolutionHelp={() => {
                                return (this.props.problemSolution(this.state.currentProblem.type,
                                    this.state.currentProblem.problem,
                                    this.state.currentProblem.solution));
                            }}
                            handleNextProblemClick={this.nextProblem} />
                        :
                        <div className="text-center">
                            {this.state.currentProblem ?
                                <Problem problem={this.state.currentProblem.problem} /> : ""}
                            <TextInput value={this.state.textInput} handleKeyPress={this.handleKeyPress} />
                            <button type="button" className="button large success Go-Button" onClick={this.handleCheckAnswer}>Go!</button>
                        </div>
                    }

                </div>

                <div className="cell medium-6 text-center">
                    <CalculatorInput onClick={this.handleCalcClick} />
                </div>
            </div>
        );
    }

}

export default GameDisplay;