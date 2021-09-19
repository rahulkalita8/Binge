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

}


function get_id(t){
  var options = {
    method: 'GET',
    url: URL,
    params: {type: 'get-movies-by-title', title: t},
    headers: {
      'x-rapidapi-host': HOST,
      'x-rapidapi-key': API_KEY
    }
  };
  
  axios.request(options).then(function (response) {
    var results = response.data.movie_results;
    results.forEach(function(e,i){
      console.log(e['imdb_id'])
      return(e['imdb_id'])
    });
  }).catch(function (error) {
    console.error(error);
  });
}



// Local test

async function main(){
  var test_query = "i am legend";
  var id = await get_id(test_query);
  get_details(id);
}
main();




