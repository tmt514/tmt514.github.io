(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{442:function(e,t,n){"use strict";var a=n(524),r=n(443);e.exports=function(e){var t=e||{},n=t.createElement,i=t.components||{};function s(e,t,r){var s=a(i,e)?i[e]:e;return n(s,t,r)}this.Compiler=function(e){"root"===e.type&&(e=1===e.children.length&&"element"===e.children[0].type?e.children[0]:{type:"element",tagName:"div",properties:{},children:e.children});return r(s,e,t.prefix)}}},524:function(e,t,n){"use strict";var a=n(525);e.exports=a.call(Function.call,Object.prototype.hasOwnProperty)},525:function(e,t,n){"use strict";var a=n(526);e.exports=Function.prototype.bind||a},526:function(e,t,n){"use strict";var a=Array.prototype.slice,r=Object.prototype.toString;e.exports=function(e){var t=this;if("function"!=typeof t||"[object Function]"!==r.call(t))throw new TypeError("Function.prototype.bind called on incompatible "+t);for(var n,i=a.call(arguments,1),s=Math.max(0,t.length-i.length),o=[],l=0;l<s;l++)o.push("$"+l);if(n=Function("binder","return function ("+o.join(",")+"){ return binder.apply(this,arguments); }")(function(){if(this instanceof n){var r=t.apply(this,i.concat(a.call(arguments)));return Object(r)===r?r:this}return t.apply(e,i.concat(a.call(arguments)))}),t.prototype){var u=function(){};u.prototype=t.prototype,n.prototype=new u,u.prototype=null}return n}},535:function(e,t,n){(function(t){var n="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},a=function(){var e=/\blang(?:uage)?-([\w-]+)\b/i,t=0,a=n.Prism={manual:n.Prism&&n.Prism.manual,disableWorkerMessageHandler:n.Prism&&n.Prism.disableWorkerMessageHandler,util:{encode:function(e){return e instanceof r?new r(e.type,a.util.encode(e.content),e.alias):"Array"===a.util.type(e)?e.map(a.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e,t){var n=a.util.type(e);switch(t=t||{},n){case"Object":if(t[a.util.objId(e)])return t[a.util.objId(e)];var r={};for(var i in t[a.util.objId(e)]=r,e)e.hasOwnProperty(i)&&(r[i]=a.util.clone(e[i],t));return r;case"Array":if(t[a.util.objId(e)])return t[a.util.objId(e)];r=[];return t[a.util.objId(e)]=r,e.forEach(function(e,n){r[n]=a.util.clone(e,t)}),r}return e}},languages:{extend:function(e,t){var n=a.util.clone(a.languages[e]);for(var r in t)n[r]=t[r];return n},insertBefore:function(e,t,n,r){var i=(r=r||a.languages)[e];if(2==arguments.length){for(var s in n=arguments[1])n.hasOwnProperty(s)&&(i[s]=n[s]);return i}var o={};for(var l in i)if(i.hasOwnProperty(l)){if(l==t)for(var s in n)n.hasOwnProperty(s)&&(o[s]=n[s]);o[l]=i[l]}return a.languages.DFS(a.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=o)}),r[e]=o},DFS:function(e,t,n,r){for(var i in r=r||{},e)e.hasOwnProperty(i)&&(t.call(e,i,e[i],n||i),"Object"!==a.util.type(e[i])||r[a.util.objId(e[i])]?"Array"!==a.util.type(e[i])||r[a.util.objId(e[i])]||(r[a.util.objId(e[i])]=!0,a.languages.DFS(e[i],t,i,r)):(r[a.util.objId(e[i])]=!0,a.languages.DFS(e[i],t,null,r)))}},plugins:{},highlightAll:function(e,t){a.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var r={callback:n,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};a.hooks.run("before-highlightall",r);for(var i,s=r.elements||e.querySelectorAll(r.selector),o=0;i=s[o++];)a.highlightElement(i,!0===t,r.callback)},highlightElement:function(t,r,i){for(var s,o,l=t;l&&!e.test(l.className);)l=l.parentNode;l&&(s=(l.className.match(e)||[,""])[1].toLowerCase(),o=a.languages[s]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+s,t.parentNode&&(l=t.parentNode,/pre/i.test(l.nodeName)&&(l.className=l.className.replace(e,"").replace(/\s+/g," ")+" language-"+s));var u={element:t,language:s,grammar:o,code:t.textContent};if(a.hooks.run("before-sanity-check",u),!u.code||!u.grammar)return u.code&&(a.hooks.run("before-highlight",u),u.element.textContent=u.code,a.hooks.run("after-highlight",u)),void a.hooks.run("complete",u);if(a.hooks.run("before-highlight",u),r&&n.Worker){var c=new Worker(a.filename);c.onmessage=function(e){u.highlightedCode=e.data,a.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,i&&i.call(u.element),a.hooks.run("after-highlight",u),a.hooks.run("complete",u)},c.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=a.highlight(u.code,u.grammar,u.language),a.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,i&&i.call(t),a.hooks.run("after-highlight",u),a.hooks.run("complete",u)},highlight:function(e,t,n){var i={code:e,grammar:t,language:n};return a.hooks.run("before-tokenize",i),i.tokens=a.tokenize(i.code,i.grammar),a.hooks.run("after-tokenize",i),r.stringify(a.util.encode(i.tokens),i.language)},matchGrammar:function(e,t,n,r,i,s,o){var l=a.Token;for(var u in n)if(n.hasOwnProperty(u)&&n[u]){if(u==o)return;var c=n[u];c="Array"===a.util.type(c)?c:[c];for(var p=0;p<c.length;++p){var g=c[p],d=g.inside,f=!!g.lookbehind,h=!!g.greedy,m=0,y=g.alias;if(h&&!g.pattern.global){var b=g.pattern.toString().match(/[imuy]*$/)[0];g.pattern=RegExp(g.pattern.source,b+"g")}g=g.pattern||g;for(var v=r,k=i;v<t.length;k+=t[v].length,++v){var x=t[v];if(t.length>e.length)return;if(!(x instanceof l)){if(h&&v!=t.length-1){if(g.lastIndex=k,!(P=g.exec(e)))break;for(var w=P.index+(f?P[1].length:0),_=P.index+P[0].length,A=v,F=k,S=t.length;A<S&&(F<_||!t[A].type&&!t[A-1].greedy);++A)w>=(F+=t[A].length)&&(++v,k=F);if(t[v]instanceof l)continue;$=A-v,x=e.slice(k,F),P.index-=k}else{g.lastIndex=0;var P=g.exec(x),$=1}if(P){f&&(m=P[1]?P[1].length:0);_=(w=P.index+m)+(P=P[0].slice(m)).length;var j=x.slice(0,w),E=x.slice(_),C=[v,$];j&&(++v,k+=j.length,C.push(j));var N=new l(u,d?a.tokenize(P,d):P,y,P,h);if(C.push(N),E&&C.push(E),Array.prototype.splice.apply(t,C),1!=$&&a.matchGrammar(e,t,n,v,k,!0,u),s)break}else if(s)break}}}}},tokenize:function(e,t,n){var r=[e],i=t.rest;if(i){for(var s in i)t[s]=i[s];delete t.rest}return a.matchGrammar(e,r,t,0,0,!1),r},hooks:{all:{},add:function(e,t){var n=a.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=a.hooks.all[e];if(n&&n.length)for(var r,i=0;r=n[i++];)r(t)}}},r=a.Token=function(e,t,n,a,r){this.type=e,this.content=t,this.alias=n,this.length=0|(a||"").length,this.greedy=!!r};if(r.stringify=function(e,t,n){if("string"==typeof e)return e;if("Array"===a.util.type(e))return e.map(function(n){return r.stringify(n,t,e)}).join("");var i={type:e.type,content:r.stringify(e.content,t,n),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:n};if(e.alias){var s="Array"===a.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,s)}a.hooks.run("wrap",i);var o=Object.keys(i.attributes).map(function(e){return e+'="'+(i.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+(o?" "+o:"")+">"+i.content+"</"+i.tag+">"},!n.document)return n.addEventListener?(a.disableWorkerMessageHandler||n.addEventListener("message",function(e){var t=JSON.parse(e.data),r=t.language,i=t.code,s=t.immediateClose;n.postMessage(a.highlight(i,a.languages[r],r)),s&&n.close()},!1),n.Prism):n.Prism;var i=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return i&&(a.filename=i.src,a.manual||i.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(a.highlightAll):window.setTimeout(a.highlightAll,16):document.addEventListener("DOMContentLoaded",a.highlightAll))),n.Prism}();void 0!==e&&e.exports&&(e.exports=a),void 0!==t&&(t.Prism=a),a.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:/<!DOCTYPE[\s\S]+?>/i,cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,inside:{punctuation:[/^=/,{pattern:/(^|[^\\])["']/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},a.languages.markup.tag.inside["attr-value"].inside.entity=a.languages.markup.entity,a.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),a.languages.xml=a.languages.markup,a.languages.html=a.languages.markup,a.languages.mathml=a.languages.markup,a.languages.svg=a.languages.markup,a.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(?:;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^{}\s][^{};]*?(?=\s*\{)/,string:{pattern:/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},property:/[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,important:/\B!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},a.languages.css.atrule.inside.rest=a.languages.css,a.languages.markup&&(a.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,lookbehind:!0,inside:a.languages.css,alias:"language-css",greedy:!0}}),a.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:a.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:a.languages.css}},alias:"language-css"}},a.languages.markup.tag)),a.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/[a-z0-9_]+(?=\()/i,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},a.languages.javascript=a.languages.extend("clike",{keyword:/\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,function:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/}),a.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,alias:"function"},constant:/\b[A-Z][A-Z\d_]*\b/}),a.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,greedy:!0,inside:{interpolation:{pattern:/\${[^}]+}/,inside:{"interpolation-punctuation":{pattern:/^\${|}$/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}}}),a.languages.javascript["template-string"].inside.interpolation.inside.rest=a.languages.javascript,a.languages.markup&&a.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,lookbehind:!0,inside:a.languages.javascript,alias:"language-javascript",greedy:!0}}),a.languages.js=a.languages.javascript,"undefined"!=typeof self&&self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"};Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){for(var n,r=t.getAttribute("data-src"),i=t,s=/\blang(?:uage)?-([\w-]+)\b/i;i&&!s.test(i.className);)i=i.parentNode;if(i&&(n=(t.className.match(s)||[,""])[1]),!n){var o=(r.match(/\.(\w+)$/)||[,""])[1];n=e[o]||o}var l=document.createElement("code");l.className="language-"+n,t.textContent="",l.textContent="Loading…",t.appendChild(l);var u=new XMLHttpRequest;u.open("GET",r,!0),u.onreadystatechange=function(){4==u.readyState&&(u.status<400&&u.responseText?(l.textContent=u.responseText,a.highlightElement(l)):u.status>=400?l.textContent="✖ Error "+u.status+" while fetching file: "+u.statusText:l.textContent="✖ Error: File does not exist or is empty")},u.send(null)}),a.plugins.toolbar&&a.plugins.toolbar.registerButton("download-file",function(e){var t=e.element.parentNode;if(t&&/pre/i.test(t.nodeName)&&t.hasAttribute("data-src")&&t.hasAttribute("data-download-link")){var n=t.getAttribute("data-src"),a=document.createElement("a");return a.textContent=t.getAttribute("data-download-link-label")||"Download",a.setAttribute("download",""),a.href=n,a}})},document.addEventListener("DOMContentLoaded",self.Prism.fileHighlight))}).call(this,n(165))},536:function(e,t,n){(function(e){!function(){if("undefined"!=typeof self&&self.Prism||void 0!==e&&e.Prism){var t={classMap:{}};Prism.plugins.customClass={map:function(e){t.classMap=e},prefix:function(e){t.prefixString=e}},Prism.hooks.add("wrap",function(e){(t.classMap||t.prefixString)&&(e.classes=e.classes.map(function(e){return(t.prefixString||"")+(t.classMap[e]||e)}))})}}()}).call(this,n(165))},537:function(e,t){Prism.languages.c=Prism.languages.extend("clike",{keyword:/\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,operator:/-[>-]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/]/,number:/(?:\b0x[\da-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i}),Prism.languages.insertBefore("c","string",{macro:{pattern:/(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,lookbehind:!0,alias:"property",inside:{string:{pattern:/(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/,lookbehind:!0},directive:{pattern:/(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,lookbehind:!0,alias:"keyword"}}},constant:/\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/}),delete Prism.languages.c["class-name"],delete Prism.languages.c.boolean},538:function(e,t){Prism.languages.cpp=Prism.languages.extend("c",{keyword:/\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|class|compl|const|constexpr|const_cast|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,boolean:/\b(?:true|false)\b/,operator:/--?|\+\+?|!=?|<{1,2}=?|>{1,2}=?|->|:{1,2}|={1,2}|\^|~|%|&{1,2}|\|\|?|\?|\*|\/|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/}),Prism.languages.insertBefore("cpp","keyword",{"class-name":{pattern:/(class\s+)\w+/i,lookbehind:!0}}),Prism.languages.insertBefore("cpp","string",{"raw-string":{pattern:/R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,alias:"string",greedy:!0}})},601:function(e,t,n){const a=n(602),r=n(603);e.exports=function(e={}){r.call(this,e),a.call(this,e)}},602:function(e,t){function n(e,t){return e.indexOf("$",t)}const a=/^\\\$/,r=/^\$((?:\\\$|[^$])+)\$/,i=/^\$\$((?:\\\$|[^$])+)\$\$/;e.exports=function(e){function t(t,n,s){let o=!0,l=i.exec(n);l||(l=r.exec(n),o=!1);const u=a.exec(n);if(u)return!!s||t(u[0])({type:"text",value:"$"});if("\\$"===n.slice(-2))return t(n)({type:"text",value:n.slice(0,-2)+"$"});if(l){if(s)return!0;if(l[0].includes("`")&&n.slice(l[0].length).includes("`")){const e=n.slice(0,n.indexOf("`"));return t(e)({type:"text",value:e})}const a=l[1].trim();return t(l[0])({type:"inlineMath",value:a,data:{hName:"span",hProperties:{className:"inlineMath"+(o&&e.inlineMathDouble?" inlineMathDouble":"")},hChildren:[{type:"text",value:a}]}})}}t.locator=n;const s=this.Parser,o=s.prototype.inlineTokenizers,l=s.prototype.inlineMethods;o.math=t,l.splice(l.indexOf("text"),0,"math");const u=this.Compiler;if(null!=u){u.prototype.visitors.inlineMath=function(e){return"$"+e.value+"$"}}}},603:function(e,t,n){var a=n(412),r="\n",i="\t",s=" ",o="$",l=2,u=4;e.exports=function(e){const t=this.Parser,n=t.prototype.blockTokenizers,c=t.prototype.blockMethods;n.math=function(e,t,n){for(var c,p,g,d,f,h,m,y,b,v,k=t.length+1,x=0,w="";x<k&&((g=t.charAt(x))===s||g===i);)w+=g,x++;if(b=x,(g=t.charAt(x))!==o)return;for(x++,p=g,c=1,w+=g;x<k&&(g=t.charAt(x))===p;)w+=g,c++,x++;if(c<l)return;for(;x<k&&(g=t.charAt(x))!==r;){if(g===o)return;w+=g,x++}if(g=t.charAt(x),n)return!0;for((v=e.now()).column+=w.length,v.offset+=w.length,d=m=y=f=h="";x<k;)if(f+=m,h+=y,m=y="",(g=t.charAt(x))===r){for(f?(m+=g,y+=g):w+=g,d="",x++;x<k&&(g=t.charAt(x))===s;)d+=g,x++;if(m+=d,y+=d.slice(b),!(d.length>=u)){for(d="";x<k&&(g=t.charAt(x))===p;)d+=g,x++;if(m+=d,y+=d,!(d.length<c)){for(d="";x<k&&(g=t.charAt(x))!==r;)m+=g,y+=g,x++;break}}}else f+=g,y+=g,x++;w+=f+m;const _=a(h);return e(w)({type:"math",value:_,data:{hName:"div",hProperties:{className:"math"},hChildren:[{type:"text",value:_}]}})},c.splice(c.indexOf("fencedCode")+1,0,"math");const p=t.prototype.interruptParagraph,g=t.prototype.interruptList,d=t.prototype.interruptBlockquote;p.splice(p.indexOf("fencedCode")+1,0,["math"]),g.splice(g.indexOf("fencedCode")+1,0,["math"]),d.splice(d.indexOf("fencedCode")+1,0,["math"]);const f=this.Compiler;if(null!=f){f.prototype.visitors.math=function(e){return"$$\n"+e.value+"\n$$"}}}},604:function(e,t,n){"use strict";var a=n(464);e.exports=function(e,t){e&&!e.process&&(t=e,e=null);return e?function(e,t){return function(n,r,i){e.run(a(n,t),r,function(e){i(e)})}}(e,t):function(e){return function(t){return a(t,e)}}(t)}}}]);
//# sourceMappingURL=11-f95ba1b864c746943571.js.map