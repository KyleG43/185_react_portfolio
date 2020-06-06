import React, { Component } from 'react';
import Home from './Home';
import Images from './Images';
import Videos from './Videos';
import Projects from './Projects';
import Guestbook from './Guestbook';
import Movies from './Movies';
import AddMovie from './AddMovie';
import CreateList from './CreateList';
import Graph from './Graph';
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
    else if(activeTab == 4){
      return <Movies/>;
    }
    else if(activeTab == 5)
      return <Graph/>;
    else if(activeTab == 6) 
      return <AddMovie/>;
    else if(activeTab == 7)
      return <CreateList/>;
    else if(activeTab == 8) {
      return (
        <SRLWrapper>
          <Projects/>
        </SRLWrapper>
      );
    }
    else {
      return <Guestbook/>;
    }
  }
  render() {

    return (this.displayContent());
  }
}
export default Body;
