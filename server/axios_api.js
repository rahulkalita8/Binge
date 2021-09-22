const { default: axios } = require("axios");
var API_KEY="631772a5";


const getRatings = async(title) => {
    var URL=`https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`;
    const ratings = {
        RottenTomatoes: "",
        IMDB: ""
    };
    try {
         const response = await axios.get(URL)
         const data = response.data.Ratings;
         data.forEach(rating => {
             if (rating.Source=="Internet Movie Database"){
                ratings.IMDB=rating.Value;
             }
             if (rating.Source=="Rotten Tomatoes"){
                 ratings.RottenTomatoes = rating.Value;
            }
         });
         } catch(errors){
             console.error(errors);
         }
    return ratings;
    }
var axios = require("axios").default;
var HOST = "movies-tvshows-data-imdb.p.rapidapi.com";
var API_KEY = "030611f594msh73349b7b00af6e8p16d57ejsncbf1b45a6165";
var URL = "https://movies-tvshows-data-imdb.p.rapidapi.com/";



function get_details(id) {
  var options = {
    method: 'GET',
    url: URL,
    params: {type: 'get-movie-details', imdb: id},
    headers: {
      'x-rapidapi-host': HOST,
      'x-rapidapi-key': API_KEY
    }
  };
  axios.request(options).then(function (response) {
    console.log("rating:"+response.data["imdb_rating"]+"\n"+"popularity:"+response.data["popularity"]+"\n"+"vote:"+response.data["vote_count"]);
  }).catch(function (error) {
    console.error(error);
  });

const RATINGS = {
    RottenTomatoes: "",
    IMDB: ""
}


const getRatings = async(title) => {
    var URL=`https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`;
    const ratings = {
        RottenTomatoes: "",
        IMDB: ""
    };
    try {
         const response = await axios.get(URL)
         const data = response.data.Ratings;
         data.forEach(rating => {
             if (rating.Source=="Internet Movie Database"){
                ratings.IMDB=rating.Value;
             }
             if (rating.Source=="Rotten Tomatoes"){
                 ratings.RottenTomatoes = rating.Value;
            }
         });
         } catch(errors){
             console.error(errors);
         }
    return ratings;
    }


