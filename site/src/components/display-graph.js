import React, {Component} from 'react';
import GraphToSVG from './display-ui/graph-to-svg';
import { GraphNodeUIHelper } from './display-ui/ui-helpers';
import AnchorInfo from './display-ui/anchor-info';
import DataHelper from './data-helper';
import { makeUIStores } from './display-ui/ui-helpers';
import { GraphRectangularTextNode } from './display-ui/graph-rectanglur-node';
import { defaultNodeProps } from './display-ui/ui-defaults';

export default class DisplayGraph extends Component {
    constructor() {
        super();
        this.state = {};
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const newState = Object.assign({}, prevState);
        const uiStores = makeUIStores(nextProps);
        
        const data = DataHelper.getDataFromProps(nextProps);
        newState.data = data || {};
        
        if (newState.ui === undefined) {
            newState.ui = new GraphToSVG;
            newState.nodelist = {};
            newState.edgelist = {};
        }
        const nodelist = newState.nodelist;
        const edgelist = newState.edgelist;
        for (let i = 0; i < data.nodes.length; i++) {
            if (nodelist[`node-${data.nodes[i]}`] === undefined) {
                const nodeProps = {
                    id: `node-${data.nodes[i]}`,
                    cx: Math.random() * 600,
                    cy: Math.random() * 480,
                    text: "",
                    content: "",
                };
                
                uiStores.forEach((uiStore) => {
                    GraphNodeUIHelper.updateNodePropsFromUIStore(nodeProps, uiStore, `${data.nodes[i]}`, ['all', 'node'])
                });

                const node = newState.ui.addNode(nodeProps, GraphRectangularTextNode);
                nodelist[nodeProps.id] = node;
            }
            // TODO: update uiStores here. (maybe by copying a node?)
        }
        for (let i = 0; i < data.edges.length; i++) {
            const e = data.edges[i];
            const modifiers = e[2];
            if (edgelist[`edge-${i}-${e[0]}-${e[1]}`] === undefined) {
                const edgeProps = {
                    id: `edge-${i}-${e[0]}-${e[1]}`,
                    pathAnchors: [new AnchorInfo(`node-${e[0]}`, 0, 'entire-node', 0),
                                    new AnchorInfo(`node-${e[1]}`, 0, 'entire-node', 0)],
                    modifiers,
                }

                uiStores.forEach((uiStore) => {
                    GraphNodeUIHelper.updateNodePropsFromUIStore(edgeProps, uiStore, `[${e[0]},${e[1]}]`, ['all', 'edge'])
                });

                const edge = newState.ui.addEdge(edgeProps);
                edgelist[edgeProps.id] = edge;
            }
            // TODO: need to reset UI properties.
        }
        const nodeids = Object.keys(nodelist);
        for (let _ = 0; _ < 100; _++) {
            for (let i = 0; i < nodeids.length; i++) {
                const node = nodelist[nodeids[i]];
                const node_id = node.props.id;
                var dir_adjust = [];
                const currentX = node.props.cx;
                const currentY = node.props.cy;
                
                const getDist = (thereX, thereY) => {
                    return Math.sqrt((currentX - thereX) * (currentX - thereX)
                    + (currentY - thereY) * (currentY - thereY));
                }
                for (let j = 0; j < nodeids.length; j++) {
                    const there = nodelist[nodeids[j]];
                    if (there.props.id === node_id) continue;
                    const thereX = there.props.cx;
                    const thereY = there.props.cy;
                    const dist = getDist(thereX, thereY);
                    if (dist < 75) {
                        dir_adjust.push([ (thereX - currentX) * (dist-75)/dist,
                                        (thereY - currentY) * (dist-75)/dist]);
                    }
                }
                
                for (let j = 0; j < data.edges.length; j++) {
                    const e = data.edges[j];
                    const u_id = `node-${e[0]}`;
                    const v_id = `node-${e[1]}`;
                    var thereX, thereY;
                    if (node_id === u_id) {
                        thereX = nodelist[v_id].props.cx;
                        thereY = nodelist[v_id].props.cy;
                    } else if (node_id === v_id) {
                        thereX = nodelist[u_id].props.cx;
                        thereY = nodelist[u_id].props.cy;
                    } else {
                        continue;
                    }
                    const dist = getDist(thereX, thereY);
                    if (dist < 95 || dist >= 105) {
                        dir_adjust.push([ (thereX - currentX) * (dist-100)/dist,
                                            (thereY - currentY) * (dist-100)/dist]);
                    } else {
                        dir_adjust.push([0, 0]);
                    }
                }
                if (dir_adjust.length > 0) {
                    const dx = dir_adjust.map((d) => d[0]).reduce((p, c) => p+c) / dir_adjust.length;
                    const dy = dir_adjust.map((d) => d[1]).reduce((p, c) => p+c) / dir_adjust.length;
                    node.updateProps({
                        cx: currentX + dx,
                        cy: currentY + dy,
                    });
                }
            }
        }
        return newState;
    }
    render() {
        return (
        <div className="has-text-centered">
            {this.state.ui.renderSVG()}
            </div>
        );
    }
};