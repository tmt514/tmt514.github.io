import React from 'react'

const defaultMarkerProps = {
    id: "dummyID",
    orient: "auto"
}

export default class Marker {
    constructor(props) {
        this.props = Object.assign({}, defaultMarkerProps, props);
    }
    renderSVG() {
        return (<marker {...this.props} key={this.props.id} />)
    }
};

export const markerSquare = new Marker({
    id: "markerSquare",
    markerWidth: 7,
    markerHeight: 7,
    refX: 4,
    refY: 4,
    children: (<rect x="1" y="1" width="5" height="5" style={{stroke: "none", fill: "black"}}/>),
})

export const markerCircle = new Marker({
    id: "markerCircle",
    markerWidth: 12,
    markerHeight: 12,
    refX: 4,
    refY: 4,
    children: (<circle cx="4" cy="4" r="4" />),
})

export const markerTriangle = new Marker({
    id: "markerTriangle",
    markerWidth: 10,
    markerHeight: 10,
    refX: 10,
    refY: 5,
    children: (<path d="M 0 0 L 10 5 L 0 10 z" />),
})