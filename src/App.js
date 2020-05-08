import React, { Component } from 'react'
import './App.css'
import Tab_List from './components/Tab_List'
import Body from './components/Body'
import SimpleReactLightbox from "simple-react-lightbox"
import BackToTop from "react-back-to-top-button"

export class App extends Component {
  constructor(){
    super();
    this.state = {
      activeTab: 1,
    }
    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }
  }

  render() {
    const tabs = [
      {id: 1, title: 'Home'},
      {id: 2, title: 'Images'},
      {id: 3, title: 'Videos'},
      {id: 4, title: 'Projects'},
      {id: 5, title: 'Guest Book'}
    ]
    return (
      <div className="body">
        <BackToTop showAt={50} speed={1500} easing="easeInOutQuint">
          <button className="topButton">Top</button>
        </BackToTop>
        <h2>{tabs[this.state.activeTab - 1].title}</h2>
        <div className="nav-bar">
          <Tab_List tabs={tabs} activeTab={this.state.activeTab} changeTab={this.changeTab}/>
        </div>
        <SimpleReactLightbox>
          <div className="main-body">
            <Body activeTab={this.state.activeTab}/>
          </div>
        </SimpleReactLightbox>
      </div>
    );
  }
}
export default App;
