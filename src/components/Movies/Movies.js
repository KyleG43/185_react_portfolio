import React, { useEffect, useState } from 'react';
import movies from './movieCodes.json';
const axios = require('axios').default;

function Movies(){
    const [responses, setResponses] = useState([]);
    const [sent, setSent] = useState(false);
    
    if (!sent){
        var res = []
        for(var movie in movies){
            axios('http://www.omdbapi.com/?apikey=7b39182f&i=' + movies[movie])
                .then(function(response){
                    res.push(response.data);
                    if (res.length == 8)
                        setResponses(res);
                        setSent(true);
                });
            //console.log(res)
        }
    }

    console.log(responses);

    return(
        <div className="movies">
            {responses.map((res, index) => (
                <img src={res.Poster}/>
            ))}
        </div>
    );
}
export default Movies;

/*{responses.map((res, index) => (
                <div className="movie">
                    <p>{res.Title}</p>
                </div>
            ))}*/