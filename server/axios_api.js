const { default: axios } = require("axios");
var API_KEY = "631772a5";


const getRatings = async (title) => {
    var URL = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`;
    const ratings = {
        RottenTomatoes: "",
        IMDB: ""
    };
    try {
        const response = await axios.get(URL)
        const data = response.data.Ratings;
        data.forEach(rating => {
            if (rating.Source == "Internet Movie Database") {
                ratings.IMDB = rating.Value;
            }
            if (rating.Source == "Rotten Tomatoes") {
                ratings.RottenTomatoes = rating.Value;
            }
        });
    } catch (errors) {
        console.error(errors);
    }
    return ratings;
}


const getMovieDetails = async (title) => {
    var URL = `https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`;
    const movieDetails = {
        RottenTomatoes: "",
        IMDB: "",
        Cast: "",
    };
    try {
        const response = await axios.get(URL)
        const data = response.data;
        const ratings = data.Ratings;
        const cast = data.Actors;
        ratings.forEach(rating => {
            if (rating.Source == "Internet Movie Database") {
                movieDetails.IMDB = rating.Value;
            }
            if (rating.Source == "Rotten Tomatoes") {
                movieDetails.RottenTomatoes = rating.Value;
            }
        });
    } catch (errors) {
        console.error(errors);
    }
    return movieDetails;
}

