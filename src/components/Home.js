import React, { Component } from 'react';
import Profile from '../images/profile.JPG'

export class Home extends Component {
  render() {
    return (
      <div className="home">
        <img height="10%" src={Profile}/>
        <div className="bio">
          <h5>About Me</h5>
          <p>
            My name is Kyle Giannini. I am a senior at UCSB studying computer
            science. After I graduate, I plan on working in the tech industry.
            In my spare time, I enjoy surfing, playing piano and guitar, and
            hanging out with my friends and my girlfriend.
          </p>
          <div className="home">
            <a href="https://1drv.ms/b/s!ArJIC4tehjeo8EtUsZz9PPvEXppM" target="_blank">Resume</a>
            <a href="https://www.linkedin.com/in/kyle-giannini-cs/" target="_blank">LinkedIn</a>
            <a href="https://github.com/kyleg43" target="_blank">GitHub</a>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
