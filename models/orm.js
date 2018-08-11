const databaseConnectionInfo = require("./mySQLconnection.js");
const mysql = require("mysql");
const pool = mysql.createPool(databaseConnectionInfo);

function performDatabaseCall(queryStr, parameters = null) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }
            console.log('connected as id ' + connection.threadId);

            // conduct the actual requested query
            connection.query(queryStr, parameters, function (err, result) {
                if (err) {
                    reject(err);
                }
                connection.release();
                resolve(result);
            });
        });
    });
}

const orm = {
    /*
    resetTopicQuestions:  () => {},
    getTopicQuestions: () => {},
    updateTopicResults: () => {},
    getTopicStatistics: () => {},*/
    upsertLearner: function (profileObj) {
        let queryString = 'INSERT INTO learners ';
        queryString += 'VALUES (?, ?, ?, ?, ?, NOW(), NOW()) ';
        queryString += 'ON DUPLICATE KEY UPDATE `first`=?, `last`=?, `email`=?, `imageURL`=?, `last_visit`=NOW();';
        return performDatabaseCall(queryString,
            [profileObj.googleID,
            profileObj.first,
            profileObj.last,
            profileObj.email,
            profileObj.imageURL,
            profileObj.first,
            profileObj.last,
            profileObj.email,
            profileObj.imageURL]);
    },
    getFacts: function (type) {
        var queryString = "SELECT problem FROM basicMathFacts ";
        queryString += "WHERE basicMathFacts.`type` = ?;";

        return performDatabaseCall(queryString, [type]);
    },
    getLearnersFacts: function (learnerID, type) {
        var queryString = "SELECT basicMathFacts.*, problemStats.*  FROM learners ";
        queryString += "INNER JOIN problemStats ON learners.`google_id` = problemStats.`learner_id`";
        queryString += "INNER JOIN basicMathFacts ON problemStats.`problem_id`= basicMathFacts.`problem`";
        queryString += "WHERE learners.`google_id` = ?";
        queryString += "AND basicMathFacts.`type` = ? ";
        queryString += "ORDER BY problemStats.`streak`, basicMathFacts.`ease` LIMIT 20;";

        return performDatabaseCall(queryString, [learnerID, type]);
    },
    createLearnerFact: function (learnerID, problem) {
        let queryString = 'INSERT INTO problemStats ';
        queryString += 'VALUES (?, ?, 0, 0, 0, NOW());';
        return performDatabaseCall(queryString, [problem, learnerID]);
    },
    createLearnerFacts: function (learnerID, problemsArray) {
        let q = 'INSERT INTO problemStats VALUES ';

        for (let i = 0; i < problemsArray.length; i++) {
            q += `("${problemsArray[i].problem}", "${learnerID}", 0, 0, 0, NOW())`;
            if (i < problemsArray.length - 1) {
                q += ",";
            }
        }
        q += ";";
        return performDatabaseCall(q, null);
    },
    updateLearnerFact: function (factProblem) {
        let query = `UPDATE problemStats
        SET attempts=?, correct=?, streak=?, last_update=NOW()
        WHERE problem_id=? AND learner_id=?;`;
        return performDatabaseCall(query,
            [factProblem.attempts,
                factProblem.correct, 
                factProblem.streak,
                factProblem.problem_id,
                factProblem.learner_id]);
    },
    getLearnerFactsStats: function (learnerID, type) {
        var queryString = 'SELECT ';
        queryString += 'SUM(problemStats.attempts) as totalAttempts, ';
        queryString += 'SUM(problemStats.correct) as totalCorrect, ';
        queryString += 'ROUND(AVG(problemStats.correct/problemStats.attempts)*100,1) as averageProficiencyPercent ';
        queryString += 'FROM learners ';
        queryString += 'INNER JOIN problemStats ON learners.`google_id` = problemStats.`learner_id` ';
        queryString += 'INNER JOIN basicMathFacts ON problemStats.`problem_id`= basicMathFacts.`problem` ';
        queryString += 'WHERE learners.`google_id` = ? ';
        queryString += 'AND basicMathFacts.`type` = ?; ';

        return performDatabaseCall(queryString, [learnerID, type]);
    }

    /*searchBurgerName: function (textInput, callback) {
        const queryString = `SELECT * FROM burgers WHERE name LIKE ? LIMIT 5;`;
        performDatabaseCall(queryString, ["%" + textInput + "%"], callback);
    },
    getBurgers: function (callback, limit = -1) {
        var queryString = "SELECT * FROM burgers ORDER BY name";
        if (limit > 0) {
            queryString += " LIMIT " + limit;
        }
        queryString += ";";
        performDatabaseCall(queryString, callback);
    },
    addBurger: function (name, description, callback) {
        var queryString =
            "INSERT INTO burgers (`name`, `description`) VALUES (?, ?);";
        performDatabaseCall(queryString, [name, description], callback);
    },
    addEater: function (id, name, callback) {
        var queryString =
            'INSERT INTO eaters (`google_id`, `name`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `name`=?;';

        performDatabaseCall(queryString, [id, name, name], callback);
    },
    getEater: function (id, callback) {
        var queryString = 'SELECT * FROM eaters WHERE google_id LIKE ?';
        performDatabaseCall(queryString, [id], callback);
    },
    addBurgerEaten: function (eaterID, burgerID, burgerRating, callback) {
        var queryString =
            'INSERT INTO burgersEaten (`eater_id`, `burger_id`, `rating`) VALUES (?, ?, ?)';
        performDatabaseCall(queryString, [eaterID, burgerID, burgerRating], callback);
    },
    getBurgersEaten: function (eaterID, callback) {
        var queryString = `SELECT burgers.name AS burgerName,
            rating AS burgerRating, 
            DATE_FORMAT(date, "%m/%d/%Y") AS burgerDate
            FROM burgers
            INNER JOIN burgersEaten
            ON burgers.id = burgersEaten.burger_id
            INNER JOIN eaters
            ON eaters.google_id = ?
            ORDER BY burgerDate DESC;`;
        performDatabaseCall(queryString, [eaterID], callback);

    },
    getBurgersEatenDifferentCount: function (eaterID, callback) {
        var queryString = `SELECT burgers.name AS burgerName, COUNT(*) AS burgerCount
            FROM burgers
            INNER JOIN burgersEaten
            ON burgers.id = burgersEaten.burger_id
            INNER JOIN eaters
            ON eaters.google_id = ?
            GROUP BY burgerName;`;

        performDatabaseCall(queryString, [eaterID], callback);
    },
    getRowCountAllTables: function (callback) {
        var queryString = "SELECT TABLE_NAME, TABLE_ROWS ";
        queryString += "FROM `information_schema`.`tables` " 
        queryString += "WHERE `table_schema` = '"+databaseConnectionInfo.database+"';";
        performDatabaseCall(queryString, callback);
    }*/
};

module.exports = orm;
