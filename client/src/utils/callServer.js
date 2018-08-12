import axios from "axios";

export default {
  setLearner: function (profile) {
    return axios.post("/api/learner", profile);
  },
  getLearnerProblems: function (userGoogleID, problemType) {
    const url = `/api/${userGoogleID}/${problemType}`;
    console.log(url);
    return axios.get(url);
  },
  getProblemsByType: function (problemType) {
    return axios.get(`/api/${problemType}`);
  },
  updateLearnerProblemStats: function (problemType, problem) {
    console.log(problem);
    return axios.put(`/api/${problem.learner_id}/${problemType}`, problem);
  },
  getLearnerStats: function (userGoogleID, problemType) {
    console.log("getLearnerFactsStats called");
    return axios.get(`/api/${userGoogleID}/${problemType}/stats`);
  }/*,
  // Saves an article to the database
  saveArticle: function (articleData) {
    return axios.post("/api/user/article", articleData);
  },
  // Deletes an article to the database
  deleteArticle: function (articleData) {
    console.log(articleData);
    return axios.put("/api/user/article", articleData);
  }*/
};