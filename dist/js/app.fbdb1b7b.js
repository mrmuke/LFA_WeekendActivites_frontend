(function(e){function n(n){for(var a,r,o=n[0],d=n[1],l=n[2],i=0,s=[];i<o.length;i++)r=o[i],Object.prototype.hasOwnProperty.call(c,r)&&c[r]&&s.push(c[r][0]),c[r]=0;for(a in d)Object.prototype.hasOwnProperty.call(d,a)&&(e[a]=d[a]);f&&f(n);while(s.length)s.shift()();return u.push.apply(u,l||[]),t()}function t(){for(var e,n=0;n<u.length;n++){for(var t=u[n],a=!0,r=1;r<t.length;r++){var o=t[r];0!==c[o]&&(a=!1)}a&&(u.splice(n--,1),e=d(d.s=t[0]))}return e}var a={},r={app:0},c={app:0},u=[];function o(e){return d.p+"js/"+({}[e]||e)+"."+{"chunk-2b2dfa2e":"b5fffb87","chunk-27ed842b":"94d555c3","chunk-2d0ac056":"95f30df9","chunk-292dcd6a":"2d34a5ef","chunk-4f1c522c":"cf3978c7","chunk-c9f03d3a":"9cb9c2af","chunk-6be03d0d":"ea3c4e00","chunk-6e4e43e1":"071aa54e","chunk-dbd4ef4a":"db7d7f3c","chunk-2d216214":"181c4646","chunk-2d216257":"2a17021a","chunk-66576270":"55d1722b"}[e]+".js"}function d(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,d),t.l=!0,t.exports}d.e=function(e){var n=[],t={"chunk-2b2dfa2e":1,"chunk-27ed842b":1,"chunk-292dcd6a":1,"chunk-4f1c522c":1,"chunk-c9f03d3a":1,"chunk-6be03d0d":1,"chunk-6e4e43e1":1,"chunk-dbd4ef4a":1};r[e]?n.push(r[e]):0!==r[e]&&t[e]&&n.push(r[e]=new Promise((function(n,t){for(var a="css/"+({}[e]||e)+"."+{"chunk-2b2dfa2e":"33f23ec5","chunk-27ed842b":"8e500ebb","chunk-2d0ac056":"31d6cfe0","chunk-292dcd6a":"1c6fc89b","chunk-4f1c522c":"d5f6ab03","chunk-c9f03d3a":"1a9f98fb","chunk-6be03d0d":"f78be9b7","chunk-6e4e43e1":"53f54c8d","chunk-dbd4ef4a":"e981115f","chunk-2d216214":"31d6cfe0","chunk-2d216257":"31d6cfe0","chunk-66576270":"31d6cfe0"}[e]+".css",c=d.p+a,u=document.getElementsByTagName("link"),o=0;o<u.length;o++){var l=u[o],i=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(i===a||i===c))return n()}var s=document.getElementsByTagName("style");for(o=0;o<s.length;o++){l=s[o],i=l.getAttribute("data-href");if(i===a||i===c)return n()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=n,f.onerror=function(n){var a=n&&n.target&&n.target.src||c,u=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=a,delete r[e],f.parentNode.removeChild(f),t(u)},f.href=c;var h=document.getElementsByTagName("head")[0];h.appendChild(f)})).then((function(){r[e]=0})));var a=c[e];if(0!==a)if(a)n.push(a[2]);else{var u=new Promise((function(n,t){a=c[e]=[n,t]}));n.push(a[2]=u);var l,i=document.createElement("script");i.charset="utf-8",i.timeout=120,d.nc&&i.setAttribute("nonce",d.nc),i.src=o(e);var s=new Error;l=function(n){i.onerror=i.onload=null,clearTimeout(f);var t=c[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.src;s.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",s.name="ChunkLoadError",s.type=a,s.request=r,t[1](s)}c[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:i})}),12e4);i.onerror=i.onload=l,document.head.appendChild(i)}return Promise.all(n)},d.m=e,d.c=a,d.d=function(e,n,t){d.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},d.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.t=function(e,n){if(1&n&&(e=d(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(d.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)d.d(t,a,function(n){return e[n]}.bind(null,a));return t},d.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return d.d(n,"a",n),n},d.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},d.p="/",d.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=n,l=l.slice();for(var s=0;s<l.length;s++)n(l[s]);var f=i;u.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";var a=t("85ec"),r=t.n(a);r.a},"56d7":function(e,n,t){"use strict";t.r(n),t.d(n,"eventBus",(function(){return b}));t("e260"),t("e6cf"),t("cca6"),t("a79d");var a=t("2b0e"),r=function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{attrs:{id:"app"}},[a("b-navbar",{staticStyle:{padding:"1%"},attrs:{toggleable:"lg",type:"dark",variant:"dark"}},[a("b-navbar-brand",{attrs:{href:"/"}},[a("img",{staticClass:"image",attrs:{src:t("c780")}})]),a("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),a("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[a("b-navbar-nav",[a("b-nav-item",{attrs:{href:"/add"}},[a("i",{staticClass:"fa fa-plus-circle mr-2"}),e._v("Request Event")]),a("b-nav-item",{attrs:{href:"/events"}},[a("i",{staticClass:"fa fa-thumbs-up mr-2"}),e._v("Events")]),a("b-nav-item",{attrs:{href:"/schedule/"}},[a("i",{staticClass:"fa fa-calendar mr-2"}),e._v("Schedule")]),e.user&&e.user.admin?a("b-nav-item",{attrs:{href:"/schedules"}},[a("i",{staticClass:"fa fa-book mr-2"}),e._v("All Schedules")]):e._e()],1),a("b-navbar-nav",{staticClass:"ml-auto"},[e.user?a("b-nav-item",{staticStyle:{background:"#56606a","border-radius":"50px"},on:{click:e.logOut}},[a("img",{staticStyle:{"border-radius":"50%",width:"25px","margin-right":"10px"},attrs:{src:e.user.picture}}),e._v(e._s(e.user.userName)+" - "),a("i",{staticClass:"fa fa-sign-out"}),e._v(" Logout ")]):e._e()],1)],1)],1),a("div",[a("router-view")],1)],1)},c=[],u=(t("f9e3"),t("5f5b"));a["default"].use(u["a"]);var o={data:function(){return{user:JSON.parse(localStorage.getItem("user"))}},methods:{logOut:function(){localStorage.setItem("user",null),localStorage.setItem("token",null),window.location.reload()}},created:function(){var e=this;b.$on("userSet",(function(n){return e.user=n}))}},d=o,l=(t("034f"),t("2877")),i=Object(l["a"])(d,r,c,!1,null,null,null),s=i.exports,f=(t("d3b7"),t("8c4f"));a["default"].use(f["a"]);var h=new f["a"]({mode:"history",routes:[{path:"/events",name:"events",props:!0,component:function(){return Promise.all([t.e("chunk-2b2dfa2e"),t.e("chunk-2d0ac056"),t.e("chunk-4f1c522c")]).then(t.bind(null,"e456"))}},{path:"/events/:id",name:"event-details",component:function(){return Promise.all([t.e("chunk-2b2dfa2e"),t.e("chunk-6e4e43e1")]).then(t.bind(null,"59f4"))}},{path:"/add",name:"add",component:function(){return Promise.all([t.e("chunk-2b2dfa2e"),t.e("chunk-27ed842b")]).then(t.bind(null,"b118"))}},{path:"/schedule/",name:"current-schedule",component:function(){return Promise.all([t.e("chunk-2b2dfa2e"),t.e("chunk-2d0ac056"),t.e("chunk-c9f03d3a")]).then(t.bind(null,"93b7"))}},{path:"/schedule/:id",name:"individual-schedule",component:function(){return Promise.all([t.e("chunk-2b2dfa2e"),t.e("chunk-2d0ac056"),t.e("chunk-c9f03d3a")]).then(t.bind(null,"93b7"))}},{path:"/",name:"home",component:function(){return Promise.all([t.e("chunk-2b2dfa2e"),t.e("chunk-2d0ac056"),t.e("chunk-292dcd6a")]).then(t.bind(null,"57da"))}},{path:"/schedules",name:"schedules",component:function(){return Promise.all([t.e("chunk-2b2dfa2e"),t.e("chunk-dbd4ef4a")]).then(t.bind(null,"db5b"))}},{path:"/editSchedule/:id",name:"editSchedule",component:function(){return Promise.all([t.e("chunk-2b2dfa2e"),t.e("chunk-6be03d0d")]).then(t.bind(null,"acc3"))}},{path:"/createSchedule",name:"createSchedule",component:function(){return Promise.all([t.e("chunk-2b2dfa2e"),t.e("chunk-6be03d0d")]).then(t.bind(null,"acc3"))}}]});a["default"].config.productionTip=!1;var b=new a["default"];new a["default"]({router:h,render:function(e){return e(s)}}).$mount("#app")},"85ec":function(e,n,t){},c780:function(e,n,t){e.exports=t.p+"img/logo.045ed983.png"}});
//# sourceMappingURL=app.fbdb1b7b.js.map