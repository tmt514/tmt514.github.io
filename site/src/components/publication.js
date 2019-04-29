import React, { Component } from 'react'
import Cite from 'citation-js'

class Publication extends Component {
    
    componentDiDMount() {
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
        const c = Cite(this.props.contents)
        const make_author_list = (arr) => {
            var authors = arr[0].literal
            var tokens = []
            authors = authors.split(/\s*\n\s*/).join(" ").split(" and ")

            authors = authors.slice(0, -1).join(", ") + ' and ' + authors.slice(-1)
            return (<span>{authors}</span>)
        }
        const plist = c.data.map((pub, idx) => (
            <div key={idx} style={{ marginBottom: "10pt"}}>
                <div><b><a href={pub["URL"]}>{pub.title}</a></b></div> {}
                <div>{make_author_list(pub.author)}</div>
                <div>{pub["container-title"]}</div>
            </div>
        ));

        
        return (
            <section className="section">
            <h2 className="title is-size-4">Publications</h2>
            {plist}
            </section>
        )
    }
}

export default Publication
