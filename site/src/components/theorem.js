import React, {Component} from 'react';

import markdown from './markdown'

class Theorem extends Component {
    render() {
        const val = this.props.children;
        // This value could be either a string, or a parsed children array from remark.
        // We do nothing if it's already parsed.
        var content = val;
        if (Array.isArray(content) === false) {
            content = markdown.processSync(val).contents;
        }
        if (Array.isArray(content) === true && content.length === 1) {
            content = markdown.processSync(content[0]).contents;
        }
        return (
        <div className={`message ${this.props.c||"is-warning"}`}>
        {
            this.props.title !== undefined
            && (
                <div className="message-header" style={{justifyContent: 'flex-start'}}>
                {this.props.title}
                </div>
            )
        }
        <div className="message-body">
        {content}
        </div></div>
        )
        
    }
};

export default Theorem;