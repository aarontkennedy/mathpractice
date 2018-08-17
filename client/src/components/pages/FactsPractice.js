import React, { Component } from 'react';
import Game from "./Game";

class FactsPractice extends Component {

    generateSolution = (type, problemText, solution) => {
        const parts = problemText.match(/(\d+) [+-x/÷] (\d+) = /);
        const left = parseInt(parts[1], 10);
        const right = parseInt(parts[2], 10);
        let min = left, max = right;
        if (left > right) {
            min = right;
            max = left;
        }
        let solutionString = "";

        switch (type) {
            case "addition":
                if (left + right !== solution) {
                    throw new Error("generateSolution(): didn't parse question correctly?");
                }
                if (right === 0 || left === 0) {
                    solutionString += `When you add 0, it will stay ${solution}.`;
                }
                else if (min < 10 && max < 10 && solution > 10) {
                    const distanceTo10 = 10 - max;
                    solutionString += `Break up ${min} into ${distanceTo10} and ${min - distanceTo10}.  Then, ${max} + ${distanceTo10} + ${min - distanceTo10} is the same as 10 + ${min - distanceTo10} = ${solution}.`;
                }
                else {
                    solutionString += `Start at ${max} and count up ${min} to ${solution}.`;
                }
                break;
            case "subtraction":
                if (left - right !== solution) {
                    throw new Error("generateSolution(): didn't parse question correctly?");
                }
                if (right === 0) {
                    solutionString += `When you subtract by 0, it will stay ${solution}.`;
                }
                else {
                    solutionString += `Start at ${left} and count down ${right} to ${solution}.`;
                }

                break;
            case "multiplication":
                if (left * right !== solution) {
                    throw new Error("generateSolution(): didn't parse question correctly?");
                }
                if (right === 0 || left === 0) {
                    solutionString += `When you multiply by 0, it is just 0.`;
                }
                else if (right === 1 || left === 1) {
                    solutionString += `When you multiply by 1, it stays ${solution}.`;
                }
                else {
                    solutionString += `Skip count by ${max}'s: `;
                    for (let i = max; i < solution; i += max) {
                        solutionString += `${i}, `;
                    }
                    solutionString += `${solution}. So, ${problemText}is ${solution}.`;
                }
                break;
            case "division":
                if (left / right !== solution) {
                    throw new Error("generateSolution(): didn't parse question correctly?");
                }
                if (left === 0) {
                    solutionString += `When 0 is divided, it is just 0.`;
                }
                else if (right === 1) {
                    solutionString += `When you divide by 1, it stays ${solution}`;
                }
                else if (left === right) {
                    solutionString += `A number divided by itself is 1.`;
                }
                else {
                    solutionString += `Skip count by ${right}'s until you get ${left}. `;
                    for (let i = right; i < left; i += right) {
                        solutionString += `${i}, `;
                    }
                    solutionString += `${left} and that is ${solution} times.`;
                }
                break;
            default:
                throw new Error("FactsPractice: Unexpected operation/type: " + type);
        }
        return solutionString;
    }

    render() {

        if (!this.props.signOut) {
            throw new Error("FactsPractice: signOut is null.");
        }

        return (
            <Game problemType="facts"
                userID={this.props.userID}
                first={this.props.first}
                imageURL={this.props.imageURL}
                signOut={this.props.signOut}
                timeout={10}
                problemsPerRound={20}
                problemSolution={this.generateSolution}
            />
        );
    }

}

export default FactsPractice;