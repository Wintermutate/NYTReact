// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Geocoder API
var apiKey = "dce66ab77558461d9ffda1b04ced17df";

// Helper functions for making API Calls
var helper = {

  // This function serves our purpose of running the query to geolocate.
  runQuery: function(searchTerm, startYear, endYear) {

    console.log(location);

    // Figure out the geolocation
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" + searchTerm  + "&begin_date=" + startYear + "0101" + "&end_date=" + endYear + "0101";
    return axios.get(queryURL).then(function(response) {
      // If get get a result, return that result's formatted address property
      if (response.data.response.docs[0]) {
        return response.data.response.docs;
      }
      // If we don't get any results, return an empty string
      return "";
    });
  },

  // This function hits our own server to retrieve the record of query results
  getHistory: function() {
    return axios.get("/api");
  },

  // This function posts new searches to our database.
  postHistory: function(article) {
    return axios.post("/api", { article: article });
  },

  deleteHistory: function(articleID){
    return axios.delete("/api/" + articleID);
  }
};

// We export the API helper
module.exports = helper
