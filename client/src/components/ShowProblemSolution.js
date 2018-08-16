import React, { Component } from 'react';
import './ShowProblemSolution.css';

class ShowProblemSolution extends Component {

    render() {
        return (
            <div className="text-center">
                <h1>{this.props.problem.problem} {this.props.problem.solution}</h1>
                {/*{this.props.incorrectAnswer ?
                    <p className="ShowProblemSolution-desc">
                        You said: {this.props.incorrectAnswer}.
                    </p>
                : ""} */}
                <p className="ShowProblemSolution-desc">
                    {this.props.problemSolutionHelp()}</p>
                <button type="button" className="button large success Go-Button" onClick={this.props.handleNextProblemClick}>Continue</button>
            </div>
        );
    }

}

export default ShowProblemSolution;