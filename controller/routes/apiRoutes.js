module.exports = function (app) {

    const orm = require("../../models/orm.js");

    app.post("/api/learner", function (req, res) {
        console.log(req.body);
        orm.upsertUser();
    });
    

};
