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

    constructor(text, textProps) {
        this.textLines = text.split("\n").filter((e) => e !== "");
        this.textProps = textProps;
        this.textWidth = Math.max(this.textLines.map((t) => Rectangle.getTextWidth(t, textProps)));
        this.textHeight = this.textLines.length * (textProps.lineHeight || 16);
        console.log("height=", this.textHeight);
        this.textPadding = textProps.padding || 8;
    }

    getPeripheralOffsetByAngle(degree) {
        const rad = degree / 180.0 * Math.PI;
        const c = Math.cos(rad);
        const s = Math.sin(rad);
        var vline = this.textWidth/2 + this.textPadding;
        var hline = this.textHeight/2 + this.textPadding;
        vline = (c === 0? Infinity: vline / c);
        hline = (s === 0? Infinity: hline / s);
        const dist = Math.min(Math.abs(vline), Math.abs(hline));
        return {x: c*dist, y: s*dist}
    }

    renderSVG({x, y}) {
        const cx = x;
        const cy = y;
        var boxWidth = this.textWidth/2 + this.textPadding;
        var boxHeight = this.textHeight/2 + this.textPadding;
        console.log("box=", cx, cy, boxWidth, boxHeight);
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
        var boxWidth = this.textWidth/2 + this.textPadding;
        var boxHeight = this.textHeight/2 + this.textPadding;
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
