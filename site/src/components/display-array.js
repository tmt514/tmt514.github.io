import React, {Component} from 'react';

class DisplayArray extends Component {
    
    constructor(props) {
        super(props)

        const data = JSON.parse(props.data);
        this.state = {}
        this.state.data = data || []
        this.state.n = (props.n && parseInt(props.n)) || data.length
        
        this.state.ui = {}
        this.state.canvasWidth = 1;
        this.state.canvasHeight = 31;

        while (this.state.data.length < this.state.n) {
            this.state.data.push("")
        }

        var i;
        var w;
        for (i = 0; i < this.state.n; i++) {
            w = this._getTextWidth(this.state.data[i]);
            w = Math.max(30, w + 10);

            this.state.ui[i] = {
                width: w,
                offsetW: this.state.canvasWidth,
            }
            this.state.canvasWidth += this.state.ui[i].width + 1;
        }
    }
    
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

        const data = this.state.data;
        const n = this.state.n;
        if (!data) return;

        var i;
        var ui;
        for (i = 0; i < n; i++) {
            ui = this.state.ui[i];
            ctx.rect(ui.offsetW, 0, ui.width, 28);
            ctx.fillText(`${data[i]}`, ui.offsetW + ui.width/2, 14);
        }
        ctx.stroke();
    }
    render() {
        return (
            <div className="has-text-centered">
            <canvas
            ref={(e)=>this.canvas=e}
            width={this.state.canvasWidth}
            height={this.state.canvasHeight}>
            </canvas>
            </div>
        )
    }
}

export default DisplayArray;