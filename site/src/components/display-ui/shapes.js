import React from 'react';

export class Rectangle {

    static getTextWidth(s, textProps) {
        if (typeof window === `undefined`) {
            return `${s}`.length*7;
        }
        var canvas = Rectangle.hiddenCanvas || (Rectangle.hiddenCanvas = window.document.createElement("canvas"))
        var ctx = canvas.getContext("2d");
        ctx.font = textProps.font;
        return ctx.measureText(`${s}`).width;
    }

    constructor(props) {
        this.props = props;
        
        const text = props.text;
        const textProps = props.textProps;

        this.textLines = text.split("\n").filter((e) => e !== "");
        this.textProps = textProps;
        this.textWidth = Math.max(0, ...this.textLines.map((t) => Rectangle.getTextWidth(t, textProps)));
        this.textHeight = this.textLines.length * (textProps.lineHeight || 16);
        this.textPadding = textProps.padding || 8;
        
        this.estimatedWidth = this.textWidth + this.textPadding*2;
        this.estimatedHeight = this.textHeight + this.textPadding*2;
        this.findActualBox();
    }

    updateShape() {
        this.findActualBox();
    }

    getCurrentBoundingRectangle() {
        return {width: this.actualWidth, height: this.actualHeight}
    }

    findActualBox() {
        this.actualWidth = Math.max(this.estimatedWidth, this.props.minWidth||-Infinity)
        this.actualWidth = Math.min(this.actualWidth, this.props.maxWidth||Infinity)
        this.actualHeight = Math.max(this.estimatedHeight, this.props.minHeight||-Infinity)
        this.actualHeight = Math.min(this.actualHeight, this.props.maxHeight||Infinity)
    }

    getPeripheralOffsetByAngle(degree) {
        const rad = degree / 180.0 * Math.PI;
        const c = Math.cos(rad);
        const s = Math.sin(rad);
        var vline = this.actualWidth/2;
        var hline = this.actualHeight/2;
        vline = (c === 0? Infinity: vline / c);
        hline = (s === 0? Infinity: hline / s);
        const dist = Math.min(Math.abs(vline), Math.abs(hline));
        return {x: c*dist, y: s*dist}
    }

    renderSVG({x, y}) {
        const cx = x;
        const cy = y;
        var boxWidth = this.actualWidth/2;
        var boxHeight = this.actualHeight/2;
        return (<polyline
            points={`${cx-boxWidth} ${cy-boxHeight}
                    ${cx+boxWidth} ${cy-boxHeight}
                    ${cx+boxWidth} ${cy+boxHeight}
                    ${cx-boxWidth} ${cy+boxHeight}
                    ${cx-boxWidth} ${cy-boxHeight}`}
            />)
    }

    updateViewBox(viewbox, {x, y}) {
        const cx = x;
        const cy = y;
        var boxWidth = this.actualWidth/2;
        var boxHeight = this.actualHeight/2;
        var lx = cx-boxWidth;
        var ly = cy-boxHeight;
        var rx = cx+boxWidth;
        var ry = cy+boxHeight;
        lx = Math.floor(lx);
        ly = Math.floor(ly);
        rx = Math.ceil(rx);
        ry = Math.ceil(ry);
        
        viewbox.lx = Math.min(viewbox.lx, lx);
        viewbox.ly = Math.min(viewbox.ly, ly);
        viewbox.rx = Math.max(viewbox.rx, rx);
        viewbox.ry = Math.max(viewbox.ry, ry);
    }
};
