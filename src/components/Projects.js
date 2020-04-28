import React, { Component } from 'react';
import Spring from '../images/springboot.png';

export class Projects extends Component {
  render() {
    return (
      <div className="projects">
        <div className="where">
          <img src={Spring}/>
          <p>
            <a href="https://ucsb-cs56-where-is-every1.herokuapp.com/" target="_blank">Where Is Every1</a>:
            A web app my friends and I made to see when UCSB classrooms aren't being used</p>
          </div>
      </div>
    );
  }
}
export default Projects;
