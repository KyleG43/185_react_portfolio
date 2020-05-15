import React, { useEffect, useState } from 'react';
import movies from './movieCodes.json';
const axios = require('axios').default;

function Movies(){
    const [responses, setResponses] = useState([]);
    const [sent, setSent] = useState(false);
    
    if (!sent){
        setSent(true);
        var res = []
        for(var movie in movies){
            axios('http://www.omdbapi.com/?apikey=7b39182f&i=' + movies[movie])
                .then(function(response){
                    res.push(response.data);
                    if (res.length == Object.keys(movies).length)
                        setResponses(res);
                });
        }
    }

    return(
        <div className="movies">
            {responses.map((res, index) => (
                <img src={res.Poster} alt={res.Title + ' | ' + res.Director + ' | ' + res.Ratings[0].Value}/>
            ))}
        </div>
    );
}
export default Movies;