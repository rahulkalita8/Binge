const MOVIE_NOT_FOUND = 'Movie not found!';

const extractRottenTomatoRating = (ratingsArray) => {
    if (ratingsArray.length > 0) {
        const rottenTomatoRating = ratingsArray[1]
            ? ratingsArray[1].value
            : 'N/A';
        return rottenTomatoRating;
    }
    return 'N/A';
};

const fetchRatings = async (title) => {
    // we will add functionality for user to give their keys using popup.html
    // we can discuss scope. we can do it or it can be added as future scope.
    let omdbApiKey = await getApiKeyFromStorage() || '84c24527';
    let defaultRatings = {
        imdbRating: 'N/A',
        rottenTomato: 'N/A',
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
            };
        }
    } catch (error) {
        console.log(`Failed to fetch rating: ${error}`);
    }
    return defaultRatings;
};
