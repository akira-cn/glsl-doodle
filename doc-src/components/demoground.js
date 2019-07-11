import React, {Component} from 'react';

export default class extends Component {
  render() {
    const iframeStyle = {
      width: '100%',
      height: '370px',
      border: 'none',
    };
    return (
      <iframe src="http://doodle.webgl.group/demo/#/coord2"
        scrolling="yes"
        style={iframeStyle}
      ></iframe>
    );
  }
}
