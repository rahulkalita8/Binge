const CAST = 'actors';

function createCastList(casts){
    let castList = document.createElement('ol');
    castList.className = "cast-list"
    casts.forEach(cast => {
        let singleCast = document.createElement('ol');
        singleCast.className = "cast"
        let castName = document.createTextNode(cast)
        castName.className = "cast-text"
        singleCast.appendChild(castName);
        castList.appendChild(singleCast);
    });
    return castList;
}

function createCastDiv(casts){
    let castDiv = document.createElement('div')
    castDiv.className = 'cast-div'
    castDiv.appendChild(createCastList(casts))
    return castDiv
}

function listAlreadyExists(){
    return document.getElementsByClassName('cast-div').length !== 0
}

function addToWatchScreen(casts){
    if(!listAlreadyExists()){
        let castDiv = document.getElementsByClassName('ltr-fntwn3')
        castDiv[0].appendChild(createCastDiv(casts))    
    }    
}

/**
 * Function to get cast details based on the movie title
 * @param {*} title 
 * @returns 
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
 * Function to get cast details from local browser storage
 * @param {*} title 
 * @returns 
 */
function getCastDetailsFromLocalStorage(title) {
    const castDetailsInLocalStorage = JSON.parse(localStorage.getItem(CAST));
    const castDetails = castDetailsInLocalStorage && castDetailsInLocalStorage[title];
    return castDetails;
}

/**
 * Function to store cast details in local storage
 * @param {*} title 
 * @param {*} castDetails 
 */
function storeCastDetailsInLocalStorage(title, castDetails) {
    if (title && castDetails) {
        let castDetailsInStorage = JSON.parse(localStorage.getItem(CAST));
        if (!castDetailsInStorage) {
            castDetailsInStorage = {};
        }
        castDetailsInStorage[title] = castDetails;
        localStorage.setItem(CAST, JSON.stringify(castDetailsInStorage));
    }
}

/**
 * Function to get the title of the movie / series that is currently playing in the screen
 * @returns 
 */
function getTitle() {
    let title = ''
    let bottomControlSection = document.getElementsByClassName("ltr-kpws2k").item(0);
    let bottomControlSectionInfo = bottomControlSection.getElementsByTagName("h4");
    
    // For movies, info is obtained this way
    if(bottomControlSectionInfo === null || bottomControlSectionInfo.length === 0) {
        title = bottomControlSection.innerHTML;
    }
    else {
        // For series, info is obtained this way because it has series title name + episode number aswell
        title = bottomControlSection.getElementsByTagName("h4").item(0).innerHTML;
    }
    console.log("Movie title ", title);
    return title;
}

var mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.target.className === 'active ltr-fntwn3'){
            const title = getTitle();
            
            // Get the cast details
            const response = getCastDetails(title).then(result => {
                    let castString = result ? result.cast : null;
                    if(castString === 'N/A' || castString === null)
                        castString = 'Cast Information not available';
                    const casts = castString.split(',');
                    addToWatchScreen(casts)
                });
        }
        else if(mutation.target.className == 'inactive ltr-fntwn3'){
            let castListDiv = document.getElementsByClassName('cast-div')
            if(castListDiv.length > 0){
                castListDiv[0].remove()
            }
        }
    });
  });

  mutationObserver.observe(document.body, {
    attributes: true,
    // characterData: true,
    // childList: true,
    subtree: true,
    // attributeOldValue: true,
    // characterDataOldValue: true
  });