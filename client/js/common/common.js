function getRatingsFromLocalStorage(title) {
    const ratingsInLocalStorage = JSON.parse(localStorage.getItem(RATINGS));
    const titleRatings = ratingsInLocalStorage && ratingsInLocalStorage[title];
    return titleRatings;
}

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

const getRatings = async (title) => {
    const ratingsInLocalStorage = getRatingsFromLocalStorage(title);

    if (ratingsInLocalStorage) {
        return ratingsInLocalStorage;
    }

    const titleRatings = await fetchRatings(title);
    storeRatingsInLocalStorage(title, titleRatings);
    return titleRatings;
};