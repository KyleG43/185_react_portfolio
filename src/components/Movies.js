import React, { useEffect, useState } from 'react';
//const axios = require('axios').default;
import config from '../config.js'
const firebase = require('firebase')

function Movies(){
    const [movies, setMovies] = useState([])
    const [lists, setLists] = useState([])
    const [currList, setCurrList] = useState('All')
    const [searchTitle, setSearchTitle] = useState('')
    const [shouldRender, setShouldRender] = useState(true)

    useEffect(() => {
        //It is necessary to check if firebase has already been initialized otherwise it will throw an exception if it tries to initialize again
        //You can put this code in your componentDidMount function, or in an Effect to make sure it is ran when the app loads.
        //Use the second argument to useEffect() to control how often it is ran
        if (!firebase.apps.length) {
           firebase.initializeApp(config)
        }
        //get a reference to the database
        let ref = firebase.database().ref('movies')

        //get list of lists
        ref.on('value', snapshot => {
            const state = snapshot.val();
            var listArray = [];
            for (var list in state)
                listArray.push(list);
            setLists(listArray);
        })
    
        //retrieve its data
        ref.child(currList).on('value', snapshot => {
          //this is your call back function
          //state will be a JSON object after this
          //set your apps state to contain this data however you like
          const state = snapshot.val()
          //since i use react 16, i set my state like this
          //i have previously declared a state variable like this: const [data, setData] = useState([]) so that I can make the below call
          var movieArray = []
          for(var movie in state){
            if(searchTitle != ''){
                if(state[movie].Title.toLowerCase().includes(searchTitle.toLowerCase()))
                    movieArray.push(state[movie]);
            }
            else movieArray.push(state[movie]);
          }
          setMovies(movieArray)
        })    
      }, [shouldRender])

      function handleListChange(event){
        setCurrList(event.target.value);
        setShouldRender(!shouldRender);
      }

      function handleSearchChange(event){
          setSearchTitle(event.target.value);
          setShouldRender(!shouldRender);
      }

    return(
        <div className="movies">
            <div className="list-select">
                <select name="lists" onChange={handleListChange} required>
                    {lists.map((list, index) => (
                        <option value={list}>{list}</option>
                    ))}
                </select>
            </div>
            <div className="search-bar">
                <input type="text" name="title" value={searchTitle} onChange={handleSearchChange} placeholder="Movie Title"/>
            </div>
            {movies.map((movie, index) => (
                <img src={movie.Poster} alt={movie.Title + ' | ' + movie.Director + ' | ' + movie.Ratings[0].Value}/>
            ))}
        </div>
    );
}
export default Movies;