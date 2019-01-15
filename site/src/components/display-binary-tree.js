import React, {Component} from 'react';
import GraphToSVG from './display-ui/graph-to-svg';
import { GraphNodeUIHelper } from './display-ui/ui-helpers';
import AnchorInfo from './display-ui/anchor-info';
import { makeUIStores } from './display-ui/ui-helpers';
import { GraphRectangularTextNode } from './display-ui/graph-rectanglur-node';
import { defaultNodeProps } from './display-ui/ui-defaults';
import DataHelper from './data-helper';

class DisplayBinaryTree extends Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const newState = Object.assign({}, prevState);
        const uiStores = makeUIStores(nextProps);
    
        const data = DataHelper.getDataFromProps(nextProps);
        newState.data = data || {
            structure: [],
            value: [],
        }
        
        // Generate a complete binary tree.
        if (nextProps.complete !== undefined && nextProps.depth !== undefined) {
            const d = parseInt(nextProps.depth);
            const structure = [];
            const value = [];
            const total_nodes = (1<<d)-1;
            for (let i = 0; i < total_nodes; i++) {
                const l = ((i+1)*2 <= total_nodes? (i+1)*2-1 : -1);
                const r = ((i+1)*2+1 <= total_nodes? (i+1)*2 : -1);
                
                structure.push([l, r])
                value.push(`${i+1}`);
            }
            newState.data = {
                structure: structure,
                value: value,
            }
        }
        
        const n = newState.data.structure.length;
        newState.n = n;
        newState.ui = new GraphToSVG();
        const nodelist = [];
        
        for (let i = 0; i < n; i++) {
            const nodeProps = {
                id: `tree-node-${i}`,
                text: `${newState.data.value[i]}`,
                content: newState.data.value[i],
            };
            // Id corresponds to Index in the array.
            uiStores.forEach((uiStore) => {
                GraphNodeUIHelper.updateNodePropsFromUIStore(nodeProps, uiStore, `${i}`, ['all', 'node'])
            });
            
            const node = newState.ui.addNode(nodeProps, GraphRectangularTextNode);
            nodelist.push(node);
        }
        
        var nowX = 0;
        const dfs = (i, depth) => {
            nodelist[i].depth = depth;
            console.log(nodelist[i]);
            const l = newState.data.structure[i][0];
            const r = newState.data.structure[i][1];
            const isLeaf = (l === -1 && r === -1);
            if (isLeaf) {
                nodelist[i].x_pos = nowX;
                nowX++;
                return ;
            }
            var leftX = 0;
            var rightX = 0;
            if (l !== -1) {
                dfs(l, depth+1);
                leftX = nodelist[l].x_pos;
            } else {
                leftX = nowX;
                nowX++;
            }
            if (r !== -1) {
                dfs(r, depth+1);
                rightX = nodelist[r].x_pos;
            } else {
                rightX = nowX;
                nowX++;
            }
            nodelist[i].x_pos = (leftX + rightX) / 2;
        }
        dfs(0, 0);
           
        // Fixed width by given ratio.
        var ratios = Array(newState.n).fill(1);
        var maxUnitWidth = -Infinity;
        var h = -Infinity;
        // width could be overrided by min-width property.
        var minWidth = nextProps["min-width"];
        const shouldAdjustWidth = (nextProps.fixedwidth !== undefined
            || nextProps["fixedwidth-ratios"] !== undefined
            || minWidth !== undefined);
        
        if (nextProps["fixedwidth-ratios"] !== undefined) {
            ratios = eval(`(${nextProps["fixedwidth-ratios"]})`);
            while (ratios.length < newState.n) ratios.push(1);
        }
        nodelist.forEach((node, idx) => {
            maxUnitWidth = Math.max(maxUnitWidth, node.getWidth() / ratios[idx]);
            h = Math.max(h, node.getHeight());
        });
        if (minWidth !== undefined) {
            maxUnitWidth = Math.max(maxUnitWidth, parseFloat(minWidth));
        }
        console.log(maxUnitWidth);
        
        nodelist.forEach((node, idx) => {
            const newNodeProps = {
                minHeight: h,
                cx: (maxUnitWidth + 10) * node.x_pos,
                cy: h*2 * node.depth,
            }
            console.log(node, newNodeProps);
            if (shouldAdjustWidth) {
                newNodeProps.minWidth = maxUnitWidth * ratios[idx];
            }
            node.updateProps(newNodeProps)
        });
        
        const edgelist = {};
        for (let i = 0; i < newState.data.structure.length; i++) {
            const l = newState.data.structure[i][0];
            const r = newState.data.structure[i][1];
            for (let x of [l, r]) {
                if (x !== -1) {
                    const edgeProps = {
                        id: `edge-${i}-${x}`,
                        pathAnchors: [new AnchorInfo(`tree-node-${i}`, 0, 'entire-node', 0),
                                        new AnchorInfo(`tree-node-${x}`, 0, 'entire-node', 0)],
                    }
                    uiStores.forEach((uiStore) => {
                        GraphNodeUIHelper.updateNodePropsFromUIStore(edgeProps, uiStore, `[${i},${x}]`, ['all', 'edge'])
                    });

                    const edge = newState.ui.addEdge(edgeProps);
                    edgelist[edgeProps.id] = edge;
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
        )
    }
}

export default DisplayBinaryTree;