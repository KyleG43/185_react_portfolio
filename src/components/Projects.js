import React, { Component } from 'react';
import Plane from '../images/plane.ico';
import Spartify from '../images/spartify_logo.png';
import Spring from '../images/springboot.png';

export class Projects extends Component {
  render() {
    return (
      <div className="projects">
        <div className="project">
        <img src={Plane}/>
          <p>
            Trip Planner: A Ruby on Rails web app with a React front end that my girlfriend and I are
            making that helps users plan vacations and other trips.
          </p>
        </div>
        <div className="project">
        <img src={Spartify}/>
          <p>
            Spartify: An Android app that I made in college that utilizes the Spotify API to let users host
            party queues that guests can join and add songs to from their devices.
          </p>
        </div>
        <div className="project">
          <img src={Spring}/>
          <p>
            <a href="https://ucsb-cs56-where-is-every1.herokuapp.com/" target="_blank">Where Is Every1</a>:
            A Spring Boot app my friends and I made to see when UCSB classrooms are empty so we could use the space to study.
          </p>
        </div>
      </div>
    );
  }
}
export default Projects;
