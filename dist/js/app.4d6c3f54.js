(function(e){function n(n){for(var r,a,o=n[0],l=n[1],i=n[2],d=0,s=[];d<o.length;d++)a=o[d],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&s.push(c[a][0]),c[a]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);f&&f(n);while(s.length)s.shift()();return u.push.apply(u,i||[]),t()}function t(){for(var e,n=0;n<u.length;n++){for(var t=u[n],r=!0,a=1;a<t.length;a++){var o=t[a];0!==c[o]&&(r=!1)}r&&(u.splice(n--,1),e=l(l.s=t[0]))}return e}var r={},a={app:0},c={app:0},u=[];function o(e){return l.p+"js/"+({}[e]||e)+"."+{"chunk-1c81fed6":"3f87b983","chunk-2315695e":"1747cfe3","chunk-2d0ac056":"95f30df9","chunk-292dcd6a":"0d59c63e","chunk-4f1c522c":"3d0caf7f","chunk-c9f03d3a":"681ab73f","chunk-332cf372":"2251682b","chunk-6be03d0d":"c9de641c","chunk-f733179a":"b280c818"}[e]+".js"}function l(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,l),t.l=!0,t.exports}l.e=function(e){var n=[],t={"chunk-1c81fed6":1,"chunk-2315695e":1,"chunk-292dcd6a":1,"chunk-4f1c522c":1,"chunk-c9f03d3a":1,"chunk-332cf372":1,"chunk-6be03d0d":1,"chunk-f733179a":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise((function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-1c81fed6":"33f23ec5","chunk-2315695e":"8aaf6099","chunk-2d0ac056":"31d6cfe0","chunk-292dcd6a":"1c6fc89b","chunk-4f1c522c":"b24f0c8a","chunk-c9f03d3a":"d95c93f4","chunk-332cf372":"53f54c8d","chunk-6be03d0d":"8587ed58","chunk-f733179a":"b2cb20b2"}[e]+".css",c=l.p+r,u=document.getElementsByTagName("link"),o=0;o<u.length;o++){var i=u[o],d=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(d===r||d===c))return n()}var s=document.getElementsByTagName("style");for(o=0;o<s.length;o++){i=s[o],d=i.getAttribute("data-href");if(d===r||d===c)return n()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=n,f.onerror=function(n){var r=n&&n.target&&n.target.src||c,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete a[e],f.parentNode.removeChild(f),t(u)},f.href=c;var h=document.getElementsByTagName("head")[0];h.appendChild(f)})).then((function(){a[e]=0})));var r=c[e];if(0!==r)if(r)n.push(r[2]);else{var u=new Promise((function(n,t){r=c[e]=[n,t]}));n.push(r[2]=u);var i,d=document.createElement("script");d.charset="utf-8",d.timeout=120,l.nc&&d.setAttribute("nonce",l.nc),d.src=o(e);var s=new Error;i=function(n){d.onerror=d.onload=null,clearTimeout(f);var t=c[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;s.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",s.name="ChunkLoadError",s.type=r,s.request=a,t[1](s)}c[e]=void 0}};var f=setTimeout((function(){i({type:"timeout",target:d})}),12e4);d.onerror=d.onload=i,document.head.appendChild(d)}return Promise.all(n)},l.m=e,l.c=r,l.d=function(e,n,t){l.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,n){if(1&n&&(e=l(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(l.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)l.d(t,r,function(n){return e[n]}.bind(null,r));return t},l.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(n,"a",n),n},l.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},l.p="/",l.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],d=i.push.bind(i);i.push=n,i=i.slice();for(var s=0;s<i.length;s++)n(i[s]);var f=d;u.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";var r=t("85ec"),a=t.n(r);a.a},"56d7":function(e,n,t){"use strict";t.r(n),t.d(n,"eventBus",(function(){return p}));t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),a=function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("div",{attrs:{id:"app"}},[r("b-navbar",{staticStyle:{padding:"1%","border-bottom":"7px solid lightgrey"},attrs:{toggleable:"lg",type:"dark",variant:"dark"}},[r("b-navbar-brand",{attrs:{href:"/"}},[r("img",{staticClass:"image",attrs:{src:t("c780")}})]),r("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),r("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[r("b-navbar-nav",[r("b-nav-item",{attrs:{href:"/add"}},[r("i",{staticClass:"fa fa-plus-circle mr-2"}),e._v("Request Event")]),r("b-nav-item",{attrs:{href:"/events"}},[r("i",{staticClass:"fa fa-thumbs-up mr-2"}),e._v("Events")]),r("b-nav-item",{attrs:{href:"/schedule/"}},[r("i",{staticClass:"fa fa-calendar mr-2"}),e._v("Schedule")]),e.user&&e.user.admin?r("b-nav-item",{attrs:{href:"/schedules"}},[r("i",{staticClass:"fa fa-book mr-2"}),e._v("All Schedules")]):e._e()],1),r("b-navbar-nav",{staticClass:"ml-auto"},[e.user?r("b-nav-item",{staticStyle:{background:"#56606a","border-radius":"50px"},on:{click:e.logOut}},[r("img",{staticStyle:{"border-radius":"50%",width:"25px","margin-right":"10px"},attrs:{src:e.user.picture}}),e._v(e._s(e.user.userName)+" - "),r("i",{staticClass:"fa fa-sign-out"}),e._v(" Logout ")]):e._e()],1)],1)],1),r("div",[r("router-view")],1)],1)},c=[],u=t("5f5b");r["default"].use(u["a"]);var o={data:function(){return{user:JSON.parse(localStorage.getItem("user"))}},methods:{logOut:function(){localStorage.setItem("user",null),localStorage.setItem("token",null),window.location.reload()}},created:function(){var e=this;p.$on("userSet",(function(n){return e.user=n}))}},l=o,i=(t("034f"),t("2877")),d=Object(i["a"])(l,a,c,!1,null,null,null),s=d.exports,f=(t("d3b7"),t("8c4f"));r["default"].use(f["a"]);var h=new f["a"]({mode:"history",routes:[{path:"/events",name:"events",props:!0,component:function(){return Promise.all([t.e("chunk-1c81fed6"),t.e("chunk-2d0ac056"),t.e("chunk-4f1c522c")]).then(t.bind(null,"e456"))}},{path:"/events/:id",name:"event-details",component:function(){return Promise.all([t.e("chunk-1c81fed6"),t.e("chunk-332cf372")]).then(t.bind(null,"59f4"))}},{path:"/add",name:"add",component:function(){return Promise.all([t.e("chunk-1c81fed6"),t.e("chunk-f733179a")]).then(t.bind(null,"b118"))}},{path:"/schedule/",name:"current-schedule",component:function(){return Promise.all([t.e("chunk-1c81fed6"),t.e("chunk-2d0ac056"),t.e("chunk-c9f03d3a")]).then(t.bind(null,"93b7"))}},{path:"/schedule/:id",name:"individual-schedule",component:function(){return Promise.all([t.e("chunk-1c81fed6"),t.e("chunk-2d0ac056"),t.e("chunk-c9f03d3a")]).then(t.bind(null,"93b7"))}},{path:"/",name:"home",component:function(){return Promise.all([t.e("chunk-1c81fed6"),t.e("chunk-2d0ac056"),t.e("chunk-292dcd6a")]).then(t.bind(null,"57da"))}},{path:"/schedules",name:"schedules",component:function(){return Promise.all([t.e("chunk-1c81fed6"),t.e("chunk-2315695e")]).then(t.bind(null,"db5b"))}},{path:"/editSchedule/:id",name:"editSchedule",component:function(){return Promise.all([t.e("chunk-1c81fed6"),t.e("chunk-6be03d0d")]).then(t.bind(null,"acc3"))}},{path:"/createSchedule",name:"createSchedule",component:function(){return Promise.all([t.e("chunk-1c81fed6"),t.e("chunk-6be03d0d")]).then(t.bind(null,"acc3"))}}]});r["default"].config.productionTip=!1;var p=new r["default"];new r["default"]({router:h,render:function(e){return e(s)}}).$mount("#app")},"85ec":function(e,n,t){},c780:function(e,n,t){e.exports=t.p+"img/logo.045ed983.png"}});
//# sourceMappingURL=app.4d6c3f54.js.map