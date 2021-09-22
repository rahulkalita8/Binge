function createCastList(casts){
    let castList = document.createElement('ol');
    castList.className = "cast-list"
    casts.forEach(cast => {
        let singleCast = document.createElement('li');
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
        let watchDiv = document.getElementsByClassName('ltr-fntwn3')
        watchDiv[0].appendChild(createCastDiv(casts))    
    }    
}

casts = ["Salmon Bhoi", "ShehRakh Khon", "Amor Khon"]

// addToWatchScreen(casts)

var mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.target.className === 'active ltr-fntwn3'){
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