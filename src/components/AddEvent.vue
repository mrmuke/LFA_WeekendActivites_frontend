<template>
<div class="page-wrapper">
        <div class="wrapper wrapper--w900">
          <!-- If form not submitted, request event with inputs -->
            <div class="card card-6"  v-if="!submitted">
                <div class="card-heading">
                    <h2 class="title"><span class="orange-underline">Request Event</span></h2>
                </div>
                <div class="card-body">
                        <div class="form-row">
                            <div class="name">Event Name</div>
                            <div class="value">
                                <input
                                required
                                v-model="event.name"
                                placeholder="What is the event?"
                                :maxlength="max"
                                class="input--style-6" type="text" name="event_name">
                                <small style="float:right">{{max-event.name.length}}</small>
                            </div>
                            
                        </div>
                        <div class="form-row">
                            <div class="name">Preferred Date</div>
                            <div class="value">
                                <div class="input-group">
                                    <datepicker :disabledDates="disabledDates" v-model="event.timeSlot" class="input--style-6" placeholder="Select preferred date..." style="width:100%;"></datepicker>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="name">Description</div>
                            <div class="value">
                                <div class="input-group">
                                    <textarea v-model="event.description" class="textarea--style-6" name="event_description" placeholder="Short Description of Event"></textarea>
                                </div>
                            </div>
                        </div>
                        

                </div>
                <div class="card-footer">
                    <button @click="saveEvent" class="btn btn--radius-2 btn--blue-2" type="submit">Request Event</button>
                </div>
            </div>
            <!-- If form already submitted, show success form submitted -->
            <div v-else style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding-top:5%;">
              <i class="fa fa-check" style="font-size:100px;color:orange;background:#eee;border-radius:50%;"></i>
              <h1 style="color:white;text-align:center;padding:5%;">You submitted an event successfully!</h1>
              <button class="btn btn--radius-2 btn--blue-2 mt-2" @click="viewEvents">View Events</button>
              <button class="btn btn--radius-2 btn--blue-2 mt-2" @click="newEvent">Submit Another Event</button>
            </div>
        </div>
    </div>

</template>

<script>

import EventDataService from "../services/EventDataService";
import Datepicker from 'vuejs-datepicker';
import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;

Vue.use(Antd);
export default {
  name: "add-event",
  components:{
    Datepicker
  },

  data() {
    return {
      event: {
        id: null,
        name: "",
        timeSlot:null,
        upVotes: 0,
        description:""
      },
      max:30,
      events:[],
      submitted: false,
      disabledDates: {days: [1,2,3,4], to:this.getDate()}

    };
  },
  methods: {
    getDate(){
      var date = new Date();
      date.setDate(date.getDate() + 7);
      return date;
    },
    viewEvents(){
      this.$router.push('/events')
    },

    saveEvent() {
      //event already requested
      if(this.events.filter(i=>i.name===this.event.name).length>0)
      {
        this.$message.error("An event by this name already exists...");
        return;
      }
      //event data form fields
      var data = {
        name: this.event.name,
        timeSlot: this.event.timeSlot,
        upVotes:this.event.upVotes,
        requested:JSON.parse(localStorage.getItem('user')),
        description:this.event.description
      };

      if(this.event.name.length==0||this.event.timeSlot==null||this.event.description.length==0)
      {
        this.$message.error("Please fill in all required fields...")
      }

      else{
        //create event and set submitted to true
      EventDataService.create(data)
        .then(response => {
          this.event.id = response.data.id;
          this.submitted = true;
        })
        }
    },
    getEvents(){
      //get all events
        EventDataService.getAll()
          .then(response => {
            if(response.data.length>0)
            {
               this.events = response.data;
            }
             
            
             
          })
    },

    newEvent() {
      //resubmit new event
      this.submitted = false;
      this.event = {};
    },

    },
  mounted(){
    if(JSON.parse(localStorage.getItem("user"))==null)
    {
        this.$message.error("Sign in to access this page")
        this.$router.push('/')
    }
    else{
      this.getEvents()
    }


  }
};
</script>

<style>
@import "../assets/generated.css";
</style>