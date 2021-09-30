// const CAST = 'actors';

/**
 * Create an ordered list of the casts
 * @param {Object} casts Object of strings with cast name 
 * @returns A HTML ordered list element
 */
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

/**
 * Create a div to display casts
 * @param {Object} casts Object of strings with cast name 
 * @returns A div element
 */
function createCastDiv(casts){
    let castDiv = document.createElement('div')
    castDiv.className = 'cast-div'
    castDiv.appendChild(createCastList(casts))
    return castDiv
}

/**
 * Check if the list of cast already exists
 * @returns true if cast list element exists, false otherwise
 */
function listAlreadyExists(){
    return document.getElementsByClassName('cast-div').length !== 0
}

/**
 * Add the cast to the watch screen
 * @param {Object} casts Object of strings with cast name 
 */
function addToWatchScreen(casts){
    if(!listAlreadyExists()){
        let castDiv = document.getElementsByClassName('ltr-fntwn3')
        castDiv[0].appendChild(createCastDiv(casts))    
    }    
}


/**
 * Get the title of the movie / series that is currently playing in the screen
 * @returns String with title of the series/movie
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


/**
 * Mutation Observer to monitor any changes in the DOM. This will check if the watch screen is "active" which means it was hovered
 */
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

  /**
   * Observe the DOM for any activity
   * The commented keys are properties that we can use to monitor any activity
   */
  mutationObserver.observe(document.body, {
    attributes: true,
    // characterData: true,
    // childList: true,
    subtree: true,
    // attributeOldValue: true,
    // characterDataOldValue: true
  });