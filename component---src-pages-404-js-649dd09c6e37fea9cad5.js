(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{375:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(390);t.default=function(){return r.a.createElement(i.a,null,r.a.createElement("h1",null,"NOT FOUND"),r.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))}},382:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return f}),a.d(t,"StaticQueryContext",function(){return m}),a.d(t,"StaticQuery",function(){return p});var n=a(1),r=a.n(n),i=a(14),o=a.n(i),u=a(381),c=a.n(u);a.d(t,"Link",function(){return c.a}),a.d(t,"withPrefix",function(){return u.withPrefix}),a.d(t,"navigate",function(){return u.navigate}),a.d(t,"push",function(){return u.push}),a.d(t,"replace",function(){return u.replace}),a.d(t,"navigateTo",function(){return u.navigateTo});var s=a(383),l=a.n(s);a.d(t,"PageRenderer",function(){return l.a});var d=a(77);a.d(t,"parsePath",function(){return d.a});var m=r.a.createContext({}),p=function(e){return r.a.createElement(m.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function f(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}p.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},383:function(e,t,a){var n;e.exports=(n=a(384))&&n.default||n},384:function(e,t,a){"use strict";a.r(t);a(59);var n=a(1),r=a.n(n),i=a(14),o=a.n(i),u=a(112),c=a(12),s=function(e){var t=e.location,a=c.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(u.a,Object.assign({location:t,pageResources:a},a.json))};s.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=s},386:function(e,t,a){"use strict";var n=a(1),r=a.n(n),i=a(382);t.a=function(e){var t=e.siteTitle,a=e.colorClass;return r.a.createElement("section",{className:"hero "+(a||"is-info")+" is-bold"},r.a.createElement("div",{className:"hero-body"},r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"title"},t)),r.a.createElement("div",null,r.a.createElement("p",{className:"is-pulled-right"},r.a.createElement(i.Link,{to:"/"},"Resume")," || Work Experiences || Projects || ",r.a.createElement(i.Link,{to:"/blog"},"Blog Posts")))))}},390:function(e,t,a){"use strict";var n=a(391),r=a(1),i=a.n(r),o=a(14),u=a.n(o),c=a(388),s=a.n(c),l=a(382),d=a(386),m=(a(389),function(e){var t=e.children;return i.a.createElement(l.StaticQuery,{query:"755544856",render:function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement(s.a,{title:e.site.siteMetadata.title,meta:[{name:"description",content:"Sample"},{name:"keywords",content:"sample, something"}]},i.a.createElement("html",{lang:"en"})),i.a.createElement(d.a,{siteTitle:e.site.siteMetadata.title}),i.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"0px 1.0875rem 1.45rem",paddingTop:0}},t))},data:n})});m.propTypes={children:u.a.node.isRequired},t.a=m},391:function(e){e.exports={data:{site:{siteMetadata:{title:"Shang-En Huang"}}}}}}]);
//# sourceMappingURL=component---src-pages-404-js-649dd09c6e37fea9cad5.js.map