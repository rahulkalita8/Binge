/**
 * Fetch title from object
 * @param {Object} elem DOM object
 * @returns title of the movie / series
 */
function getTitleFromCard(elem) {
  const title = elem.firstElementChild.innerText;
  return title || "";
}

/**
 * Create ratings div element
 * @param {String} title Name of the movie / series
 * @param {String} rating String containing ratings
 * @returns New div object
 */
const getRatingDivElement = (title, rating) => {
  const div = document.createElement("div");
  div.innerHTML = `${title} rating: ${rating}`;
  return div;
};

/**
 * HTML content to ratings div on main page
 * @param {String} imdbRating IMDB rating for the movie
 * @param {String} rottenTomatoRating Rotten tomato rating for the movie
 * @returns HTML content with raings information
 */
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

/**
 * Add ratings div to title card
 * @param {Object} movieTileElement Object containing title details
 */
const addRatingsToTile = async (movieTileElement) => {
  const videoTitle = getTitleFromCard(movieTileElement);
  const tileParent = document.querySelector(".previewModal--metadatAndControls-container");
  const ratings = await getRatings(videoTitle);

  if (!movieTileElement.hasAttribute("ratings")) {
    movieTileElement.insertAdjacentHTML("afterend", getInnerHTML(ratings.imdbRating, ratings.rottenTomato));
    movieTileElement.setAttribute("ratings", ratings);
  }
};

/**
 * Induces delay on function callback for element
 * @param {Object} elem DOM object
 * @param {*} callback callback function
 */
const induceDelay = (elem, callback) => {
  elem.onmouseover = () => {
    setTimeout(() => callback(elem), 2000);
  };
};

/**
 * Observes changes in DOM and triggers the calls to addRatingsToTile, getTitleAndDateFromModal
 */
const observeChangesInDom = async () => {
  const netflixAllTitles = document.querySelectorAll('[id^="title-"]');
  getTitleAndDateFromModal();
  for (title of netflixAllTitles) {
    const elem = title.firstChild;
    induceDelay(elem, addRatingsToTile);
  }
  setTimeout(observeChangesInDom, 500);
};

observeChangesInDom();
