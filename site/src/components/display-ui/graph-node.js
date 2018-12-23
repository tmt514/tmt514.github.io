import React from 'react';
import { defaultLineHeight, defaultNodeProps } from './ui-defaults'

export class GraphNode {
    constructor(props) {
        this.props = Object.assign({}, defaultNodeProps)
        this.props = Object.assign(this.props, props)
    }
    
    // Whenever a property changes, the bounding shape needs to be updated.
    updateProps(newProps) {
        Object.assign(this.props, newProps);
    }

    // Computes the most distant point of the bounding shape on the ray
    // shooting from the angle, returns a point (x, y).
    getPeripheralOffsetByAngle(degree) {
        throw "Not Implemented";
    }
    
    // Computes the anchor point by anchor information.
    getAnchorPoint(anchorInfo) {
        throw "Not Implemented";
    }
    
    // Visitor pattern...?
    updateViewBox(viewboxToBeUpdated, offset) {
        throw "Not Implemented";
    }
    
    // Given the transition offsets {x, y}.
    renderSVG(offset) {
        throw "Not Implemented";
    }
};
