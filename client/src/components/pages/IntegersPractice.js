import React, { Component } from 'react';
import Game from "./Game";

class IntegersPractice extends Component {

    generateSolution = (type, problemText, solution) => {
        const parts = problemText.match(/^([-+]?\d+) [+-x/÷] [(]?([-+]?\d+)[)]? = /);
        const left = parseInt(parts[1], 10);
        const right = parseInt(parts[2], 10);
        const leftAbsVal = Math.abs(left);
        const rightAbsVal = Math.abs(right);
        const maxAbsVal = (leftAbsVal > rightAbsVal) ? leftAbsVal : rightAbsVal;
        const minAbsVal = (leftAbsVal < rightAbsVal) ? leftAbsVal : rightAbsVal;
        const sameSigns = (left > 0 && right > 0) || (left < 0 && right < 0);
    
        let solutionString = "";
        switch (type) {
            case "addition":
                if (left + right !== solution) {
                    throw new Error("generateSolution(): didn't parse question correctly?");
                }
                if (right === 0 || left === 0) {
                    solutionString += `When you add 0, it will stay ${solution}.`;
                }
                else if (sameSigns) {
                    solutionString += `When integers have the same signs, add the absolute values (${maxAbsVal} + ${minAbsVal}) and keep the sign. ${problemText}${solution}.`
                }
                else {
                    solutionString += `When the integers have different signs, subtract the absolute values (${maxAbsVal} - ${minAbsVal}) and take the sign of the integer with the larger absolute value. ${problemText}${solution}.`
                }
                break;
            case "subtraction":
                if (left - right !== solution) {
                    throw new Error("generateSolution(): didn't parse question correctly?");
                }
                if (right < 0) {
                    solutionString += `Subtracting a negative is the same as adding ${left} + ${rightAbsVal}.`;
                }
                else if (right === 0) {
                    solutionString += `Subtracting by 0, ${left} stays the same.`;
                }
                else {
                    solutionString += `Start at ${left} and count down ${rightAbsVal} to ${solution}.`;
                }
                break;
            case "multiplication":
                if (left * right !== solution) {
                    throw new Error("generateSolution(): didn't parse question correctly?");
                }
                if (right === 0 || left === 0) {
                    solutionString += `When you multiply by 0, it is just 0.`;
                }
                else if (sameSigns) {
                    solutionString += `Multiply like normal (${leftAbsVal}x${rightAbsVal}) and since they have the same signs it is positive ${solution}.`;
                }
                else {
                    solutionString += `Multiply like normal (${leftAbsVal}x${rightAbsVal}) and since they have different signs it is negative.`;
                }
                break;
            case "division":
                if (left / right !== solution) {
                    throw new Error("generateSolution(): didn't parse question correctly?");
                }
                if (left === 0) {
                    solutionString += `Zero divided by anything is just 0.`;
                }
                else if (sameSigns) {
                    solutionString += `Divide like normal (${leftAbsVal}÷${rightAbsVal}) and since they have the same signs it is positive ${solution}.`;
                }
                else {
                    solutionString += `Divide like normal (${leftAbsVal}÷${rightAbsVal}) and since they have different signs it is negative.`;
                }
                break;
            default:
                throw new Error("FactsPractice: Unexpected operation/type: " + type);
        }
        return solutionString;    
    }

    render() {

        if (!this.props.signOut) {
            throw new Error("IntegersPractice: signOut is null.");
        }

        return (
            <Game problemType="integers"
                userID={this.props.userID}
                signOut={this.props.signOut} 
                timeout={10}
                problemsPerRound={20}
                problemSolution={this.generateSolution} />
        );
    }

}

export default IntegersPractice;