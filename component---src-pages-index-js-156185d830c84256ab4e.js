(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{379:function(e,t,a){"use strict";a.r(t);a(77);var n=a(1),r=a.n(n),i=(a(381),a(399)),s=(a(174),a(26)),l=a.n(s),c=function(e){function t(){return e.apply(this,arguments)||this}return l()(t,e),t.prototype.render=function(){var e=this.props.schoolList.edges.map(function(e){return e.node}).map(function(e,t){return r.a.createElement("div",{className:"level",style:{marginBottom:"5px"},key:t},r.a.createElement("div",{className:"level-left"},e.degree,", ",e.department,", ",e.name,", ",e.place),r.a.createElement("span",{className:"level-right"},e.year))});return console.log(this.props),r.a.createElement("section",{className:"section"},r.a.createElement("h2",{className:"title is-size-4"},"Education"),e)},t}(n.Component),o=(a(116),a(676)),m=a.n(o),u=function(e){function t(){return e.apply(this,arguments)||this}return l()(t,e),t.prototype.render=function(){var e=m()(this.props.contents);console.log(e);var t=e.data.map(function(e,t){return r.a.createElement("div",{key:t,style:{marginBottom:"10pt"}},r.a.createElement("div",null,r.a.createElement("b",null,e.title))," ",r.a.createElement("div",null,(a=e.author,n=(n=(n=a[0].literal).split(/\s*\n\s*/).join(" ").split(" and ")).slice(0,-1).join(", ")+" and "+n.slice(-1),r.a.createElement("span",null,n))),r.a.createElement("div",null,e["container-title"]));var a,n});return console.log(this.props),r.a.createElement("section",{className:"section"},r.a.createElement("h2",{className:"title is-size-4"},"Publications"),t)},t}(n.Component),d=a(464),p=a.n(d),h=a(471),g=a.n(h);a.d(t,"query",function(){return E});var v=p()().use(g.a,{createElement:r.a.createElement,remarkReactComponents:{}}),f=function(e){var t=e.contents.edges,a=[];t.map(function(e){return e.node}).map(function(e,t){a.push(r.a.createElement("div",{key:t+"0",className:"column is-four-fifths"},v.processSync(e.content).contents)),a.push(r.a.createElement("div",{key:t+"1",className:"column"},r.a.createElement("span",{className:"is-pulled-right"},e.year)))});return r.a.createElement("section",{className:"section"},r.a.createElement("h2",{className:"title is-size-4"},"Teaching Experiences"),r.a.createElement("div",{className:"columns is-multiline is-gapless"},a))},E=(t.default=function(e){var t=e.data;return r.a.createElement(i.a,null,r.a.createElement("section",{className:"section"},r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"media"},r.a.createElement("div",{className:"media-content"},r.a.createElement("div",{className:"content"},r.a.createElement("h1",{className:"title is-size-3"},"Shang-En Huang"),r.a.createElement("div",{className:"subtitle"},"📨 ",r.a.createElement("img",{style:{marginTop:"0.5em"},src:"http://safemail.justlikeed.net/e/47a651e785a0fafe09f9eeb72fba2310.png",border:"0",align:"center",title:"Email image created with safemail.justlikeed.net"})),r.a.createElement("div",{className:"content"},v.processSync(t.allIntroYaml.edges[0].node.intro).contents))),r.a.createElement("div",{className:"media-right"},r.a.createElement("img",{src:"https://lh3.googleusercontent.com/BLveovoIbvIWqDbrP9oP8z8xZzOB4tkr5rQxMhH44xz-kLQPXJhVIZiQgZKSSHn7ezcG6PQ_-iImZ6XDTkIna_TkFgcYL5mg75H53IngoPpDShzkbUcP-ol1NSOIOqzOZH7gbW4lvThiXTZYyjNK_3aWQi5X44yFexISzBp3TL9RTY0GxHLIzUuJMLtgBItiGfwCB7dFx6RB6jhNkWiiWgLsAjkFIp3EgUhVE4jbojHlyB7-QAs4LgHdfckbqWsYMDLYx6m0c9MfBYtfbAOvSlauebE1ebVahOsJfdqHtLAS6WIEIhZ5VKA6F0Wi0kbCS6amXlIsXRVwkCLC5pKQ4ifRpvbm2fNe24_mJCGv7MXgNj_AM4O2ZsCPTdYOJ-58KTrQ1JKCMh9r8_Im0UoCTKm519YfvlrA15YsaQonHxv-SJYCXs6Zh5_adcpjb6neV8E9bLKNFH9Fueg4M-PqebhLtoMm6_kUKycOF0DcyDBuMWeXodO42ftw8-mM6eQO0eQtLDgiyVmVLGdIxVZDYJzZnxJkb6H2qkpYqCklNRZsapJ6-tIc5lEIaeuSZxFd5N6SN-gGYINOtbhQ0U09JnlvAaukVqN8cOH5OH5jUYpDb77bMRslQQ-oD6thmVo6oUutpWTC_ptN_ockz1Ljq_kisqQKk9FZCVkJhfEOvIpuiTiWBJeSmzEa0A=w583-h438-no",style:{maxWidth:"300px",borderRadius:"10px"}})))),r.a.createElement(c,{schoolList:t.allEducationYaml}),r.a.createElement(u,{contents:t.publications.contents}),r.a.createElement(f,{contents:t.allExperiencesYaml})))},"947983494")},381:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return h}),a.d(t,"StaticQueryContext",function(){return d}),a.d(t,"StaticQuery",function(){return p});var n=a(1),r=a.n(n),i=a(14),s=a.n(i),l=a(380),c=a.n(l);a.d(t,"Link",function(){return c.a}),a.d(t,"withPrefix",function(){return l.withPrefix}),a.d(t,"navigate",function(){return l.navigate}),a.d(t,"push",function(){return l.push}),a.d(t,"replace",function(){return l.replace}),a.d(t,"navigateTo",function(){return l.navigateTo});var o=a(382),m=a.n(o);a.d(t,"PageRenderer",function(){return m.a});var u=a(78);a.d(t,"parsePath",function(){return u.a});var d=r.a.createContext({}),p=function(e){return r.a.createElement(d.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function h(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}p.propTypes={data:s.a.object,query:s.a.string.isRequired,render:s.a.func,children:s.a.func}},382:function(e,t,a){var n;e.exports=(n=a(389))&&n.default||n},389:function(e,t,a){"use strict";a.r(t);a(59);var n=a(1),r=a.n(n),i=a(14),s=a.n(i),l=a(115),c=a(12),o=function(e){var t=e.location,a=c.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(l.a,Object.assign({location:t,pageResources:a},a.json))};o.propTypes={location:s.a.shape({pathname:s.a.string.isRequired}).isRequired},t.default=o},392:function(e,t,a){"use strict";a(164),a(59);var n=a(26),r=a.n(n),i=a(1),s=a.n(i),l=a(381),c=function(e){function t(){var t;return(t=e.call(this)||this).state={menuToggled:!1},t}r()(t,e);var a=t.prototype;return a.toggleMenu=function(){var e=Object.assign({},this.state);e.menuToggled=!e.menuToggled,this.setState(e)},a.render=function(){var e=this.props.siteTitle,t=this.props.colorClass,a=this.props.navbarLink;return s.a.createElement("nav",{className:"navbar "+(t||"is-link"),role:"navigation","aria-label":"main navigation"},s.a.createElement("div",{className:"navbar-brand"},s.a.createElement("div",{className:"navbar-item"},s.a.createElement(l.Link,{to:a||"/",className:"has-text-white subtitle is-bold"},e)),s.a.createElement("div",{className:"navbar-burger burger","data-target":"navMenu",onClick:this.toggleMenu.bind(this)},s.a.createElement("span",{"aria-hidden":"true"}),s.a.createElement("span",{"aria-hidden":"true"}),s.a.createElement("span",{"aria-hidden":"true"}))),s.a.createElement("div",{className:"navbar-menu "+(this.state.menuToggled?"is-active":"")},s.a.createElement("div",{className:"navbar-end"},s.a.createElement(l.Link,{to:"/",className:"navbar-item"},"Resume"),s.a.createElement(l.Link,{to:"#",className:"navbar-item"},"Projects"),s.a.createElement(l.Link,{to:"/blog",className:"navbar-item"},"Blog Posts"))))},t}(i.Component);t.a=c},399:function(e,t,a){"use strict";var n=a(400),r=a(1),i=a.n(r),s=a(14),l=a.n(s),c=a(396),o=a.n(c),m=a(381),u=a(392),d=(a(397),a(401),function(e){var t=e.children;return i.a.createElement(m.StaticQuery,{query:"755544856",render:function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement(o.a,{title:e.site.siteMetadata.title,meta:[{name:"description",content:"Sample"},{name:"keywords",content:"sample, something"}]},i.a.createElement("html",{lang:"en"})),i.a.createElement(u.a,{siteTitle:e.site.siteMetadata.title}),i.a.createElement("div",{className:"content",style:{margin:"0 auto",maxWidth:960,padding:"0px 1.0875rem 1.45rem",paddingTop:0}},t))},data:n})});d.propTypes={children:l.a.node.isRequired},t.a=d},400:function(e){e.exports={data:{site:{siteMetadata:{title:"Shang-En Huang"}}}}},401:function(e,t,a){}}]);
//# sourceMappingURL=component---src-pages-index-js-156185d830c84256ab4e.js.map