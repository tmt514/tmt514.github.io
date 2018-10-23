import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <section className="hero is-info is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                {siteTitle}
              </h1>
            </div>
            <div>
              <p className="is-pulled-right">
              <Link to="/">Resume</Link> || 
              Work Experiences || Projects || CP Problems
              </p>
            </div>
          </div>
        </section>
)

export default Header
