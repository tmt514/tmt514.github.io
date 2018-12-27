import React, {Component} from 'react'
import Theorem from './theorem'
import {StaticQuery, graphql, Link} from 'gatsby'
import visit from 'unist-util-visit'

import markdown from './markdown'

const findH2Contents = (node, regex) => {
    const { children } = node;
    const ret = [];
    var recording = false;
    
    var i;
    for (i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.type === "element") {
            if (child.tagName === "h2") {
                if (child.children !== undefined &&
                    child.children[0] !== undefined &&
                    child.children[0].value.match(regex) !== null) {
                    recording = true;
                    ret.push(child);
                } else {
                    recording = false;
                }
            } else if (recording === true) {
                ret.push(child);
            } else {
                ret.push(...findH2Contents(child, regex))
            }
        } else if (recording === true) {
            ret.push(child);
        }
    }
    return ret
}

const astToReact = (node, ukey) => {
    const { children } = node;
    if (node.type === "text") return node.value;

    const childrenReact = children.map((c, idx) => astToReact(c, `${ukey}-${idx}`));
    const props = Object.assign({}, node.properties)

    if (node.tagName === "h2") {
        props.className = (props.className || "") + " title is-4";
    }
    props.key = (props.key||ukey);
    
    const reactNode = React.createElement(node.tagName, props, childrenReact);
    return reactNode;
}

export default class IncludeProblem extends Component {
    render() {
        const path = this.props.path;
        const code = this.props.code;
        const show_solution = (this.props["show-solution"]!== undefined);
        const title_prefix = (this.props["title-prefix"] || "例題：");
        const is_inline = (this.props.inline !== undefined);
        
        if (this.props.notyet !== undefined) {
            return (<span>{this.props.path} 這題還沒準備好</span>)
        }

        return (<StaticQuery
            query={graphql`
            query allpages {
                pages: allMarkdownRemark {
                    edges {
                        node {   
                            frontmatter {
                                title
                                category
                                path
                                date
                                _PARENT
                                description
                                link
                                code
                                difficulty
                                oj
                            }
                            htmlAst
                        }
                     
                    }
                }
            }`}

            render={(data) => {
                
                const e = data.pages.edges.filter((e) => {return e.node.frontmatter.path === path});
                
                if (e.length === 0) {
                    return (<span>找不到題目</span>);
                }
                
                const page = e[0].node;
                const meta = page.frontmatter;
                const solution = show_solution === true? 
                    findH2Contents(page.htmlAst, /(題解)|(Solution)/).map((e, idx) => astToReact(e, `T${idx}`))
                    : "";
                const ojlink = meta.link? (<a href={meta.link} className="open-op" target="_blank">{" "}<i className="fas fa-external-link-alt"></i></a>):"";
                const sollink = (<Link to={meta.path} className="open-sol">{" "}<i className="far fa-lightbulb"></i></Link>);
                const md = markdown.processSync(meta.description).contents;
                
                // inline mode
                if (is_inline === true) {
                    return (<>
                        <b>{meta.title}</b>
                        {ojlink}{sollink}{" "}
                        {md}
                    </>)
                }
                // block mode
                return (<>
                    <h2 className="title is-4">{title_prefix}{meta.title}{ojlink}</h2>
                    <Theorem
                        c="is-info"
                    >{meta.description}</Theorem>
                    <p></p>
                    {solution}
                    </>
                    )
            }}
            />)
    }
} 