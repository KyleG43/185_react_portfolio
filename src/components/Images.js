import React, { Component } from 'react';
import Late from '../images/late.jpg';
import Surfing from '../images/surfing.jfif';
import Italy from '../images/italy.jfif';
import UCSB from '../images/ucsb.jpg';
import Football from '../images/49ers.jfif';
import Tahoe from '../images/tahoe.jfif';
import Tomorrowland from '../images/tomorrowland.jpg';

export class Images extends Component {
  render() {
    return (
      <div className="pictures">
        <img src={Late}/>
        <img src={Surfing}/>
        <img src={Italy}/>
        <img src={UCSB}/>
        <img src={Football}/>
        <img src={Tahoe}/>
        <img src={Tomorrowland}/>
      </div>
    );
  }
}
export default Images;
