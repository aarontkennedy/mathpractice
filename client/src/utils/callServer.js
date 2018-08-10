import axios from "axios";

export default {
    setUser: function (userData) {
        return axios.post("/api/user", userData);
    },
    getUser: function (userGoogleID) {
      return axios.get(`/api/user/${userGoogleID}`);
    },
    // Saves an article to the database
    saveArticle: function(articleData) {
      return axios.post("/api/user/article", articleData);
    },
    // Deletes an article to the database
    deleteArticle: function(articleData) {
      console.log(articleData);
      return axios.put("/api/user/article", articleData);
    }
};