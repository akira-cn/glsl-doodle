import React, {Component} from 'react';

export default class extends Component {
  render() {
    const iframeStyle = {
      width: '100%',
      height: '420px',
      border: 'none',
    };
    const source = `//doodle.webgl.group/demo/#/${this.props.demoId}`;
    return (
      <iframe src={source}
        scrolling="yes"
        style={iframeStyle}
      ></iframe>
    );
  }
}