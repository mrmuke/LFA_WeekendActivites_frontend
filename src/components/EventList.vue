<template>
<div class = "event-list-body">
  <div class="event-list-container">
  <div>
    <h1 style="color:white">Requested Events</h1>
    
    <div style="display:flex;justify-content:center">
        <input type="text" style="width:75%" class="form-control" placeholder="Search by name"
          v-model="name"/>
      <div style="color:white;" class="ml-3">
      Sort by <select v-model="orderBy" >
                <option  value="1">Popularity</option>
                <option value="2">Date</option>
                <option value="3">Name</option>
              </select>
      </div>
    </div>
    
      <ul style="display:flex;flex-wrap:wrap" class="event-list-ul">
        
        <li class="event-list-item"
          v-for="(event, index) in filteredEvents"
          :key="index"
        >
        <div  class="flex shadow-sm border justify-content-center text-center align-items-center h-screen m-1 rounded p-3" style="background:white;">
      <div class="rounded overflow-hidden">
          <div class=" p-l-6 pt-4 p-r-6">
            <div style="font-weight:700; font-size:1.25rem" class="mb-2">{{ event.name }}</div>
            <div class="mb-2">{{event.timeSlot}}</div>
          
            <p style="color:#4a5568; font-size:1rem">
              {{event.description}}
            </p>
          </div>
      
          <div class="p-l-6 p-r-6 pt-4">
            <span style="color:#4a5568; background:#edf2f7; font-weight:600; font-size: .875rem" class="inline-block rounded-lg px-3 py-1 mr-2">
              {{event.upVotes}} upvotes
              </span>
          
          </div>
      <div class="p-l-6 p-r-6 pb-4 pt-4">
        <div class="wrap">
              <div class="button" v-on:click="down(event)" v-if="upVoteExists(event.id)"><i class="fa fa-arrow-up"></i>UP VOTED</div>
              <div class="button" v-on:click="upvote(event)" v-else><i class="fa fa-arrow-up"></i>VOTE UP</div>


        </div>
        <a class="default" style="margin-top:5px"
              :href="'/events/' + event.id"
              v-if="currentUser.admin"
            >
              Edit or View Info (Admin)
            </a>
      </div>
		
      </div>  
</div>
        </li>
      </ul>

  </div></div>
</div>
</template>

<script>
import EventDataService from "../services/EventDataService";
import UserDataService from "../services/UserDataService";
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;
Vue.use(Antd);
export default {
  name: "event-list",
  data() {
    return {
      events: [],
      currentUserId:null,
      currentUser:this.$cookies.get('user'),
      currentIndex: -1,
      name: "",
      index:-1,
      orderBy:"1"


    };
  },
  computed: {
      filteredEvents() {
        if(this.orderBy==="1")
        {
          return this.events.filter(event => {
          return event.name.toLowerCase().includes(this.name.toLowerCase())
        }).sort(function(a,b){
          return b.upVotes-a.upVotes
        })
        }
        else if(this.orderBy==="2")
        {
          return this.events.filter(event => {
          return event.name.toLowerCase().includes(this.name.toLowerCase())
        }).sort(function(a,b) {
  a = a.timeSlot.split('-').join('');
  b = b.timeSlot.split('-').join('');
  return a > b ? 1 : a < b ? -1 : 0;
  // return a.localeCompare(b);         // <-- alternative 
});
        }
        else{
          return this.events.filter(event => {
          return event.name.toLowerCase().includes(this.name.toLowerCase())
        }).sort(function(a, b){
    if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
})
        }
        
       },
      



  },
  methods: {
     upVoteExists(id){
         if(this.currentUser.upvotes.some(e=>e.id===id)){
           return true
         }
          return false;
       },
    getCurrentUser(){
         this.currentUser=this.$cookies.get('user')
         this.currentUserId=this.$cookies.get('user').id

         UserDataService.get(this.currentUserId)
                 .then(response => {
                   this.currentUser = response.data;
                  console.log(response.data)
                   this.$cookies.set('user', this.currentUser)
                 })
                 .catch(e => {
                   console.log(e);
                 });

    },
    retrieveEvents() {
      EventDataService.getAll()
        .then(response => {
          this.events = response.data;
        })


        .catch(e => {
          console.log(e);
        });
    },
    upvote(event){
        event.upVotes++;
        EventDataService.update(event.id, event)
        this.currentUser.upvotes.push(event);
        UserDataService.update(this.currentUser.id, this.currentUser)
        .then(response=>{
            console.log(response.data)
          })

    },
    down(event){
        event.upVotes--;
        EventDataService.update(event.id, event)
        this.currentUser.upvotes=this.currentUser.upvotes.filter(i=>i.id!=event.id)

        UserDataService.update(this.currentUser.id, this.currentUser)
          .then(response=>{
            console.log(response.data)
          })

    },

  },

  mounted() {
    if(this.$cookies.get('user')==null)
    {
       this.$message.error("Sign in to access this page")
       this.$router.push('/')
    }
    this.getCurrentUser()
    this.retrieveEvents();
    




  },
};

</script>

<style>
.event-list-body {
  background: #343a40;
  min-height:100vh;
  text-align: center;
  display:flex;
  justify-content: center;
  background:url(/img/background-wave.png)

}
select{
  color: black;
}
.event-list-container{
  width: 900px;

}
.event-list-item{
  width:33%;
  list-style-type: none; /* Remove bullets */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
}
@media screen and (max-width:768px)
{
  .event-list-item{
    width:50%;
  }
}
.event-list-ul{
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
}
@media screen and (max-width:900px)
{
  .event-list-container{
    width:100%;
  }
}
@media screen and (max-width:500px)
{
  .event-list-item{
    width:100%;
  }
}
</style>