import React from 'react'
import { Rectangle } from './shapes'
import { defaultLineHeight } from './ui-defaults'

const defaultNodeProps = {
    id: "dummyID",

    // Defines contents.
    text: "",
    label: null,
    textProps: {
        font: "12pt Roboto",
    },

    // Box Size
    minWidth: undefined,
    minHeight: undefined,
    maxWidth: undefined,
    maxHeight: undefined,

    // Describes the surrounding shape.
    boundingShapeClass: Rectangle,
    stroke: "black",
    strokeWidth: "1",
    strokeLinejoin: "miter",
    strokeLineCap: undefined,
    strokeDasharray: undefined,
    fill: "none",

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

// Helper class of functions on updating ui.
export class GraphNodeUIHelper {
    static updateNodePropsByStyleRules(nodeProps, styleRules, classNames) {
        if (styleRules === undefined) return;
        const ruleIDs = Object.keys(styleRules);
        for (let ruleID of ruleIDs) {
            const rule = styleRules[ruleID];
            if (classNames.includes(rule.apply_to)) {
                const z = eval('((' + rule.pure_predicate_fn + ')(nodeProps))');
                if (z === true) {
                    Object.assign(nodeProps, rule.options||{});
                }
            }
        }
    }
    static updateNodePropsByStyles(nodeProps, styles, id) {
        if (styles === undefined) return;
        Object.assign(nodeProps, styles[id]||{});
    }
    static updateNodePropsFromUIStore(nodeProps, uiStore, id, classNames) {
        if (uiStore === undefined) return;
        
        // StyleRules
        GraphNodeUIHelper.updateNodePropsByStyleRules(nodeProps, uiStore.styleRules, classNames);
        
        // Styles
        GraphNodeUIHelper.updateNodePropsByStyles(nodeProps, uiStore.styles, id);
        
        // OnceStyles
        GraphNodeUIHelper.updateNodePropsByStyles(nodeProps, uiStore.onceStyles, id);
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

export class GraphNode {
    constructor(props) {
        this.props = Object.assign({}, defaultNodeProps);
        this.props = Object.assign(this.props, props);
        this.boundingShape = new this.props.boundingShapeClass(this.props);
    }

    // Whenever a property changes, the bounding shape needs to be updated.
    updateProps(newProps) {
        Object.assign(this.props, newProps);
        this.boundingShape.updateShape();
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
        const textLineHeight = this.props.textProps.lineHeight || defaultLineHeight;
        var textsvgs = []
        var i;
        var startY = cy - this.boundingShape.textHeight/2 + textLineHeight/2;
        for (i = 0; i < textLines.length; i++) {
            textsvgs.push(<text key={`text-${i}`} x={cx} y={startY}>{textLines[i]}</text>)
            startY += textLineHeight;
        }
        return (<g key={`n-${this.props.id}`}>
            <g
                stroke={this.props.stroke}
                strokeWidth={this.props.strokeWidth}
                fill={this.props.fill}>
                {this.boundingShape.renderSVG({x:cx, y:cy})}
            </g>
            <g dominantBaseline="central" textAnchor="middle">
                {textsvgs}
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
                console.warn(`Missing anchors for node ${node.id}! Treat as zero.`)
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
                console.warn(`Missing anchors for node ${node.id}! Treat as zero.`)
            }

            computedNodeCenter[id] = {x:finalCX, y:finalCY};
        };
        
        var i;
        const nodeIDs = Object.keys(this.nodes);
        var renderedNodes = [];
        var viewbox = {lx: Infinity, ly: Infinity, rx: -Infinity, ry: -Infinity};
        for (i = 0; i < nodeIDs.length; i++) {
            if (visitedNodes[nodeIDs[i]] === undefined) {
                dfs(nodeIDs[i]);
            }
        }
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
        
        const w = Math.min(640, viewbox.rx - viewbox.lx);
        const h = Math.min(480, viewbox.ry - viewbox.ly);
        
        return (<svg width={w} height={h} viewBox={`${viewbox.lx} ${viewbox.ly} ${viewbox.rx - viewbox.lx} ${viewbox.ry - viewbox.ly}`}>
            {renderedNodes}
        </svg>)
    }
};

export default GraphToSVG;