const CAST = 'actors';

function createCastList(casts){
    let castList=document.createElement('ol');
    castList.className = "cast-list"
    for(var i=0;i<casts.length;i++)
    {
        let singleCast=document.createElement('li');
        singleCast.className = "cast"
        let castName = document.createTextNode(casts[i])
        castName.className = "cast-text"
        singleCast.appendChild(castName);
        castList.appendChild(singleCast);
    }
    return castList;
}

function createCastDiv(casts){
    let castDiv = document.createElement('div')
    castDiv.className = 'cast-div'
    castDiv.appendChild(createCastList(casts))
    return castDiv
}

function listAlreadyExists(){
    return document.getElementsByClassName('cast-div').length != 0
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

    const castDetails = await getMovieDetails(title);
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

casts = ["Salmon Bhoi", "ShehRakh Khon", "Amor Khon"]

// addToWatchScreen(casts)

function getMovieTitle()
{
    let x = document.getElementsByClassName("ltr-kpws2k");
    let y = x.item(0);
    let z = y.innerHTML;
    // let z = y.getElementsByTagName("h4").item(0).innerHTML;
    console.log(x);
    console.log(y);
    console.log(z);
}

var mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.target.className === 'active ltr-fntwn3'){
            getMovieTitle();
            addToWatchScreen(casts)
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