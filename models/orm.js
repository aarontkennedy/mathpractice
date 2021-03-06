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

    getLearnersProblems: function (learnerID, problemCategory, limit=20) {
        var queryString = `
SELECT problems.*, problemStats.*, problemSubTypes.* FROM learners
INNER JOIN problemStats ON learners.google_id = problemStats.learner_id
INNER JOIN problems ON problemStats.problem_id= problems.problem
INNER JOIN problemSubTypes ON problemSubTypes.type= problems.type 
WHERE learners.google_id =? AND problems.category=?
ORDER BY problemStats.correct/problemStats.attempts,
problemSubTypes.difficulty, 
problemStats.streak, 
problems.ease LIMIT ?;`;

        return performDatabaseCall(queryString, [learnerID, problemCategory, limit]);
    },

    createLearnerFacts: function (learnerID, problemCategory) {
        let q = `
        INSERT INTO problemStats (learner_id, problem_id)
        SELECT ?, problem FROM problems WHERE problems.category=?;`;
        console.log(q);
        console.log(learnerID);
        console.log(problemCategory);

        return performDatabaseCall(q, [learnerID, problemCategory]);
    },

    updateLearnerProblemStats: function (problemStats) {
        let query = `
UPDATE problemStats
SET attempts=?, correct=?, streak=?, last_update=NOW()
WHERE problem_id=? AND learner_id=?;`;
        return performDatabaseCall(query,
            [problemStats.attempts,
            problemStats.correct,
            problemStats.streak,
            problemStats.problem_id,
            problemStats.learner_id]);
    },
    getLearnerStats: function (learnerID, problemCategory) {

        var queryString = `
SELECT problems.type,
AVG(problemStats.correct/problemStats.attempts) AS averageProficiencyPercent, 
SUM(IF(problemStats.attempts > 0, 1, 0))/COUNT(*) AS percentAttempted
FROM learners 
INNER JOIN problemStats ON learners.google_id = problemStats.learner_id 
INNER JOIN problems ON problemStats.problem_id= problems.problem 
INNER JOIN problemSubTypes ON problemSubTypes.type= problems.type
WHERE learners.google_id = ? AND problems.category = ? 
GROUP BY problems.type
ORDER BY problemSubTypes.difficulty;`;

        return performDatabaseCall(queryString, [learnerID,problemCategory]);
    },
    getRandomSupportImage: function () {

        var queryString = `SELECT inspirationalGiphies.url FROM inspirationalGiphies WHERE RAND()<=0.05 LIMIT 1;
        `;

        return performDatabaseCall(queryString, []);
    }

};

module.exports = orm;
