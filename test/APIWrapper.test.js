var assert = require('chai').assert;
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var APIWrapper = require("../server/apiService");

describe('APIWrapper', function(){

    var title;
    it("Should return response for the given title", async function(){
        title = "Inception"
        ratings = await APIWrapper.getRatings(title)
        assert.isNotEmpty(ratings.IMDB)
    })

})

