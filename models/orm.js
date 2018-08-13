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

function verifyProblemTypeTableName(problemType) {
    if (problemType != "facts" && problemType != "integers") {
        throw new Error("verifyProblemTypeTableName() Bad problemType="+problemType);
    }
}

const orm = {
    /*
    resetTopicQuestions:  () => {},
    getTopicQuestions: () => {},
    updateTopicResults: () => {},
    getTopicStatistics: () => {},*/
    upsertLearner: function (profileObj) {
        let queryString = `
INSERT INTO learners VALUES (?, ?, ?, ?, ?, NOW(), NOW())
ON DUPLICATE KEY UPDATE first=?, last=?, email=?, imageURL=?, last_visit=NOW();`
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

    getLearnersProblems: function (learnerID, problemType) {
        verifyProblemTypeTableName(problemType);
        var queryString = `
SELECT ${problemType}.*, problemStats.*  FROM learners
INNER JOIN problemStats ON learners.google_id = problemStats.learner_id
INNER JOIN ${problemType} ON problemStats.problem_id= ${problemType}.problem
WHERE learners.google_id = ?
ORDER BY problemStats.correct/problemStats.attempts,
${problemType}.type, 
problemStats.streak, 
${problemType}.ease LIMIT 20;`;

        return performDatabaseCall(queryString, [learnerID]);
    },

    createLearnerFacts: function (learnerID, problemType) {
        verifyProblemTypeTableName(problemType);
        let q = `
INSERT INTO problemStats (learner_id, problem_id) 
SELECT ?, problem FROM ${problemType};`;

        return performDatabaseCall(q, [learnerID]);
    },

    updateLearnerProblemStats: function (factProblem) {
        let query = `
UPDATE problemStats
SET attempts=?, correct=?, streak=?, last_update=NOW()
WHERE problem_id=? AND learner_id=?;`;
        return performDatabaseCall(query,
            [factProblem.attempts,
            factProblem.correct,
            factProblem.streak,
            factProblem.problem_id,
            factProblem.learner_id]);
    },
    getLearnerStats: function (learnerID, problemType) {
        verifyProblemTypeTableName(problemType);

/*      SUM(problemStats.attempts) as totalAttempts, 
        SUM(problemStats.correct) as totalCorrect, */

        var queryString = `SELECT ${problemType}.type,
ROUND(AVG(problemStats.correct/problemStats.attempts)*100,1) as averageProficiencyPercent 
FROM learners 
INNER JOIN problemStats ON learners.google_id = problemStats.learner_id 
INNER JOIN ${problemType} ON problemStats.problem_id= ${problemType}.problem 
WHERE learners.google_id = ? GROUP BY ${problemType}.type; `;

        return performDatabaseCall(queryString, [learnerID]);
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
