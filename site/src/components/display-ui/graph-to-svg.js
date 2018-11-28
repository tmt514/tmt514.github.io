import React from 'react'
import { Rectangle } from './shapes'

const defaultNodeProps = {
    id: "dummyID",

    // Defines contents.
    text: "",
    label: null,
    textProps: {
        font: "12pt Roboto",
    },

    // Describes the surrounding shape.
    boundingShapeClass: Rectangle,
    stroke: "black",
    strokeWidth: "1",
    strokeLinejoin: "miter",
    strokeLineCap: undefined,
    strokeDasharray: undefined,
    fill: undefined,

    // Handles position.
    cx: undefined, // X-coordinate for the center.
    cy: undefined, // Y-coordinate for the center.

    cxAnchor: undefined, // info = { who: "nodeID", angle: 0, at: "center", extraDistance: 123 }
    cyAnchor: undefined, // info = { who: "nodeID", angle: 0, at: "boundary", extraDistance: 123 }
    leftAnchors: [],
    rightAnchors: [],
    upAnchors: [],
    downAnchors: [],
    // TODO(tmt514): rotatedAnchors?
}

// Helper function to compute anchor to offset.
function anchorToOffset(info, node, center) {
    var angle = info.angle || 0;
    var rad = info.angle / 180.0 * Math.PI;
    var ed = info.extraDistance || 0;
    
    var cx = center.x;
    var cy = center.y;
    if (info.at === "boundary") {
        offset = node.getPeripheralOffsetByAngle(angle);
        cx += offset.x;
        cy += offset.y;
    }

    cx += Math.cos(rad) * ed;
    cy += Math.sin(rad) * ed;
    return {x:cx, y:cy}
}

export class GraphNode {
    constructor(props) {
        this.props = Object.assign(defaultNodeProps, props);

        this.boundingShape = new this.props.boundingShapeClass(text, textProps);
    }

    // Computes the most distant point of the bounding shape on the ray
    // shooting from the angle.
    getPeripheralOffsetByAngle(degree) {
        return this.boundingShape.getPeripheralOffsetByAngle(degree);
    }

    
    renderSVG({x, y}) {
        const cx = x;
        const cy = y;
        const textLines = this.props.text.split("\n").filter((e) => e !== "");
        const textLineHeight = this.props.textProps.lineHeight || 16;
        var textsvgs = []
        var i;
        var startY = cy - this.boundingShape.textHeight/2 + textLineHeight/2;
        for (i = 0; i < textLines.length; i++) {
            textsvgs.push(<text idx={`text-${i}`} x={cx} y={startY}>{textLines[i]}</text>)
        }
        return (<g key={`n-${this.props.id}`}>
            <g dominantBaseline="central">
                {textsvgs}
            </g>
            <g stroke={this.props.stroke} strokeWidth={this.props.strokeWidth}>
                {this.boundingShape.renderSVG({cx, cy})}
            </g>
        </g>)
    }

    // Visitor pattern...?
    updateViewBox(viewbox, center) {
        this.boundingShape.updateViewBox(viewbox, center)
    }
    
};

export class GraphEdge {
    constructor(props) {
        this.props = props;
    }
}

class GraphToSVG {
    static ID_COUNTER = 0;
    constructor() {
        this.nodes = {};
        this.edges = [];
    }
    
    // Adds a new node to the graph by props, return the node.
    addNode(nodeProps) {
        const node = new GraphNode(nodeProps);
        if (node.props.id === "dummyID") {
            node.props.id = `n-${GraphToSVG.ID_COUNTER}`;
            GraphToSVG.ID_COUNTER += 1;
        }
        this.nodes[node.props.id] = node;
        return node;
    }

    // Adds an edge to two existing nodes, return the edge.
    addEdge(edgeProps) {
        const edge = new GraphEdge(edgeProps);
        this.edges.push(edge);
        return edge;
    }

    // Returns rendering results wrapped in the <g> tag.
    renderSVG() {
        const computedNodeCenter = {}
        const visitedNodes = {}
        const dfs = function findOffsetsByDFS(id) {
            const node = this.nodes[id];
            visitedNodes[id] = true;

            var finalCX = 0;
            var finalCY = 0;

            const anchorToX = (e) => {
                if (e === undefined) return undefined;
                if (visitedNodes[e.who] === undefined) findOffsetsByDFS(e.who);
                return anchorToOffset(e, this.nodes[e.who], computedNodeCenter[e.who]).x;
            }
            const anchorToY = (e) => {
                if (e === undefined) return undefined;
                if (visitedNodes[e.who] === undefined) findOffsetsByDFS(e.who);
                return anchorToOffset(e, this.nodes[e.who], computedNodeCenter[e.who]).y;
            }

            const cxa = anchorToX(node.props.cxAnchor)
            const cya = anchorToY(node.props.cyAnchor)
            const la = node.props.leftAnchors.map(anchorToX)
            const ra = node.props.rightAnchors.map(anchorToX)
            const ua = node.props.upAnchors.map(anchorToY)
            const da = node.props.downAnchors.map(anchorToY)

            if (node.props.cx !== undefined) {
                finalCX = node.props.cx;
            } else if (cxa !== undefined) {
                finalCX = cxa;
            } else if (la.length > 0) {
                finalCX = Math.max(la) - node.getPeripheralOffsetByAngle(180).x;
            } else if (ra.length > 0) {
                finalCX = Math.min(ra) - node.getPeripheralOffsetByAngle(0).x;
            } else {
                console.warn(`Missing anchors for node ${node.id}! Treat as zero.`)
            }

            if (node.props.cy !== undefined) {
                finalCY = node.props.cy;
            } else if (cya !== undefined) {
                finalCY = cya;
            } else if (da.length > 0) {
                finalCY = Math.max(da) - node.getPeripheralOffsetByAngle(270).y;
            } else if (ua.length > 0) {
                finalCY = Math.min(ua) - node.getPeripheralOffsetByAngle(90).y;
            } else {
                console.warn(`Missing anchors for node ${node.id}! Treat as zero.`)
            }

            computedNodeCenter[id] = {x:finalCX, y:finalCY};
        }
        var i;
        const nodeIDs = Object.keys(this.nodes);
        var renderedNodes = [];
        var viewbox = {lx: Infinity, ly = Infinity, ux: -Infinity, uy: -Infinity};
        for (i = 0; i < nodeIDs.length; i++) {
            var node = this.nodes[nodeIDs[i]];
            const center = computedNodeCenter[node.props.id];
            renderedNodes.push(node.renderSVG(center));
            node.updateViewBox(viewbox, center);
        }
        
        // Adds some paddings.
        viewbox.lx -= 10;
        viewbox.ly -= 10;
        viewbox.rx += 10;
        viewbox.ry += 10;

        return (<svg width="640" height="480" viewBox={`${viewbox.lx} ${viewbox.ly} ${viewbox.rx} ${viewbox.ry}`}>
            {renderedNodes}
        </svg>)
    }
};

export default GraphToSVG;