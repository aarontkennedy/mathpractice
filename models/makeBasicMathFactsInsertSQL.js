// Core node package for reading and writing files
var fs = require("fs");

// This block of code will create an empty file.
fs.writeFile("basicMathFactsInsert.sql", "", function (err) {

    // If the code experiences any errors it will log the error to the console.
    if (err) {
        return console.log(err);
    }

    let insert = "USE mathpractice_db;\n";
    insert += "INSERT INTO basicMathFacts ";
    insert += "(`problem`, `type`, `ease`, `left`, `right`, `solution`)\n";
    insert += "VALUES";

    let addition = "";
    // create addition problems to insert
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            let ease = 2;
            if (i < 5 && j < 5) {
                ease = 0;
            }
            else if (i < 7 && j < 7) {
                ease = 1;
            }
            const problem = `${i} + ${j} = `;
            addition += `\n("${problem}", "addition", ${ease}, ${i}, ${j}, ${i + j}),`;
        }
    }

    let subtraction = "";
    // create subtraction problems to insert
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j <= i; j++) {
            let ease = 2;
            if (j < 5) {
                ease = 0;
            }
            else if (j < 7) {
                ease = 1;
            }
            const problem = `${i} - ${j} = `;
            subtraction += `\n("${problem}", "subtraction", ${ease}, ${i}, ${j}, ${i - j}),`;
        }
    }

    let multiplication = "";
    // create multiplication problems to insert
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 12; j++) {
            let ease = 2;
            if (i < 5 && j < 5) {
                ease = 0;
            }
            else if (i < 7 && j < 7) {
                ease = 1;
            }
            const problem = `${i} x ${j} = `;
            multiplication += `\n("${problem}", "multiplication", ${ease}, ${i}, ${j}, ${i * j}),`;
        }
    }

    let division = "";
    // create division problems to insert
    for (let divisor = 1; divisor < 12; divisor++) {
        for (let solution = 0; solution < 12; solution++) {
            let ease = 2;
            if (divisor < 5 && solution < 5) {
                ease = 0;
            }
            else if (divisor < 7 && solution < 7) {
                ease = 1;
            }
            const dividend = divisor * solution;
            const problem = `${dividend} ÷ ${divisor} = `;
            division += `\n("${problem}", "division", ${ease}, ${dividend}, ${divisor}, ${solution}),`;
        }
    }

    division = division.slice(0, -1) + ";";

    fs.appendFile("basicMathFactsInsert.sql",
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



