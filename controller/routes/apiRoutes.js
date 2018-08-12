module.exports = function (app) {

    const orm = require("../../models/orm.js");

    app.post("/api/learner", function (req, res) {
        console.log("upsertLearner() called");
        console.log(req.body);
        orm.upsertLearner(req.body)
            .then((data) => { return res.json(data); })
            .catch((error) => {
                console.log(error);
                return res.json(error);
            });
    });

    app.get("/api/:learner/:problemType", function (req, res) {
        console.log("getLearnersProblems() called");
        console.log(req.params);
        orm.getLearnersProblems(req.params.learner, req.params.problemType)
            .then((data) => {
                if (data.length > 0) {
                    return res.json(data);
                }
                // this must be a new user and we need to 
                // create problem statistics for them
                console.log("New user, make new problemStats.");
                orm.createLearnerFacts(req.params.learner, req.params.problemType)
                    .then((data) => {
                        console.log("Created facts, now retrieving.");
                        console.log(data);
                        return orm.getLearnersProblems(req.params.learner, req.params.problemType);
                    })
                    .then((data) => {
                        return res.json(data);
                    })
                    .catch((error) => {
                        console.log(error);
                        return res.json(error);
                    });
            })
            .catch((error) => {
                console.log(error);
                return res.json(error);
            });
    });

    app.put("/api/:learner/:problemType", function (req, res) {
        console.log("updateLearnerProblemStats() called");
        console.log(req.body);
        orm.updateLearnerProblemStats(req.body)
            .then((data) => { return res.json(data); })
            .catch((error) => {
                console.log(error);
                return res.json(error);
            });
    });

    app.get("/api/:learner/:problemType/stats", function (req, res) {
        console.log("getLearnerStats() called");
        console.log(req.params.problemType);
        orm.getLearnerStats(req.params.learner, req.params.problemType)
            .then((data) => {
                //console.log(data);
                return res.json(data);
            })
            .catch((error) => {
                console.log(error);
                return res.json(error);
            });
    });

    /*
    app.get("/api/facts/:type", function (req, res) {
        orm.getFacts(req.params.type, (e, r) => {
            if (e) {
                return res.json(e);
            }
            console.log(r);
            return res.json(r);
        });
    });
    */

};
