import React from 'react'
import GraphNode from './graph-node';


export class GraphEdge {
    constructor(props) {
        this.props = props;
    }
}

// Helper function to compute anchor to offset.
function anchorToOffset(info, node, center) {
    var angle = info.angle || 0;
    var rad = info.angle / 180.0 * Math.PI;
    var ed = info.extraDistance || 0;
    
    var cx = center.x;
    var cy = center.y;
    if (info.at === "boundary") {
        const offset = node.getPeripheralOffsetByAngle(angle);
        cx += offset.x;
        cy += offset.y;
    }

    cx += Math.cos(rad) * ed;
    cy += Math.sin(rad) * ed;
    return {x:cx, y:cy}
}

export default class GraphCollection extends GraphNode {
    static NODES_COUNTER = 0;
    static EDGES_COUNTER = 0;
    constructor(props) {
        super(props);
        this.nodes = {};
        this.edges = {};
        this.hasComputedPositions = false;
    }

    // Adds a new node to the graph by props, return the node.
    addNode(nodeProps, GraphNodeClass = GraphNode) {
        const node = new GraphNodeClass(nodeProps);
        if (node.props.id === "dummyID") {
            node.props.id = `n-${GraphCollection.NODES_COUNTER}`;
            GraphCollection.NODES_COUNTER += 1;
        }
        this.nodes[node.props.id] = node;
        this.hasComputedPositions = false;
        return node;
    }

    // Adds an edge to two existing nodes, return the edge.
    addEdge(edgeProps, GraphEdgeClass = GraphEdge) {
        const edge = new GraphEdgeClass(edgeProps);
        if (edge.props.id === "dummyID") {
            edge.props.id = `e-${GraphCollection.EDGES_COUNTER}`;
            GraphCollection.EDGES_COUNTER += 1;
        }
        this.edges[edge.props.id] = edge;
        this.hasComputedPositions = false;
        return edge;
    }


    
    computePositions() {
        if (this.hasComputedPositions === true) return;
        this.hasComputedPositions = true;
        
        
        const computedNodeCenter = {}
        const visitedNodes = {}
        const dfs = (id) => {
            const node = this.nodes[id];
            visitedNodes[id] = true;

            var finalCX = 0;
            var finalCY = 0;

            const anchorToX = (e) => {
                if (e === undefined) return undefined;
                if (visitedNodes[e.who] === undefined) dfs(e.who);
                return anchorToOffset(e, this.nodes[e.who], computedNodeCenter[e.who]).x;
            }
            const anchorToY = (e) => {
                if (e === undefined) return undefined;
                if (visitedNodes[e.who] === undefined) dfs(e.who);
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
                finalCX = Math.max(...la) - node.getPeripheralOffsetByAngle(180).x;
            } else if (ra.length > 0) {
                finalCX = Math.min(...ra) - node.getPeripheralOffsetByAngle(0).x;
            } else {
                console.warn(`Missing X-anchors for node ${node.id}! Treat as zero.`)
            }

            if (node.props.cy !== undefined) {
                finalCY = node.props.cy;
            } else if (cya !== undefined) {
                finalCY = cya;
            } else if (da.length > 0) {
                finalCY = Math.max(...da) - node.getPeripheralOffsetByAngle(270).y;
            } else if (ua.length > 0) {
                finalCY = Math.min(...ua) - node.getPeripheralOffsetByAngle(90).y;
            } else {
                console.warn(`Missing Y-anchors for node ${node.id}! Treat as zero.`)
            }

            computedNodeCenter[id] = {x:finalCX, y:finalCY};
        };
        
        var i;
        const nodeIDs = Object.keys(this.nodes);
        for (i = 0; i < nodeIDs.length; i++) {
            if (visitedNodes[nodeIDs[i]] === undefined) {
                dfs(nodeIDs[i]);
            }
        }
        
        // Store the computed results.
        this.computedNodeCenter = computedNodeCenter;
    }

    updateViewBox(viewbox, offset) {
        this.computePositions();
        
        var i;
        const nodeIDs = Object.keys(this.nodes);
        for (i = 0; i < nodeIDs.length; i++) {
            var node = this.nodes[nodeIDs[i]];
            const {x, y} = this.computedNodeCenter[node.props.id];
            const center = {x: x+offset.x, y: y+offset.y};
            node.updateViewBox(viewbox, center);
        }
    }
    
    
    renderSVG(offset) {
        this.computePositions();
        
        var i;
        const nodeIDs = Object.keys(this.nodes);
        var renderedNodes = [];
        for (i = 0; i < nodeIDs.length; i++) {
            var node = this.nodes[nodeIDs[i]];
            const {x, y} = this.computedNodeCenter[node.props.id];
            const center = {x: x+offset.x, y: y+offset.y};
            renderedNodes.push(node.renderSVG(center));
        }

        return (<>{renderedNodes}</>)
    }
};
