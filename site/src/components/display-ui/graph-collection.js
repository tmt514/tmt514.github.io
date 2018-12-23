
export class GraphCollection extends GraphNode {
    static NODES_COUNTER = 0;
    static EDGES_COUNTER = 0;
    constructor(props) {
        this.nodes = {};
        this.edges = {};
        this.hasComputedPositions = false;
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
    
    
    renderSVG() {
    }
};
