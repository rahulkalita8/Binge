/**
 * Get ratings details based on the series/movie title
 * @param {String} title Title of the series/movie
 * @returns Object with ratings
 */
const getRatings = async (title) => {
    const ratingsInLocalStorage = getRatingsFromLocalStorage(title);

    if (ratingsInLocalStorage) {
        return ratingsInLocalStorage;
    }

    const titleRatings = await fetchRatings(title);
    storeRatingsInLocalStorage(title, titleRatings);
    return titleRatings;
};


/**
 * Get ratings details based on the series/movie title from local storage
 * @param {String} title Title of the series/movie
 * @returns Object with ratings
 */
function getRatingsFromLocalStorage(title) {
    const ratingsInLocalStorage = JSON.parse(localStorage.getItem(RATINGS));
    const titleRatings = ratingsInLocalStorage && ratingsInLocalStorage[title];
    return titleRatings;
}


/**
 * Store ratings details in local storage
 * @param {String} title Title of the series/movie
 * @param {Object} castDetails Object with rating details
 */
function storeRatingsInLocalStorage(title, ratings) {
    if (title && ratings) {
        let ratingsInStorage = JSON.parse(localStorage.getItem(RATINGS));
        if (!ratingsInStorage) {
            ratingsInStorage = {};
        }
        ratingsInStorage[title] = ratings;
        localStorage.setItem(RATINGS, JSON.stringify(ratingsInStorage));
    }
}


/**
 * Get cast details based on the movie title
 * @param {String} title Title of the series/movie
 * @returns Object of String with cast details
 */
 const getCastDetails = async (title) => {
    const castDetailsInLocalStorage = getCastDetailsFromLocalStorage(title);

    if (castDetailsInLocalStorage) {
        return castDetailsInLocalStorage;
    }

    const castDetails = await fetchRatings(title);
    storeCastDetailsInLocalStorage(title, castDetails);
    return castDetails;
};


/**
 * Get cast details from local browser storage
 * @param {String} title Title of the series/movie
 * @returns Object of String with cast details
 */
function getCastDetailsFromLocalStorage(title) {
    const castDetailsInLocalStorage = JSON.parse(localStorage.getItem(CASTS));
    const castDetails = castDetailsInLocalStorage && castDetailsInLocalStorage[title];
    return castDetails;
}


/**
 * Store cast details in local storage
 * @param {String} title Title of the series/movie
 * @param {Object} castDetails Object of String with cast details
 */
function storeCastDetailsInLocalStorage(title, castDetails) {
    if (title && castDetails) {
        let castDetailsInStorage = JSON.parse(localStorage.getItem(CASTS));
        if (!castDetailsInStorage) {
            castDetailsInStorage = {};
        }
        castDetailsInStorage[title] = castDetails;
        localStorage.setItem(CASTS, JSON.stringify(castDetailsInStorage));
    }
}

module.exports = {
    getRatings,
    getRatingsFromLocalStorage,
    storeRatingsInLocalStorage,
    getCastDetails,
    getCastDetailsFromLocalStorage,
    storeCastDetailsInLocalStorage
}