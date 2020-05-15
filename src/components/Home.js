import React, { Component } from 'react';
import Sacramento from '../images/sacramento.jpg'

export class Home extends Component {
  render() {
    return (
      <div className="home">
        <img src={Sacramento}/>
        <div className="bio">
          <h5>About Me</h5>
          <p>
            My name is Kyle Giannini. I am a senior at UCSB studying computer
            science. After I graduate, I plan on working in the tech industry.
            In my spare time, I enjoy surfing, playing piano and guitar, and
            hanging out with my friends and my girlfriend.
          </p>
        </div>
      </div>
    );
  }
}
export default Home;
