import React, {Component} from 'react';

import remark from 'remark'
import reactRenderer from 'remark-react'
import math from 'remark-math'
import parse from 'remark-parse'

const markdown = remark()
  .use(reactRenderer,
    {
      createElement: React.createElement,
      remarkReactComponents: {
      },
    })
    


class Theorem extends Component {
    render() {
        const val = this.props.children;
        // This value could be either a string, or a parsed children array from remark.
        // We do nothing if it's already parsed.
        var content = val;
        if (Array.isArray(content) === false) {
            content = markdown.processSync(val).contents;
        }
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
        {content}
        </div></div>
        )
        
    }
};

export default Theorem;