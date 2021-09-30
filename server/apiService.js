const { default: axios } = require("axios");
var API_KEY = "631772a5";

const getRatings = async(title) => {
    /** 
     *Funtion to read the title from api call and return ratings from IMBD and RottenTomatoes
     * @param {title}
     * @return {ratings}
    */
    
     // GET request 
    var URL=`https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`;
    //Object that returns with values
    const ratings = {
        RottenTomatoes: "",
        IMDB: ""
    };
    // Makes request and returns the ratings object populated
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

module.exports = {getRatings}