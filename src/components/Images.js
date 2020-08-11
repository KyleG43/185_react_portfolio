import React, { Component } from 'react';
import Grad0 from '../images/grad0.JPG';
import Grad1 from '../images/grad1.JPG';
import Grad2 from '../images/grad2.JPG';
import Grad3 from '../images/grad3.JPG';

export class Images extends Component {
  render() {
    return (
      <div className="pictures">
        <img src={Grad0}/>
        <img src={Grad1}/>
        <img src={Grad2}/>
        <img src={Grad3}/>
      </div>
    );
  }
}
export default Images;
