import React, {Component} from 'react';

import remark from 'remark'
import reactRenderer from 'remark-react'
import math from 'remark-math'

const markdown = remark()
  .use(math)
  .use(reactRenderer,
    {
      createElement: React.createElement,
      remarkReactComponents: {
      },
    })


class Theorem extends Component {
    render() {
        const val = this.props.children;
        const content = markdown.processSync(val).contents;
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