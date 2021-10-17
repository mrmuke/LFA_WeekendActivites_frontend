import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
            path: "/events",
            name: "events",
            props: true,
            component: () =>
                import ("./components/EventList")
        },
        {
            path: "/events/:id",
            name: "event-details",
            component: () =>
                import ("./components/Event")
        },
        {
            path: "/add",
            name: "add",
            component: () =>
                import ("./components/AddEvent")
        },
       
        {
            path: "/schedule/",
            name:"current-schedule",
            component: () =>
                import ("./components/Schedule")
        },
        {
            path: "/schedule/:id",
            name:"individual-schedule",
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
            component: () =>
                import ("./components/Schedules")
        },
        {
            path: "/editSchedule/:id",
            name: "editSchedule",
            component: () =>
                import ("./components/CreateSchedule"),

        },
        {
            path: "/createSchedule",
            name: "createSchedule",
            component: () =>
                import ("./components/CreateSchedule"),
        },
        {
            path: "/strikes",
            name: "studentStrikes",
            component: () =>
                import ("./components/Strikes.vue"),
        },
    ]
});