import React, { Component } from 'react'
import Cite from 'citation-js'

class Publication extends Component {
    
    componentDidMount() {
        if (window !== undefined && window.MathJax !== undefined) {
            window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
        }
    }
    
    componentDidUpdate() {
      if (window !== undefined && window.MathJax !== undefined) {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      }
    }

    render() {
        // const c = Cite(this.props.contents)
        const make_author_list = (arr) => {
            // var authors = arr.map(({ given, family, literal }) => [given, family, literal].filter(Boolean).join(' '))
            var authors = arr;
            authors = authors.slice(0, -1).join(", ") + ' and ' + authors.slice(-1)
            return (<span>{authors}</span>)
        }
        const c = this.props.contents;
        const plist = c.edges.map((nodes, idx) => {
            var pub = nodes.node;
            return (
            <div key={idx} style={{ marginBottom: "10pt"}}>
                <div><b>{pub.url? (<a href={pub.url}>{pub.title}</a>) : (<span>{pub.title}</span>)}</b>{
                    pub.arxiv && (<span>[<a href={pub.arxiv}>arXiv</a>]</span>)
                }</div>
                <div>{make_author_list(pub.author)}</div>
                <div>{pub.booktitle}, {pub.year}</div>
                {pub.journal && (<div>{pub.journal}</div>)}
            </div>
        )});

        
        return (
            <section className="section">
            <h2 className="title is-size-4">Publications</h2>
            {plist}
            </section>
        )
    }
}

export default Publication
