import React, {Component} from 'react';
import DisplayArray from './display-array';
import DisplayGrid from './display-grid';
import { Quadrant } from './display-gadgets/rectangle'
import DisplayLinkedList from './display-linked-list';
import DisplayGraph from './display-graph';
import DisplayBinaryTree from './display-binary-tree';

class Display extends Component {
    render() {
        if (this.props.array !== undefined) {
            return (<DisplayArray {...this.props}></DisplayArray>);
        }
        if (this.props.grid !== undefined) {
            return (<DisplayGrid {...this.props}></DisplayGrid>);
        }
        if (this.props["linked-list"] !== undefined) {
            return (<DisplayLinkedList {...this.props}></DisplayLinkedList>);
        }
        if (this.props.graph !== undefined) {
            return (<DisplayGraph {...this.props}></DisplayGraph>);
        }
        if (this.props["binary-tree"] !== undefined) {
            return (<DisplayBinaryTree {...this.props}></DisplayBinaryTree>);
        }
        
        
        return (<div>
            <span style={{color:"red"}}>
            Error: Displayer of this type Not Implemented.
            </span>
        </div>);
    }
};

export class DisplayInner extends Component {
    // This should be rendered inside some SVG tag.
    render() {
        if (this.props.quadrant !== undefined) {
            return (<Quadrant {...this.props}></Quadrant>);
        }
        return (
        <text fill="red" x="0" y="0">
            Error: Displayer of this type Not Implemented.
        </text>
        );
    }
};

export default Display;