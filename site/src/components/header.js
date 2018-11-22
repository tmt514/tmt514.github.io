import React, { Component } from 'react'
import { Link } from 'gatsby'

class Header extends Component {
  constructor() {
    super()
    this.state = {
      menuToggled: false,
    }
  }
  toggleMenu() {
    const newState = Object.assign({}, this.state);
    newState.menuToggled = !newState.menuToggled;
    this.setState(newState);
  }
  render() {
    const siteTitle = this.props.siteTitle;
    const colorClass = this.props.colorClass;
    const navbarLink = this.props.navbarLink;

    return (
<nav className={"navbar " + (colorClass || "is-link") }
    role = "navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <div className="navbar-item">
      <Link to={navbarLink || "/"} className="has-text-white subtitle is-bold">{siteTitle}</Link>
      </div>
      <div className="navbar-burger burger" data-target="navMenu" onClick={this.toggleMenu.bind(this)}>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      </div>
    </div>
    <div className={"navbar-menu " + (this.state.menuToggled? "is-active": "")} >
    <div className="navbar-end">
    <Link to="/" className="navbar-item">Resume</Link>
    <Link to="#" className="navbar-item">Projects</Link>
    <Link to="/blog" className="navbar-item">Blog Posts</Link>
    </div>
    </div>
  </nav>
    )
  }
};

export default Header
