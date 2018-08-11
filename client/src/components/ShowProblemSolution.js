import React, { Component } from 'react';
import './ShowProblemSolution.css';

class ShowProblemSolution extends Component {

    render() {
        return (
            <div className="text-center">
            <h1>{this.props.problem.problem} {this.props.problem.solution}</h1>
            <button type="button" className="button large success Go-Button" onClick={this.props.handleNextQuestionClick}>Next Question</button>
            </div>
        );
    }

}

export default ShowProblemSolution;