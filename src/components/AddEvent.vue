<template>
<div class="page-wrapper">
        <div class="wrapper wrapper--w900">
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
                                class="input--style-6" type="text" name="event_name">
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
            <div v-else style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding-top:2%;">
              <i class="fa fa-check" style="font-size:100px;color:green;background:#eee;border-radius:50%;"></i>
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
      events:[],
      submitted: false,
      disabledDates:{days: [1,2,3,4], to:this.getDate()}

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
      if(this.events.filter(i=>i.name===this.event.name).length>0)
      {
        this.$message.error("An event by this name already exists...");
        return;
      }

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

      EventDataService.create(data)
        .then(response => {
          this.event.id = response.data.id;
          this.submitted = true;
          console.log(response.data)
        })
        }
    },
    getEvents(){
        EventDataService.getAll()
          .then(response => {
            if(response.data.length>0)
            {
               this.events = response.data;
            }
             
            
             
          })
    },

    newEvent() {
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

/* ==========================================================================
   #FONT
   ========================================================================== */
.font-robo {
  font-family: "Roboto", "Arial", "Helvetica Neue", sans-serif;
}

.font-poppins {
  font-family: "Poppins", "Arial", "Helvetica Neue", sans-serif;
}

.font-opensans {
  font-family: "Open Sans", "Arial", "Helvetica Neue", sans-serif;
}

/* ==========================================================================
   #GRID
   ========================================================================== */
.row {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.row .col-2:last-child .input-group-desc {
  margin-bottom: 0;
}

.row-space {
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -moz-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.row-refine {
  margin: 0 -15px;
}

.row-refine .col-3 .input-group-desc,
.row-refine .col-9 .input-group-desc {
  margin-bottom: 0;
}

.col-2 {
  width: -webkit-calc((100% - 30px) / 2);
  width: -moz-calc((100% - 30px) / 2);
  width: calc((100% - 30px) / 2);
}

@media (max-width: 767px) {
  .col-2 {
    width: 100%;
  }
}

.form-row {
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -moz-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  padding: 24px 55px;
  border-bottom: 1px solid #e5e5e5;
}

.form-row .name {
  width: 188px;
  color: #333;
  font-size: 15px;
  font-weight: 700;
  margin-top: 11px;
}

.form-row .value {
  width: -webkit-calc(100% - 188px);
  width: -moz-calc(100% - 188px);
  width: calc(100% - 188px);
}

@media (max-width: 767px) {
  .form-row {
    display: block;
    padding: 24px 30px;
  }
  .form-row .name,
  .form-row .value {
    display: block;
    width: 100%;
  }
  .form-row .name {
    margin-top: 0;
    margin-bottom: 12px;
  }
}

/* ==========================================================================
   #BOX-SIZING
   ========================================================================== */
/**
 * More sensible default box-sizing:
 * css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice
 */
html {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

* {
  padding: 0;
  margin: 0;
}

*, *:before, *:after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
}

/* ==========================================================================
   #RESET
   ========================================================================== */
/**
 * A very simple reset that sits on top of Normalize.css.
 */
body,
h1, h2, h3, h4, h5, h6,
blockquote, p, pre,
dl, dd, ol, ul,
figure,
hr,
fieldset, legend {
  margin: 0;
  padding: 0;
}

/**
 * Remove trailing margins from nested lists.
 */
li > ol,
li > ul {
  margin-bottom: 0;
}

/**
 * Remove default table spacing.
 */
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/**
 * 1. Reset Chrome and Firefox behaviour which sets a `min-width: min-content;`
 *    on fieldsets.
 */
fieldset {
  min-width: 0;
  /* [1] */
  border: 0;
}

button {
  outline: none;
  background: none;
  border: none;
}

/* ==========================================================================
   #PAGE WRAPPER
   ========================================================================== */
.page-wrapper {
  min-height: 100vh;
  background-image: 
    linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url(/img/background-wave.jpg);
  background-size:cover
}

body {
  font-family: "Open Sans", "Arial", "Helvetica Neue", sans-serif;
  font-weight: 400;
  font-size: 14px;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 400;
}

h1 {
  font-size: 36px;
     
}

h2 {
  font-size: 30px;
   
}
.orange-underline{
  background-image: linear-gradient(to right, #f37121 0%, #f37121 100%);
    background-repeat: repeat-x;
    background-position: 0 78%;
    background-size: 100% 8px;
}
h3 {
  font-size: 24px;
}

h4 {
  font-size: 18px;
}

h5 {
  font-size: 15px;
}

h6 {
  font-size: 13px;
}

/* ==========================================================================
   #BACKGROUND
   ========================================================================== */
.bg-blue {
  background: #2c6ed5;
}

.bg-red {
  background: #fa4251;
}

.bg-dark {
  background: #1a1a1a;
}

.bg-gra-01 {
  background: -webkit-gradient(linear, left bottom, left top, from(#fbc2eb), to(#a18cd1));
  background: -webkit-linear-gradient(bottom, #fbc2eb 0%, #a18cd1 100%);
  background: -moz-linear-gradient(bottom, #fbc2eb 0%, #a18cd1 100%);
  background: -o-linear-gradient(bottom, #fbc2eb 0%, #a18cd1 100%);
  background: linear-gradient(to top, #fbc2eb 0%, #a18cd1 100%);
}

.bg-gra-02 {
  background: -webkit-gradient(linear, left bottom, right top, from(#fc2c77), to(#6c4079));
  background: -webkit-linear-gradient(bottom left, #fc2c77 0%, #6c4079 100%);
  background: -moz-linear-gradient(bottom left, #fc2c77 0%, #6c4079 100%);
  background: -o-linear-gradient(bottom left, #fc2c77 0%, #6c4079 100%);
  background: linear-gradient(to top right, #fc2c77 0%, #6c4079 100%);
}

.bg-gra-03 {
  background: -webkit-gradient(linear, left bottom, right top, from(#08aeea), to(#b721ff));
  background: -webkit-linear-gradient(bottom left, #08aeea 0%, #b721ff 100%);
  background: -moz-linear-gradient(bottom left, #08aeea 0%, #b721ff 100%);
  background: -o-linear-gradient(bottom left, #08aeea 0%, #b721ff 100%);
  background: linear-gradient(to top right, #08aeea 0%, #b721ff 100%);
}

/* ==========================================================================
   #SPACING
   ========================================================================== */



.m-r-45 {
  margin-right: 45px;
}

.m-r-55 {
  margin-right: 55px;
}

.m-b-55 {
  margin-bottom: 55px;
}

/* ==========================================================================
   #WRAPPER
   ========================================================================== */
.wrapper {
  margin: 0 auto;
}

.wrapper--w960 {
  max-width: 960px;
}

.wrapper--w900 {
  max-width: 900px;
}

.wrapper--w790 {
  max-width: 790px;
}

.wrapper--w780 {
  max-width: 780px;
}

.wrapper--w680 {
  max-width: 680px;
}

/* ==========================================================================
   #BUTTON
   ========================================================================== */
.btn {
  display: inline-block;
  line-height: 50px;
  padding: 0 30px;
  -webkit-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  cursor: pointer;
  font-size: 15px;
  text-transform: capitalize;
  font-weight: 700;
  color: #fff;
  font-family: inherit;
}

.btn--radius {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}

.btn--radius-2 {
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

.btn--pill {
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
}

.btn--green {
  background: #57b846;
}

.btn--green:hover {
  background: #4dae3c;
}

.btn--blue {
  background: #4272d7;
}

.btn--blue:hover {
  background: #3868cd;
}

.btn--blue-2 {
  background: #f7931e;
}

.btn--blue-2:hover {
  background: #f37121;
  color:white;
}

.btn--red {
  background: #ff4b5a;
}

.btn--red:hover {
  background: #eb3746;
}

/* ==========================================================================
   #DATE PICKER
   ========================================================================== */
td.active {
  background-color: #2c6ed5;
}

input[type="date" i] {
  padding: 14px;
}

.table-condensed td, .table-condensed th {
  font-size: 14px;
  font-family: "Roboto", "Arial", "Helvetica Neue", sans-serif;
  font-weight: 400;
}

.daterangepicker td {
  width: 40px;
  height: 30px;
}

.daterangepicker {
  border: none;
  -webkit-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
  display: none;
  border: 1px solid #e0e0e0;
  margin-top: 5px;
}

.daterangepicker::after, .daterangepicker::before {
  display: none;
}

.daterangepicker thead tr th {
  padding: 10px 0;
}

.daterangepicker .table-condensed th select {
  border: 1px solid #ccc;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  font-size: 14px;
  padding: 5px;
  outline: none;
}

/* ==========================================================================
   #FORM
   ========================================================================== */
input,
textarea {
  outline: none;
  margin: 0;
  border: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  width: 100%;
  font-size: 14px;
  font-family: inherit;
}

textarea {
  resize: none;
}

.input-group {
  position: relative;
  margin: 0;
}

.input--style-6,
.textarea--style-6 {
  background: transparent;
  line-height: 38px;
  border: 1px solid #cccccc;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  color: #666;
  font-size: 15px;
  -webkit-transition: all 0.4s ease;
  -o-transition: all 0.4s ease;
  -moz-transition: all 0.4s ease;
  transition: all 0.4s ease;
  padding: 0 20px;
}

.input--style-6::-webkit-input-placeholder,
.textarea--style-6::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #999;
}

.input--style-6:-moz-placeholder,
.textarea--style-6:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999;
  opacity: 1;
}

.input--style-6::-moz-placeholder,
.textarea--style-6::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999;
  opacity: 1;
}

.input--style-6:-ms-input-placeholder,
.textarea--style-6:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #999;
}

.input--style-6:-ms-input-placeholder,
.textarea--style-6:-ms-input-placeholder {
  /* Microsoft Edge */
  color: #999;
}

.input--style-6:focus,
.textarea--style-6:focus {
  -webkit-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
  -webkit-transform: translateY(-3px);
  -moz-transform: translateY(-3px);
  -ms-transform: translateY(-3px);
  -o-transform: translateY(-3px);
  transform: translateY(-3px);
}

.textarea--style-6 {
  line-height: 1.2;
  min-height: 120px;
  padding: 10px 20px;
}

.label--desc {
  font-size: 13px;
  color: #999;
  margin-top: 10px;
}

@media (max-width: 767px) {
  .label--desc {
    margin-top: 14px;
  }
}






/* ==========================================================================
   #TITLE
   ========================================================================== */
.title {
  font-size: 36px;
  font-weight: 700;
  text-align: left;
  color: #fff;
  margin-bottom: 24px;
  

}

@media (max-width: 767px) {
  .title {
    padding: 0 15px;
  }
}

/* ==========================================================================
   #CARD
   ========================================================================== */
.card {
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  background: #fff;
    border:0px;
}

.card-6 {
  background: transparent;
}

.card-6 .card-heading {
  background: transparent;
}

.card-6 .card-body {
  background: #fff;
  position: relative;
  border: 1px solid #e5e5e5;
  border-bottom: none;
  padding: 30px 0;
  padding-bottom: 0;
  -webkit-border-top-left-radius: 3px;
  -moz-border-radius-topleft: 3px;
  border-top-left-radius: 3px;
  -webkit-border-top-right-radius: 3px;
  -moz-border-radius-topright: 3px;
  border-top-right-radius: 3px;
}

.card-6 .card-body:before {
  bottom: 100%;
  left: 75px;
  border: solid transparent;
  content: "";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-color: rgba(255, 255, 255, 0);
  border-bottom-color: #fff;
  border-width: 10px;
}

.card-6 .card-footer {
  background: #fff;
  border: 1px solid #e5e5e5;
  border-top: none;
  -webkit-border-bottom-left-radius: 3px;
  -moz-border-radius-bottomleft: 3px;
  border-bottom-left-radius: 3px;
  -webkit-border-bottom-right-radius: 3px;
  -moz-border-radius-bottomright: 3px;
  border-bottom-right-radius: 3px;
  padding: 50px 55px;
}

@media (max-width: 767px) {
  .card-6 .card-footer {
    padding: 50px 30px;
  }
}

</style>