import React, {Component} from 'react';

export default class extends Component {
  render() {
    const iframeStyle = {
      width: '100%',
      height: `${this.props.height || 420}px`,
      border: 'solid 1px #ccc',
      margin: '10px 0',
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
