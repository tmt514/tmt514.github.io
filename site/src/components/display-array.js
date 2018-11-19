import React, {Component} from 'react';

class DisplayArray extends Component {
    
    componentDidUpdate() {
        this._update();
    }
    componentDidMount() {
        this._update();
    }
    
    _getTextWidth(s) {
        if (typeof window === `undefined`) {
            return `${s}`.length*7;
        }
        var canvas = this.hiddenCanvas || (this.hiddenCanvas = window.document.createElement("canvas"))
        var ctx = canvas.getContext("2d");
        ctx.font = "16px Roboto";
        return ctx.measureText(`${s}`).width;
    }
    _update() {
        var c = this.canvas;
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.font = "16px Roboto";
        ctx.textAlign="center";
        ctx.textBaseline="middle";

        const data = JSON.parse(this.props.data);
        if (!data) return;

        const n = data.length;
        var i;
        var text_width = 0;
        var w;
        for (i = 0; i < n; i++) {
            w = this._getTextWidth(data[i]);
            w = Math.max(w + 6, 30);
            ctx.rect(text_width, 0, w, 28);
            ctx.fillText(`${data[i]}`, text_width + w/2 - 1, 14);
            text_width += w;
        }
        ctx.stroke();
    }
    _computeDimension() {
        const data = JSON.parse(this.props.data);
        const n = data.length;
        var i;
        var text_width = 0;
        var w;
        for (i = 0; i < n; i++) {
            w = this._getTextWidth(data[i]);
            w = Math.max(w + 6, 30);
            text_width += w;
        }
        
        return [text_width+1, 30+1];
    }
    render() {
        const dimension = this._computeDimension();
        return (
            <div className="has-text-centered">
            <canvas
            ref={(e)=>this.canvas=e}
            width={dimension[0]}
            height={dimension[1]}>
            </canvas>
            </div>
        )
    }
}

export default DisplayArray;