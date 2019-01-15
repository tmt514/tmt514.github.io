import React from 'react'

import AnchorInfo from './anchor-info';
import { defaultEdgeProps } from './ui-defaults';

export default class GraphEdge {
    constructor(props) {
        this.props = Object.assign({}, defaultEdgeProps, props);
    }
    
    renderSVG(graphCollection) {
        var i;
        var d = [];
        const nodeSet = graphCollection.nodes;
        const computedNodeCenter = graphCollection.computedNodeCenter;
        for (i = 0; i+1 < this.props.pathAnchors.length; i++) {
            // "entire-node"
            const fromAnchor = Object.assign({}, this.props.pathAnchors[i]);
            const toAnchor = Object.assign({}, this.props.pathAnchors[i+1]);

            const fromNode = nodeSet[fromAnchor.who];
            const toNode = nodeSet[toAnchor.who];

            var fromCenter = (fromAnchor.at === "entire-node"?
                computedNodeCenter[fromNode.props.id] :
                fromNode.getAnchorPoint(fromAnchor, computedNodeCenter[fromNode.props.id]))

            var toCenter = (toAnchor.at === "entire-node"?
                computedNodeCenter[toNode.props.id] :
                toNode.getAnchorPoint(toAnchor, computedNodeCenter[toNode.props.id]))
            
            const dir = {x: toCenter.x - fromCenter.x, y: toCenter.y - fromCenter.y};
            const degree = Math.atan2(dir.y, dir.x) * 180 / Math.PI;
            
            if (fromAnchor.at === "entire-node") {
                fromAnchor.angle = degree;
                fromAnchor.at = "boundary";
                d.push(["M", fromNode.getAnchorPoint(fromAnchor, fromCenter)]);
            } else if (i === 0) {
                d.push(["M", fromCenter]);
            } else {
                // do nothing when i > 0.
            }

            if (toAnchor.at === "entire-node") {
                toAnchor.angle = 180+degree;
                toAnchor.at = "boundary";
                d.push(["L", toNode.getAnchorPoint(toAnchor, toCenter)]);
            } else {
                d.push(["L", toCenter]);
            }
            
        }

        var s = "";
        for (i = 0; i < d.length; i++) {
            s += `${d[i][0]} ${d[i][1].x} ${d[i][1].y} `;
        }
        
        const style = {
            stroke: this.props.stroke,
            strokeWidth: this.props.strokeWidth,
            fill: this.props.fill,
        }
        if (this.props.markerStart !== undefined) style.markerStart = `url(#${this.props.markerStart.props.id})`
        if (this.props.markerMid !== undefined) style.markerMid = `url(#${this.props.markerMid.props.id})`
        if (this.props.markerEnd !== undefined) style.markerEnd = `url(#${this.props.markerEnd.props.id})`
        
        return (<path key={this.props.id} d={s} style={style}></path>);
    }
}
