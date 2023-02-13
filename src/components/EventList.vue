<template>
<div class = "event-list-body">
  <div class="event-list-container">
  <div>
    <h1 style="color:white"><span class="orange-underline">Requested Events</span></h1>
    
    <div style="display:flex;justify-content:center;align-items:center;">
      <i class="fa fa-search" style="background:#efefef; border-top-left-radius:10px; border-bottom-left-radius:10px;display:flex; align-items:center;width:5%;height:35px; justify-content:center;"></i>
        <input type="text" style="width:50%;height:35px;border-top-left-radius:0px; border-bottom-left-radius:0px;" class="form-control" placeholder="Search by name"
          v-model="name"/>
      <div style="color:white;display:flex;white-space: nowrap;" class="ml-3">
      <select class="form-control" v-model="orderBy" >
                <option  value="1">Popularity</option>
                <option value="2">Early</option>
                <option value="3">Name</option>
              </select>
      </div>
    </div>
    
      <ul style="display:flex;flex-wrap:wrap;" class="event-list-ul">
        
        <li class="event-list-item"
          v-for="(event, index) in filteredEvents"
          :key="index"
        >

        <div  class="flex shadow-sm border justify-content-center text-center align-items-center h-screen m-1 rounded p-3" style="background:white;">

      <div class="rounded overflow-hidden">
          <div class=" p-l-6 pt-4 p-r-6">
            <div style="font-weight:700; font-size:1.25rem; display:flex; justify-content:center; align-items:center; height: 4.5rem; overflow: hidden;" class="mb-2"><div>{{ event.name }}<i class="fa fa-trophy ml-2" v-if="index==0" style="color:gold"></i></div></div>
            <div class="mb-2">{{event.timeSlot}}</div>
          
            <p style="color:#4a5568; font-size:1rem">
              {{event.description.substr(0,25)}}<button class=" ml-2" style="border:0px;border-radius:50%;" v-on:click="showModal(event)"><i class="fa fa-ellipsis-h"></i></button>
            </p>
          </div>
      
          <div class="p-l-6 p-r-6 pt-4">
            <span style="color:#4a5568; background:#edf2f7; font-weight:600; font-size: .875rem" class="inline-block rounded-lg px-3 py-1 mr-2" v-if="event.upvotes">
              {{event.upvotes.length}} upvotes
              </span>
          
          </div>
      <div class="p-l-6 p-r-6 pb-4 pt-4">
        <div class="wrap" v-if="!loading">
              <div class="button downvote" v-on:click="down(event)" v-if="upVoteExists(event)"><i class="fa fa-arrow-down"></i>DOWN VOTE</div>
              <div class="button" v-on:click="upvote(event)" v-else><i class="fa fa-arrow-up"></i>VOTE UP</div>
        </div>
        <div class="wrap" v-else>
              <div class="button">Loading...</div>
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

  <div id="modal" style="min-height:100vh;width:100%; position:fixed; top: 0px; left:0px; display: none; justify-content: center">
    <div style="height:100%; width:100%; background-color:black; position: absolute; top: 0px; opacity:0.5;" v-on:click="closeModal()">
    </div>
    <div class="modalContainer">
        <div class="modal-date">
          <div  v-if="currentEvent">
            <div class="modal-date-number">{{currentEvent.timeSlot.split('-')[2]}}</div>
            <div class="modal-date-month">{{dateToMonth(currentEvent.timeSlot.split('-')[1])}}</div>
          </div>
        </div>
        <div class="modal-information" v-if="currentEvent">
          <h2>{{currentEvent.name}}</h2>
          <div>{{currentEvent.description}}</div>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import EventDataService from "../services/EventDataService";
