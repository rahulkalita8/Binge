var assert = require('chai').assert;

var apiService = require("../client/js/apiService");
const {getApiKeyFromStorage} = require("../client/js/apiKeys")
const {LOCAL_STORAGE_API_KEY} = require("../client/js/appConstants")

const chrome = require('sinon-chrome');
const fetch = require("isomorphic-fetch")

describe('Testing of the Client Side API Service', function(){

    before(function () {
        global.chrome = chrome;
        global.fetch = fetch;
        global.getApiKeyFromStorage = getApiKeyFromStorage
        global.LOCAL_STORAGE_API_KEY = LOCAL_STORAGE_API_KEY
    });

    var title;
    it("Check if ratings are fetched", async function(){
        title = "Inception"
        ratings = await apiService.fetchRatings(title)
        console.log("Ratings:", ratings)
        assert.notEqual(ratings.imdbRating, 'N/B')
        assert.notEqual(ratings.rottenTomato, 'N/B')
        assert.isString(ratings.cast)
    })

    it("Check extraction of Rotten Tomato Rating", function(){
        ratingsArray= [
            {
                Source: "Internet Movie Database",
                Value: "8.8/10"
            },{
                Source: "Rotten Tomatoes",
                Value: "87%"
            },{
                Source: "Metacritic",
                Value: "74/100"
            }],
        assert.isArray(ratingsArray)
        extractedRating = apiService.extractRottenTomatoRating(ratingsArray)
        console.log("Expected Rating: ", extractedRating)
        assert.equal(extractedRating, "87%")
        assert.notEqual(extractedRating, "N/A")
    })

    it('Check extration of Rotten Tomato ratings when array is null', function(){
        ratingsArray = []
        assert.isEmpty(ratingsArray)
        extractedRating = apiService.extractRottenTomatoRating(ratingsArray)
        console.log("Expected Rating False: ", extractedRating)
        assert.equal(extractedRating, 'N/A')
    })

})

