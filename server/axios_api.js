const { default: axios } = require("axios");
const RATINGS = {
    RottenTomatoes: "",
    IMDB: ""
}

const getDetails = async(title) => {
    var API_KEY="631772a5";
    var URL=`https://www.omdbapi.com/?apikey=${API_KEY}&t=${title}`;

    try {
         const response = await axios.get(URL)
         const ratings = response.data['Ratings'];
         ratings.forEach(element => {
             if (element['Source']=="Internet Movie Database"){
                RATINGS["RottenTomatoes"]=element["Value"];
             }
             if (element['Source']=="Rotten Tomatoes"){
                 RATINGS["IMDB"] = element["Value"];
            }
         });
         } catch(errors){
             console.error(errors)
         }

    console.log(RATINGS)
    return RATINGS;
    }




