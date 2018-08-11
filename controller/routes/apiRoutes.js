module.exports = function (app) {

    const orm = require("../../models/orm.js");

    app.post("/api/learner", function (req, res) {
        console.log(req.body);
        orm.upsertLearner(req.body)
            .then((data) => { return res.json(data); })
            .catch((error) => {
                console.log(error);
                return res.json(error);
            });
    });

    app.get("/api/:learner/facts/:type", function (req, res) {
        orm.getLearnersFacts(req.params.learner, req.params.type)
            .then((data) => {
                if (data.length > 0) {
                    return res.json(data);
                }
                // this must be a new user and we need to 
                // create problem statistics for them
                console.log("New user, make new problemStats.");
                orm.getFacts(req.params.type)
                    .then((data) => {
                        console.log("Getting facts.");
                        console.log(data);
                        return orm.createLearnerFacts(req.params.learner,
                            data);
                    })
                    .then((data) => {
                        console.log("Created facts, now retrieving.");
                        console.log(data);
                        return orm.getLearnersFacts(req.params.learner, req.params.type);
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

    app.put("/api/:learner/facts", function (req, res) {
        console.log(req.body);
        orm.updateLearnerFact(req.body)
            .then((data) => { return res.json(data); })
            .catch((error) => {
                console.log(error);
                return res.json(error);
            });
    });

    app.get("/api/:learner/facts/:type/stats", function (req, res) {
        orm.getLearnerFactsStats(req.params.learner, req.params.type)
            .then((data) => {
                console.log(data);
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
