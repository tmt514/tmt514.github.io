(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{380:function(e,t,a){"use strict";a.r(t);var n=a(26),r=a.n(n),i=(a(165),a(1)),c=a.n(i),o=a(388),s=a.n(o),l=a(382),u=a(466),m=a.n(u),d=a(480),p=a.n(d),h=(a(481),a(482),a(483),a(484),a(389),a(485)),f=a.n(h),v=function(e){function t(){return e.apply(this,arguments)||this}r()(t,e);var a=t.prototype;return a.componentDidUpdate=function(){this._update()},a.componentDidMount=function(){this._update()},a._update=function(){var e=this.canvas,t=e.getContext("2d");t.clearRect(0,0,e.width,e.height),t.font="16px Roboto",t.textAlign="center",t.textBaseline="middle";var a=JSON.parse(this.props.data);if(a){var n,r=a.length;for(n=0;n<r;n++)console.log(a[n]),t.rect(30*n,0,28,28),t.fillText(""+a[n],30*n+14,14);t.stroke()}},a._computeDimension=function(){return[30*JSON.parse(this.props.data).length+1,31]},a.render=function(){var e=this,t=this._computeDimension();return c.a.createElement("div",{className:"has-text-centered"},c.a.createElement("canvas",{ref:function(t){return e.canvas=t},width:t[0],height:t[1]}))},t}(i.Component);a.d(t,"pageQuery",function(){return N});var g=function(e){var t=e.children;return c.a.createElement("h1",{className:"title is-3"},t)},E=function(e){var t=e.children;return c.a.createElement("h1",{className:"title is-4"},t)},y=function(e){var t=e.children;return c.a.createElement("h1",{className:"title is-5"},t)},w=function(e){var t=e.className,a=e.children;return c.a.createElement("code",{className:t},a)},b=function(e){var t=e.frontmatter,a=e.varname;return c.a.createElement("div",null,t[a])},x=function(e){function t(){return e.apply(this,arguments)||this}r()(t,e);var a=t.prototype;return a.componentDidMount=function(){window.MathJax.Hub.Queue(["Typeset",window.MathJax.Hub]),p.a.plugins.customClass.prefix("prism--"),p.a.highlightAll()},a.componentDidUpdate=function(){window.MathJax.Hub.Queue(["Typeset",window.MathJax.Hub]),p.a.plugins.customClass.prefix("prism--"),p.a.highlightAll()},a.render=function(){var e,t=this.props.data.markdownRemark;return c.a.createElement("div",null,c.a.createElement(s.a,{title:"CodeStack - "+t.frontmatter.title}),c.a.createElement("section",{className:"hero is-dark"},c.a.createElement("div",{className:"hero-body"},c.a.createElement("div",{className:"container"},c.a.createElement("span",{className:"is-pulled-right"},c.a.createElement(l.Link,{to:"/blog"},c.a.createElement("span",{className:"icon has-text-warning"},c.a.createElement("i",{className:"fas fa-lg fa-home"}))," 返回")),c.a.createElement(l.Link,{to:t.frontmatter.path},c.a.createElement("h1",{className:"title"},t.frontmatter.title),c.a.createElement("h2",{className:"subtitle"},t.frontmatter.date))))),c.a.createElement("section",{className:"section"},c.a.createElement("div",{className:"container"},c.a.createElement("div",{className:"content"},(e=t.frontmatter,new m.a({createElement:function(t,a,n){return"ShowVariable"===t.name&&((a=a||{}).frontmatter=e),c.a.createElement(t,a,n)},components:{h1:g,h2:E,h3:y,code:w,displayarray:v,showvariable:b}}).Compiler)(t.htmlAst)))),c.a.createElement("footer",{className:"footer"},c.a.createElement("div",{className:"content"},c.a.createElement("div",{className:"is-flex is-vcentered is-centered"},c.a.createElement("img",{style:{height:"32px",margin:"10px"},src:f.a}),c.a.createElement("p",{style:{maxWidth:"500px"}},"本文由",c.a.createElement("b",null,"卡恩"),"撰寫。 網站原始碼為 MIT 授權。 網站內容如果沒有特別說明，皆為創用 CC-BY-NC-SA 4.0 授權。")))))},t}(i.Component),N=(t.default=x,"1925614468")},382:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return h}),a.d(t,"StaticQueryContext",function(){return d}),a.d(t,"StaticQuery",function(){return p});var n=a(1),r=a.n(n),i=a(14),c=a.n(i),o=a(381),s=a.n(o);a.d(t,"Link",function(){return s.a}),a.d(t,"withPrefix",function(){return o.withPrefix}),a.d(t,"navigate",function(){return o.navigate}),a.d(t,"push",function(){return o.push}),a.d(t,"replace",function(){return o.replace}),a.d(t,"navigateTo",function(){return o.navigateTo});var l=a(383),u=a.n(l);a.d(t,"PageRenderer",function(){return u.a});var m=a(77);a.d(t,"parsePath",function(){return m.a});var d=r.a.createContext({}),p=function(e){return r.a.createElement(d.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function h(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}p.propTypes={data:c.a.object,query:c.a.string.isRequired,render:c.a.func,children:c.a.func}},383:function(e,t,a){var n;e.exports=(n=a(384))&&n.default||n},384:function(e,t,a){"use strict";a.r(t);a(59);var n=a(1),r=a.n(n),i=a(14),c=a.n(i),o=a(112),s=a(12),l=function(e){var t=e.location,a=s.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(o.a,Object.assign({location:t,pageResources:a},a.json))};l.propTypes={location:c.a.shape({pathname:c.a.string.isRequired}).isRequired},t.default=l},484:function(e,t,a){},485:function(e,t,a){e.exports=a.p+"static/cc-by-nc-sa-982c531432c4ad7e8dbf3cf52a1dc6d0.png"}}]);
//# sourceMappingURL=component---src-components-blog-post-js-eaad180b6008283d1503.js.map