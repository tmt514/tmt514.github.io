import React from 'react';
import Helmet from 'react-helmet';
import {graphql} from 'gatsby';

export default function Template({ data }) {
    const post = data.markdownRemark;
    return (
        <div>
            <Helmet title={`CodeStack - ${post.frontmatter.title}`} />
            <section className="hero is-primary">
            <div className="hero-body">
            <div className="container">
            <h1 class="title">{post.frontmatter.title}</h1>
            </div>
            </div>
            </section>
            <section className="section">
            <div className="container">
            <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: post.html }}
                />
                </div>
            </section>
        </div>
    );
}


export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
;