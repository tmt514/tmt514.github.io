import React, {Component} from 'react';
import GraphToSVG from './display-ui/graph-to-svg';
import { GraphNodeUIHelper } from './display-ui/ui-helpers';
import AnchorInfo from './display-ui/anchor-info';
import DataHelper from './data-helper';
import { makeUIStores } from './display-ui/ui-helpers';
import { GraphRectangularTextNode } from './display-ui/graph-rectanglur-node';

class DisplayGrid extends Component {
    constructor() {
        super();
        this.state = {};
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const newState = Object.assign({}, prevState);
        const uiStores = makeUIStores(nextProps);

        const data = DataHelper.getDataFromProps(nextProps);
        newState.data = data || []
        newState.n_row = (nextProps.n_row && parseInt(nextProps.n_row)) || data.length
        newState.n_col = (nextProps.n_col && parseInt(nextProps.n_col)) || (data[0] && data[0].length) || 0
        
        newState.ui = new GraphToSVG;
        while (newState.data.length < newState.n_row) {
            newState.data.push(" ".repeat(newState.n_col))
        } 
        
        const nodelist = [];
        for (let i = 0; i < newState.n_row; i++) {
            for (let j = 0; j < newState.n_col; j++) {
                const nodeProps = {
                    id: `grid-${i}-${j}`,
                    text: `${newState.data[i][j]}`,
                    content: newState.data[i][j],
                    font: `12pt Courier New`,
                    padding: 4,
                    lineHeight: 12,
                };

                if (nextProps.notext !== undefined) {
                    nodeProps.text = ``;
                    nodeProps.padding = 10;
                }
                

                if (i === 0 && j === 0) {
                    nodeProps.cx = 0;
                    nodeProps.cy = 0;
                } else if (j > 0) {
                    nodeProps.leftAnchors = [new AnchorInfo(`grid-${i}-${j-1}`, 0, 'boundary', 0)];
                    nodeProps.cyAnchor = new AnchorInfo(`grid-${i}-${j-1}`, 0, 'center', 0);
                } else { // i > 0.
                    nodeProps.downAnchors = [new AnchorInfo(`grid-${i-1}-${j}`, 90, 'boundary', 0)];
                    nodeProps.cxAnchor = new AnchorInfo(`grid-${i-1}-${j}`, 0, 'center', 0);
                }
                // Id corresponds to Coordinates in the array.
                uiStores.forEach((uiStore) => {
                    GraphNodeUIHelper.updateNodePropsFromUIStore(nodeProps, uiStore, JSON.stringify([i, j]), ['all', 'node'])
                });
                const node = newState.ui.addNode(nodeProps, GraphRectangularTextNode);
                nodelist.push(node);
            }
        }
        
        var w = -Infinity;
        var h = -Infinity;
        nodelist.forEach((node) => {
            w = Math.max(w, node.getWidth());
            h = Math.max(h, node.getHeight());
        })
        
        h = w = Math.max(w, h);
        
        const newNodeProps = {
            minHeight: h,
            minWidth: w,
        };
            
        nodelist.forEach((node) => {
            node.updateProps(newNodeProps)
        })        
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

export default DisplayGrid;