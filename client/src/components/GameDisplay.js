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
        this.nextQuestion();
    }

    nextQuestion = () => {
        if (this.problems.length) {
            console.log("nextQuestion");
            const next = this.problems.pop();
            console.log(next);
            this.setState({
                isGameOver: false,
                textInput: "",
                currentProblem: next,
                showCurrentProblemSolution: false
            });

            this.timeoutID = setTimeout(()=> {
                this.handleCheckAnswer(null, true);
            }, 5000);
            
        }
        else {
            console.log("game over - no more questions");
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
        const correct = this.state.currentProblem.solution ===
            parseInt(this.state.textInput, 10);

        if (correct) {
            this.state.currentProblem.attempts++;
            this.state.currentProblem.correct++;
            this.state.currentProblem.streak++;
            this.nextQuestion();
        }
        else {
            this.state.currentProblem.attempts++;
            this.state.currentProblem.streak = 0;
            if (!this.state.currentProblem.doneBefore) {
                this.problems.unshift(this.state.currentProblem);
                this.state.currentProblem.doneBefore = true;
            }
            this.setState({ showCurrentProblemSolution: true });
        }
        callServer.setLearnerFact(this.state.currentProblem);
    }

    gameOver() {
        this.cleanUp();
        this.setState({ isGameOver: true });
        this.props.handleGameIsDone();
    }

    cleanUp() {
    }

    componentWillUnmount() {
        this.cleanUp();
    }

    render() {
        return (
            <div className="GameDisplay row grid-x">
                <div className="cell medium-6 columns">
                    <div className="row grid-x">

                        {this.state.showCurrentProblemSolution ? 
                        <ShowProblemSolution 
                        problem={this.state.currentProblem}
                        handleNextQuestionClick={this.nextQuestion} />
                        :
                            <div className="cell columns text-center">
                                {this.state.currentProblem ?
                                    <Problem problem={this.state.currentProblem.problem} /> : ""}
                                <TextInput value={this.state.textInput} handleKeyPress={this.handleKeyPress} />
                                <button type="button" className="button large success Go-Button" onClick={this.handleCheckAnswer}>Go!</button>
                            </div>
                        }

                    </div>
                </div>

                <div className="cell medium-6 columns text-center">
                    <CalculatorInput onClick={this.handleCalcClick} />
                </div>
            </div>
        );
    }

}

export default GameDisplay;