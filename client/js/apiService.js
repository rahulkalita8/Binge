const MOVIE_NOT_FOUND = 'Movie not found!';
const SERVER_BUSY = 'Server busy';

/**
 * Extracts rotten tomato ratings from the api rating list
 * @param {Object} ratingsArray Object with rating details 
 * @returns Rotten Tomatoes rating
 */
const extractRottenTomatoRating = (ratingsArray) => {
    if (ratingsArray.length > 0) {
        const rottenTomatoRating = ratingsArray[1]
            ? ratingsArray[1].Value
            : 'N/A';
        return rottenTomatoRating;
    }
    return 'N/A';
};

/**
 * Invokes the OMDB-API with video content title and API key
 * @param {String} title 
 * @returns detailed information about the title - ratings, reviews, cast
 */
const fetchRatings = async (title) => {
    // we will add functionality for user to give their keys using popup.html
    // we can discuss scope. we can do it or it can be added as future scope.
    let omdbApiKey = await getApiKeyFromStorage() || '631772a5';
    let defaultRatings = {
        imdbRating: 'N/A',
        rottenTomato: 'N/A',
        cast: 'N/A',
        reviews: []
    };

    try {
        const omdbResponse = await fetch(
            encodeURI(
                `https://www.omdbapi.com/?apikey=${omdbApiKey}&t=${title}`
            )
        );

        const omdbResponseJson = await omdbResponse.json();
        if (
            omdbResponseJson['Error'] &&
            omdbResponseJson['Error'] === MOVIE_NOT_FOUND
        ) {
            console.log('OMDB unable to find given movie');
        } else {
            defaultRatings = {
                ...defaultRatings,
                imdbRating: omdbResponseJson.imdbRating,
                rottenTomato: extractRottenTomatoRating(
                    omdbResponseJson.Ratings || []
                ),
                cast: omdbResponseJson.Actors,
                reviews: await fetchReviews(omdbResponseJson.imdbID)
            };
        }
    } catch (error) {
        console.log(`Failed to fetch rating: ${error}`);
    }
    return defaultRatings;
};

/**
 * Extracts reviews from the api data list
 * @param {Object} reviewsArray Object with review details 
 * @returns Object with metacritic reviews and publisher
 */
const extractReview = async (reviewsArray) => {
    let data = []
    if (reviewsArray["items"] && reviewsArray["items"].length != 0){
        for(item in reviewsArray["items"]){
            let object = {
                "publisher": reviewsArray["items"][item].publisher,
                "review": reviewsArray["items"][item].content
            }
            data.push(object)
        }
    }
    return data
}

/**
 * Invokes the IMDB-API with IMDB Movie Id and API key
 * @param {String} imdbId IMDB id of the movie
 * @returns Object with metacritic reviews and publisher
 */
const fetchReviews = async(imdbId) => {
    // we will add functionality for user to give their keys using popup.html
    // we can discuss scope. we can do it or it can be added as future scope.
    let reviews = []
    let imdbApiKey = await getImdbApiKeyFromStorage() || 'k_0afyx7ti';
    // let imdbApiKey = 'k_gea4slmo';
    try {
        const imdbResponse = await fetch(
            encodeURI(
                `https://imdb-api.com/en/API/MetacriticReviews/${imdbApiKey}/${imdbId}`
            )
        );

        const imdbResponseJson = await imdbResponse.json();
        if (
            imdbResponseJson['errorMessage'] &&
            imdbResponseJson['errorMessage'] === SERVER_BUSY
        ) {
            console.log('IMDB unable to find metacritic reviews for the given movie ' + imdbId);
        } else {
            reviews = extractReview(imdbResponseJson)
        }
    } catch (error) {
        console.log(`Failed to fetch reviews: ${error}`);
    }
    return reviews;
};


module.exports = {
    extractRottenTomatoRating, 
    fetchRatings, 
    extractReview, 
    fetchReviews
}
