import React, { Component } from 'react';
import Home from './Home';
import Images from './Images';
import Videos from './Videos';
import Projects from './Projects';
import { SRLWrapper } from "simple-react-lightbox";

export class Body extends Component {
  displayContent = () => {
    var activeTab = this.props.activeTab;
    if(activeTab == 1)
      return (
        <SRLWrapper>
          <Home/>
        </SRLWrapper>
      );
    else if(activeTab == 2)
      return (
        <SRLWrapper>
          <Images/>
        </SRLWrapper>
      );
    else if(activeTab == 3)
      return <Videos/>;
    else
      return (
        <SRLWrapper>
          <Projects/>
        </SRLWrapper>
      );
  }
  render() {

    return (this.displayContent());
  }
}
export default Body;
