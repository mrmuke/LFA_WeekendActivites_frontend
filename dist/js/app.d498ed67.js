(function(e){function n(n){for(var r,a,o=n[0],i=n[1],l=n[2],s=0,d=[];s<o.length;s++)a=o[s],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&d.push(c[a][0]),c[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(n);while(d.length)d.shift()();return u.push.apply(u,l||[]),t()}function t(){for(var e,n=0;n<u.length;n++){for(var t=u[n],r=!0,a=1;a<t.length;a++){var o=t[a];0!==c[o]&&(r=!1)}r&&(u.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},a={app:0},c={app:0},u=[];function o(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-62d4e445":"da990375","chunk-14b308f0":"4453ccc2","chunk-33826f64":"a522272c","chunk-742d5aae":"3cbcef7d","chunk-9c39dcc6":"7b9b5581","chunk-b84fbfec":"39e3cbe3","chunk-2dceb966":"3cf58386","chunk-2e214275":"a255604c","chunk-45340a71":"b0252b81","chunk-488900b7":"d6f90ba4","chunk-2d216214":"181c4646","chunk-2d216257":"2a17021a","chunk-fd550b10":"a5288aa3"}[e]+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-62d4e445":1,"chunk-14b308f0":1,"chunk-33826f64":1,"chunk-742d5aae":1,"chunk-9c39dcc6":1,"chunk-2dceb966":1,"chunk-2e214275":1,"chunk-45340a71":1,"chunk-488900b7":1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=new Promise((function(n,t){for(var r="css/"+({}[e]||e)+"."+{"chunk-62d4e445":"33f23ec5","chunk-14b308f0":"aac8ad22","chunk-33826f64":"bf5c9d48","chunk-742d5aae":"806c699e","chunk-9c39dcc6":"fdfe3eed","chunk-b84fbfec":"31d6cfe0","chunk-2dceb966":"ccff740a","chunk-2e214275":"f2c7553c","chunk-45340a71":"8f17d984","chunk-488900b7":"08f07595","chunk-2d216214":"31d6cfe0","chunk-2d216257":"31d6cfe0","chunk-fd550b10":"31d6cfe0"}[e]+".css",c=i.p+r,u=document.getElementsByTagName("link"),o=0;o<u.length;o++){var l=u[o],s=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(s===r||s===c))return n()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){l=d[o],s=l.getAttribute("data-href");if(s===r||s===c)return n()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=n,f.onerror=function(n){var r=n&&n.target&&n.target.src||c,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete a[e],f.parentNode.removeChild(f),t(u)},f.href=c;var h=document.getElementsByTagName("head")[0];h.appendChild(f)})).then((function(){a[e]=0})));var r=c[e];if(0!==r)if(r)n.push(r[2]);else{var u=new Promise((function(n,t){r=c[e]=[n,t]}));n.push(r[2]=u);var l,s=document.createElement("script");s.charset="utf-8",s.timeout=120,i.nc&&s.setAttribute("nonce",i.nc),s.src=o(e);var d=new Error;l=function(n){s.onerror=s.onload=null,clearTimeout(f);var t=c[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;d.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",d.name="ChunkLoadError",d.type=r,d.request=a,t[1](d)}c[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:s})}),12e4);s.onerror=s.onload=l,document.head.appendChild(s)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/",i.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=n,l=l.slice();for(var d=0;d<l.length;d++)n(l[d]);var f=s;u.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";var r=t("85ec"),a=t.n(r);a.a},"56d7":function(e,n,t){"use strict";t.r(n),t.d(n,"eventBus",(function(){return p}));t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),a=function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("div",{attrs:{id:"app"}},[r("b-navbar",{staticStyle:{padding:"1%"},attrs:{toggleable:"xl",type:"dark",variant:"dark"}},[r("b-navbar-brand",{attrs:{href:"/"}},[r("img",{staticClass:"image",attrs:{src:t("c780")}})]),r("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),r("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[r("b-navbar-nav",[r("b-nav-item",{attrs:{href:"/add"}},[r("i",{staticClass:"fa fa-plus-circle mr-2"}),e._v("Request Event")]),r("b-nav-item",{attrs:{href:"/events"}},[r("i",{staticClass:"fa fa-thumbs-up mr-2"}),e._v("Events")]),r("b-nav-item",{attrs:{href:"/schedule/"}},[r("i",{staticClass:"fa fa-calendar mr-2"}),e._v("Schedule")]),e.user&&e.user.admin?r("b-nav-item",{attrs:{href:"/schedules"}},[r("i",{staticClass:"fa fa-book mr-2"}),e._v("All Schedules")]):e._e(),e.user&&e.user.admin?r("b-nav-item",{attrs:{href:"/strikes"}},[r("i",{staticClass:"fa fa-strikethrough mr-2"}),e._v("Strikes")]):e._e()],1),r("b-navbar-nav",{staticClass:"ml-auto"},[e.user?r("b-nav-item",{staticStyle:{background:"#56606a","border-radius":"50px"},on:{click:e.logOut}},[r("img",{staticStyle:{"border-radius":"50%",width:"25px","margin-right":"10px"},attrs:{src:e.user.picture}}),e._v(e._s(e.user.userName)+" - "),r("i",{staticClass:"fa fa-sign-out"}),e._v(" Logout ")]):e._e()],1)],1)],1),r("div",[r("router-view")],1)],1)},c=[],u=(t("caad"),t("2532"),t("f9e3"),t("5f5b"));window.Vue=r["default"],r["default"].use(u["a"]);var o={data:function(){return{user:JSON.parse(localStorage.getItem("user"))}},methods:{logOut:function(){localStorage.setItem("user",null),localStorage.setItem("token",null),window.location.reload()}},created:function(){var e=this;"https:"!==window.location.protocol&&window.location.href.includes("wa.lfaapps.com")&&(window.location.href="https://wa.lfaapps.com"),p.$on("userSet",(function(){e.user=JSON.parse(localStorage.getItem("user"))}))}},i=o,l=(t("034f"),t("2877")),s=Object(l["a"])(i,a,c,!1,null,null,null),d=s.exports,f=(t("d3b7"),t("8c4f"));r["default"].use(f["a"]);var h=new f["a"]({mode:"history",routes:[{path:"/events",name:"events",props:!0,component:function(){return Promise.all([t.e("chunk-62d4e445"),t.e("chunk-b84fbfec"),t.e("chunk-2dceb966")]).then(t.bind(null,"e456"))}},{path:"/events/:id",name:"event-details",component:function(){return Promise.all([t.e("chunk-62d4e445"),t.e("chunk-9c39dcc6")]).then(t.bind(null,"59f4"))}},{path:"/add",name:"add",component:function(){return Promise.all([t.e("chunk-62d4e445"),t.e("chunk-14b308f0")]).then(t.bind(null,"b118"))}},{path:"/schedule/",name:"current-schedule",component:function(){return Promise.all([t.e("chunk-62d4e445"),t.e("chunk-b84fbfec"),t.e("chunk-488900b7")]).then(t.bind(null,"93b7"))}},{path:"/schedule/:id",name:"individual-schedule",component:function(){return Promise.all([t.e("chunk-62d4e445"),t.e("chunk-b84fbfec"),t.e("chunk-488900b7")]).then(t.bind(null,"93b7"))}},{path:"/",name:"home",component:function(){return Promise.all([t.e("chunk-62d4e445"),t.e("chunk-b84fbfec"),t.e("chunk-2e214275")]).then(t.bind(null,"57da"))}},{path:"/schedules",name:"schedules",component:function(){return Promise.all([t.e("chunk-62d4e445"),t.e("chunk-33826f64")]).then(t.bind(null,"db5b"))}},{path:"/editSchedule/:id",name:"editSchedule",component:function(){return Promise.all([t.e("chunk-62d4e445"),t.e("chunk-742d5aae")]).then(t.bind(null,"acc3"))}},{path:"/createSchedule",name:"createSchedule",component:function(){return Promise.all([t.e("chunk-62d4e445"),t.e("chunk-742d5aae")]).then(t.bind(null,"acc3"))}},{path:"/strikes",name:"studentStrikes",component:function(){return Promise.all([t.e("chunk-62d4e445"),t.e("chunk-b84fbfec"),t.e("chunk-45340a71")]).then(t.bind(null,"4d8a"))}}]});r["default"].config.productionTip=!1;var p=new r["default"];new r["default"]({router:h,render:function(e){return e(d)}}).$mount("#app")},"85ec":function(e,n,t){},c780:function(e,n,t){e.exports=t.p+"img/logo.045ed983.png"}});
//# sourceMappingURL=app.d498ed67.js.map