import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'

import Header from '../../components/header'
import "bulma/css/bulma.css"

const ResearchNoteTiles = ({ notes }) => (
    <Fragment>
    { notes && notes.edges.map((x) => x.node).map((x, idx) => (
        <Link id={`rn-${idx}`} to={x.frontmatter.path}>
        <div className="tile is-child box">
        <p className="title">{x.frontmatter.title}</p>
        </div>
        </Link>
        ))}
    </Fragment>
);

const ResearchNotes = ({ data }) => (
    <StaticQuery
    query={graphql`
    query researchquery{
        notes: allMarkdownRemark(filter:
            {frontmatter: { category: { regex: "/\\bresearch\\b/"}}},
            sort: {fields: [frontmatter___title ], order:ASC}){
          edges {
            node {
                frontmatter {
                  title
                  path
                  date(formatString:"YYYY-MM-DD")
                }
            } 
          }
        }
    }`}
    render={data=>(
        <div>
    <Helmet title="Tmt's Research Notes" />
    <Header siteTitle="My Research Notes" colorClass="is-info" navbarLink="/blog" />
    <div className='container section'>
    <div className="tile is-ancestor">
    <ResearchNoteTiles notes={data.notes}/>
    </div>
    </div>
    </div>)
    }></StaticQuery>
)

export default ResearchNotes;