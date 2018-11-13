import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {graphql} from 'gatsby';
import rehypeReact from 'rehype-react';
import Prism from 'prismjs';

import 'prismjs/plugins/custom-class/prism-custom-class.js';
import 'prismjs/components/prism-c.js';
import 'prismjs/components/prism-cpp.js';
import './prism-tomorrow.css';


const MyH1 = ({ children }) => (
  <h1 className="title is-3">{children}</h1>
)
const MyH2 = ({ children }) => (
  <h1 className="title is-4">{children}</h1>
)
const MyH3 = ({ children }) => (
  <h1 className="title is-5">{children}</h1>
)

const MyCode = ({ className, children }) => {
  console.log(className, children[0]);
  return (<code className={className}>{children[0]}</code>)

}

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: MyH1,
    h2: MyH2,
    h3: MyH3,
    code: MyCode,
  }
}).Compiler


class Template extends Component {
  componentDidMount() {
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
    Prism.plugins.customClass.prefix('prism--')
    Prism.highlightAll();
  }
  componentDidUpdate() {
    window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
    Prism.plugins.customClass.prefix('prism--')
    Prism.highlightAll();
  }
  render() {
    const data = this.props.data;
    const post = data.markdownRemark;
    return (
      <div>
          <Helmet title={`CodeStack - ${post.frontmatter.title}`} />
          <section className="hero is-dark">
          <div className="hero-body">
          <div className="container">
          <h1 className="title">{post.frontmatter.title}</h1>
          <h2 className="subtitle">{post.frontmatter.date}</h2>
          </div>
          </div>
          </section>
          <section className="section">
          <div className="container">
          <div className="content">
          { renderAst(post.htmlAst) }
          </div>
          </div>
          </section>
      </div>
    );
  }
}
export default Template;

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
;