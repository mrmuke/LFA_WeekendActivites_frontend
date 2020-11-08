<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark" style="padding:1%;border-bottom:7px solid lightgrey">
        <b-navbar-brand href="/"><img class = "image" src="../public/img/logo.png"></b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav >
          <b-navbar-nav> 
            <b-nav-item href="/add"><i class="fa fa-plus-circle mr-2"></i>Request Event</b-nav-item>
            <b-nav-item href="/events"><i class="fa fa-thumbs-up mr-2"></i>Events</b-nav-item>

            <b-nav-item :href="'/schedule/'"><i class="fa fa-calendar mr-2"></i>Schedule</b-nav-item>
            <b-nav-item v-if="user && user.admin" href="/schedules"><i class="fa fa-book mr-2"></i>All Schedules</b-nav-item>
            
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto" >
            <b-nav-item v-if="user" v-on:click="logOut" style="background:#56606a;border-radius:50px;"><img v-bind:src=user.picture style="border-radius:50%;width:25px;margin-right:10px;">{{user.userName}} - <i class="fa fa-sign-out"></i> Logout
            </b-nav-item>

          </b-navbar-nav>
        </b-collapse>
    </b-navbar>
  
    <div>
        <router-view />
    </div>


  </div>
</template>

<script>
import { eventBus } from './main.js';
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)


export default{
    data(){
        return {
            user:JSON.parse(localStorage.getItem('user'))
        }
    },
    methods:{
      logOut(){
        localStorage.setItem("user",null)
        localStorage.setItem("token",null)
        window.location.reload()
      }
    },
    created() {
        eventBus.$on('userSet', (data) => this.user = data);
    },
    
}
</script>
<style>
@media only screen and (max-width: 415px) {
    .image{
        width:200px;

    }
    
    
}
@media only screen and (max-width:1000px){
  .nav-item{
      padding:10px;
      border-bottom:1px solid #eee;
      background:transparent  !important;
      border-radius:0px !important;
    }

}

.nav-link:hover{
  color:yellow !important

}


</style>

