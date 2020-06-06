import React, { useEffect, useState } from 'react';
import config from '../config.js';
const firebase = require('firebase');
var d3 = require('d3');

//get a list nodes for the graph from the database
var nodes = [];
var links = [];
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
firebase.database().ref('movies').child('GraphViz').on('value', snapshot => {
    const state = snapshot.val();
    for (var key in state){
        const movie = state[key];
        nodes.push({data: movie.Poster, radius: 100});
        const actors = movie.Actors.split(', ');
        for (var i=0; i<actors.length; i++){
            if (!nodes.includes(actors[i])){
                nodes.push({data: actors[i], radius: 50});
            }
            //add link between movie and actor
            links.push({source: nodes.indexOf(actors[i]), target: nodes.indexOf(movie.Poster)});
        }
    }
})

function Graph(){

    function chart(){
        //svg stuff
        const obj_nodes = nodes.map(d => Object.create(d));
        const obj_links = links.map(d => Object.create(d));

        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, 1920, 1080]);

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(obj_nodes)
            .join("circle")
            .attr("r", d => d.radius)
            .attr("fill", d3.color("steelblue"));

        const link = svg.append("g")
            .attr("stroke", "999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(obj_links)
            .join("line")
            .attr("stroke-width", 1)

        return svg.node()
    }

    useEffect(() => {
        const elem = document.getElementById("graph");
        elem.appendChild(chart());

    })
    
    return <div id="graph"/>
}
export default Graph;