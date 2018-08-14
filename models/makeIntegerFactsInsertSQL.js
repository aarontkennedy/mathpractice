// Core node package for reading and writing files
var fs = require("fs");

// This block of code will create an empty file.
fs.writeFile("integerFactsInsert.sql", "", function (err) {

    // If the code experiences any errors it will log the error to the console.
    if (err) {
        return console.log(err);
    }

    let insert = "USE mathpractice_db;\n";
    insert += "INSERT INTO integers ";
    insert += "(`problem`, `type`, `ease`, `left`, `right`, `samesigns`, `solution`)\n";
    insert += "VALUES";

    let addition = "";
    // create addition problems to insert
    for (let i = -10; i < 11; i++) {
        for (let j = -10; j < 11; j++) {
            const samesigns = (i > 0 && j > 0) || (i < 0 && j < 0);
            let ease = 1;
            if (!samesigns) {
                ease = 2;
            }
            const right = (j < 0) ? `(${j})` : j;
            const problem = `${i} + ${right} = `;
            addition += `\n("${problem}", "addition", ${ease}, ${i}, ${j}, ${samesigns}, ${i + j}),`;
        }
    }

    let subtraction = "";
    // create subtraction problems to insert
    for (let i = -10; i < 11; i++) {
        for (let j = -10; j < 11; j++) {
            const samesigns = (i > 0 && j > 0) || (i < 0 && j < 0);
            let ease = 1;
            if (!samesigns) {
                ease = 2;
            }
            const right = (j < 0) ? `(${j})` : j;
            const problem = `${i} - ${right} = `;
            subtraction += `\n("${problem}", "subtraction", ${ease}, ${i}, ${j}, ${samesigns}, ${i - j}),`;
        }
    }

    let multiplication = "";
    // create multiplication problems to insert
    for (let i = -10; i < 11; i++) {
        for (let j = -10; j < 11; j++) {
            const samesigns = (i > 0 && j > 0) || (i < 0 && j < 0);
            let ease = 0;
            if (!samesigns) {
                ease = 1;
            }
            else if (i > 0 && j > 0) {
                ease = 2;
            }
            const right = (j < 0) ? `(${j})` : j;
            const problem = `${i} x ${right} = `;
            multiplication += `\n("${problem}", "multiplication", ${ease}, ${i}, ${j}, ${samesigns}, ${i * j}),`;
        }
    }

    let division = "";
    // create division problems to insert
    for (let divisor = -10; divisor < 11; divisor++) {
        for (let solution = -10; solution < 11; solution++) {
            if (!divisor) continue; // no division by 0?

            const dividend = divisor * solution;
            const samesigns = (dividend > 0 && divisor > 0) || (dividend < 0 && divisor < 0);
            let ease = 0;
            if (!samesigns) {
                ease = 1;
            }
            else if (dividend > 0 && divisor > 0) {
                ease = 2;
            }
            const right = (divisor < 0) ? `(${divisor})` : divisor;
            const problem = `${dividend} ÷ ${right} = `;
            division += `\n("${problem}", "division", ${ease}, ${dividend}, ${divisor}, ${samesigns}, ${solution}),`;
        }
    }

    division = division.slice(0, -1) + ";";

    fs.appendFile("integerFactsInsert.sql",
        insert + addition + subtraction + multiplication + division,
        function (err) {

            // If an error was experienced we say it.
            if (err) {
                console.log(err);
            }

            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
                console.log("Content Added!");
            }

        });
});



