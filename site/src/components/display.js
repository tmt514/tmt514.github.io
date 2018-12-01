import React, {Component} from 'react';
import DisplayArray from './display-array';
import DisplayGrid from './display-grid';

class Display extends Component {
    render() {
        if (this.props.array !== undefined) {
            return (<DisplayArray {...this.props}></DisplayArray>);
        }
        if (this.props.grid !== undefined) {
            return (<DisplayGrid {...this.props}></DisplayGrid>);
        }
        
        
        return (<div>
            <span style={{color:"red"}}>
            Error: Displayer of this type Not Implemented.
            </span>
        </div>);
    }
};

export default Display;