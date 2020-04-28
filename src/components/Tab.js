import React, { Component } from 'react';

export class Tab extends Component {
  addStyling = () => {
    if(this.props.tab.id == this.props.activeTab){
      return {color: '#F0EDED'}
    }
    else {
      return {color: '#2A89F0'}
    }
  }
  render() {
    return (
      <div className='tab' style={this.addStyling()} onClick={this.props.changeTab.bind(this, this.props.tab.id)}>
        <h5>{this.props.tab.title}</h5>
      </div>
    );
  }
}
export default Tab;
