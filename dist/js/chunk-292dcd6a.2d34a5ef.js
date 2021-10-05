(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-292dcd6a"],{"4f76":function(t,e,n){"use strict";var i,s,a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};(function(){function n(t){"undefined"!=typeof console&&console.error("[g-signin-button] "+t)}function o(t){t.component("g-signin-button",{name:"g-signin-button",render:function(t){return t("div",{attrs:{class:"g-signin-button"},ref:"signinBtn"},this.$slots.default)},props:{params:{type:Object,required:!0,default:function(){return{}}}},mounted:function(){var t=this;return window.gapi?this.params.client_id?void window.gapi.load("auth2",(function(){var e=window.gapi.auth2.init(t.params);e.attachClickHandler(t.$refs.signinBtn,{},(function(e){t.$emit("success",e)}),(function(e){t.$emit("error",e),t.$emit("failure",e)}))})):void n("params.client_id must be specified."):void n('"https://apis.google.com/js/api:client.js" needs to be included as a <script>.')}})}"object"==a(e)?t.exports=o:(i=[],s=function(){return o}.apply(e,i),void 0===s||(t.exports=s))})()},"57da":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"containerHome"},[n("small",{staticStyle:{position:"absolute",bottom:"10px",right:"10px",color:"white"}},[t._v("@owencoxe2")]),n("div",[n("div",{staticClass:"title"},[n("p",{staticClass:"text"},[t._v("Lake Forest Academy Weekend Activities")]),t.loading?n("div",{staticClass:"computer-signin"},[t._v("Loading...")]):t.signedIn?n("g-signin-button",{staticClass:"computer-signin",attrs:{params:t.googleSignInParams},on:{success:t.onSignIn}},[n("i",{staticClass:"fa fa-google"}),t._v(" Signed in with LFA Email ")]):n("g-signin-button",{staticClass:"computer-signin",attrs:{params:t.googleSignInParams},on:{success:t.onSignIn}},[n("i",{staticClass:"fa fa-google"}),t._v(" Sign in with LFA Email ")])],1),n("p",{staticClass:"desc"},[t._v("Convenient and improved weekend activities.")]),t.signedIn?n("div",{staticClass:"column"},[n("a",{staticClass:"bigbutton",attrs:{href:"/add"}},[t._v("Request Activities")]),n("a",{staticClass:"bigbutton",attrs:{href:"/events"}},[t._v("Vote for Activities")]),n("a",{staticClass:"bigbutton",attrs:{href:"/schedule/"}},[t._v("Weekend Schedule")])]):t._e(),t.admin?n("a",{staticClass:"bigbutton",attrs:{href:"/schedules"}},[t._v("View All Schedules")]):t._e()]),n("modal",{attrs:{name:"tutorial-modal"}},[n("b-carousel",{staticStyle:{"text-shadow":"1px 1px 2px #333"},attrs:{id:"carousel-1",interval:4e3,controls:"",indicators:"",background:"#ababab","img-width":"1024","img-height":"480"}},[n("b-carousel-slide",{staticStyle:{"font-weight":"bold"},attrs:{"img-src":"/img/tutorial-request.png"}},[n("h2",[t._v("Request Events")]),n("p",[t._v("Request the events that you want to go to")])]),n("b-carousel-slide",{attrs:{"img-src":"/img/tutorial-upvote.png"}},[n("h2",[t._v("Upvote")]),n("p",[t._v("Upvote events that interest you.")])]),n("b-carousel-slide",{attrs:{"img-src":"/img/tutorial-signup.png"}},[n("h2",[t._v("Sign Up")]),n("p",[t._v("View this weekend's schedule and sign up for activities. You will be notified by email.")])]),n("b-carousel-slide",{attrs:{"img-src":"/img/tutorial-start.png"}},[n("h2",{staticClass:"mb-3"},[t._v("Welcome")]),n("a",{staticStyle:{background:"#f7931e",color:"white",padding:"10px","margin-bottom":"50px"},attrs:{href:"/schedule"}},[t._v("This Week's Schedule")])])],1)],1)],1)},s=[],a=n("56d7"),o=n("2b0e"),r=n("4f76"),c=n.n(r),u=n("eaaf"),l=n("1881"),d=n.n(l),g=n("f23d");n("202f");o["default"].use(c.a),o["default"].use(d.a),o["default"].config.productionTip=!1,o["default"].use(g["a"]);var p={data:function(){return{signedIn:!1,loading:!1,googleSignInParams:{client_id:"978419002714-0ngcjc58363k85n3a6fpmrdl0tome13b.apps.googleusercontent.com"},currentUser:JSON.parse(localStorage.getItem("user")),admin:JSON.parse(localStorage.getItem("user"))&&JSON.parse(localStorage.getItem("user")).admin}},methods:{onSignIn:function(t){this.createUser(t.getAuthResponse().id_token)},createUser:function(t){var e=this;this.loading=!0,this.$message.info("Logging in..."),u["a"].create(t).then((function(t){e.$message.success("Logged In!"),localStorage.setItem("user",JSON.stringify(t.data.user)),localStorage.setItem("token",t.data.token),a["eventBus"].$emit("userSet",t.data.user),e.admin=t.data.user.admin,e.signedIn=!0,201==t.status&&e.$modal.show("tutorial-modal"),e.loading=!1})).catch((function(){e.$message.error("Please sign in with an LFA Email Account"),e.signedIn=!1,localStorage.setItem("user",null),localStorage.setItem("token",null),a["eventBus"].$emit("userSet",null),e.loading=!1}))}},mounted:function(){null!=this.currentUser?this.signedIn=!0:this.$message.info("Sign in to get started..")}},m=p,f=(n("8b71"),n("2877")),h=Object(f["a"])(m,i,s,!1,null,null,null);e["default"]=h.exports},"88d7":function(t,e,n){},"8b71":function(t,e,n){"use strict";var i=n("88d7"),s=n.n(i);s.a},eaaf:function(t,e,n){"use strict";var i=n("d4ec"),s=n("bee2"),a=n("bc3a"),o=n.n(a),r=n("c427"),c=function(){function t(){Object(i["a"])(this,t)}return Object(s["a"])(t,[{key:"create",value:function(t){return o.a.create({baseURL:"https://lfawa-api.herokuapp.com/api",headers:{"Content-type":"application/json",id:t}}).post("/users/auth")}},{key:"get",value:function(t){return r["a"].get("/users/".concat(t))}},{key:"update",value:function(t,e){return r["a"].put("/users/".concat(t),e)}}]),t}();e["a"]=new c}}]);
<<<<<<< HEAD:dist/js/chunk-292dcd6a.99d4c64b.js
//# sourceMappingURL=chunk-292dcd6a.99d4c64b.js.map
=======
//# sourceMappingURL=chunk-292dcd6a.2d34a5ef.js.map
>>>>>>> 5cadd6b779a22a63807650fbabbb07f397fec754:dist/js/chunk-292dcd6a.2d34a5ef.js
