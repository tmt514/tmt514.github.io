import React, {Component} from 'react'
import Theorem from './theorem'
import {StaticQuery, graphql, Link} from 'gatsby'
import visit from 'unist-util-visit'

import markdown from './markdown'

const numToDifficulty = ["Unknown",
        "Eew",
        "Easy-Peasy",
        "Easy",
        "Medium",
        "Meaningful",
        "Medium",
        "Hard",
        "Hazzard",
        "Horrible",
        "Hercules",
    ];

export function getBgclassByDifficulty(difficulty) {
    if (isNaN(difficulty)) {
        difficulty = difficulty.toLowerCase();
        if (difficulty.startsWith("e"))
            return "is-success"
        if (difficulty.startsWith("m"))
            return "is-warning"
        if (difficulty.startsWith("h"))
            return "is-danger"
    } else {
        const d = parseInt(difficulty);
        if (d <= 0) return "";
        if (d <= 3) return "is-success";
        if (d <= 6) return "is-warning";
        if (d <= 10) return "is-danger";
        return "is-dark";
    }
    return "";
}

const Difficulty = ({ meta }) => {
    var difficulty = meta.difficulty===null? "0": meta.difficulty;
    var bgclass = "";
    
    if (!isNaN(difficulty)) {
        const d = parseInt(difficulty);
        difficulty = numToDifficulty[d];
    }
    
    if (difficulty.toLowerCase().startsWith("e")) {
        bgclass = "is-success"
    } else if (difficulty.toLowerCase().startsWith("m")) {
        bgclass = "is-warning"
    } else if (difficulty.toLowerCase().startsWith("h")) {
        bgclass = "is-danger"
    }
    return (<span className={`tag ${bgclass} is-rounded`}><b>{difficulty}</b></span>);
}

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
        const is_linkonly = (this.props["linkonly"] !== undefined);
        
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
                
                const e = data.pages.edges.filter((e) => {return (
                    e.node.frontmatter.path === path ||
                    e.node.frontmatter.code === code) });
                
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
                
                // link mode
                if (is_linkonly === true) {
                    return (<>
                        <Difficulty meta={meta} />{" "}
                        {title_prefix}{meta.title}
                        {ojlink}{sollink}{" "}
                    </>)
                }
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