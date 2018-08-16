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

    app.get("/api/:learner/:category", function (req, res) {
        console.log("getLearnersProblems() called");
        console.log(req.params);
        orm.getLearnersProblems(req.params.learner, req.params.category)
            .then((data) => {
                if (data.length > 0) {
                    return res.json(data);
                }
                // this must be a new user and we need to 
                // create problem statistics for them
                console.log("New user, make new problemStats.");
                orm.createLearnerFacts(req.params.learner, req.params.category)
                    .then((data) => {
                        console.log("Created facts, now retrieving.");
                        console.log(data);
                        return orm.getLearnersProblems(req.params.learner,
                            req.params.category,
                            req.params.limit);
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

    app.put("/api/:learner/:category", function (req, res) {
        console.log("updateLearnerProblemStats() called");
        console.log(req.body);
        orm.updateLearnerProblemStats(req.body)
            .then((data) => {
                //console.log(data); 
                return res.json(data);
            })
            .catch((error) => {
                console.log(error);
                return res.json(error);
            });
    });

    app.get("/api/:learner/:category/stats", function (req, res) {
        console.log("getLearnerStats() called");
        console.log(req.params.category);
        orm.getLearnerStats(req.params.learner, req.params.category)
            .then((data) => {
                console.log(data);
                return res.json(data);
            })
            .catch((error) => {
                console.log(error);
                return res.json(error);
            });
    });

    app.get("/api/image", function (req, res) {
        console.log("getRandomSupportImage() called");
        orm.getRandomSupportImage()
            .then((data) => {
                console.log(data);
                return res.json(data);
            })
            .catch((error) => {
                console.log(error);
                return res.json(error);
            });
    });

};
