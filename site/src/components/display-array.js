import React, {Component} from 'react';
import GraphToSVG, { GraphNode } from './display-ui/graph-to-svg';
import AnchorInfo from './display-ui/anchor-info';

class DisplayArray extends Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const newState = Object.assign({}, prevState);
        if (prevState.dataString !== nextProps.data) {
            const data = JSON.parse(nextProps.data);
            newState.data = data || []
            newState.n = (nextProps.n && parseInt(nextProps.n)) || data.length

            newState.ui = new GraphToSVG;
            while (newState.data.length < newState.n) {
                newState.data.push("")
            }
            
            for (let i = 0; i < newState.data.length; i++) {
                let nodeProps = {
                    id: `my-${i}`,
                    text: `${newState.data[i]}`,
                }
                if (i == 0) {
                    nodeProps.cx = 0;
                    nodeProps.cy = 0;
                } else {
                    nodeProps.leftAnchors = [new AnchorInfo(`my-${i-1}`, 0, 'boundary', 0)]
                    nodeProps.cyAnchor = new AnchorInfo(`my-${i-1}`, 0, 'center', 0);
                }
                newState.ui.addNode(nodeProps);
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

export default DisplayArray;