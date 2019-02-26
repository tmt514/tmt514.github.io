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
            
            // bending angle
            var bang = 0;
            if (this.props.modifiers && this.props.modifiers.bendleft !== undefined) bang=15;
            if (this.props.modifiers && this.props.modifiers.bendright !== undefined) bang=-15;
            if (this.props.modifiers && this.props.modifiers.bend !== undefined) bang=this.props.modifiers.bend;
            
            const mid = {x: (toCenter.x + fromCenter.x)/2, y: (toCenter.y + fromCenter.y)/2 };
            const stretch = Math.sin(bang/180*Math.PI);
            const midshift = {x: dir.y*stretch, y: -dir.x*stretch};
            
            if (fromAnchor.at === "entire-node") {
                fromAnchor.angle = degree - 2*bang;
                fromAnchor.at = "boundary";
                d.push(["M", fromNode.getAnchorPoint(fromAnchor, fromCenter)]);
            } else if (i === 0) {
                d.push(["M", fromCenter]);
            } else {
                // do nothing when i > 0.
            }

            var toNodePosition = toCenter;
            
            if (toAnchor.at === "entire-node") {
                toAnchor.angle = 180 + degree + bang*2;
                toAnchor.at = "boundary";
                toNodePosition = toNode.getAnchorPoint(toAnchor, toCenter)
            }
            
            if (this.props.modifiers &&
            (this.props.modifiers.bendleft !== undefined ||
             this.props.modifiers.bendright !== undefined ||
             this.props.modifiers.bend !== undefined)) {
                d.push(["Q", { x: mid.x + midshift.x, y: mid.y + midshift.y }])
                d.push(["", toNodePosition])
            } else {
                d.push(["L", toNodePosition]);
            }
            
        }

        var s = "";
        for (i = 0; i < d.length; i++) {
            s += `${d[i][0]} ${d[i][1].x} ${d[i][1].y} `;
        }
        
        const style = {
            stroke: this.props.stroke,
            strokeWidth: this.props.strokeWidth,
            fill: this.props.fill||"none",
        }
        if (this.props.markerStart !== undefined) style.markerStart = `url(#${this.props.markerStart.props.id})`
        if (this.props.markerMid !== undefined) style.markerMid = `url(#${this.props.markerMid.props.id})`
        if (this.props.markerEnd !== undefined) style.markerEnd = `url(#${this.props.markerEnd.props.id})`
        
        return (<path key={this.props.id} d={s} style={style}></path>);
    }
}
