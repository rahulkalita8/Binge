var assert = require('chai').assert;

const commonFile = require("../client/js/common/common");

const chrome = require('sinon-chrome');
const fetch = require("isomorphic-fetch")

describe('Testing of the Client Side API Service', function(){

    // before(function () {
    //     global.chrome = chrome;
    //     global.fetch = fetch;
        
    //     if(typeof window !== 'undefined') {
    //         console.log('window is defined');
    //         global = window;
    //     }
    
    //     function mockStorage() {
    //         var storage = {};
    //         return {
    //             setItem: function(key, value) {
    //                 storage[key] = value || '';
    //             },
    //             getItem: function(key) {
    //                 return storage[key];
    //             },
    //             removeItem: function(key) {
    //                 delete storage[key];
    //             },
    //             get length () {
    //                 return Object.keys(storage).length;
    //             },
    //             key: function(i) {
    //                 var keys = Object.keys(storage);
    //                 return keys[i] || null;
    //             }
    //         };
    //     }

    //     global.localStorage = mockStorage();
    //     global.RATINGS = appConstants.RATINGS
    //     global.CASTS = appConstants.CASTS
        
    // });

    it("Check if ratings are fetched", async function(){
        title = "Inception"
        ratings = await commonFile.getRatings(title)
        assert.notEqual(ratings.imdbRating, 'N/B')
        assert.notEqual(ratings.rottenTomato, 'N/B')
        assert.isString(ratings.cast)
    })

    it("Check if ratings are fetched from storage", async function(){
        title = "Inception"
        ratings = await commonFile.getRatings(title)
        assert.notEqual(ratings.imdbRating, 'N/B')
        assert.notEqual(ratings.rottenTomato, 'N/B')
        assert.isString(ratings.cast)
    })

    it("Check if casts are fetched", async function(){
        title = "Inception"
        casts = await commonFile.getCastDetails(title)
        assert.isString(casts.cast)
    })

    it("Check if casts are fetched from storage", async function(){
        title = "Inception"
        casts = await commonFile.getRatings(title)
        assert.isString(casts.cast)
    })

})

