import React, {Component} from 'react';

class Theorem extends Component {
    render() {

        return (
        <div className={`message ${this.props.c||"is-warning"}`}>
        {
            this.props.title !== undefined
            && (
                <div className="message-header">
                {this.props.title}
                </div>
            )
        }
        <div className="message-body">
        {this.props.children}
        </div></div>
        )
        
    }
};

export default Theorem;