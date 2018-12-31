import React from 'react'
import { defaultNodeProps, defaultLineHeight } from './ui-defaults'
import GraphNode from './graph-node';
import { Rectangle } from './shapes';

export class GraphTextNode extends GraphNode {
    constructor(props) {
        super(props)
        this.text = new Text(props.text, props);
        this.rect = new Rectangle(this.text.width, this.text.height);
    }
    
    // Whenever a property changes, the bounding shape needs to be updated.
    updateProps(newProps) {
        throw "Not Supported";
    }

    // Computes the most distant point of the bounding shape on the ray
    // shooting from the angle, returns a point (x, y).
    getPeripheralOffsetByAngle(degree) {
        return this.rect.getPeripheralOffsetByAngle(degree);
    }
    
    getAnchorPoint(anchorInfo) {
        throw "Not Implemented";
    }
    
    updateViewBox(viewboxToBeUpdated, offset) {
        return this.rect.updateViewBox(viewboxToBeUpdated, offset);
    }
    
    renderSVG(offset) {
        return this.text.renderSVG(offset);
    }
};

export class Text {

    // Measuring Text Width, assuming Roboto From
    // https://bl.ocks.org/tophtucker/62f93a4658387bb61e4510c37e2e97cf
    static measureText(string, fontSize = 10) {
        const widths = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.0734375,0.4,0.5,0.9,0.8,0.9,0.9,0.4,0.6,0.5,0.7,0.8,0.4,0.5,0.4,0.6,0.8,0.6609375,0.8,0.7,0.8,0.8,0.8,0.8,0.8,0.7,0.4,0.4,0.7,0.7,0.7,0.7,1.1,0.9,0.8,0.9,0.8,0.8,0.8,0.9,0.9,0.4,0.7,0.9,0.8,1,0.9,0.9,0.8,0.9,0.8,0.8,0.8,0.8,0.9,1.1,0.8,0.8,0.8,0.5,0.7,0.4,0.6,0.7,0.5,0.7,0.8,0.7,0.7,0.7,0.6,0.7,0.7,0.4,0.5,0.8,0.4,1.1,0.7,0.8,0.8,0.7,0.6,0.7,0.5,0.7,0.7,1,0.7,0.7,0.7,0.6,0.4,0.6,0.9]
        const avg = 0.7098355263157895
        return string
          .split('')
          .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
          .reduce((cur, acc) => acc + cur) * fontSize
    }

    static getTextWidth(s, props) {
        if (typeof window === `undefined`) {
            return Text.measureText(s, (props.lineHeight || defaultNodeProps.lineHeight));
        }
        var canvas = Rectangle.hiddenCanvas || (Rectangle.hiddenCanvas = window.document.createElement("canvas"))
        var ctx = canvas.getContext("2d");
        ctx.font = (props.font || defaultNodeProps.font);
        return ctx.measureText(`${s}`).width;
    }

    constructor(text, props) {
        this.props = props
        this.text = text

        this.textLines = text.split("\n").filter((e) => e !== "");
        this.width = Math.max(0, ...this.textLines.map((s) => Text.getTextWidth(s, this.props)));
        this.height = (props.lineHeight || defaultNodeProps.lineHeight) * this.textLines.length;
    }

    getSize() {
        return {width: this.width, height: this.height};
    }

    renderSVG({x, y}) {
        const cx = x;
        const cy = y;
        const textLineHeight = this.props.lineHeight || defaultLineHeight;
        var textsvgs = []
        var i;
        var startY = cy - this.height/2 + textLineHeight/2;
        for (i = 0; i < this.textLines.length; i++) {
            textsvgs.push(<text key={`text-${i}`} x={cx} y={startY}>{this.textLines[i]}</text>)
            startY += textLineHeight;
        }
        const style = {
            font: this.props.font,
            fill: this.props.fontColor,
        }
        return (
            <g dominantBaseline="central" textAnchor="middle" style={style}>
                {textsvgs}
            </g>
        );
    }
}