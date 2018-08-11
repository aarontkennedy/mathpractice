import axios from "axios";

export default {
  setLearner: function (profile) {
    return axios.post("/api/learner", profile);
  },
  getLearnerFacts: function (userGoogleID, type) {
    const url = `/api/${userGoogleID}/facts/${type}`;
    console.log(url);
    return axios.get(url);
  },
  getFacts: function (type) {
    return axios.get(`/api/facts/${type}`);
  },
  setLearnerFact: function (problem) {
    return axios.put(`/api/${problem.learner_id}/facts`, problem);
  },
  getLearnerFactsStats: function (userGoogleID, type) {
    console.log("getLearnerFactsStats called");
    return axios.get(`/api/${userGoogleID}/facts/${type}/stats`);
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