var assert = require('chai').assert;

const commonFile = require("../client/js/common/common");

// const chrome = require('sinon-chrome');
// const fetch = require("isomorphic-fetch")

describe('Testing of the Client Side API Service', function(){

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

