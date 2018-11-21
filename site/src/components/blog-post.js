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
import Display from './display';
import Theorem from './theorem';

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
  return (<code className={className}>{children}</code>)
}

const ShowVariable = ({ frontmatter, varname }) => {
  //return (<div>YUMMY</div>)
  return (<div>{frontmatter[varname]}</div>);
}

/*
class ShowVariable extends Component {
  render() {
    const frontmatter = this.frontmatter;
    const varname = this.props.varname;
    return (<div>{frontmatter[varname]}</div>)
  }
}*/

const statefulRenderAst = (frontmatter) => {
  const pseudoCreateElement = (type, props, children) => {
    if (type.name === "ShowVariable") {
      props = props || {}
      props.frontmatter = frontmatter
    }
    return React.createElement(type, props, children)
  }
  return new rehypeReact({
    createElement: pseudoCreateElement,
    components: {
      h1: MyH1,
      h2: MyH2,
      h3: MyH3,
      code: MyCode,
      display: Display,
      showvariable: ShowVariable,
      theorem: Theorem,
    }
  }).Compiler;
}



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
    console.log(post.htmlAst);
    return (
      <div>
          <Helmet title={`CodeStack - ${post.frontmatter.title}`} />
          <section className="hero is-dark">
          <div className="hero-body">
          <div className="container">
          <span className="is-pulled-right">
          <Link to="/blog">
          <span className="icon has-text-warning">
            <i className="fas fa-lg fa-home"></i>
            </span> 返回
          </Link>
          </span>
          <Link to={post.frontmatter.path}>
          <h1 className="title">{post.frontmatter.title}</h1>
          <h2 className="subtitle">{post.frontmatter.date}</h2>
          </Link>
          </div>
          </div>
          </section>
          <section className="section">
          <div className="container">
          <div className="content">
          { statefulRenderAst(post.frontmatter)(post.htmlAst) }
          </div>
          </div>
          </section>
          <footer className="footer">
          <div className="content">
          <div className="is-flex is-vcentered is-centered">
          <img style={{height:"32px", margin:"10px"}} src={ CCBYNCSA } /> 
          <p style={{maxWidth:"600px"}}>
          本文由<b>卡恩</b>撰寫。
          本站使用 <a href="https://www.gatsbyjs.org/">GasbyJS</a> 搭配 {}
          <a href="https://bulma.io/">Bulma</a> 製作，其原始碼為 MIT 授權。
          網站內容如果沒有特別說明，皆為創用 CC-BY-NC-SA 4.0 授權。
          </p>
          </div>
          </div>
          </footer>
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
        description
      }
    }
  }
`
;