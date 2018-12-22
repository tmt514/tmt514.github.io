import React, {Component} from 'react';
import GraphToSVG, { GraphNode, GraphNodeUIHelper } from './display-ui/graph-to-svg';
import AnchorInfo from './display-ui/anchor-info';
import DataHelper from './data-helper';
import { makeUIStores } from './display-ui/ui-helpers';

class DisplayLinkedList extends Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const newState = Object.assign({}, prevState);
        const uiStores = makeUIStores(nextProps);
        const data = DataHelper.getDataFromProps(nextProps);
        newState.data = data || []
        newState.n = data.length;
        newState.ui = new GraphToSVG;
        
        const nodelist = [];
        for (let i = 0; i < newState.n; i++) {
            const nodeProps = {
                id: `list-${i}`,
            }

            for (let j = 0; j < newState.n_col; j++) {
                const nodeProps = {
                    id: `grid-${i}-${j}`,
                    text: `${newState.data[i][j]}`,
                    content: newState.data[i][j],
                    font: `12pt Courier New`,
                    textPadding: 4,
                    lineHeight: 12,
                };

                if (nextProps.notext !== undefined) {
                    nodeProps.text = ``;
                    nodeProps.textPadding = 10;
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
                const node = newState.ui.addNode(nodeProps);
                nodelist.push(node);
            }
        }
        
        var w = -Infinity;
        var h = -Infinity;
        nodelist.forEach((node) => {
            const box = node.boundingShape.getCurrentBoundingRectangle();
            w = Math.max(w, box.width);
            h = Math.max(h, box.height);
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

export default DisplayLinkedList;