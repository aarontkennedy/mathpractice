generateSolution = (type, problemText, solution) => {
    const parts = problemText.match(/^([-+]?\d+) [+-x/÷] [\(]?([-+]?\d+)[\)]? = /);
    const left = parseInt(parts[1]);
    const right = parseInt(parts[2]);
    const leftAbsVal = Math.abs(left);
    const rightAbsVal = Math.abs(right);
    const maxAbsVal = (leftAbsVal > rightAbsVal) ? leftAbsVal : rightAbsVal;
    const minAbsVal = (leftAbsVal < rightAbsVal) ? leftAbsVal : rightAbsVal;
    const sameSigns = (left > 0 && right > 0) || (left < 0 && right < 0);

    let solutionString = "";
    switch (type) {
        case "addition":
            if (left + right != solution) {
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
            if (left - right != solution) {
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
            if (left * right != solution) {
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
            if (left / right != solution) {
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

console.log(generateSolution("addition", "0 + (-8) = ", -8));
console.log(generateSolution("addition", "-6 + 8 = ", 2));
console.log(generateSolution("addition", "-10 + -8 = ", -18));

console.log(generateSolution("subtraction", "-9 - 0 = ", -9));
console.log(generateSolution("subtraction", "16 - (-8) = ", 24));
console.log(generateSolution("subtraction", "-10 - 8 = ", -18));

console.log(generateSolution("multiplication", "-4 x 0 = ", 0));
console.log(generateSolution("multiplication", "2 x -8 = ", -16));
console.log(generateSolution("multiplication", "-10 x -8 = ", 80));

console.log(generateSolution("division", "0 ÷ -4 = ", 0));
console.log(generateSolution("division", "-8 ÷ 8 = ", -1));
console.log(generateSolution("division", "-16 ÷ -4 = ", 4)); 

