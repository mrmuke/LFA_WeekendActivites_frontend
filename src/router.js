import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let router = new Router({
    mode: "history",
    routes: [{
            path: "/events",
            name: "events",
            props: true,
            meta: {
                requiresAuth: true
              },
            component: () =>
                import ("./components/EventList")
        },
        {
            path: "/events/:id",
            name: "event-details",
            meta: {
                requiresAuth: true,
                requiresAdmin:true
              },
            component: () =>
                import ("./components/Event")
        },
        {
            path: "/add",
            name: "add",
            meta: {
                requiresAuth: true
              },
            component: () =>
                import ("./components/AddEvent")
        },
       
        {
            path: "/schedule/",
            name:"current-schedule",
            meta: {
                requiresAuth: true
              },
            component: () =>
                import ("./components/Schedule")
        },
        {
            path: "/schedule/:id",
            name:"individual-schedule",
            meta: {
                requiresAuth: true
              },
            component: () =>
                import ("./components/Schedule")
        },
        {
            path: "/",
            name: "home",
            component: () =>
                import ("./components/Home")
        },

        {
            path: "/schedules",
            name: "schedules",
            meta: {
                requiresAuth: true,
                requiresAdmin:true
              },
            component: () =>
                import ("./components/Schedules")
        },
        {
            path: "/editSchedule/:id",
            name: "editSchedule",
            meta: {
                requiresAuth: true,
                requiresAdmin:true
              },
            component: () =>
                import ("./components/CreateSchedule"),

        },
        {
            path: "/createSchedule",
            name: "createSchedule",
            meta: {
                requiresAuth: true,
                requiresAdmin:true
              },
            component: () =>
                import ("./components/CreateSchedule"),
        },
        {
            path: "/strikes",
            name: "studentStrikes",
            meta: {
                requiresAuth: true,
                requiresAdmin:true,
              },
            component: () =>
                import ("./components/Strikes.vue"),
        },
    ]
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      let user = JSON.parse(localStorage.getItem("user"))
      if (!user) {

        next({ name: 'home' })
      } else {
            //this route requires admin
            if (to.matched.some(record => record.meta.requiresAdmin)) {
            if(user.admin){
                
                next()
            }else{
                next({ name: 'home' })
            }
        }
        next() 
      }
    } else {
      next() 
    }
  })
export default router;