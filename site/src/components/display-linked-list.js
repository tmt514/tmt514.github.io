import React, {Component} from 'react';
import GraphToSVG from './display-ui/graph-to-svg';
import { GraphNodeUIHelper } from './display-ui/ui-helpers';
import AnchorInfo from './display-ui/anchor-info';
import DataHelper from './data-helper';
import { makeUIStores } from './display-ui/ui-helpers';
import { GraphRectangularTextNode, GraphArrayNode } from './display-ui/graph-rectanglur-node';
import { markerCircle, markerTriangle } from './display-gadgets/markers';

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
            const ptrSlot = new GraphRectangularTextNode({id: `ptr`, text: "  "});
            const nodeProps = {
                id: `linked-list-${i}`,
                text: `${newState.data[i]}`,
                content: [newState.data[i], ptrSlot],
            }
            
            if (i == 0) {
                nodeProps.cx = 0;
                nodeProps.cy = 0;
            } else {
                nodeProps.leftAnchors = [new AnchorInfo(`linked-list-${i-1}`, 0, 'boundary', 50)];
                nodeProps.cyAnchor = new AnchorInfo(`linked-list-${i-1}`, 0, 'center', 0);
            }
             
            // Id corresponds to Coordinates in the array.
            uiStores.forEach((uiStore) => {
                GraphNodeUIHelper.updateNodePropsFromUIStore(nodeProps, uiStore, JSON.stringify(i), ['all', 'node'])
            });
            const node = newState.ui.addNode(nodeProps, GraphArrayNode);
            nodelist.push(node);

            // create edges.
            if (i === 0) continue;
            const edgeProps = {
                pathAnchors: [new AnchorInfo(`linked-list-${i-1}`, 0, ['ptr', 'center'], 0),
                              new AnchorInfo(`linked-list-${i}`, 0, 'entire-node', 0)],
                markerStart: markerCircle,
                markerEnd: markerTriangle,
            }
            newState.ui.addEdge(edgeProps);
        }
        
        var w = -Infinity;
        var h = -Infinity;
        nodelist.forEach((node) => {
            console.warn(node);
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

export default DisplayLinkedList;