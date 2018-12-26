import React, {Component} from 'react';
import GraphToSVG from './display-ui/graph-to-svg';
import { GraphNodeUIHelper } from './display-ui/ui-helpers';
import AnchorInfo from './display-ui/anchor-info';
import { makeUIStores } from './display-ui/ui-helpers';
import { GraphRectangularTextNode } from './display-ui/graph-rectanglur-node';

class DisplayArray extends Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const newState = Object.assign({}, prevState);
        const uiStores = makeUIStores(nextProps);
        
        // TODO(tmt514): find correct way to detect whether to update.
        if (true) {
            const data = JSON.parse(nextProps.data);
            newState.data = data || []
            newState.n = (nextProps.n && parseInt(nextProps.n)) || data.length

            newState.ui = new GraphToSVG;
            while (newState.data.length < newState.n) {
                newState.data.push("")
            }
            
            const nodelist = [];
            for (let i = 0; i < newState.data.length; i++) {
                const nodeProps = {
                    id: `arr-${i}`,
                    text: `${newState.data[i]}`,
                    content: newState.data[i],
                };
                if (i === 0) {
                    nodeProps.cx = 0;
                    nodeProps.cy = 0;
                } else {
                    nodeProps.leftAnchors = [new AnchorInfo(`arr-${i-1}`, 0, 'boundary', 0)]
                    nodeProps.cyAnchor = new AnchorInfo(`arr-${i-1}`, 0, 'center', 0);
                }
                
                // Id corresponds to Index in the array.
                uiStores.forEach((uiStore) => {
                    GraphNodeUIHelper.updateNodePropsFromUIStore(nodeProps, uiStore, `${i}`, ['all', 'node'])
                });
                
                const node = newState.ui.addNode(nodeProps, GraphRectangularTextNode);
                nodelist.push(node);
            }

            var w = -Infinity;
            var h = -Infinity;
            nodelist.forEach((node) => {
                w = Math.max(w, node.getWidth());
                h = Math.max(h, node.getHeight());
            })
            
            const newNodeProps = {
                minHeight: h,
            };
            if (nextProps.fixedwidth !== undefined) {
                newNodeProps.minWidth = w;
            }
            
            nodelist.forEach((node) => {
                node.updateProps(newNodeProps)
            })
            
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

export default DisplayArray;