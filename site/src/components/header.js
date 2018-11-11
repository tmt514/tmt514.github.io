import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle, colorClass }) => (
  <section className={"hero " + (colorClass || "is-info") + " is-bold"}>
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {siteTitle}
              </h1>
            </div>
            <div>
              <p className="is-pulled-right">
              <Link to="/">Resume</Link> || 
              Work Experiences || Projects || {}
              <Link to="/blog">Blog Posts</Link>
              </p>
            </div>
          </div>
        </section>
)

export default Header
