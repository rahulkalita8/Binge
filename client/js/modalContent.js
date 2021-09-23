const getTitleAndDateFromModal = async() => {
    /** 
     *Funtion to read the title and data from the modal DOM and inject new rating div if one doesn't exist
     * @param {}
     * @return {}
    */

    // Reads the title name of movie / series from the previewModal--player-titleTreatment-logo class
    let titleElement = document.getElementsByClassName('previewModal--player-titleTreatment-logo')
    let title = (titleElement === undefined) ? null : (titleElement[0] === undefined ? null : titleElement[0].getAttribute("alt"))
    if(!title || title == null) return

    // Reads the year value from the previewModal--detailsMetadata-left .year class
    let metadataElement = document.getElementsByClassName('previewModal--detailsMetadata-left')
    let yearElement = (metadataElement === undefined) ? null : (metadataElement[0] === undefined) ? null : metadataElement[0].getElementsByClassName('year')
    let year = (yearElement === undefined || yearElement == null)  ? null : (yearElement[0] === undefined ? null : yearElement[0].innerText)
    if(!year || year == null) return

    // Removes special characters from the title
    title = title.replace(/[^a-z0-9\s]/gi, '')

    // Removes spaces from the title
    title = title.replace(/ /g, '')
    let divId = 'ratings_' + title + '_' + year

    // Fetches the element with class name present in divId
    let ratingsElement = document.getElementById(divId)

    // Checks if the class exists. If not, it calls other functions
    // which create the div and add it to the DOM
    if(ratingsElement == null) {
        //let ratings = fetchRatings(title) // Calls the backend function to fetch ratings
        ratings = {
            "imdb": 8.8,
            "rottenTomatoes": 8.7,
            "reviews": ["Lorem ipsum dolor sit amet", "consectetur adipiscing elit", "Ut enim ad minim veniam"]
        }
    
        //ratingsDiv - contains the div element created for ratings
        let ratingsDiv = createRatingsDiv(divId, ratings)
        addRatingsToInfoModal(ratingsDiv)
    }
}

function createRatingsDiv(divId, ratings){
    /**
     * Function to create the div for ratings
     * @param {divId} - is the class name
     * @param {ratings} - JSON object which contains the ratings and reviews
     * @return {div} - div element created for ratings
     */
    let div = document.createElement('div')
    let data = `IMDB : ${ratings["imdb"]} <br>Rotten tomatoes : ${ratings["rottenTomatoes"]}`
    let data_html = "<p>" + data + "</p>"

    div.innerHTML = data_html
    div.className = 'ratings'
    div.id = divId

    return div
}

function addRatingsToInfoModal(ratingsDiv){
    /**
     * Function to inject the ratings div to DOM
     * @param {ratingsDiv} - div to be injected
     */

    // Gets the element with the class name - previewModal--detailsMetadata
    let header = document.getElementsByClassName('previewModal--detailsMetadata')

    if(header !== undefined || header[0] !== undefined){
        //injects the div after the node with the class name - previewModal--detailsMetadata
        header[0].parentNode.insertBefore(ratingsDiv, header[0].nextSibling)
    }
}