import React, {Component, Fragment} from 'react';
import { StaticQuery, graphql } from 'gatsby';
import markdown from './markdown'
import { getBgclassByDifficulty } from './include-problem';

const findFirstDescendantByType = (node, type) => {
    if (node.type === type) return node;
    const {children} = node;
    if (children !== undefined) {
        for (var i = 0; i < children.length; i++) {
            const t = findFirstDescendantByType(children[i], type);
            if (t !== null) return t;
        }
    }
    return null;
}

export const roadmapTransformer = function(options) {
    if (options.frontmatter !== undefined && options.frontmatter["roadmap_label_h3"] !== null) {
        var my_counter = 0;
        const formatter = options.frontmatter["roadmap_label_h3"]
        function transformer(node, file) {
            const {type, tagName, children} = node;
            if (type === "element" && tagName === "h3") {
                const t = findFirstDescendantByType(node, 'text')
                if (t !== null) {
                    my_counter += 1
                    t.value = formatter.replace(/###/, `${my_counter}`) + t.value;
                }
            } else if (children) {
                children.forEach(transformer);
            }
        }
        return transformer;
    }
    return () => {};
};

export class ContentCollection extends Component {
    render() {
        const path_prefix = this.props["path-prefix"] || this.props.path_prefix;
        const tag = this.props["tag"]||"dummyTag";
        const builder = this.props.builder;
        return (<StaticQuery
            query={graphql`
            query contentcollection {
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
                                tags
                            }
                            htmlAst
                        }
                     
                    }
                }
            }
            `}
            render={(data) => {
                const pages = data.pages.edges.filter((e) => {
                    return (
                        (e.node.frontmatter.path||"").startsWith(path_prefix)
                    ||  (e.node.frontmatter.tags||[]).includes(tag));
                })
                return builder(pages);
            }}
        />);
    }
};

export class ProblemListAsTags extends Component {
    render() {
        const n = parseInt(this.props.n);
        const label = this.props.label || "A"; 
        const path_prefix = this.props["path-prefix"];
        
        const getLabel = (label, i) => {
            if (label === "A") return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[i];
            return `P${i}`;
        }
        const builder = (pages) => {
            var i, j;
            var output = [];
            for (i = 0; i < n; i++) {
                const l = getLabel(label, i);
                const link = `${path_prefix}/${l}`;
                const findPageByPath = (path) => {
                    for (j = 0; j < pages.length; j++) {
                        const page = pages[j].node;
                        if (page.frontmatter.path === `${path_prefix}/${l}`) {
                            return page;
                        }
                    }
                    return undefined;
                }
                const page = findPageByPath(link);
                const now = new Date();
                if (page !== undefined &&
                    page.frontmatter &&
                    new Date(page.frontmatter.date) <= now) {
                    output.push((
                        <Fragment key={i}>
                        <a href={link}>
                        <span key={`i-${i}`} style={{fontWeight: 'bold'}} className={`tag ${getBgclassByDifficulty(page.frontmatter.difficulty)}`}>{l}</span>
                        </a>
                        {" "}
                        </Fragment>
                        ))
                } else {
                    output.push((
                        <Fragment key={i}>
                        <span key={`i-${i}`} className="tag" >{l}</span>
                        {" "}
                        </Fragment>
                        ))
                }
            }
            return output;
        }

        return (<ContentCollection
            path_prefix={path_prefix}
            builder={builder}
        />)
    }
};

class RoadmapSectionTitle extends Component {
    render() {
        return (<h3></h3>);
    }
};

export default RoadmapSectionTitle;