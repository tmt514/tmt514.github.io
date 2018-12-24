import React from 'react'
import GraphCollection from './graph-collection'


class GraphToSVG {
    constructor() {
        this.graph = new GraphCollection()
    }

    addNode(nodeProps, GraphNodeClass) {
        return this.graph.addNode(nodeProps, GraphNodeClass)
    }

    addEdge(edgeProps, GraphEdgeClass) {
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
        
        return (<svg width={w} height={h} viewBox={`${viewbox.lx} ${viewbox.ly} ${viewbox.rx - viewbox.lx} ${viewbox.ry - viewbox.ly}`}>
            {this.graph.renderSVG({x: 0, y: 0})}
        </svg>)
    }
}

export default GraphToSVG;