import React, { Component } from 'react'

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
        const make_author_list = (arr) => {
            // var authors = arr.map(({ given, family, literal }) => [given, family, literal].filter(Boolean).join(' '))
            var authors = arr;
            if (authors.length <= 1) {
              authors = authors[0]
            } else if (authors.length === 2) {
              authors = authors[0] + ' and ' + authors[1]
            } else {
              authors = authors.slice(0, -1).join(", ") + ', and ' + authors.slice(-1)
            }
            return (<span>{authors}</span>)
        }
        const c = this.props.contents;
        const makepub = (pub, idx) => (<div key={idx} style={{ marginBottom: "10pt"}}>
            <div><b>{pub.url? (<a href={pub.url}>{pub.title}</a>) : (<span>{pub.title}</span>)}</b>{
                pub.arxiv && (<span>[<a href={pub.arxiv}>arXiv</a>]</span>)
            }</div>
            <div>{make_author_list(pub.author)}</div>
            <div>{pub.booktitle}, {pub.year}</div>
        </div>);
        console.log(c.edges);
        const plist = c.edges.filter((nodes) => (nodes.node.conference === true)).map((nodes, idx) => {
            var pub = nodes.node;
            return makepub(pub, idx);
        });
        const jlist = c.edges.filter((nodes) => nodes.node.journal === true).map((nodes, idx) => {
          var pub = nodes.node;
          return makepub(pub, idx);
        });

        
        return (<>
            <section className="section">
            <h2 className="title is-size-4">Conference Papers</h2>
            {plist}
            </section>
            <section className="section">
            <h2 className="title is-size-4">Journal Papers</h2>
            {jlist}
            </section>
            </>
        )
    }
}

export default Publication
