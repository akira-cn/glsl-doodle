!function(e){function n(n){for(var t,o,i=n[0],d=n[1],a=n[2],c=n[3]||[],s=0,u=[];s<i.length;s++)o=i[s],Object.prototype.hasOwnProperty.call(A,o)&&A[o]&&u.push(A[o][0]),A[o]=0;for(t in d)Object.prototype.hasOwnProperty.call(d,t)&&(e[t]=d[t]);for(L&&L(n),q.push.apply(q,c);u.length;)u.shift()();return M.push.apply(M,a||[]),r()}function r(){for(var e,n=0;n<M.length;n++){for(var r=M[n],t=!0,o=1;o<r.length;o++){var i=r[o];0!==A[i]&&(t=!1)}t&&(M.splice(n--,1),e=T(T.s=r[0]))}return 0===M.length&&(q.forEach((function(e){if(void 0===A[e]){A[e]=null;var n=document.createElement("link");n.crossOrigin="anonymous",T.nc&&n.setAttribute("nonce",T.nc),n.rel="prefetch",n.as="script",n.href=C(e),document.head.appendChild(n)}})),q.length=0),e}var t=window.webpackHotUpdate;window.webpackHotUpdate=function(e,n){!function(e,n){if(!k[e]||!x[e])return;for(var r in x[e]=!1,n)Object.prototype.hasOwnProperty.call(n,r)&&(v[r]=n[r]);0===--b&&0===y&&E()}(e,n),t&&t(e,n)};var o,i=!0,d="87de234cc5276c3da9c4",a={},c=[],s=[];function u(n){var r={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_selfInvalidated:!1,_disposeHandlers:[],_main:o!==n,active:!0,accept:function(e,n){if(void 0===e)r._selfAccepted=!0;else if("function"===typeof e)r._selfAccepted=e;else if("object"===typeof e)for(var t=0;t<e.length;t++)r._acceptedDependencies[e[t]]=n||function(){};else r._acceptedDependencies[e]=n||function(){}},decline:function(e){if(void 0===e)r._selfDeclined=!0;else if("object"===typeof e)for(var n=0;n<e.length;n++)r._declinedDependencies[e[n]]=!0;else r._declinedDependencies[e]=!0},dispose:function(e){r._disposeHandlers.push(e)},addDisposeHandler:function(e){r._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=r._disposeHandlers.indexOf(e);n>=0&&r._disposeHandlers.splice(n,1)},invalidate:function(){switch(this._selfInvalidated=!0,f){case"idle":(v={})[n]=e[n],p("ready");break;case"ready":H(n);break;case"prepare":case"check":case"dispose":case"apply":(g=g||[]).push(n)}},check:O,apply:P,status:function(e){if(!e)return f;l.push(e)},addStatusHandler:function(e){l.push(e)},removeStatusHandler:function(e){var n=l.indexOf(e);n>=0&&l.splice(n,1)},data:a[n]};return o=void 0,r}var l=[],f="idle";function p(e){f=e;for(var n=0;n<l.length;n++)l[n].call(null,e)}var h,v,m,g,b=0,y=0,w={},x={},k={};function _(e){return+e+""===e?+e:e}function O(e){if("idle"!==f)throw new Error("check() is only allowed in idle status");return i=e,p("check"),(n=1e4,n=n||1e4,new Promise((function(e,r){if("undefined"===typeof XMLHttpRequest)return r(new Error("No browser support"));try{var t=new XMLHttpRequest,o=T.p+""+d+".hot-update.json";t.open("GET",o,!0),t.timeout=n,t.send(null)}catch(i){return r(i)}t.onreadystatechange=function(){if(4===t.readyState)if(0===t.status)r(new Error("Manifest request to "+o+" timed out."));else if(404===t.status)e();else if(200!==t.status&&304!==t.status)r(new Error("Manifest request to "+o+" failed."));else{try{var n=JSON.parse(t.responseText)}catch(i){return void r(i)}e(n)}}}))).then((function(e){if(!e)return p(D()?"ready":"idle"),null;x={},w={},k=e.c,m=e.h,p("prepare");var n=new Promise((function(e,n){h={resolve:e,reject:n}}));for(var r in v={},A)j(r);return"prepare"===f&&0===y&&0===b&&E(),n}));var n}function j(e){k[e]?(x[e]=!0,b++,function(e){var n=document.createElement("script");n.charset="utf-8",n.src=T.p+""+e+"."+d+".hot-update.js",n.crossOrigin="anonymous",document.head.appendChild(n)}(e)):w[e]=!0}function E(){p("ready");var e=h;if(h=null,e)if(i)Promise.resolve().then((function(){return P(i)})).then((function(n){e.resolve(n)}),(function(n){e.reject(n)}));else{var n=[];for(var r in v)Object.prototype.hasOwnProperty.call(v,r)&&n.push(_(r));e.resolve(n)}}function P(n){if("ready"!==f)throw new Error("apply() is only allowed in ready status");return function n(r){var t,i,s,u,l;function f(e){for(var n=[e],r={},t=n.map((function(e){return{chain:[e],id:e}}));t.length>0;){var o=t.pop(),i=o.id,d=o.chain;if((u=I[i])&&(!u.hot._selfAccepted||u.hot._selfInvalidated)){if(u.hot._selfDeclined)return{type:"self-declined",chain:d,moduleId:i};if(u.hot._main)return{type:"unaccepted",chain:d,moduleId:i};for(var a=0;a<u.parents.length;a++){var c=u.parents[a],s=I[c];if(s){if(s.hot._declinedDependencies[i])return{type:"declined",chain:d.concat([c]),moduleId:i,parentId:c};-1===n.indexOf(c)&&(s.hot._acceptedDependencies[i]?(r[c]||(r[c]=[]),h(r[c],[i])):(delete r[c],n.push(c),t.push({chain:d.concat([c]),id:c})))}}}}return{type:"accepted",moduleId:e,outdatedModules:n,outdatedDependencies:r}}function h(e,n){for(var r=0;r<n.length;r++){var t=n[r];-1===e.indexOf(t)&&e.push(t)}}D();var b={},y=[],w={},x=function(){console.warn("[HMR] unexpected require("+j.moduleId+") to disposed module")};for(var O in v)if(Object.prototype.hasOwnProperty.call(v,O)){var j;l=_(O),j=v[O]?f(l):{type:"disposed",moduleId:O};var E=!1,P=!1,H=!1,S="";switch(j.chain&&(S="\nUpdate propagation: "+j.chain.join(" -> ")),j.type){case"self-declined":r.onDeclined&&r.onDeclined(j),r.ignoreDeclined||(E=new Error("Aborted because of self decline: "+j.moduleId+S));break;case"declined":r.onDeclined&&r.onDeclined(j),r.ignoreDeclined||(E=new Error("Aborted because of declined dependency: "+j.moduleId+" in "+j.parentId+S));break;case"unaccepted":r.onUnaccepted&&r.onUnaccepted(j),r.ignoreUnaccepted||(E=new Error("Aborted because "+l+" is not accepted"+S));break;case"accepted":r.onAccepted&&r.onAccepted(j),P=!0;break;case"disposed":r.onDisposed&&r.onDisposed(j),H=!0;break;default:throw new Error("Unexception type "+j.type)}if(E)return p("abort"),Promise.reject(E);if(P)for(l in w[l]=v[l],h(y,j.outdatedModules),j.outdatedDependencies)Object.prototype.hasOwnProperty.call(j.outdatedDependencies,l)&&(b[l]||(b[l]=[]),h(b[l],j.outdatedDependencies[l]));H&&(h(y,[j.moduleId]),w[l]=x)}var M,q=[];for(i=0;i<y.length;i++)l=y[i],I[l]&&I[l].hot._selfAccepted&&w[l]!==x&&!I[l].hot._selfInvalidated&&q.push({module:l,parents:I[l].parents.slice(),errorHandler:I[l].hot._selfAccepted});p("dispose"),Object.keys(k).forEach((function(e){!1===k[e]&&function(e){delete A[e]}(e)}));var C,z,U=y.slice();for(;U.length>0;)if(l=U.pop(),u=I[l]){var N={},L=u.hot._disposeHandlers;for(s=0;s<L.length;s++)(t=L[s])(N);for(a[l]=N,u.hot.active=!1,delete I[l],delete b[l],s=0;s<u.children.length;s++){var B=I[u.children[s]];B&&((M=B.parents.indexOf(l))>=0&&B.parents.splice(M,1))}}for(l in b)if(Object.prototype.hasOwnProperty.call(b,l)&&(u=I[l]))for(z=b[l],s=0;s<z.length;s++)C=z[s],(M=u.children.indexOf(C))>=0&&u.children.splice(M,1);p("apply"),void 0!==m&&(d=m,m=void 0);for(l in v=void 0,w)Object.prototype.hasOwnProperty.call(w,l)&&(e[l]=w[l]);var G=null;for(l in b)if(Object.prototype.hasOwnProperty.call(b,l)&&(u=I[l])){z=b[l];var J=[];for(i=0;i<z.length;i++)if(C=z[i],t=u.hot._acceptedDependencies[C]){if(-1!==J.indexOf(t))continue;J.push(t)}for(i=0;i<J.length;i++){t=J[i];try{t(z)}catch(X){r.onErrored&&r.onErrored({type:"accept-errored",moduleId:l,dependencyId:z[i],error:X}),r.ignoreErrored||G||(G=X)}}}for(i=0;i<q.length;i++){var R=q[i];l=R.module,c=R.parents,o=l;try{T(l)}catch(X){if("function"===typeof R.errorHandler)try{R.errorHandler(X)}catch(F){r.onErrored&&r.onErrored({type:"self-accept-error-handler-errored",moduleId:l,error:F,originalError:X}),r.ignoreErrored||G||(G=F),G||(G=X)}else r.onErrored&&r.onErrored({type:"self-accept-errored",moduleId:l,error:X}),r.ignoreErrored||G||(G=X)}}if(G)return p("fail"),Promise.reject(G);if(g)return n(r).then((function(e){return y.forEach((function(n){e.indexOf(n)<0&&e.push(n)})),e}));return p("idle"),new Promise((function(e){e(y)}))}(n=n||{})}function D(){if(g)return v||(v={}),g.forEach(H),g=void 0,!0}function H(n){Object.prototype.hasOwnProperty.call(v,n)||(v[n]=e[n])}var I={},S={1:0},A={1:0},M=[],q=[];function C(e){return T.p+"static/js/"+({2:"book-fragment-shader",3:"book-index",4:"index",5:"overview-advance",6:"overview-getting-start",7:"overview-index",8:"overview-modules",9:"overview-uniforms"}[e]||e)+"."+{2:"3f3711d6",3:"d361e6b7",4:"65aaa7af",5:"07d303ab",6:"a9bd2507",7:"8a3816cd",8:"df7df01e",9:"8f1ac3ef"}[e]+".js"}function T(n){if(I[n])return I[n].exports;var r=I[n]={i:n,l:!1,exports:{},hot:u(n),parents:(s=c,c=[],s),children:[]};return e[n].call(r.exports,r,r.exports,function(e){var n=I[e];if(!n)return T;var r=function(r){return n.hot.active?(I[r]?-1===I[r].parents.indexOf(e)&&I[r].parents.push(e):(c=[e],o=r),-1===n.children.indexOf(r)&&n.children.push(r)):(console.warn("[HMR] unexpected require("+r+") from disposed module "+e),c=[]),T(r)},t=function(e){return{configurable:!0,enumerable:!0,get:function(){return T[e]},set:function(n){T[e]=n}}};for(var i in T)Object.prototype.hasOwnProperty.call(T,i)&&"e"!==i&&"t"!==i&&Object.defineProperty(r,i,t(i));return r.e=function(e){return"ready"===f&&p("prepare"),y++,T.e(e).then(n,(function(e){throw n(),e}));function n(){y--,"prepare"===f&&(w[e]||j(e),0===y&&0===b&&E())}},r.t=function(e,n){return 1&n&&(e=r(e)),T.t(e,-2&n)},r}(n)),r.l=!0,r.exports}T.e=function(e){var n=[];S[e]?n.push(S[e]):0!==S[e]&&{3:1}[e]&&n.push(S[e]=new Promise((function(n,r){for(var t="static/css/"+({2:"book-fragment-shader",3:"book-index",4:"index",5:"overview-advance",6:"overview-getting-start",7:"overview-index",8:"overview-modules",9:"overview-uniforms"}[e]||e)+"."+d+".css",o=T.p+t,i=document.getElementsByTagName("link"),a=0;a<i.length;a++){var c=(u=i[a]).getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(c===t||c===o))return n()}var s=document.getElementsByTagName("style");for(a=0;a<s.length;a++){var u;if((c=(u=s[a]).getAttribute("data-href"))===t||c===o)return n()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=n,l.onerror=function(n){var t=n&&n.target&&n.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+t+")");i.request=t,delete S[e],l.parentNode.removeChild(l),r(i)},l.href=o,document.getElementsByTagName("head")[0].appendChild(l)})).then((function(){S[e]=0})));var r=A[e];if(0!==r)if(r)n.push(r[2]);else{var t=new Promise((function(n,t){r=A[e]=[n,t]}));n.push(r[2]=t);var o,i=document.createElement("script");i.charset="utf-8",i.timeout=120,T.nc&&i.setAttribute("nonce",T.nc),i.src=C(e),0!==i.src.indexOf(window.location.origin+"/")&&(i.crossOrigin="anonymous");var a=new Error;o=function(n){i.onerror=i.onload=null,clearTimeout(c);var r=A[e];if(0!==r){if(r){var t=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;a.message="Loading chunk "+e+" failed.\n("+t+": "+o+")",a.name="ChunkLoadError",a.type=t,a.request=o,r[1](a)}A[e]=void 0}};var c=setTimeout((function(){o({type:"timeout",target:i})}),12e4);i.onerror=i.onload=o,document.head.appendChild(i)}return Promise.all(n)},T.m=e,T.c=I,T.d=function(e,n,r){T.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},T.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},T.t=function(e,n){if(1&n&&(e=T(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(T.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var t in e)T.d(r,t,function(n){return e[n]}.bind(null,t));return r},T.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return T.d(n,"a",n),n},T.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},T.p="/",T.oe=function(e){throw console.error(e),e},T.h=function(){return d};var z=window.webpackJsonp=window.webpackJsonp||[],U=z.push.bind(z);z.push=n,z=z.slice();for(var N=0;N<z.length;N++)n(z[N]);var L=U,B=(M.push([0,0]),r());n([[],{},0,[0,2,3,4,5,6,7,8,9]])}({"./.docz/app/db.json":function(e){e.exports=JSON.parse('{"config":{"title":"Glsl Doodle","description":"Drawing patterns with glsl shaders on modern browsers.","menu":["\u7b80\u4ecb",{"name":"\u5feb\u901f\u5165\u95e8","menu":["\u4ecb\u7ecd","\u57fa\u672c\u7528\u6cd5","\u9ad8\u7ea7\u7528\u6cd5","\u5185\u5efa\u6a21\u5757","\u5185\u5efa uniforms"]},"\ud83d\udcd6 \u5173\u4e8e\u672c\u4e66",{"name":"\ud83d\udcd6 \u5f00\u59cb","menu":["\u4ec0\u4e48\u662f\u7247\u6bb5\u7740\u8272\u5668","Hello world!","Uniforms\u503c","\u8fd0\u884c\u4f60\u7684shader","\ud83d\udca5\u7528GPU\u6765\u5b9e\u73b0\u62bd\u5956\u7a0b\u5e8f"]},{"name":"\ud83d\udcd6 \u7528\u7b97\u6cd5\u7ed8\u753b","menu":["\u9020\u578b\u51fd\u6570","\u989c\u8272","\u5f62\u72b6","\u77e9\u9635","\u56fe\u6848","\ud83d\udca5\u8ddd\u79bb\u573a\u4e0e\u6587\u5b57"]},{"name":"\ud83d\udcd6 \u751f\u6210\u8bbe\u8ba1","menu":["\u968f\u673a","\u566a\u58f0","\u7f51\u683c\u566a\u58f0","\u5206\u5f62\u5e03\u6717\u8fd0\u52a8","\u5206\u5f62"]},{"name":"\ud83d\udcd6 \u56fe\u50cf\u5904\u7406","menu":["\u7eb9\u7406","\u56fe\u50cf\u5904\u7406","\u5377\u79ef\u6838","\u6ee4\u955c","\u540e\u5904\u7406"]},{"name":"\ud83d\udcd6 \u6a21\u62df","menu":["\u4e52\u4e53","Conway\u751f\u547d\u6e38\u620f","\u6c34\u6ce2","\u6c34\u5f69","\u53cd\u5e94\u6269\u6563","\u6d41\u4f53"]},{"name":"\ud83d\udcd6 3D\u56fe\u5f62","menu":["\u5149\u7167","\u9634\u5f71","\u6cd5\u7ebf\u8d34\u56fe","\u51f9\u51f8\u8d34\u56fe","\u5149\u7ebf\u8ddf\u8e2a","\u73af\u5883\u8d34\u56fe","\u6298\u5c04\u548c\u53cd\u5c04"]},{"name":"\ud83d\udcd6 \u81f4\u8c22"},{"name":"\ud83d\udd17 \u76f8\u5173\u8d44\u6e90","menu":[{"name":"The Book of Shaders","href":"https://thebookofshaders.com/"},{"name":"GL renderer","href":"https://github.com/akira-cn/gl-renderer"},{"name":"Docz","href":"https://www.docz.site/"},{"name":"Demosify","href":"https:/www.demosify.com/"}]}],"version":"0.2.7","repository":null,"native":false,"codeSandbox":true,"themeConfig":{},"separator":"-","src":"./doc-src","indexHtml":"./doc-src/index.html","theme":"docz-theme-yuque","public":"doc-src/public","plugins":[{}]},"entries":[{"key":"index.mdx","value":{"name":"\u7b80\u4ecb","route":"/","id":"a7e69d2440a42f19685c97ad1a34b35d","filepath":"index.mdx","link":"","slug":"index","menu":"","headings":[{"slug":"glsl-doodle","depth":1,"value":"glsl Doodle"}]}},{"key":"book/fragment_shader.mdx","value":{"name":"\u4ec0\u4e48\u662f\u7247\u6bb5\u7740\u8272\u5668","route":"/book/fragment_shader","menu":"\ud83d\udcd6 \u5f00\u59cb","id":"199c61b16427eb266bde2ec412aefc90","filepath":"book/fragment_shader.mdx","link":"","slug":"book-fragment-shader","headings":[{"slug":"\u5f00\u59cb","depth":1,"value":"\u5f00\u59cb"},{"slug":"\u4ec0\u4e48\u662f-fragment-shader\u7247\u6bb5\u7740\u8272\u5668","depth":2,"value":"\u4ec0\u4e48\u662f Fragment Shader(\u7247\u6bb5\u7740\u8272\u5668)\uff1f"}]}},{"key":"book/index.mdx","value":{"name":"\ud83d\udcd6 \u5173\u4e8e\u672c\u4e66","route":"/book/index","id":"396ecbab69c9be7587c1f2d87b9e55b0","filepath":"book/index.mdx","link":"","slug":"book-index","menu":"","headings":[{"slug":"\u5173\u4e8e\u672c\u4e66","depth":1,"value":"\u5173\u4e8e\u672c\u4e66"}]}},{"key":"overview/advance.mdx","value":{"name":"\u9ad8\u7ea7\u7528\u6cd5","route":"/advance","menu":"\u5feb\u901f\u5165\u95e8","id":"4eb112e10e7d6e6e791c5b378b3d0270","filepath":"overview/advance.mdx","link":"","slug":"overview-advance","headings":[{"slug":"\u4f7f\u7528-doodle-\u7c7b","depth":2,"value":"\u4f7f\u7528 Doodle \u7c7b"},{"slug":"\u52a0\u8f7d-vertex-shader","depth":2,"value":"\u52a0\u8f7d vertex shader"},{"slug":"\u4f7f\u7528\u81ea\u5b9a\u4e49-uniform","depth":2,"value":"\u4f7f\u7528\u81ea\u5b9a\u4e49 uniform"},{"slug":"\u5185\u5efa-uniform","depth":2,"value":"\u5185\u5efa uniform"},{"slug":"\u4f7f\u7528\u7f51\u683c\u6570\u636e","depth":2,"value":"\u4f7f\u7528\u7f51\u683c\u6570\u636e"}]}},{"key":"overview/getting_start.mdx","value":{"name":"\u57fa\u672c\u7528\u6cd5","route":"/getting_start","menu":"\u5feb\u901f\u5165\u95e8","id":"0efb8ec9ecab8f8206d03839afd0afea","filepath":"overview/getting_start.mdx","link":"","slug":"overview-getting-start","headings":[{"slug":"\u5b89\u88c5","depth":2,"value":"\u5b89\u88c5"},{"slug":"\u5185\u5d4c\u4ee3\u7801","depth":2,"value":"\u5185\u5d4c\u4ee3\u7801"},{"slug":"\u5f15\u5165\u5916\u90e8\u811a\u672c","depth":2,"value":"\u5f15\u5165\u5916\u90e8\u811a\u672c"}]}},{"key":"overview/index.mdx","value":{"name":"\u4ecb\u7ecd","route":"/overview","menu":"\u5feb\u901f\u5165\u95e8","id":"d9c4d26d0eb744c90c28f6360584a392","filepath":"overview/index.mdx","link":"","slug":"overview-index","headings":[{"slug":"\u7b80\u4ecb","depth":2,"value":"\u7b80\u4ecb"},{"slug":"\u6269\u5c55-shader","depth":2,"value":"\u6269\u5c55 Shader"}]}},{"key":"overview/modules.mdx","value":{"name":"\u5185\u5efa\u6a21\u5757","route":"/modules","menu":"\u5feb\u901f\u5165\u95e8","id":"f2b51aa80d946f99a7fa44199aa7a879","filepath":"overview/modules.mdx","link":"","slug":"overview-modules","headings":[{"slug":"\u5185\u5efa\u6a21\u5757","depth":2,"value":"\u5185\u5efa\u6a21\u5757"},{"slug":"stdlib-\u6a21\u5757","depth":2,"value":"stdlib \u6a21\u5757"},{"slug":"graphics-\u6a21\u5757","depth":2,"value":"graphics \u6a21\u5757"},{"slug":"1-\u8ddd\u79bb\u573a\u51fd\u6570","depth":4,"value":"1. \u8ddd\u79bb\u573a\u51fd\u6570"},{"slug":"2-\u56fe\u5f62\u51fd\u6570","depth":4,"value":"2. \u56fe\u5f62\u51fd\u6570"},{"slug":"transform-\u6a21\u5757","depth":2,"value":"transform \u6a21\u5757"},{"slug":"pattern-\u6a21\u5757","depth":2,"value":"pattern \u6a21\u5757"},{"slug":"color-\u6a21\u5757","depth":2,"value":"color \u6a21\u5757"}]}},{"key":"overview/uniforms.mdx","value":{"name":"\u5185\u5efa uniforms","route":"/uniforms","menu":"\u5feb\u901f\u5165\u95e8","id":"d8f26e23c999ca76da3709f4c4a4c79d","filepath":"overview/uniforms.mdx","link":"","slug":"overview-uniforms","headings":[{"slug":"\u5185\u5efa-uniforms","depth":2,"value":"\u5185\u5efa uniforms"}]}}],"props":[]}')},"./.docz/app/index.jsx":function(e,n,r){"use strict";r.r(n);var t=r("./node_modules/react/index.js"),o=r.n(t),i=r("./node_modules/react-dom/index.js"),d=r.n(i),a=r("./node_modules/docz/dist/index.esm.js"),c=r("./node_modules/docz-theme-yuque/dist/index.esm.js"),s={"index.mdx":function(){return Promise.all([r.e(0),r.e(4)]).then(r.bind(null,"./doc-src/index.mdx"))},"book/fragment_shader.mdx":function(){return Promise.all([r.e(0),r.e(2)]).then(r.bind(null,"./doc-src/book/fragment_shader.mdx"))},"book/index.mdx":function(){return Promise.all([r.e(0),r.e(3)]).then(r.bind(null,"./doc-src/book/index.mdx"))},"overview/advance.mdx":function(){return Promise.all([r.e(0),r.e(5)]).then(r.bind(null,"./doc-src/overview/advance.mdx"))},"overview/getting_start.mdx":function(){return Promise.all([r.e(0),r.e(6)]).then(r.bind(null,"./doc-src/overview/getting_start.mdx"))},"overview/index.mdx":function(){return Promise.all([r.e(0),r.e(7)]).then(r.bind(null,"./doc-src/overview/index.mdx"))},"overview/modules.mdx":function(){return Promise.all([r.e(0),r.e(8)]).then(r.bind(null,"./doc-src/overview/modules.mdx"))},"overview/uniforms.mdx":function(){return Promise.all([r.e(0),r.e(9)]).then(r.bind(null,"./doc-src/overview/uniforms.mdx"))}},u=r("./.docz/app/db.json"),l=function(){return o.a.createElement(c.a,{linkComponent:a.b,db:u},o.a.createElement(a.c,{imports:s}))},f=[],p=[],h=function(){return f.forEach((function(e){return e&&e()}))},v=function(){return p.forEach((function(e){return e&&e()}))},m=document.querySelector("#root");!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l;h(),d.a.render(o.a.createElement(e,null),m,v)}(l)},0:function(e,n,r){e.exports=r("./.docz/app/index.jsx")}});
//# sourceMappingURL=app.87de234cc5276c3da9c4.js.map