import React, { Component } from 'react';

export class Quadrant extends Component {
    constructor() {
        super();
        this.state = {
            clip_id: Math.random().toString(36).substring(2),
        }
    }
    
    getPath() {
        const cx = parseFloat(this.props.x);
        const cy = parseFloat(this.props.y);
        var s = this.props["angle-start"];
        var e = this.props["angle-end"];
        
        const r = parseFloat(this.props.r);
        if (s === undefined) s = 0;
        if (e === undefined) e = 360;
        s = parseFloat(s) / 180 * Math.PI;
        e = parseFloat(e) / 180 * Math.PI;
        while (e < s) e += 2*Math.PI;
        
        const cos_s = Math.cos(s);
        const sin_s = Math.sin(s);
        
        const cos_e = Math.cos(e);
        const sin_e = Math.sin(e);
        
        console.log(s, e);
        const largeArcFlag = (e >= s + Math.PI? 1 : 0);
        
        const path = [
            `M ${cx} ${cy}`,
            `L ${cx+r*cos_s} ${cy+r*sin_s}`,
            `A ${r} ${r} 0 ${largeArcFlag} 1 ${cx+r*cos_e} ${cy+r*sin_e}`,
        ];
        
        return path.join(" ");
    }
    
    render() {
        const d = this.getPath();
        console.log(d);
        
        
        const href = this.props["clip-href"];
        console.log(this.props.c);
        
        return (<>
        <clipPath id={this.state.clip_id}>
            <use href={href||""}/>
        </clipPath>
        {
            this.props["dot-at-origin"] !== undefined &&
            <circle
                cx={this.props.x} cy={this.props.y}
                r="5"
                className={`${this.props.c} origin`}
            />
        }
        <path
            className={`${this.props.c} transparent`}
            d={d}
            clipPath={`url(#${this.state.clip_id})`}
            />
        </>)
    }
};