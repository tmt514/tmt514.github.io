import React from 'react'
import GraphCollection from './graph-collection'


class GraphToSVG {
    constructor() {
        this.graph = new GraphCollection()
        this.markerStore = {}
    }

    addNode(nodeProps, GraphNodeClass) {
        return this.graph.addNode(nodeProps, GraphNodeClass)
    }

    // Helper functions that extract markers from edge props.
    static getMarkersFromEdgeProps(edgeProps) {
        var markers = []
        if (edgeProps.markerStart !== undefined) markers.push(edgeProps.markerStart);
        if (edgeProps.markerMid !== undefined) markers.push(edgeProps.markerMid);
        if (edgeProps.markerEnd !== undefined) markers.push(edgeProps.markerEnd);
        return markers;
    }

    addEdge(edgeProps, GraphEdgeClass) {
        for (let marker of GraphToSVG.getMarkersFromEdgeProps(edgeProps)) {
            this.markerStore[marker.props.id] = marker;
        }
        return this.graph.addEdge(edgeProps, GraphEdgeClass)
    }

    renderSVG() {
        var viewbox = {lx: Infinity, ly: Infinity, rx: -Infinity, ry: -Infinity};
        
        this.graph.updateViewBox(viewbox, {x: 0, y: 0})
        
        // Adds some paddings.
        viewbox.lx -= 10;
        viewbox.ly -= 10;
        viewbox.rx += 10;
        viewbox.ry += 10;
        
        const w = Math.min(640, viewbox.rx - viewbox.lx);
        const h = Math.min(480, viewbox.ry - viewbox.ly);
        
        // Render all markers.
        const markers = Object.keys(this.markerStore).map((id) => {
            return this.markerStore[id].renderSVG()
        })
        return (<svg width={w} height={h} viewBox={`${viewbox.lx} ${viewbox.ly} ${viewbox.rx - viewbox.lx} ${viewbox.ry - viewbox.ly}`}>
            {markers.length > 0 && (<defs>{markers}</defs>)}
            {this.graph.renderSVG({x: 0, y: 0})}
        </svg>)
    }
}

export default GraphToSVG;