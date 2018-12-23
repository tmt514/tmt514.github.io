import GraphNode from './graph-node'

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


export default class GraphRectangularNode extends GraphNode {
    constructor(props) {
        super(props)
        this.boundingShape = new this.props.boundingShapeClass(this.props);
    }

    // Whenever a property changes, the bounding shape needs to be updated.
    updateProps(newProps) {
        Object.assign(this.props, newProps);
        this.boundingShape.updateShape();
    }

    // Computes the most distant point of the bounding shape on the ray
    // shooting from the angle, returns a point (x, y).
    getPeripheralOffsetByAngle(degree) {
        return this.boundingShape.getPeripheralOffsetByAngle(degree);
    }

    // Given computed center coordinates, generate entire SVG.
    renderSVG({x, y}) {
        const cx = x;
        const cy = y;
        const textLines = this.props.text.split("\n").filter((e) => e !== "");
        const textLineHeight = this.props.lineHeight || defaultLineHeight;
        var textsvgs = []
        var i;
        var startY = cy - this.boundingShape.textHeight/2 + textLineHeight/2;
        for (i = 0; i < textLines.length; i++) {
            textsvgs.push(<text key={`text-${i}`} x={cx} y={startY}>{textLines[i]}</text>)
            startY += textLineHeight;
        }
        const style = {
            font: this.props.font,
            fill: this.props.fontColor,
        }
        return (<g key={`n-${this.props.id}`}>
            <g
                stroke={this.props.stroke}
                strokeWidth={this.props.strokeWidth}
                fill={this.props.fill}>
                {this.boundingShape.renderSVG({x:cx, y:cy})}
            </g>
            <g dominantBaseline="central" textAnchor="middle" style={style}>
                {textsvgs}
            </g>
        </g>)
    }

    // Visitor pattern...?
    updateViewBox(viewbox, center) {
        this.boundingShape.updateViewBox(viewbox, center)
    }
    
};