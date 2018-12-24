import React from 'react';
import { defaultLineHeight, defaultNodeProps } from './ui-defaults'

export default class GraphNode {
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
    getAnchorPoint(anchorInfo, center={x: 0, y: 0}) {
        // Helper function to compute anchor to offset.
        var angle = anchorInfo.angle || 0;
        var rad = anchorInfo.angle / 180.0 * Math.PI;
        var ed = anchorInfo.extraDistance || 0;
        
        var cx = center.x;
        var cy = center.y;
        if (anchorInfo.at === "boundary") {
            const offset = this.getPeripheralOffsetByAngle(angle);
            cx += offset.x;
            cy += offset.y;
        }

        cx += Math.cos(rad) * ed;
        cy += Math.sin(rad) * ed;
        return {x:cx, y:cy}
    }
    
    // Visitor pattern...?
    updateViewBox(viewboxToBeUpdated, offset) {
        throw "Not Implemented";
    }
    
    // Given the transition offsets {x, y}.
    renderSVG(offset) {
        throw "Not Implemented";
    }

    getWidth() {
        return this.getPeripheralOffsetByAngle(0).x - this.getPeripheralOffsetByAngle(180).x
    }
    getHeight() {
        return this.getPeripheralOffsetByAngle(90).y - this.getPeripheralOffsetByAngle(270).y
    }
    
    // Helper function that resets anchor functions correctly.
    resetAnchors() {
        const positionalProps = ["cx", "cy", "cxAnchor", "cyAnchor"];
        for (let key of positionalProps) {
            this.props[key] = undefined;
        }
        Object.assign(this.props, {
            leftAnchors: [],
            rightAnchors: [],
            upAnchors: [],
            downAnchors: [],
        });
    }
};
