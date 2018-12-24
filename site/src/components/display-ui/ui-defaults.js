import { Rectangle } from './shapes'

export const defaultLineHeight = 16;

export const defaultNodeProps = {
    id: "dummyID",

    // Defines contents.
    text: "",
    label: null,
    font: "12pt Roboto",
    fontColor: undefined,
    lineHeight: 16,
    padding: 8,

    // Box Size
    minWidth: undefined,
    minHeight: undefined,
    maxWidth: undefined,
    maxHeight: undefined,

    // Describes the surrounding shape.
    boundingShapeClass: Rectangle,
    stroke: "black",
    strokeWidth: "1",
    strokeLinejoin: "miter",
    strokeLineCap: undefined,
    strokeDasharray: undefined,
    fill: "none",

    // Handles position.
    cx: undefined, // X-coordinate for the center.
    cy: undefined, // Y-coordinate for the center.

    cxAnchor: undefined, // info = { who: "nodeID", angle: 0, at: "center", extraDistance: 123 }
    cyAnchor: undefined, // info = { who: "nodeID", angle: 0, at: "boundary", extraDistance: 123 }
    leftAnchors: [],
    rightAnchors: [],
    upAnchors: [],
    downAnchors: [],
    // TODO(tmt514): rotatedAnchors?
}

export const defaultEdgeProps = {
    id: "dummyID",
    
    stroke: "black",
    strokeWidth: "1",
    strokeLinejoin: undefined,
    strokeLineCap: undefined,
    strokeDasharray: undefined,
    fill: undefined,
    
    pathAnchors: [],
    markerBegin: undefined,
    markerEnd: undefined,
    markerMid: undefined,
}