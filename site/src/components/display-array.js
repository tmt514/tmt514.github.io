import React, {Component} from 'react';

class DisplayArray extends Component {
    componentDidUpdate() {
        this._update();
    }
    componentDidMount() {
        this._update();
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
        for (i = 0; i < n; i++) {
            console.log(data[i])
            ctx.rect(i*30, 0, 28, 28);
            ctx.fillText(`${data[i]}`, i*30+14, 14);
        }
        ctx.stroke();
    }
    _computeDimension() {
        const data = JSON.parse(this.props.data);
        return [30*data.length+1, 30+1];
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