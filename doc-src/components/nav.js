import React, {Component} from 'react';

export default class extends Component {
  render() {
    let root = '/demo';
    if(window.location.hostname === '127.0.0.1') {
      root = '//localhost:3030';
    }
    return (
      <nav className="app-nav">
        <a href="/">Home</a>
        <a href={root} target="_blank">Demo</a>
      </nav>
    );
  }
}
