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
            var authors = arr.map((name, idx) => {
              if (name === "Seth Pettie") {
                return (<a key={idx} href="https://web.eecs.umich.edu/~pettie/">Seth Pettie</a>);
              } else if (name === "Leqi Zhu") {
                return (<a key={idx} href="https://home.cs.umanitoba.ca/~zhuj2/">Leqi Zhu</a>);
              } else if (name === "Hsin-Hao Su") {
                return (<a key={idx} href="https://sites.google.com/site/distributedhsinhao/">Hsin-Hao Su</a>);
              } else if (name === "Nairen Cao") {
                return (<a key={idx} href="https://nairenc.github.io/">Nairen Cao</a>);
              } else if (name === "Yi-Jun Chang") {
                return (<a key={idx} href="https://sites.google.com/a/umich.edu/yi-jun-chang/">Yi-Jun Chang</a>);
              } else if (name === "Dawei Huang") {
                return (<a key={idx} href="https://www.linkedin.com/in/dawei-huang-b232a031/">Dawei Huang</a>);
              } else if (name === "Thatchaphol Saranurak") {
                return (<a key={idx} href="https://sites.google.com/site/thsaranurak/">Thatchaphol Saranurak</a>);
              } else if (name === "Zhongtian He") {
                return (<a key={idx} href="https://sites.google.com/view/zhongtianhe">Zhongtian He</a>);
              } else if (name === "Tsvi Kopelowitz") {
                return (<a key={idx} href="https://cs.biu.ac.il/node/113">Tsvi Kopelowitz</a>);
              } else if (name === "Tian Zhang") {
                return (<a key={idx} href="https://www.seas.upenn.edu/~tianzh/">Tian Zhang</a>);
              } else if (name === "Han Jiang") {
                return (<a key={idx} href="https://www.linkedin.com/in/han-jiang-9033bb189/">Han Jiang</a>);
              } else {
                return name;
              }
            });
            if (authors.length <= 1) {
              return (authors[0])
            } else if (authors.length === 2) {
              return (<>{authors[0]} and {authors[1]}</>);
            } else {
              const n = authors.length;
              authors = authors.reduce((acc, current, index) => {
                acc.push(current);
                if (index === n - 2) {
                  acc.push(", and ");
                } else if (index < n - 2) {
                  acc.push(", ");
                }
                return acc;
              }, []);
              // authors = authors.slice(0, -1).join(", ") + ', and ' + authors.slice(-1)
            }
            return (authors)
        }
        const c = this.props.contents;
        const makepub = (pub, idx) => (<div key={idx} className="publication-entry" style={{ marginBottom: "10pt"}}>
            <div className="papertitle"><b>{pub.url? (<a href={pub.url}>{pub.title}</a>) : (<span>{pub.title}</span>)}</b>{
                pub.arxiv && (<span>[<a href={pub.arxiv}>arXiv</a>]</span>)
            }</div>
            <div className="author">{make_author_list(pub.author)}</div>
            <div className="booktitle">{pub.booktitle}, {pub.year}</div>
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