import UserDataService from "../services/UserDataService";
import Vue from 'vue'
import VModal from 'vue-js-modal'
Vue.use(VModal)
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;
Vue.use(Antd);
export default {
  name: "event-list",
  data() {
    return {
      events: [],
      currentUser:JSON.parse(localStorage.getItem("user")),
      currentIndex: -1,
      name: "",
      index:-1,
      orderBy:"1",
      currentEvent:null,
      loading:false


    };
  },
  computed: {
      filteredEvents() {
        if(this.orderBy==="1")
        {
          return this.events.filter(event => {
          return event.name.toLowerCase().includes(this.name.toLowerCase())
        }).sort(function(a,b){
          return b.upvotes.length-a.upvotes.length
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
    showModal(event){
      this.currentEvent=event;
  
        document.getElementById('modal').style.display = "flex";
      
    },
    closeModal(){
      document.getElementById('modal').style.display = "none";
    },
    upVoteExists(event){
        if(event.upvotes.some(e=>e===this.currentUser.emailAddress)){
          return true
        }
        return false;
      },
    getCurrentUser(){
         UserDataService.get(this.currentUser.id)
                 .then(response => {
                   this.currentUser = response.data;
                  localStorage.setItem("user", JSON.stringify(this.currentUser))
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
      this.$message.success("Upvoted " + event.name)
        event.upvotes.push(this.currentUser.emailAddress);

        EventDataService.upvote(event.id, this.currentUser.emailAddress)


    },
    down(event){
      this.$message.error("Downvoted " + event.name)
        event["upvotes"]=event.upvotes.filter(e=>e!==this.currentUser.emailAddress)
        EventDataService.downvote(event.id, this.currentUser.emailAddress)


    },
    dateToMonth(month){
      switch(month){
        case "01":
          return "January";
        case "02":
          return "February";
        case "03":
          return "March";
        case "04":
          return "April";
        case "05":
          return "May";
        case "06":
          return "June";
        case "07":
          return "July";
        case "08":
          return "August";
        case "09":
          return "September";
        case "10":
          return "October";
        case "11":
          return "November";
        case "12":
          return "December";
      }
      return month
    },
  },

  mounted() {

      this.getCurrentUser()
    this.retrieveEvents();
    
  },
};
</script>

<style>

.modalContainer{
  position: absolute;
  background-color:white;
  top:40%;
  height: 30vh; 
  width: 80vh;
  display:flex;
  flex-direction:row;
}
.modal-date{
  height:100%;
  width:275px;
  background-color:#f7931e;
  color: white;
  font-family: Tahoma;
  display:flex;
  justify-content:center;
  align-items:center;
}
.modal-date-number{
  font-size:4rem; line-height:1
}
.modal-date-month{
  font-size:1.8rem; letter-spacing:2px;
}
.modal-information{
  height:100%;
  width:100%;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.orange-underline {
  background-image: linear-gradient(to right, #f37121 0%, #f37121 100%);
    background-repeat: repeat-x;
    background-position: 0 78%;
    background-size: 100% 8px;
}
.event-list-body {
  background: #343a40;
  min-height:100vh;
  text-align: center;
  display:flex;
  justify-content: center;
  background-image: 
    linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url(/img/background-wave.jpg);
  padding-top:20px;
  background-size:cover

}
select{
  color: black;
}
.event-list-container{
  width: 1100px;

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

    .vm--modal{
        width:100% !important;
        left:0px !important;
    }

}
.event-list-ul{
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
}

.downvote{
  background:#f37121 !important;
}

.downvote:hover{
  background: #f7931e !important;
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

@media screen and (max-width:726px)
{
  .modalContainer{
    position: absolute;
    background-color:white; 
    top:20%;
    height: 60vh;
    width: 80vw;
    display:flex;
    flex-direction:column;
  }
  .modal-date{
    width:100%;
    height:20%;
    background-color:#f7931e;
    color: white;
    font-family: Tahoma;
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .modal-date-number{
    font-size:2rem; line-height:1
  }
  .modal-date-month{
    font-size:1rem; letter-spacing:2px;
  }
}
</style>