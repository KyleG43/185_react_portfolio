import React, { Component } from 'react';
import './App.css'
import Tab_List from './components/Tab_List';
import Body from './components/Body'

export class App extends Component {
  constructor(){
    super();
    this.state = {
      activeTab: 1
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
      {id: 4, title: 'Projects'}
    ]
    return (
      <div className="body">
        <div className="nav-bar">
          <Tab_List tabs={tabs} activeTab={this.state.activeTab} changeTab={this.changeTab}/>
        </div>
        <div className="main-body">
          <Body activeTab={this.state.activeTab}/>
        </div>
      </div>
    );
  }
}
export default App;
