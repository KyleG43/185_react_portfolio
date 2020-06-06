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
        const movieObject = {data: movie.Poster, radius: 100};
        nodes.push(movieObject);
        const actors = movie.Actors.split(', ');
        for (var i=0; i<actors.length; i++){
            const actorObject = {data: actors[i], radius: 50};
            if (!nodes.includes(actors[i])){
                nodes.push(actorObject);
            }
            //add link between movie and actor
            links.push({source: nodes.indexOf(actorObject), target: nodes.indexOf(movieObject)});
        }
    }
})


function Graph(){
    console.log(links)
    function chart(){
        //svg stuff
        const width = 1920;
        const height = 1080;

        const obj_nodes = nodes.map(d => Object.create(d));
        const obj_links = links.map(d => Object.create(d));

        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, height]);

        const link = svg.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(obj_links)
            .join("line")
            .attr("stroke-width", 1);

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(obj_nodes)
            .join("circle")
            .attr("r", d => d.radius)
            .attr("fill", d3.color("steelblue"));

        console.log(nodes)
        console.log(links)
        const simulation = d3.forceSimulation(obj_nodes)
            .force("link", d3.forceLink().links(links).id(d => { return d.index; }).distance(200))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));
        
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        });

        return svg.node()
    }

    useEffect(() => {
        const elem = document.getElementById("graph");
        elem.appendChild(chart());
    })
    
    return <div id="graph"/>
}
export default Graph;