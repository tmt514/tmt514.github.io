(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{376:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(381),s=a(401);t.default=function(){return r.a.createElement(s.a,null,r.a.createElement("h1",null,"Hi from the second page"),r.a.createElement("p",null,"Welcome to page 2"),r.a.createElement(i.Link,{to:"/"},"Go back to the homepage"))}},381:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return g}),a.d(t,"StaticQueryContext",function(){return m}),a.d(t,"StaticQuery",function(){return p});var n=a(1),r=a.n(n),i=a(14),s=a.n(i),o=a(380),c=a.n(o);a.d(t,"Link",function(){return c.a}),a.d(t,"withPrefix",function(){return o.withPrefix}),a.d(t,"navigate",function(){return o.navigate}),a.d(t,"push",function(){return o.push}),a.d(t,"replace",function(){return o.replace}),a.d(t,"navigateTo",function(){return o.navigateTo});var u=a(382),l=a.n(u);a.d(t,"PageRenderer",function(){return l.a});var d=a(78);a.d(t,"parsePath",function(){return d.a});var m=r.a.createContext({}),p=function(e){return r.a.createElement(m.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function g(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}p.propTypes={data:s.a.object,query:s.a.string.isRequired,render:s.a.func,children:s.a.func}},382:function(e,t,a){var n;e.exports=(n=a(389))&&n.default||n},389:function(e,t,a){"use strict";a.r(t);a(59);var n=a(1),r=a.n(n),i=a(14),s=a.n(i),o=a(115),c=a(12),u=function(e){var t=e.location,a=c.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(o.a,Object.assign({location:t,pageResources:a},a.json))};u.propTypes={location:s.a.shape({pathname:s.a.string.isRequired}).isRequired},t.default=u},393:function(e,t,a){"use strict";a(164),a(59);var n=a(26),r=a.n(n),i=a(1),s=a.n(i),o=a(381),c=function(e){function t(){var t;return(t=e.call(this)||this).state={menuToggled:!1},t}r()(t,e);var a=t.prototype;return a.toggleMenu=function(){var e=Object.assign({},this.state);e.menuToggled=!e.menuToggled,this.setState(e)},a.render=function(){var e=this.props.siteTitle,t=this.props.colorClass,a=this.props.navbarLink;return s.a.createElement("nav",{className:"navbar "+(t||"is-link"),role:"navigation","aria-label":"main navigation"},s.a.createElement("div",{className:"navbar-brand"},s.a.createElement("div",{className:"navbar-item"},s.a.createElement(o.Link,{to:a||"/",className:"has-text-white subtitle is-bold"},e)),s.a.createElement("div",{className:"navbar-burger burger","data-target":"navMenu",onClick:this.toggleMenu.bind(this)},s.a.createElement("span",{"aria-hidden":"true"}),s.a.createElement("span",{"aria-hidden":"true"}),s.a.createElement("span",{"aria-hidden":"true"}))),s.a.createElement("div",{className:"navbar-menu "+(this.state.menuToggled?"is-active":"")},s.a.createElement("div",{className:"navbar-end"},s.a.createElement(o.Link,{to:"/",className:"navbar-item"},"Resume"),s.a.createElement(o.Link,{to:"#",className:"navbar-item"},"Projects"),s.a.createElement(o.Link,{to:"/blog",className:"navbar-item"},"Blog Posts"))))},t}(i.Component);t.a=c},401:function(e,t,a){"use strict";var n=a(402),r=a(1),i=a.n(r),s=a(14),o=a.n(s),c=a(397),u=a.n(c),l=a(381),d=a(393),m=(a(398),a(403),function(e){var t=e.children;return i.a.createElement(l.StaticQuery,{query:"755544856",render:function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement(u.a,{title:e.site.siteMetadata.title,meta:[{name:"description",content:"Sample"},{name:"keywords",content:"sample, something"}]},i.a.createElement("html",{lang:"en"})),i.a.createElement(d.a,{siteTitle:e.site.siteMetadata.title}),i.a.createElement("div",{className:"content",style:{margin:"0 auto",maxWidth:960,padding:"0px 1.0875rem 1.45rem",paddingTop:0}},t))},data:n})});m.propTypes={children:o.a.node.isRequired},t.a=m},402:function(e){e.exports={data:{site:{siteMetadata:{title:"Shang-En Huang"}}}}},403:function(e,t,a){}}]);
//# sourceMappingURL=component---src-pages-page-2-js-2fbc83841ed6bdfef30b.js.map