import React, {Component} from 'react';

class Theorem extends Component {
    render() {
        return (
        <div className="message is-warning">
        <div className="message-header">
        {this.props.title}
        </div>
        <div className="message-body">
        {this.props.children}
        </div></div>
        )
    }
};

export default Theorem;