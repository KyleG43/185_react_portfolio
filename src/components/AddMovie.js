import React, { useEffect, useState } from 'react';
import config from '../config.js';
const firebase = require('firebase');
const axios = require('axios').default;

function AddMovie(){
    const [movieID, setMovieID] = useState('');

    function formSubmit(event){
        event.preventDefault();
        //make sure ID is in the correct form
        if(movieID.length != 9){
            alert("Invalid Imdb ID");
            return;
        }
        if (!(movieID.charAt(0) == 't' && movieID.charAt(1) == 't')){
            alert("Invalid Imdb ID");
            return;
        }
        for(var i=2; i<9; i++){
            if(!(movieID.charAt(i) >= '0' && movieID.charAt(i) <= '9')){
                alert("Invalid Imdb ID");
                return;
            }
        }

        //check if ID is already in database
        var duplicate = false;
        //get firebase reference
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        firebase.database().ref('movies').child('All').on('value', snapshot => {
            const state = snapshot.val();
            for (var key in state){
                if(state[key].imdbID == movieID){
                    duplicate = true;
                    break;
                }
            }
        })
        if(duplicate){
            alert('Movie has already been added');
            return;
        }

        //ID is in correct form and hasn't been added, so make api call and add json to database
        axios('https://www.omdbapi.com/?apikey=7b39182f&i=' + movieID)
                .then(function(movie){
                    //get firebase reference
                    if (!firebase.apps.length) {
                        firebase.initializeApp(config);
                    }

                    //put movie in database
                    firebase.database().ref('movies').child('All').push().set(movie.data);
                    alert("Movie added successfully!");
                });
    }

    function handleChange(event){
        setMovieID(event.target.value);
    }

    return(
        <div className="addMovie">
            <h2>Add a new movie</h2>
            <div className="form">
                <form onSubmit={formSubmit}>
                    <label for="ImdbID">Movie ID</label> <br/>
                    <input type="text" name="ImdbID" value={movieID} onChange={handleChange} placeholder="Imdb ID" required/> <br/> <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    )
}
export default AddMovie;