<template>
<div class="event-body">
<div style="max-width:900px;margin:auto;color:white;border-radius:10px;display:flex;justify-content:center;text-align:center;">
  <div v-if="currentEvent" class="edit-form" style="padding:10px;">
    <h1 style="color:white"><span class="orange-underline">{{currentEvent.name}}</span></h1>
      <div class="form-group" style="max-width:300px">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
          v-model="currentEvent.name"
        />
      </div>
      <div class="form-group" style="max-width:300px">
        <label for="timeSlot">Time Slot</label>
        <input type="text" class="form-control" id="timeSlot"
          v-model="currentEvent.timeSlot"
        />
      </div>
    
      <div v-if="currentEvent.requested!=null">
           <label><strong>Requested By:</strong></label> {{ currentEvent.requested.emailAddress }}
      </div>

    
    <button class="default-yellow" 
      @click="deleteEvent"
    >
      Delete Event
    </button>

    <button class="default" 
      @click="updateEvent"
    >
      Update Event
    </button>
    <p>{{ message }}</p>
  </div>
</div></div>
</template>

<script>
import EventDataService from "../services/EventDataService";
import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;
Vue.use(Antd);
export default {
  name: "event-details",
  data() {
    return {
      currentEvent: null,
      message: ''
    };
  },
  methods: {
    getEvent(id) {
      EventDataService.get(id)
        .then(response => {
          this.currentEvent = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateEvent() {
      EventDataService.update(this.currentEvent.id, this.currentEvent)
        .then(() => {
          this.message = 'The event was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteEvent() {
      EventDataService.delete(this.currentEvent.id)
        .then(() => {
          this.$message.error("Event deleted")
          window.location.href="/events"
        })
        .catch(e => {
          console.log(e);
        });

    }
  },
  mounted() {
    

    if(!JSON.parse(localStorage.getItem("user"))||JSON.parse(localStorage.getItem("user")).admin==false){
       this.$message.error("Admin permission denied...")
       window.location.href="/"
    }
    else{this.getEvent(this.$route.params.id);}
    
  }
};
</script>
<style>
.event-body{
  background:url(/img/background-wave.png);
  background-size:cover;
  height:100vh;
  width:100%;
}
.orange-underline{
    background-image: linear-gradient(to right, #f37121 0%, #f37121 100%);
    background-repeat: repeat-x;
    background-position: 0 85%;
    background-size: 100% 8px;
}
.badge{
  padding:10px;
}
.default {
    display: inline-block;
    border: 2px solid transparent;
    margin: 0;
    padding: 10px 20px;
    background: #f37121;
    color: #fff;
    font-size: 10px;
    font-weight: bolder;
    line-height: 15px;
    border-radius: 0;
    text-align: center;
    text-transform: uppercase;
    -webkit-transition: .3s;
    transition: .3s;
    border-radius: 7px;
}

.default:hover {
    background:#db6115;
    color:white;
}
.default-yellow{
      font-weight: bolder;
  border: 2px solid transparent;
    margin: 0;
    padding: 10px 20px;
    background: #f7e212;
    color: #121111;
    font-size: 10px;
    line-height: 15px;
    border-radius: 0;
    text-align: center;
    -webkit-transition: .3s;
    transition: .3s;
  border-radius:7px;
  text-transform: uppercase;
}

</style>
