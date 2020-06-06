import React, { useEffect, useState } from 'react';
import config from '../config.js';
const firebase = require('firebase');

function Graph(){
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
        //get a list nodes for the graph from the database
        var graphNodes = [];
        var graphLinks = [];
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        firebase.database().ref('movies').child('GraphViz').on('value', snapshot => {
            const state = snapshot.val();
            for (var key in state){
                const movie = state[key];
                graphNodes.push(movie.Poster);
                const actors = movie.Actors.split(', ');
                for (var i=0; i<actors.length; i++){
                    if (!graphNodes.includes(actors[i])){
                        graphNodes.push(actors[i]);
                    }
                    //add link between movie and actor
                    graphLinks.push({source: graphNodes.indexOf(actors[i]), target: graphNodes.indexOf(movie.Poster)});
                }
            }
        })
        setNodes(graphNodes);
        setLinks(graphLinks);
    }, [shouldRender])



    return(
        <div className="graph">
            <h2>Graph</h2>
        </div>
    )
}
export default Graph;