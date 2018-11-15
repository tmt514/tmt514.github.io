(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{379:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=(a(382),a(390)),l=(a(165),a(78),a(26)),s=a.n(l),c=function(e){function t(){return e.apply(this,arguments)||this}return s()(t,e),t.prototype.render=function(){var e=this.props.schoolList.edges.map(function(e){return e.node}).map(function(e,t){return r.a.createElement("div",{className:"level",style:{marginBottom:"5px"},key:t},r.a.createElement("p",{className:"level-left"},e.degree,", ",e.department,", ",e.name,", ",e.place),r.a.createElement("span",{className:"level-right"},e.year))});return console.log(this.props),r.a.createElement("section",{className:"section"},r.a.createElement("h2",{className:"title is-size-4"},"Education"),e)},t}(n.Component),o=(a(113),a(487)),u=a.n(o),m=function(e){function t(){return e.apply(this,arguments)||this}return s()(t,e),t.prototype.render=function(){var e=u()(this.props.contents);console.log(e);var t=e.data.map(function(e,t){return r.a.createElement("div",{key:t,style:{marginBottom:"10pt"}},r.a.createElement("div",null,r.a.createElement("b",null,e.title))," ",r.a.createElement("div",null,(a=e.author,n=(n=(n=a[0].literal).split(/\s*\n\s*/).join(" ").split(" and ")).slice(0,-1).join(", ")+" and "+n.slice(-1),r.a.createElement("span",null,n))),r.a.createElement("div",null,e["container-title"]));var a,n});return console.log(this.props),r.a.createElement("section",{className:"section"},r.a.createElement("h2",{className:"title is-size-4"},"Publications"),t)},t}(n.Component);a.d(t,"query",function(){return d});t.default=function(e){var t=e.data;return r.a.createElement(i.a,null,r.a.createElement("section",{className:"section"},r.a.createElement("div",{className:"level"},r.a.createElement("div",{className:"level-left"},r.a.createElement("div",null,r.a.createElement("h1",{className:"title is-size-2"},"Shang-En Huang"),r.a.createElement("div",{className:"subtitle"},"📨 ",r.a.createElement("img",{style:{marginTop:"0.5em"},src:"http://safemail.justlikeed.net/e/47a651e785a0fafe09f9eeb72fba2310.png",border:"0",align:"center",title:"Email image created with safemail.justlikeed.net"})),r.a.createElement("p",null,t.allIntroYaml.edges[0].node.intro))),r.a.createElement("div",{className:"level-right"},r.a.createElement("img",{src:"https://lh3.googleusercontent.com/BLveovoIbvIWqDbrP9oP8z8xZzOB4tkr5rQxMhH44xz-kLQPXJhVIZiQgZKSSHn7ezcG6PQ_-iImZ6XDTkIna_TkFgcYL5mg75H53IngoPpDShzkbUcP-ol1NSOIOqzOZH7gbW4lvThiXTZYyjNK_3aWQi5X44yFexISzBp3TL9RTY0GxHLIzUuJMLtgBItiGfwCB7dFx6RB6jhNkWiiWgLsAjkFIp3EgUhVE4jbojHlyB7-QAs4LgHdfckbqWsYMDLYx6m0c9MfBYtfbAOvSlauebE1ebVahOsJfdqHtLAS6WIEIhZ5VKA6F0Wi0kbCS6amXlIsXRVwkCLC5pKQ4ifRpvbm2fNe24_mJCGv7MXgNj_AM4O2ZsCPTdYOJ-58KTrQ1JKCMh9r8_Im0UoCTKm519YfvlrA15YsaQonHxv-SJYCXs6Zh5_adcpjb6neV8E9bLKNFH9Fueg4M-PqebhLtoMm6_kUKycOF0DcyDBuMWeXodO42ftw8-mM6eQO0eQtLDgiyVmVLGdIxVZDYJzZnxJkb6H2qkpYqCklNRZsapJ6-tIc5lEIaeuSZxFd5N6SN-gGYINOtbhQ0U09JnlvAaukVqN8cOH5OH5jUYpDb77bMRslQQ-oD6thmVo6oUutpWTC_ptN_ockz1Ljq_kisqQKk9FZCVkJhfEOvIpuiTiWBJeSmzEa0A=w583-h438-no",style:{maxWidth:"300px"}}))),r.a.createElement(c,{schoolList:t.allEducationYaml}),r.a.createElement(m,{contents:t.publications.contents})))};var d="1467883478"},382:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return h}),a.d(t,"StaticQueryContext",function(){return d}),a.d(t,"StaticQuery",function(){return p});var n=a(1),r=a.n(n),i=a(14),l=a.n(i),s=a(381),c=a.n(s);a.d(t,"Link",function(){return c.a}),a.d(t,"withPrefix",function(){return s.withPrefix}),a.d(t,"navigate",function(){return s.navigate}),a.d(t,"push",function(){return s.push}),a.d(t,"replace",function(){return s.replace}),a.d(t,"navigateTo",function(){return s.navigateTo});var o=a(383),u=a.n(o);a.d(t,"PageRenderer",function(){return u.a});var m=a(77);a.d(t,"parsePath",function(){return m.a});var d=r.a.createContext({}),p=function(e){return r.a.createElement(d.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function h(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}p.propTypes={data:l.a.object,query:l.a.string.isRequired,render:l.a.func,children:l.a.func}},383:function(e,t,a){var n;e.exports=(n=a(384))&&n.default||n},384:function(e,t,a){"use strict";a.r(t);a(59);var n=a(1),r=a.n(n),i=a(14),l=a.n(i),s=a(112),c=a(12),o=function(e){var t=e.location,a=c.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(s.a,Object.assign({location:t,pageResources:a},a.json))};o.propTypes={location:l.a.shape({pathname:l.a.string.isRequired}).isRequired},t.default=o},386:function(e,t,a){"use strict";var n=a(1),r=a.n(n),i=a(382);t.a=function(e){var t=e.siteTitle,a=e.colorClass;return r.a.createElement("section",{className:"hero "+(a||"is-info")+" is-bold"},r.a.createElement("div",{className:"hero-body"},r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"title"},t)),r.a.createElement("div",null,r.a.createElement("p",{className:"is-pulled-right"},r.a.createElement(i.Link,{to:"/"},"Resume")," || Work Experiences || Projects || ",r.a.createElement(i.Link,{to:"/blog"},"Blog Posts")))))}},390:function(e,t,a){"use strict";var n=a(391),r=a(1),i=a.n(r),l=a(14),s=a.n(l),c=a(388),o=a.n(c),u=a(382),m=a(386),d=(a(389),function(e){var t=e.children;return i.a.createElement(u.StaticQuery,{query:"755544856",render:function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement(o.a,{title:e.site.siteMetadata.title,meta:[{name:"description",content:"Sample"},{name:"keywords",content:"sample, something"}]},i.a.createElement("html",{lang:"en"})),i.a.createElement(m.a,{siteTitle:e.site.siteMetadata.title}),i.a.createElement("div",{style:{margin:"0 auto",maxWidth:960,padding:"0px 1.0875rem 1.45rem",paddingTop:0}},t))},data:n})});d.propTypes={children:s.a.node.isRequired},t.a=d},391:function(e){e.exports={data:{site:{siteMetadata:{title:"Shang-En Huang"}}}}}}]);
//# sourceMappingURL=component---src-pages-index-js-d0a65640ab16a5643533.js.map