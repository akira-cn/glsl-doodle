import React, {Component} from 'react';

export default class extends Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://static.codepen.io/assets/embed/ei.js';
    this.refs.codepen.appendChild(script);
  }

  render() {
    const inlineStyle = {
      height: `${this.props.height || 300}px`,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid',
      margin: '1em 0',
      padding: '1em',
    };
    const containerStyle = {margin: '20px 0'};
    return (
      <div className="codepen-container" ref="codepen" style={containerStyle}>
        <p className="codepen"
          data-height={this.props.height}
          data-theme-id={this.props.theme || 'dark'}
          data-default-tab={this.props.tab || 'html,result'}
          data-slug-hash={this.props.codeId}
          data-pen-title={this.props.codeId}
          style={inlineStyle}>
        </p>
      </div>
    );
  }
}
