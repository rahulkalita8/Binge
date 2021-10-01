const chrome = require('sinon-chrome');
const fetch = require("isomorphic-fetch")
const apiService = require("../client/js/apiService");
const apiKeys = require("../client/js/apiKeys")
const appConstants= require("../client/js/appConstants")


global.chrome = chrome;
global.fetch = fetch;
    
if(typeof window !== 'undefined') {
    console.log('window is defined');
    global = window;
}

function mockStorage() {
    var storage = {};
    return {
        setItem: function(key, value) {
            storage[key] = value || '';
        },
        getItem: function(key) {
            return storage[key] || null;
        },
        removeItem: function(key) {
            delete storage[key];
        },
        get length () {
            return Object.keys(storage).length;
        },
        key: function(i) {
            var keys = Object.keys(storage);
            return keys[i] || null;
        }
    };
}

global.localStorage = mockStorage();


// Add all Constants here
global.RATINGS = appConstants.RATINGS
global.CASTS = appConstants.CASTS
global.LOCAL_STORAGE_API_KEY = appConstants.LOCAL_STORAGE_API_KEY, 
global.LOCAL_STORAGE_IMDB_API_KEY = global.LOCAL_STORAGE_IMDB_API_KEY

//Add all APIService functions here
global.extractRottenTomatoRating = apiService.extractRottenTomatoRating, 
global.fetchRatings = apiService.fetchRatings, 
global.extractReview = apiService.extractReview, 
global.fetchReviews = apiService.fetchReviews


//Add all API keys here
global.getApiKeyFromStorage = apiKeys.getApiKeyFromStorage
global.getImdbApiKeyFromStorage = apiKeys.getImdbApiKeyFromStorage