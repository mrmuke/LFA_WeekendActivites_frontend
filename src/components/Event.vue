<template>
<div class="event-body">
<div style="max-width:900px;margin:auto;background:white;border-radius:10px;display:flex;justify-content:center;text-align:center;">
  <div v-if="currentEvent" class="edit-form" style="padding:10px;">
    <h1>{{currentEvent.name}}</h1>
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

    
    <button class="badge badge-danger mr-2" style="border:none"
      @click="deleteEvent"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success" style="border:none"
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
  name: "event",
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
.badge{
  padding:10px;
}
</style>
