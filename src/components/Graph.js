import React, { useEffect, useState } from 'react';
import config from '../config.js';
import { schemeDark2 } from 'd3';
const firebase = require('firebase');
var d3 = require('d3');

//get a list nodes for the graph from database
var nodes = [];
var links = [];
var pushedNodes = [];
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
firebase.database().ref('movies').child('GraphViz').on('value', snapshot => {
    const state = snapshot.val();
    for (var key in state){
        const movie = state[key];
        const movieObject = {title: movie.Title, data: movie.Poster, radius: 100, group: 1};
        nodes.push(movieObject);
        pushedNodes.push(movie.Title);
        const actors = movie.Actors.split(', ');
        for (var i=0; i<actors.length; i++){
            const actorObject = {data: actors[i], radius: 50, group: 2};
            var found = false;
            if (!pushedNodes.includes(actors[i])){
                nodes.push(actorObject);
                pushedNodes.push(actors[i]);
            }
            //add link between movie and actor
            links.push({source: pushedNodes.indexOf(actors[i]), target: pushedNodes.indexOf(movie.Title)});
        }
    }
})

function Graph(){
    function drag(simulation) {
        function dragStarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragEnded(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        return d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded);
    }

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

        const simulation = d3.forceSimulation(obj_nodes)
            .force("link", d3.forceLink().links(links).id(d => { return d.index; }).distance(200))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2));

        var defs = svg.append('svg:defs');

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(obj_nodes)
            .join("circle")
            .attr("r", d => d.radius)
            .attr("fill", d => {
                if (d.group == 1){
                    defs.append("svg:pattern")
                        .attr("id", d.data)
                        .attr("width", 1)
                        .attr("height", 1)
                        .append("svg:image")
                        .attr("xlink:href", d.data)
                        .attr("width", 200)
                        //.attr("height", 200)
                        .attr("x", 0)
                        .attr("y", -50);
                    return "url(#" + d.data + ")";
                }
                return d3.color("steelblue");
            })
            .call(drag(simulation));

        
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                .append("svg:title")
                .text(d => {
                    if (d.group === 2){
                        return d.data;
                    }
                    return d.title;
                });
                
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