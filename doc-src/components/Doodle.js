import React, {Component} from 'react';
import Doodle from '../js/glsl-doodle';

export default class extends Component {
  async componentDidMount() {
    const doodle = new Doodle(this.refs.doodle);
    const fragment = this.props.fragment;
    if(fragment) {
      const program = await doodle.compile(fragment);
      doodle.useProgram(program);
    }
    doodle.render();
  }

  render() {
    return (
      <canvas className="glslDoodle" width="256" height="256" ref="doodle"></canvas>
    );
  }
}
