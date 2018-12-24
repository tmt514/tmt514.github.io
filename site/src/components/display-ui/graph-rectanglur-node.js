import React from 'react'
import GraphNode from './graph-node'
import { Rectangle } from './shapes'
import { GraphTextNode } from './graph-text-node';

export default class GraphRectangularNode extends GraphNode {
    // props.content should store the "inner" GraphNode.
    constructor(props, updateProps) {
        super(props)
        console.log("Creating Rectuangular Node: ", props);
        this.innerNode = props.content;
        this.boundingShape = this.getBoundingShape();
    }

    getBoundingShape() {
        const innerNode = this.innerNode;
        const paddingX = (this.props.paddingX || this.props.padding);
        const paddingY = (this.props.paddingY || this.props.padding);
        var width = innerNode.getPeripheralOffsetByAngle(0).x - innerNode.getPeripheralOffsetByAngle(180).x + paddingX*2;
        var height = innerNode.getPeripheralOffsetByAngle(90).y - innerNode.getPeripheralOffsetByAngle(270).y + paddingY*2;
        if (this.props.maxWidth) width = Math.min(width, this.props.maxWidth);
        if (this.props.minWidth) width = Math.max(width, this.props.minWidth);
        if (this.props.maxHeight) height = Math.min(height, this.props.maxHeight);
        if (this.props.minHeight) height = Math.max(height, this.props.minHeight);
        return new Rectangle(width, height)
    }

    updateProps(newProps) {
        throw "Not Supported";
    }

    getPeripheralOffsetByAngle(degree) {
        return this.boundingShape.getPeripheralOffsetByAngle(degree);
    }

    // Given computed center coordinates, generate entire SVG.
    renderSVG(offset) {
        return (<g key={`n-${this.props.id}`}>
            <g
                stroke={this.props.stroke}
                strokeWidth={this.props.strokeWidth}
                fill={this.props.fill}>
                {this.boundingShape.renderSVG(offset)}
            </g>
            { this.innerNode.renderSVG(offset) }
        </g>)
    }

    // Visitor pattern...?
    updateViewBox(viewbox, center) {
        this.boundingShape.updateViewBox(viewbox, center)
    }
    
};

export class GraphRectangularTextNode extends GraphRectangularNode {
    constructor(props) {
        super(Object.assign(props, {content: new GraphTextNode(props)}))
    }

    updateProps(newProps) {
        const hasTextChanged = (newProps.text !== undefined);
        Object.assign(this.props, newProps)
        if (hasTextChanged === true) {
            this.innerNode = new GraphTextNode(this.props);
        }
        this.boundingShape = this.getBoundingShape();
    }
}