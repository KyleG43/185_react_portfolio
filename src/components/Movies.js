import React, { useEffect, useState } from 'react';
//const axios = require('axios').default;
import config from '../config.js'
import { useLightbox } from 'simple-react-lightbox';
import { act } from 'react-dom/test-utils';
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
            if(searchTitle != '' && state[movie]){
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

    var clickedMovie = {};
    function imageClick(event){
        for (var i=0; i<movies.length; i++){
            if(movies[i].Poster == event.target.src){
                clickedMovie = movies[i];
                break;
            }
        }
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.add('active');
        document.getElementById('lightboxImage').src = clickedMovie.Poster;
        document.getElementById('lbTitle').textContent = clickedMovie.Title;
        document.getElementById('lbScore').textContent = 'IMDb Rating: ' + clickedMovie.imdbRating;
        document.getElementById('lbPlot').textContent = clickedMovie.Plot;
        document.getElementById('lbAwards').textContent = 'Awards: ' + clickedMovie.Awards;
        document.getElementById('lbDirector').textContent = 'Directed by ' + clickedMovie.Director;
        document.getElementById('lbRuntime').textContent = clickedMovie.Runtime;

        //generate options for add to list dropdown
        const addToList = document.getElementById('addToList');
        const option = document.createElement('option');
        option.textContent = "Add to list";
        option.value = '';
        option.selected = true;
        option.disabled = true;
        option.hidden = true;
        addToList.appendChild(option);
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        for (var i=0; i<lists.length; i++){
            var inList = false;
            firebase.database().ref('movies').child(lists[i]).on('value', snapshot => {
                const state = snapshot.val();
                for (var key in state){
                    if(state[key].Title == clickedMovie.Title){
                        inList = true;
                        break;
                    }
                }
                if(!inList){
                    const option = document.createElement('option');
                    option.value = lists[i];
                    option.textContent = lists[i];
                    addToList.appendChild(option);
                }
            })
        }
    }

    function lightboxClick(event) {
        if (event.target !== event.currentTarget) return;
        const activeLightbox = document.getElementById(event.target.id);
        const addToList = document.getElementById('addToList');
        if(!addToList.value == ''){
            //get firebase reference
            if (!firebase.apps.length) {
                firebase.initializeApp(config);
            }

            //put movie in database
            firebase.database().ref('movies').child(addToList.value).push().set(clickedMovie);
        }
        while(addToList.firstChild){
            addToList.removeChild(addToList.firstChild);
        }
        activeLightbox.classList.remove('active');
    }

    function deleteClick(event) {
        //get firebase reference
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        //delete clicked movie from all lists
        for (var i=0; i<lists.length; i++){
            firebase.database().ref('movies').child(lists[i]).on('value', snapshot => {
                const state = snapshot.val();
                for (var key in state){
                    if(state[key].Title == clickedMovie.Title){
                        firebase.database().ref('movies').child(lists[i]).child(key).remove();
                        break;
                    }
                }
            })
        }
        for (var i=0; i<lists.length; i++){
            //check if list is already in database
            var duplicate = false;
            //get firebase reference
            if (!firebase.apps.length) {
                firebase.initializeApp(config);
            }
            firebase.database().ref('movies').on('value', snapshot => {
                const state = snapshot.val();
                for (var list in state){
                    if(list == lists[i]){
                        duplicate = true;
                        break;
                    }
                }
            })
            if(!duplicate){
                //put list in database
                firebase.database().ref('movies').child(lists[i]).set("");
            }
        }
        
        //close the lightbox
        var activeLightBox = document.getElementById("lightbox");
        activeLightBox.classList.remove('active');
        alert("Movie deleted successfully!")
        setShouldRender(!shouldRender);
    }

    return(
        <div className="movies">
            <div classname="movieOptions">
                <select id="listSelector" name="lists" onChange={handleListChange} required>
                    {lists.map((list, index) => (
                        <option value={list}>{list}</option>
                    ))}
                </select>
                <input type="text" name="title" value={searchTitle} onChange={handleSearchChange} placeholder="Search Movie Titles"/>
            </div>
            {movies.map((movie, index) => (
                <img src={movie.Poster} onClick={imageClick}/>
            ))}
            <div id="lightbox" onClick={lightboxClick}>
                <div className="lbContent">
                    <div className="lightboxPoster">
                        <img id="lightboxImage"/>
                    </div>
                    <div className="lightboxOther">
                        <h3 id="lbTitle"/>
                        <p id="lbScore"/>
                        <p id="lbPlot"/>
                        <p id="lbAwards"/>
                        <b id="lbDirector"/>
                        <p id="lbRuntime"/>
                        <br/>
                        <br/>
                        <div className="lbOptions">
                            <button id="delete" onClick={deleteClick}>Delete</button>
                            <select id="addToList"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default Movies;