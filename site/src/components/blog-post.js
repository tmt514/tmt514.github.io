import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {graphql, Link} from 'gatsby';
import rehypeReact from 'rehype-react';
import Prism from 'prismjs';

import 'prismjs/plugins/custom-class/prism-custom-class.js';
import 'prismjs/components/prism-c.js';
import 'prismjs/components/prism-cpp.js';
import './prism-tomorrow.css';


import "bulma/css/bulma.css"

import CCBYNCSA from '../images/cc-by-nc-sa.png';
import Display, {DisplayInner} from './display';
import Theorem, {Note} from './theorem';
import Algorithm from './algorithm';

import IncludeProblem from './include-problem';
import { roadmapTransformer, ProblemListAsTags } from './roadmaps';
import { footnoteTransformer } from './footnote';
import { tagTransformer } from './tag';

import markdown from './markdown';


const MyH1 = ({ children }) => (
  <h1 className="title is-3">{children}</h1>
)
const MyH2 = ({ children }) => (
  <h2 className="title is-4">{children}</h2>
)
const MyH3 = ({ children }) => (
  <h3 className="title is-5">{children}</h3>
)

const MyCode = ({ className, children }) => {
  return (<code className={className}>{children}</code>)
}

const MySVG = ({ width, height, viewbox, children }) => {
  return (<svg width={width} height={height} viewBox={viewbox}>{children}</svg>)
}

class ShowVariable extends Component {
  render() {
    const frontmatter = this.frontmatter || {};
    const varname = this.props.varname;
    const val = frontmatter[varname]
    return (<div>{markdown.processSync(val).contents}</div>);
  }
};

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
    // const post = data.markdownRemark;
    const post = data;

    const statefulRenderAst = (frontmatter) => {
      class ShowVariable2 extends ShowVariable {
        constructor() {
          super()
          this.frontmatter = frontmatter;
        }
      }
      
      return (ast) => {
        const modifiedAst = JSON.parse(JSON.stringify(ast));
        roadmapTransformer({frontmatter: frontmatter})(modifiedAst);
        footnoteTransformer({frontmatter: frontmatter})(modifiedAst);
        tagTransformer({frontmatter: frontmatter})(modifiedAst);
        return new rehypeReact({
          createElement: React.createElement,
          components: {
            h1: MyH1,
            h2: MyH2,
            h3: MyH3,
            code: MyCode,
            display: Display,
            "display-inner": DisplayInner, 
            mysvg: MySVG,
            showvariable: ShowVariable2,
            theorem: Theorem,
            note: Note,
            algorithm: Algorithm,
            mylink: Link,
            "include-problem": IncludeProblem,
            "problem-list-as-tags": ProblemListAsTags,
          }
        }).Compiler(modifiedAst);
      }
    }

    return (
      <div>{JSON.stringify(this.props.data)}</div>
      // <div>
      //     <Helmet title={`tmt's blog - ${post.frontmatter.title}`}>{post.frontmatter.math_font && (<script>
      //       {`
      //         if (window.MathJax.Hub !== undefined) {
      //           window.MathJax.Hub.Config({
      //             SVG: {
      //               font: '${post.frontmatter.math_font}'
      //             }});
      //         } else {
      //           window.MathJax.SVG = {
      //             font: '${post.frontmatter.math_font}'
      //           };
      //         }
      //       `}
      //     </script>)}
      //     </Helmet>
      //     <section className={`hero ${post.frontmatter.css_title_theme || "is-dark"}`}>
      //     <div className="hero-body">
      //     <div className="container">
      //     <span className="is-pulled-right">
      //     <Link to={post.frontmatter.backlink || "/blog"}>
      //     <span className="icon has-text-warning">
      //       <i className="fas fa-lg fa-home"></i>
      //       </span> 返回
      //     </Link>
      //     </span>
      //     <Link to={post.frontmatter.path}>
      //     <h1 className="title">{post.frontmatter.title}</h1>
      //     <h2 className="subtitle">{post.frontmatter.date}</h2>
      //     </Link>
      //     </div>
      //     </div>
      //     </section>
      //     <section className={`section ${post.frontmatter.css_content_theme || ""}`}>
      //     <div className="container">
      //     <div className="content">
      //     { statefulRenderAst(post.frontmatter)(post.htmlAst) }
      //     </div>
      //     </div>
      //     </section>
      //     <footer className="footer">
      //     <div className="content">
      //     <div className="is-flex is-vcentered is-centered">
      //     <img style={{height:"32px", margin:"10px"}} src={ CCBYNCSA } /> 
      //     <p style={{maxWidth:"600px"}}>
      //     本文由<b>卡恩</b>(tmt514)撰寫。
      //     本站使用 <a href="https://www.gatsbyjs.org/">GasbyJS</a> 搭配 {}
      //     <a href="https://bulma.io/">Bulma</a> 製作，其原始碼為 MIT 授權。
      //     網站內容除了題源以外，若無特別說明皆為創用 CC-BY-NC-SA 4.0 授權。
      //     題源部份若有版權爭議還請與我聯繫，感恩。
      //     </p>
      //     </div>
      //     </div>
      //     </footer>
      // </div>
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
        description
        roadmap_label_h3
        backlink
        css_title_theme
        css_content_theme
        math_font
      }
    }
  }
`
;