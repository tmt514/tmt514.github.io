import React, { Component } from 'react';

export class Quadrant extends Component {
    render() {
        return (<>
        <circle cx={this.props.x} cy={this.props.y} r="100" clipPath={this.props["clip-path"] || ""} />
        </>)
    }
};