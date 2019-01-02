import React, {Component} from 'react';
import GraphToSVG from './display-ui/graph-to-svg';
import { GraphNodeUIHelper } from './display-ui/ui-helpers';
import AnchorInfo from './display-ui/anchor-info';
import { makeUIStores } from './display-ui/ui-helpers';
import { GraphRectangularTextNode } from './display-ui/graph-rectanglur-node';
import { defaultNodeProps } from './display-ui/ui-defaults';

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
            
            nodelist.forEach((node, idx) => {
                const newNodeProps = {
                    minHeight: h,
                }
                if (shouldAdjustWidth) {
                    newNodeProps.minWidth = maxUnitWidth * ratios[idx];
                }
                node.updateProps(newNodeProps)
            });
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