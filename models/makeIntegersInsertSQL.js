// Core node package for reading and writing files
var fs = require("fs");

// This block of code will create an empty file.
fs.writeFile("integersInsert.sql", "", function (err) {

    // If the code experiences any errors it will log the error to the console.
    if (err) {
        return console.log(err);
    }

    /*
    CREATE TABLE problems (
        `problem` VARCHAR(200) NOT NULL PRIMARY KEY,
        `image` VARCHAR(200) DEFAULT "",
        `ease` INT NOT NULL DEFAULT 0, 
        `solution` INT NOT NULL,
        `category` VARCHAR(50),
        `type` VARCHAR(25),
        FOREIGN KEY (`category`) REFERENCES problemCategories(`category`),
        FOREIGN KEY (`type`) REFERENCES problemSubTypes(`type`)
    );
    */

    let insert = "USE mathpractice_db;\n";
    insert += "INSERT INTO problems ";
    insert += "(`problem`, `image`, `ease`, `solution`, `category`, `type`)\n";
    insert += "VALUES";

    let addition = "";
    // create addition problems to insert
    for (let i = -10; i < 11; i++) {
        for (let j = -10; j < 11; j++) {
            let ease = 2;
            if (i >= 0 && j >= 0) {  // let's skip p + p and focus on negs
                continue;
            }
            else if (i === 0 || j === 0) {
                ease = 0;
            }
            else if (i < 0 && j < 0) {
                ease = 1;
            }

            const right = (j < 0) ? `(${j})` : j;
            const problem = `${i} + ${right} = `;
            addition += `\n("${problem}", "", ${ease}, ${i + j}, "integers", "addition"),`;
        }
    }

    let subtraction = "";
    // create subtraction problems to insert
    for (let i = -10; i < 11; i++) {
        for (let j = -10; j < 11; j++) {
            if (i >= 0 && j >= 0) {  // let's skip p * p and focus on negs
                continue;
            }
            let ease = 2;
            if (i === 0 || j === 0) {
                ease = 0;
            }
            else if (j > 0) {
                ease = 1;
            }
            const right = (j < 0) ? `(${j})` : j;
            const problem = `${i} - ${right} = `;
            subtraction += `\n("${problem}", "", ${ease}, ${i - j}, "integers", "subtraction"),`;
        }
    }

    let multiplication = "";
    // create multiplication problems to insert
    for (let i = -10; i < 11; i++) {
        for (let j = -10; j < 11; j++) {
            if (i >= 0 && j >= 0) {  // let's skip p * p and focus on negs
                continue;
            }
            let ease = 0;
            if (i < 0 && j < 0) {
                ease = 2;
            }
            else if (i != 0 && j != 0) {
                ease = 1;
            }

            const right = (j < 0) ? `(${j})` : j;
            const problem = `${i} x ${right} = `;
            multiplication += `\n("${problem}", "", ${ease}, ${i * j}, "integers", "multiplication"),`;
        }
    }

    let division = "";
    // create division problems to insert
    for (let divisor = -10; divisor < 11; divisor++) {
        for (let solution = -10; solution < 11; solution++) {
            if (!divisor) continue; // no division by 0?

            const dividend = divisor * solution;

            if (dividend >= 0 && divisor >= 0) {  // let's skip p * p and focus on negs
                continue;
            }

            let ease = 1;
            if (dividend === 0) {
                ease = 0;
            }
            else if (dividend < 0 && divisor < 0) {
                ease = 2;
            }
            const right = (divisor < 0) ? `(${divisor})` : divisor;
            const problem = `${dividend} ÷ ${right} = `;
            division += `\n("${problem}", "", ${ease}, ${solution}, "integers", "division"),`;
        }
    }

    division = division.slice(0, -1) + ";";

    fs.appendFile("integersInsert.sql",
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



