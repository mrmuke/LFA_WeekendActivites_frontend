(function(e){function t(t){for(var r,a,o=t[0],i=t[1],s=t[2],l=0,f=[];l<o.length;l++)a=o[l],Object.prototype.hasOwnProperty.call(u,a)&&u[a]&&f.push(u[a][0]),u[a]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(t);while(f.length)f.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],r=!0,a=1;a<n.length;a++){var o=n[a];0!==u[o]&&(r=!1)}r&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},u={app:0},c=[];function o(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-5ee57ff2":"08c75cdf","chunk-34698405":"e309575e","chunk-606692f8":"5c097cc5","chunk-69b1757e":"7ec18050","chunk-9737b524":"695eece4","chunk-b84fbfec":"a25989d0","chunk-1ce2b2c4":"f2ebd575","chunk-2e214275":"18b42a82","chunk-557f1f83":"3fa80680","chunk-a3c488d6":"4acdb9da"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-5ee57ff2":1,"chunk-34698405":1,"chunk-606692f8":1,"chunk-69b1757e":1,"chunk-9737b524":1,"chunk-1ce2b2c4":1,"chunk-2e214275":1,"chunk-557f1f83":1,"chunk-a3c488d6":1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-5ee57ff2":"33f23ec5","chunk-34698405":"52c6d898","chunk-606692f8":"119039cb","chunk-69b1757e":"84a80aa0","chunk-9737b524":"fdfe3eed","chunk-b84fbfec":"31d6cfe0","chunk-1ce2b2c4":"ccff740a","chunk-2e214275":"9f57e84a","chunk-557f1f83":"8f17d984","chunk-a3c488d6":"5af08245"}[e]+".css",u=i.p+r,c=document.getElementsByTagName("link"),o=0;o<c.length;o++){var s=c[o],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===u))return t()}var f=document.getElementsByTagName("style");for(o=0;o<f.length;o++){s=f[o],l=s.getAttribute("data-href");if(l===r||l===u)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||u,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete a[e],d.parentNode.removeChild(d),n(c)},d.href=u;var h=document.getElementsByTagName("head")[0];h.appendChild(d)})).then((function(){a[e]=0})));var r=u[e];if(0!==r)if(r)t.push(r[2]);else{var c=new Promise((function(t,n){r=u[e]=[t,n]}));t.push(r[2]=c);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,i.nc&&l.setAttribute("nonce",i.nc),l.src=o(e);var f=new Error;s=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=u[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}u[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var d=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var r=n("85ec"),a=n.n(r);a.a},1:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t),n.d(t,"eventBus",(function(){return b}));n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("b-navbar",{staticStyle:{padding:"1%"},attrs:{toggleable:"xl",type:"dark",variant:"dark"}},[n("b-navbar-brand",{attrs:{href:"/"}},[n("img",{staticClass:"image",attrs:{src:"/img/logo.png"}})]),n("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",[n("b-nav-item",{attrs:{href:"/add"}},[n("i",{staticClass:"fa fa-plus-circle mr-2"}),e._v("Request Event")]),n("b-nav-item",{attrs:{href:"/events"}},[n("i",{staticClass:"fa fa-thumbs-up mr-2"}),e._v("Events")]),n("b-nav-item",{attrs:{href:"/schedule/"}},[n("i",{staticClass:"fa fa-calendar mr-2"}),e._v("Schedule")]),e.user&&e.user.admin?n("b-nav-item",{attrs:{href:"/schedules"}},[n("i",{staticClass:"fa fa-book mr-2"}),e._v("All Schedules")]):e._e(),e.user&&e.user.admin?n("b-nav-item",{attrs:{href:"/strikes"}},[n("i",{staticClass:"fa fa-strikethrough mr-2"}),e._v("Strikes")]):e._e()],1),n("b-navbar-nav",{staticClass:"ml-auto"},[e.user?n("b-nav-item",{staticStyle:{background:"#56606a","border-radius":"50px"},on:{click:e.logOut}},[n("img",{staticStyle:{"border-radius":"50%",width:"25px","margin-right":"10px"},attrs:{src:e.user.picture}}),e._v(e._s(e.user.userName)+" - "),n("i",{staticClass:"fa fa-sign-out"}),e._v(" Logout ")]):e._e()],1)],1)],1),n("div",[n("router-view")],1)],1)},u=[],c=(n("caad"),n("2532"),n("f9e3"),n("5f5b")),o=n("7d92");window.Vue=r["default"],r["default"].use(c["a"]);var i={data:function(){return{user:Object(o["a"])(localStorage.getItem("user"))}},methods:{logOut:function(){localStorage.setItem("user",null),localStorage.setItem("token",null),window.location.reload()}},created:function(){var e=this;"https:"!==window.location.protocol&&window.location.href.includes("wa.lfaapps.com")&&(window.location.href="https://wa.lfaapps.com"),b.$on("userSet",(function(){e.user=Object(o["a"])(localStorage.getItem("user"))}))}},s=i,l=(n("034f"),n("2877")),f=Object(l["a"])(s,a,u,!1,null,null,null),d=f.exports,h=(n("45fc"),n("d3b7"),n("8c4f"));r["default"].use(h["a"]);var m=new h["a"]({mode:"history",routes:[{path:"/events",name:"events",props:!0,meta:{requiresAuth:!0},component:function(){return Promise.all([n.e("chunk-5ee57ff2"),n.e("chunk-b84fbfec"),n.e("chunk-1ce2b2c4")]).then(n.bind(null,"e456"))}},{path:"/events/:id",name:"event-details",meta:{requiresAuth:!0,requiresAdmin:!0},component:function(){return Promise.all([n.e("chunk-5ee57ff2"),n.e("chunk-9737b524")]).then(n.bind(null,"59f4"))}},{path:"/add",name:"add",meta:{requiresAuth:!0},component:function(){return Promise.all([n.e("chunk-5ee57ff2"),n.e("chunk-34698405")]).then(n.bind(null,"b118"))}},{path:"/schedule/",name:"current-schedule",meta:{requiresAuth:!0},component:function(){return Promise.all([n.e("chunk-5ee57ff2"),n.e("chunk-b84fbfec"),n.e("chunk-a3c488d6")]).then(n.bind(null,"93b7"))}},{path:"/schedule/:id",name:"individual-schedule",meta:{requiresAuth:!0},component:function(){return Promise.all([n.e("chunk-5ee57ff2"),n.e("chunk-b84fbfec"),n.e("chunk-a3c488d6")]).then(n.bind(null,"93b7"))}},{path:"/",name:"home",component:function(){return Promise.all([n.e("chunk-5ee57ff2"),n.e("chunk-b84fbfec"),n.e("chunk-2e214275")]).then(n.bind(null,"57da"))}},{path:"/schedules",name:"schedules",meta:{requiresAuth:!0,requiresAdmin:!0},component:function(){return Promise.all([n.e("chunk-5ee57ff2"),n.e("chunk-69b1757e")]).then(n.bind(null,"db5b"))}},{path:"/editSchedule/:id",name:"editSchedule",meta:{requiresAuth:!0,requiresAdmin:!0},component:function(){return Promise.all([n.e("chunk-5ee57ff2"),n.e("chunk-606692f8")]).then(n.bind(null,"acc3"))}},{path:"/createSchedule",name:"createSchedule",meta:{requiresAuth:!0,requiresAdmin:!0},component:function(){return Promise.all([n.e("chunk-5ee57ff2"),n.e("chunk-606692f8")]).then(n.bind(null,"acc3"))}},{path:"/strikes",name:"studentStrikes",meta:{requiresAuth:!0,requiresAdmin:!0},component:function(){return Promise.all([n.e("chunk-5ee57ff2"),n.e("chunk-b84fbfec"),n.e("chunk-557f1f83")]).then(n.bind(null,"4d8a"))}}]});m.beforeEach((function(e,t,n){if(e.matched.some((function(e){return e.meta.requiresAuth}))){var r=Object(o["a"])(localStorage.getItem("user"));r?(e.matched.some((function(e){return e.meta.requiresAdmin}))&&(r.admin?n():n({name:"home"})),n()):n({name:"home"})}else n()}));var p=m;n("d940");r["default"].config.productionTip=!1;var b=new r["default"];new r["default"]({router:p,render:function(e){return e(d)}}).$mount("#app")},"7d92":function(e,t,n){"use strict";n.d(t,"b",(function(){return u})),n.d(t,"a",(function(){return c}));n("d3b7"),n("25f0");var r=n("3452"),a="PeShVmYq";function u(e){return r.AES.encrypt(JSON.stringify(e),a).toString()}function c(e){return null==e||"null"==e?null:"{"==e[0]?(localStorage.setItem("user",u(JSON.parse(e))),JSON.parse(e)):(console.log(r.enc.Utf8.stringify(r.AES.decrypt(e,a))),JSON.parse(r.enc.Utf8.stringify(r.AES.decrypt(e,a))))}},"85ec":function(e,t,n){},d940:function(e,t,n){}});
//# sourceMappingURL=app.11f7edae.js.map