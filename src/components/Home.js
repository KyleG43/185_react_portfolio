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
            My name is Kyle Giannini. I recently graduated from UC Santa Barbara with a B.S.
            degree in Computer Science. I am currently looking for a full-time Software Engineer
            position. In my spare time, I enjoy surfing, playing piano and guitar, hiking, watching sports, 
            playing video games, going out with my friends, and spending time with my girlfriend. I have a few
            projects that I've been working on recently, you can see them on the projects page of
            this website. Also, if you like my portfolio and want to get in touch, you can leave me
            a message on the Guest Book page. Thank you for taking the time to check out my portfolio!
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
