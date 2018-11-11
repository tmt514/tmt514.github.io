import React from 'react'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'

import Header from '../components/header'
import '../components/layout.css'
import "bulma/css/bulma.css"

const BlogPostList = ({ list }) => (
    <ul>
        {list && list.edges.map((x, idx) => (
            <li key={idx}>
                <small>{x.node.frontmatter.date}</small>
                {" "}
                <Link to={x.node.frontmatter.path}>
                {x.node.frontmatter.title}
                </Link>
            </li>
        ))}
    </ul>
);

const Blog = ({ data }) => (
    <StaticQuery
    query={graphql`
    query blogquery{
        algoBlog: allMarkdownRemark(filter:
            {frontmatter: { category: { eq: "algo"}}}){
          edges {
            node {
                frontmatter {
                  title
                  path
                  date(formatString:"YYYY-MM-DD")
                  _PARENT
                }
            } 
          }
        }
        
        myProblemBlog: allMarkdownRemark(filter:
            {frontmatter: { category: { eq: "my-problem"}}}){
          edges {
            node {
                frontmatter {
                  title
                  path
                  date(formatString:"YYYY-MM-DD")
                  _PARENT
                }
            } 
          }
        }
        
      }
      
    `}
    render={data=>(
        <div>
            <Helmet title="漫談演算法" />
            <Header siteTitle="卡恩的部落格" colorClass="is-dark" />
            <section 
                className="section"
            >
            <div className="container">
            <div className="content box">
                <h1 className="title">
                    漫談演算法
                </h1>
                <p>
                    想要整理一些自以為完整的演算法教學文章。
                    除了分析以外，還希望能夠提供一些實作方法給大家參考。
                </p>
                <BlogPostList list={data.algoBlog} />
            </div>
            </div>
            </section>
            <section 
                className="section"
            >
            <div className="container">
            <div className="content box">
                <h1 className="title">
                    我出過的題目
                </h1>
                <p>
                想要整理以前出過的所有題目，也想紀錄一些出題當下的想法跟來龍去脈。
                </p>
                <BlogPostList list={data.myProblemBlog} />
            </div>
            </div>
            </section>
        </div>
    )}
    />
)

export default Blog;