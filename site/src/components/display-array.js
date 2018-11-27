import React, {Component} from 'react';
import Display from './display';
import { runInThisContext } from 'vm';

class DisplayArray extends Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const newState = Object.assign({}, prevState);
        if (prevState.dataString !== nextProps.data) {
            const data = JSON.parse(nextProps.data);
            newState.data = data || []
            newState.n = (nextProps.n && parseInt(nextProps.n)) || data.length

            newState.ui = {}
            newState.canvasWidth = 1;
            newState.canvasHeight = 31;

            while (newState.data.length < newState.n) {
                newState.data.push("")
            }

            var i;
            var w;
            for (i = 0; i < newState.n; i++) {
                w = DisplayArray.getTextWidth(newState.data[i]);
                w = Math.max(30, w + 10);

                newState.ui[i] = {
                    width: w,
                    offsetW: newState.canvasWidth,
                }
                newState.canvasWidth += newState.ui[i].width + 1;
            }
        }
        return newState;
    }

    componentDidUpdate() {
        this._update();
    }
    componentDidMount() {
        this._update();
    }
    
    static getTextWidth(s) {
        if (typeof window === `undefined`) {
            return `${s}`.length*7;
        }
        var canvas = DisplayArray.hiddenCanvas || (DisplayArray.hiddenCanvas = window.document.createElement("canvas"))
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