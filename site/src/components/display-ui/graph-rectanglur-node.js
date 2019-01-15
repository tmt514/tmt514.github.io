import React from 'react'
import GraphNode from './graph-node'
import { Rectangle } from './shapes'
import { GraphTextNode } from './graph-text-node';
import GraphCollection from './graph-collection';
import AnchorInfo from './anchor-info';

export default class GraphRectangularNode extends GraphNode {
    // props.content should store the "inner" GraphNode.
    constructor(props, updateProps) {
        super(props)
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

export class GraphArrayNode extends GraphRectangularNode {
    // props.content will be an array.
    constructor(props) {
        const data = props.content;
        const collection = new GraphCollection();
        const nodes = []
        var lastNode = null;
        var i;
        for (i = 0; i < data.length; i++) {
            const nodeOrText = data[i];
            var node;
            if ((typeof nodeOrText) !== "object") {
                node = collection.addNode({...props, id: "dummyID", text: `${nodeOrText}`}, GraphRectangularTextNode);
            } else {
                node = collection.addNode(nodeOrText);
            }
            // make sure anchors are correct.
            node.resetAnchors();
            if (lastNode !== null) {
                node.updateProps({
                    leftAnchors: [new AnchorInfo(lastNode.props.id, 0, "boundary", 0)],
                    cyAnchor: new AnchorInfo(lastNode.props.id, 0, "center", 0),
                })
            } else {
                node.updateProps({
                    cx: 0,
                    cy: 0,
                })
            }
            lastNode = node;
            nodes.push(node);
        }
        // Adjust min-height
        const minHeight = Math.max(0, ...nodes.map((node) => node.getHeight()));
        nodes.forEach((node) => node.updateProps({ minHeight: minHeight }));

        super({ ...props, padding: 0, strokeWidth: "0", content: collection });
        this.collection = collection;
        this.data = data;
        this.dataNodes = nodes;
    }

    getAnchorPoint(anchorInfo, center) {
        if (typeof anchorInfo.at !== "string")
            return this.collection.getAnchorPoint(anchorInfo, center);
        return GraphRectangularNode.prototype.getAnchorPoint.call(this, anchorInfo, center);
    }
    
    updateProps(newProps) {
        console.warn("Not Changed Yet.", newProps);
    }
}
