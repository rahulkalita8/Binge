// const RATINGS = 'ratings';

function getTitleFromCard(elem) {
    const title = elem.firstElementChild.innerText;
    return title || '';
}

// const getRatings = async (title) => {
//     const ratingsInLocalStorage = getRatingsFromLocalStorage(title);

//     if (ratingsInLocalStorage) {
//         return ratingsInLocalStorage;
//     }

//     const titleRatings = await fetchRatings(title);
//     storeRatingsInLocalStorage(title, titleRatings);
//     return titleRatings;
// };

// function storeRatingsInLocalStorage(title, ratings) {
//     if (title && ratings) {
//         let ratingsInStorage = JSON.parse(localStorage.getItem(RATINGS));
//         if (!ratingsInStorage) {
//             ratingsInStorage = {};
//         }
//         ratingsInStorage[title] = ratings;
//         localStorage.setItem(RATINGS, JSON.stringify(ratingsInStorage));
//     }
// }

// function getRatingsFromLocalStorage(title) {
//     const ratingsInLocalStorage = JSON.parse(localStorage.getItem(RATINGS));
//     const titleRatings = ratingsInLocalStorage && ratingsInLocalStorage[title];
//     return titleRatings;
// }

const getRatingDivElement = (title, rating) => {
    const div = document.createElement('div');
    div.innerHTML = `${title} rating: ${rating}`;
    return div;
};

const getInnerHTML = (imdbRating, rottenTomatoRating) => {
    const innerHTML = `
    <div>
    <p style="background-color: red;
        z-index: 2;
        margin-top: 0px;
        position: absolute;
        top:0; right:0;"
    >IMDB: ${imdbRating}</p>
    <p style="background-color: red;
    z-index: auto;
    margin-top: 0px;
    position: absolute;
    top:0; left:0;"
>Rotten Tomato: ${rottenTomatoRating}</p>
    </div>
    `;

    return innerHTML;
};

const addRatingsToTile = async (movieTileElement) => {
    const videoTitle = getTitleFromCard(movieTileElement);
    const tileParent = document.querySelector(
        '.previewModal--metadatAndControls-container'
    );
    const ratings = await getRatings(videoTitle);

    if (!movieTileElement.hasAttribute('ratings')) {
        movieTileElement.insertAdjacentHTML(
            'afterend',
            getInnerHTML(ratings.imdbRating, ratings.rottenTomato)
        );
        movieTileElement.setAttribute('ratings', ratings);
    }
};

const induceDelay = (elem, callback) => {
    elem.onmouseover = () => {
        setTimeout(() => callback(elem), 2000);
    };
};

const observeChangesInDom = async () => {
    const netflixAllTitles = document.querySelectorAll('[id^="title-"]');
    getTitleAndDateFromModal()
    for (title of netflixAllTitles) {
        const elem = title.firstChild;
        induceDelay(elem, addRatingsToTile);
    }
    setTimeout(observeChangesInDom, 500);
};

observeChangesInDom();
