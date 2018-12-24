import React from 'react';

export class Rectangle {

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    getPeripheralOffsetByAngle(degree) {
        if (degree === 0) return {x: this.width/2, y: 0};
        if (degree === 90) return {x: 0, y: this.height/2};
        if (degree === 180) return {x: -this.width/2, y: 0};
        if (degree === 270) return {x: 0, y: -this.height/2};

        const rad = degree / 180.0 * Math.PI;
        const c = Math.cos(rad);
        const s = Math.sin(rad);
        var vline = this.width/2;
        var hline = this.height/2;
        vline = (c === 0? Infinity: vline / c);
        hline = (s === 0? Infinity: hline / s);
        const dist = Math.min(Math.abs(vline), Math.abs(hline));
        return {x: c*dist, y: s*dist}
    }

    renderSVG({x, y}) {
        const cx = x;
        const cy = y;
        var boxWidth = this.width/2;
        var boxHeight = this.height/2;
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
        var boxWidth = this.width/2;
        var boxHeight = this.height/2;
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
