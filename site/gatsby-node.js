/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

"use strict";
const { createFilePath } = require ('gatsby-source-filesystem')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

function updatePublications(createNode, path) {
    var callback = (err, contents) => {
        createNode({
            id: `${path} id`,
            contents: contents,
            internal: {
                type: `Publications`,
                mediaType: `text/plain`,
                contentDigest:
                    crypto.createHash(`md5`)
                    .update(JSON.stringify(contents))
                    .digest(`hex`),
            }  
        })
    }
    fs.readFile(path, 'utf8', callback)
}

// You can delete this file if you're not using it
exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNode, createNodeField } = actions
    console.log(`node internal type; =${node.internal.type}`)
    if (node.internal.type === "File" &&
        node.absolutePath.endsWith(".bibtex")) {
            updatePublications(createNode, node.absolutePath);
        }
}

    
exports.onCreateBabelConfig = ({ actions }) => {
    actions.setBabelPlugin({
        name: '@babel/plugin-transform-runtime',
    })
}

exports.createPagesStatefully = ({ graphql, actions }) => {
    const { createNode, createNodeField } = actions
    return new Promise((resolve, reject) => {
        graphql(`
        {
            allFile(filter: {absolutePath: {regex: "/.*.bibtex$/"}}) {
              edges {
                node {
                  absolutePath
                  internal {
                    contentDigest
                    type
                    mediaType
                    description
                    owner
                  }
                }
              }
            }
          }          
        `).then(result => {
            const plist = result.data.allFile.edges;
            for (var item of plist) {
                const path = item.node.absolutePath;
                updatePublications(createNode, path)
            }
        //console.log(JSON.stringify(result, null, 4));
        resolve()
        })
    })

}



/* copied from https://medium.freecodecamp.org/how-to-build-a-react-and-gatsby-powered-blog-in-about-10-minutes-625c35c06481 */
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/components/blog-post.js`);
  return graphql(`{
      allMarkdownRemark(
        # sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            htmlAst
            id
            frontmatter {
              date
              path
              title
            }
          }
        }
      }
    }`)
      .then(result => {
        if (result.errors) {
          return Promise.reject(result.errors);
        }
  result.data.allMarkdownRemark.edges
          .forEach(({ node }) => {
            if (node.frontmatter.path) {
              createPage({
                path: node.frontmatter.path,
                component: blogPostTemplate,
                context: {} // additional data can be passed via context
              });
            }
          });
      });
  }


  exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
      console.log("SET WEBPACK CONFIG HERE!!!!!")
      actions.setWebpackConfig({
        context: __dirname,
        node: {
          __dirname: true,
          __filename: true,
        },
      })
    }
  }
  