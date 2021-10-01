var isWaitingForResponse = false;

/**
 *Read the title and data from the modal DOM and inject new rating div if one doesn't exist
 * @param {}
 * @return
 */
const getTitleAndDateFromModal = async () => {
  // Reads the title name of movie / series from the previewModal--player-titleTreatment-logo class
  let titleElement = document.getElementsByClassName("previewModal--player-titleTreatment-logo");
  let title =
    titleElement === undefined ? null : titleElement[0] === undefined ? null : titleElement[0].getAttribute("alt");
  if (!title || title == null) return;

  // Reads the year value from the previewModal--detailsMetadata-left .year class
  let metadataElement = document.getElementsByClassName("previewModal--detailsMetadata-left");
  let yearElement =
    metadataElement === undefined
      ? null
      : metadataElement[0] === undefined
      ? null
      : metadataElement[0].getElementsByClassName("year");
  let year =
    yearElement === undefined || yearElement == null
      ? null
      : yearElement[0] === undefined
      ? null
      : yearElement[0].innerText;
  if (!year || year == null) return;

  // Removes special characters from the title
  updatedTitle = title.replace(/[^a-z0-9\s]/gi, "");

  // Removes spaces from the title
  updatedTitle = updatedTitle.replace(/ /g, "");
  let ratingsDivId = "ratings_" + updatedTitle + "_" + year;
  let reviewsDivId = "reviews_" + updatedTitle + "_" + year;

  // Fetches the element with class name present in divId
  let ratingsElement = document.getElementById(ratingsDivId);

  // Checks if the class exists. If not, it calls other functions
  // which create the div and add it to the DOM
  if (ratingsElement == null && !isWaitingForResponse) {
    isWaitingForResponse = true;
    let ratings = await getRatings(title); // Calls the backend function to fetch ratings

    if (ratings) {
      //ratingsDiv - contains the div element created for ratings
      if (ratings["reviews"].length != 0 && ratings["reviews"][0]["review"] != "") {
        let reviewsDiv = createReviewsDiv(reviewsDivId, ratings);
        addRatingsToInfoModal(reviewsDiv);
        addEventLisitner();
        updateReviews(reviewsDivId);
      }

      let ratingsDiv = createRatingsDiv(ratingsDivId, ratings);
      addRatingsToInfoModal(ratingsDiv);
      isWaitingForResponse = false;
    }
  }
};

/**
 * Create div for ratings
 * @param {String} divId contains the DivId
 * @param {Object} ratings Object which contains the ratings and reviews
 * @return Object div element created for ratings
 */
function createRatingsDiv(divId, ratings) {
  let div = document.createElement("div");
  let data = `IMDB : ${ratings["imdbRating"]} <br>Rotten tomatoes : ${ratings["rottenTomato"]}`;
  let data_html = "<p>" + data + "</p>";

  div.innerHTML = data_html;
  div.className = "ratings";
  div.id = divId;

  return div;
}

/**
 * Create div for reviews
 * @param {String} divId contains the DivId
 * @param {Object} ratings Object which contains the ratings and reviews
 * @return Object div element created for ratings
 */
function createReviewsDiv(divId, ratings) {
  let reviews_div = document.createElement("div");
  reviews_div.className = "parent_reviews";
  reviews_div.id = divId;

  reviews_data = ratings["reviews"];

  prev_element = createAnchorElement("review_prev", "prev", "❮");
  reviews_div.appendChild(prev_element);

  for (var index = 0; index < reviews_data.length; index++) {
    let review_div = document.createElement("div");
    let publisher = `-${reviews_data[index]["publisher"]}`;
    let review = `${reviews_data[index]["review"]}`;
    let review_html = "<q>" + review + "</q>";
    let publisher_html = "<p><i>" + publisher + "</i></p>";

    review_div.innerHTML = review_html + publisher_html;
    review_div.className = "review";
    reviews_div.appendChild(review_div);
  }

  next_element = createAnchorElement("review_next", "next", "❯");
  reviews_div.appendChild(next_element);

  return reviews_div;
}

/**
 * Create div for prev, next
 * @param {String} divId div if of element
 * @param {String} className class name of element
 * @param {String} innerText inner text of element
 * @returns Object div element created for anchors
 */
function createAnchorElement(divId, className, innerText) {
  element = document.createElement("a");
  element.id = divId;
  element.innerText = innerText;
  element.className = className;
  return element;
}

/**
 * Inject the ratings and reviews div to DOM
 * @param {Object} newDiv div to be injected to DOM
 * @returns
 */
function addRatingsToInfoModal(newDiv) {
  // Gets the element with the class name - previewModal--detailsMetadata
  let header = document.getElementsByClassName("previewModal--detailsMetadata");

  if (header !== undefined || header[0] !== undefined) {
    //injects the div after the node with the class name - previewModal--detailsMetadata
    header[0].parentNode.insertBefore(newDiv, header[0].nextSibling);
  }
}

/**
 * Update reviews displayed in the modal
 * @param {}
 * @returns
 */
function updateReviews() {
  slideIndex = Math.floor(Math.random() * 3);
  let slides = document.getElementsByClassName("review");
  if (slides) {
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
  }
}

/**
 * Listen to "click" events on the prev and next anchor elements for the reviews
 * @param {}
 * @returns
 */
function addEventLisitner() {
  prev_button = document.getElementById("review_prev");
  prev_button.addEventListener("click", updateReviews, false);

  next_button = document.getElementById("review_next");
  next_button.addEventListener("click", updateReviews, false);
}
