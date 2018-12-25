import React from 'react'
import GraphNode from './graph-node';
import GraphEdge from './graph-edge';
import { Rectangle } from './shapes';

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
        // If the input is already a node object, just added it into the dictionary.
        if (nodeProps instanceof GraphNode) {
            this.nodes[nodeProps.props.id] = nodeProps;
            this.hasComputedPositions = false;
            return nodeProps;
        }
        
        // Otherwise, create a new node.
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
            if (node === undefined) {
                console.warn("Node is not found in this collection: ", id);
                return;
            }
            visitedNodes[id] = true;

            var finalCX = 0;
            var finalCY = 0;

            const anchorToX = (e) => {
                if (e === undefined) return undefined;
                if (visitedNodes[e.who] === undefined) dfs(e.who);
                return this.nodes[e.who].getAnchorPoint(e, computedNodeCenter[e.who]).x;
            }
            const anchorToY = (e) => {
                if (e === undefined) return undefined;
                if (visitedNodes[e.who] === undefined) dfs(e.who);
                return this.nodes[e.who].getAnchorPoint(e, computedNodeCenter[e.who]).y;
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

        // find viewbox
        var viewbox = {lx: Infinity, ly: Infinity, rx: -Infinity, ry: -Infinity};
        for (i = 0; i < nodeIDs.length; i++) {
            var node = this.nodes[nodeIDs[i]];
            const center = this.computedNodeCenter[node.props.id];
            node.updateViewBox(viewbox, center);
        }        
        this.viewbox = viewbox;
        
        // We should shift everything so that the "center" of the entire
        // collection stays at center.
        var shiftX = (viewbox.rx + viewbox.lx)/2;
        var shiftY = (viewbox.ry + viewbox.ly)/2;
        for (i = 0; i < nodeIDs.length; i++) {
            const c = computedNodeCenter[nodeIDs[i]];
            c.x -= shiftX;
            c.y -= shiftY;
        }
        viewbox.lx -= shiftX;
        viewbox.rx -= shiftX;
        viewbox.ly -= shiftY;
        viewbox.ry -= shiftY;
    }

    getPeripheralOffsetByAngle(degree) {
        this.computePositions();
        const width = Math.max(0, this.viewbox.rx - this.viewbox.lx);
        const height = Math.max(0, this.viewbox.ry - this.viewbox.ly);
        const shape = new Rectangle(width, height);
        return shape.getPeripheralOffsetByAngle(degree);
    }

    updateViewBox(viewbox, offset) {
        this.computePositions();
        viewbox.lx = Math.min(viewbox.lx, this.viewbox.lx + offset.x);
        viewbox.rx = Math.max(viewbox.rx, this.viewbox.rx + offset.x);
        viewbox.ly = Math.min(viewbox.ly, this.viewbox.ly + offset.y);
        viewbox.ry = Math.max(viewbox.ry, this.viewbox.ry + offset.y);
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
        const edgeIDs = Object.keys(this.edges);
        var renderedEdges = [];
        for (i = 0; i < edgeIDs.length; i++) {
            var edge = this.edges[edgeIDs[i]];
            renderedEdges.push(edge.renderSVG(this));
        }
        console.log(renderedEdges);

        return (<>
            {renderedEdges}
            {renderedNodes}
        </>)
    }
};
