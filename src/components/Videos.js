import React, { Component } from 'react';

export class Videos extends Component {
  render() {
    return (
      <div className="videos">
        <iframe src="https://www.youtube.com/embed/2WzW21IPGhw" allowfullscreen></iframe>
        <iframe src="https://www.youtube.com/embed/vgEe4uy_hCo" allowfullscreen></iframe>
        <iframe src="https://www.youtube.com/embed/LTqNJYIBJeA" allowfullscreen></iframe>
        <iframe src="https://www.youtube.com/embed/soQbiwpWEi4" allowfullscreen></iframe>
      </div>
    );
  }
}
export default Videos;
