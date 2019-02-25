import React from 'react'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'

import Header from '../components/header'
import "bulma/css/bulma.css"

const BlogPostList = ({ list }) => (
    <ul>
        {list && list.edges.map((x, idx) => (
            <li key={idx}>
                <small style={{marginRight:"7px"}}>{x.node.frontmatter.date}</small>
                {` `}
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
            {frontmatter: { category: { regex: "/\\balgo\\b/"}}},
            sort: {fields: [frontmatter___date ], order:DESC}){
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
        cpBlog: allMarkdownRemark(filter:
            {frontmatter: { category: { regex: "/\\bcp\\b/"}}},
            sort: {fields: [frontmatter___date ], order:DESC}){
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
            {frontmatter: { category: { regex: "/\\bmy-problem\\b/"}}},
            sort: {fields: [frontmatter___date ], order:DESC}){
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
            <Header siteTitle="卡恩的部落格" colorClass="is-dark" navbarLink="/blog" />
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
                    競程解題文章
                </h1>
                <p>
                蒐集一些競賽程式題目題解的地方～
                </p>
                <p>
                    <a href="/icpcblog-weekly-2019">競程日記 2019 計畫</a>
                </p>
                <BlogPostList list={data.cpBlog} />
            </div>
            </div>
            </section>
            <section 
                className="section"
            >
            <div className="container">
            <div className="content box">
                <h1 className="title">
                    回憶中的題目
                </h1>
                <p>
                想要整理以前經手過或是出過的所有題目，也想紀錄一些編寫題目當下的想法跟來龍去脈。
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