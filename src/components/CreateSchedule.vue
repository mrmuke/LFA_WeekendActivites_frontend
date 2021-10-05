<template>
<div class="page-wrapper">
        <div class="wrapper wrapper--w900">
            <div class="card card-6"  v-if="!submitted">
                <div class="card-heading">
                    <h2 class="title"><span class="orange-underline">Schedule</span></h2>
                </div>
                <div class="card-body">
                        <div class="form-row">
                            <div class="name">Date Range of Weekend</div>
                            <div class="value">
                                <input
                                v-model="schedule.date"
                                placeholder="Month Date-Date"
                                class="input--style-6" type="text" name="event_name">
                            </div>
                        </div>
                        <div class = "form-row" style="flex-direction:column">
                            <div style="display:flex; align-items:center;width:100%; cursor:pointer; position: relative;" v-on:click="changeDutyOpen()">
                              <h1>On Duty</h1>
                              <i style="font-size:2.5rem; position: absolute; right: 1em;top:9px;" v-if="!onDutyOpen" class="fa fa-sort-up"></i>
                              <i style="font-size:2.5rem; position: absolute; right: 1em;top:-9px;" v-if="onDutyOpen" class="fa fa-sort-down"></i>
                            </div>
                            <div style="overflow:hidden;" id="onDuty-container">
                              <div style="width:100%; display:flex; justify-content:center; align-items:center; margin-bottom: 1rem; margin-top: 1rem;">
                                <div class="duty-option">On Call:</div>
                                  <input
                                  v-model="schedule.phoneNumbers[0].teacherName"
                                  style="width:37.5%; margin-right: 5%;"
                                  placeholder="Name"
                                  class="input--style-6" type="text">
                                  <input
                                  v-model="schedule.phoneNumbers[0].phoneNumber"
                                  style="width:37.5%;"
                                  placeholder="Number"
                                  class="input--style-6" type="text">
                              </div>
                              <div style="width:100%; display:flex; justify-content:center; align-items:center; margin-bottom: 1rem;">
                                <div class="duty-option">Atlass Up</div>
                                  <input
                                  v-model="schedule.phoneNumbers[1].teacherName"
                                  style="width:37.5%; margin-right: 5%;"
                                  placeholder="Name"
                                  class="input--style-6" type="text">
                                  <input
                                  v-model="schedule.phoneNumbers[1].phoneNumber"
                                  style="width:37.5%;"
                                  placeholder="Number"
                                  class="input--style-6" type="text">
                              </div>
                              <div style="width:100%; display:flex; justify-content:center; align-items:center; margin-bottom: 1rem;">
                                <div class="duty-option">Atlass Down:</div>
                                  <input
                                  v-model="schedule.phoneNumbers[2].teacherName"
                                  style="width:37.5%; margin-right: 5%;"
                                  placeholder="Name"
                                  class="input--style-6" type="text">
                                  <input
                                  v-model="schedule.phoneNumbers[2].phoneNumber"
                                  style="width:37.5%;"
                                  placeholder="Number"
                                  class="input--style-6" type="text">
                              </div>
                              <div style="width:100%; display:flex; justify-content:center; align-items:center; margin-bottom: 1rem;">
                                <div class="duty-option">Field #1:</div>
                                  <input
                                  v-model="schedule.phoneNumbers[3].teacherName"
                                  style="width:37.5%; margin-right: 5%;"
                                  placeholder="Name"
                                  class="input--style-6" type="text">
                                  <input
                                  v-model="schedule.phoneNumbers[3].phoneNumber"
                                  style="width:37.5%;"
                                  placeholder="Number"
                                  class="input--style-6" type="text">
                              </div>
                              <div style="width:100%; display:flex; justify-content:center; align-items:center; margin-bottom: 1rem;">
                                <div class="duty-option">Field #2:</div>
                                  <input
                                  v-model="schedule.phoneNumbers[4].teacherName"
                                  style="width:37.5%; margin-right: 5%;"
                                  placeholder="Name"
                                  class="input--style-6" type="text">
                                  <input
                                  v-model="schedule.phoneNumbers[4].phoneNumber"
                                  style="width:37.5%;"
                                  placeholder="Number"
                                  class="input--style-6" type="text">
                              </div>
                              <div style="width:100%; display:flex; justify-content:center; align-items:center; margin-bottom: 1rem;">
                                <div class="duty-option">Warner:</div>
                                  <input
                                  v-model="schedule.phoneNumbers[5].teacherName"
                                  style="width:37.5%; margin-right: 5%;"
                                  placeholder="Name"
                                  class="input--style-6" type="text">
                                  <input
                                  v-model="schedule.phoneNumbers[5].phoneNumber"
                                  style="width:37.5%;"
                                  placeholder="Number"
                                  class="input--style-6" type="text">
                              </div>
                              <div style="width:100%; display:flex; justify-content:center; align-items:center; margin-bottom: 1rem;">
                                <div class="duty-option">Ferry Hall:</div>
                                  <input
                                  v-model="schedule.phoneNumbers[6].teacherName"
                                  style="width:37.5%; margin-right: 5%;"
                                  placeholder="Name"
                                  class="input--style-6" type="text">
                                  <input
                                  v-model="schedule.phoneNumbers[6].phoneNumber"
                                  style="width:37.5%;"
                                  placeholder="Number"
                                  class="input--style-6" type="text">
                              </div>
                              <div style="width:100%; display:flex; justify-content:center; align-items:center; margin-bottom: 1rem;">
                                <div class="duty-option">McIntosh:</div>
                                  <input
                                  v-model="schedule.phoneNumbers[9].teacherName"
                                  style="width:37.5%; margin-right: 5%;"
                                  placeholder="Name"
                                  class="input--style-6" type="text">
                                  <input
                                  v-model="schedule.phoneNumbers[9].phoneNumber"
                                  style="width:37.5%;"
                                  placeholder="Number"
                                  class="input--style-6" type="text">
                              </div>
                              <div style="width:100%; display:flex; justify-content:center; align-items:center; margin-bottom: 1rem;">
                                <div class="duty-option"><input placeholder="SSH/Writing Center/Math Help" v-model="schedule.phoneNumbers[7].dorm" style="border: 1px solid #b4b4b4; width:80%; padding: 6px;"></div>
                                  <input
                                  v-model="schedule.phoneNumbers[7].teacherName"
                                  style="width:37.5%; margin-right: 5%;"
                                  placeholder="Name"
                                  class="input--style-6" type="text">
                                  <input
                                  v-model="schedule.phoneNumbers[7].phoneNumber"
                                  style="width:37.5%;"
                                  placeholder="Number"
                                  class="input--style-6" type="text">
                              </div>
                              <div style="width:100%; display:flex; justify-content:center; align-items:center; margin-bottom: 1rem;">
                                <div class="duty-option"><input placeholder="SSH/Writing Center/Math Help" v-model="schedule.phoneNumbers[8].dorm" style="border: 1px solid #b4b4b4; width:80%; padding: 6px;"></div>
                                  <input
                                  v-model="schedule.phoneNumbers[8].teacherName"
                                  style="width:37.5%; margin-right: 5%;"
                                  placeholder="Name"
                                  class="input--style-6" type="text">
                                  <input
                                  v-model="schedule.phoneNumbers[8].phoneNumber"
                                  style="width:37.5%;"
                                  placeholder="Number"
                                  class="input--style-6" type="text">
                              </div>
                            </div>
                        </div>
                        <div class = "form-row" style="flex-direction:column" v-for="(eachDay, i) in scheduleDays" :key="i" >
                            <div style="display:flex; align-items:center;justify-content:center;width:100%;"><input placeholder="Please Enter Day" v-model="eachDay.date" style="font-size:30px;width:80%;"><b-button @click="removeDay(i)" style="background:none;border:none; padding:5px; color:black; width:134px;">Remove Day</b-button><b-button @click="addNewEvent(i)" style="background:none;border:none; padding:5px; color:black; width:100px;">Add event</b-button>
                            <!-- <b-button style="background:none;border:none; padding-right:5px;padding-left:5px; color:black" @click="deleteEvent('friday')"><i class="fa fa-minus"></i></b-button> --></div>
                            <div v-for="(event, index) in scheduleDays[i].events" :key="index" style="display:flex">
                                <div style="display:flex; flex-direction:column; justify-content:center;"><button @click="deleteEvent(i,index)"><i style="font-size:25px;" class="fa fa-times mr-2"></i></button></div>
                                <div style="border-bottom:0.5px solid #eee;padding-bottom:10px;">
                                Name
                                <input type="text" class="form-control" v-model="event.name" placeholder="e.x. SuperTarget Run">
                                Time Slot
                                <input type="text" class="form-control" v-model="event.timeSlot" placeholder="format-'5:00-6:00'">
                                <div style="display:flex; align-items:center;">
                                <label :for="event.name" style="margin:0px;">Require Sign Up</label>
                                <input type="checkbox" style="width:30px;" :id="event.name" v-model="event.signUp"></div>
                                <div v-if="event.signUp">
                                    <input type="text" class="form-control" v-model="event.personLimit" placeholder="Person Limit">
                                </div></div>
                                <div style="display:flex; flex-direction:column; justify-content:center;" v-if="scheduleDays[0].events.length>1"><button v-if="index>0" @click="moveEventUp(index)"><i class="fa fa-arrow-up m-2"></i></button><button v-if="index<scheduleDays[0].events.length-1" @click="moveEventDown(index)"><i class="fa fa-arrow-down m-2"></i></button></div>
                            </div>
                        </div>
                        <b-button @click="addNewDay()" style="background:none;border:none; padding:5px; color:black; width:100%">Add day</b-button>
                </div>
                <div class="card-footer">
                    <button @click="submit" class="btn btn--radius-2 btn--blue-2" style="width:100%">Submit Schedule</button>
                </div>
            </div>
            <div v-if="submitted" style="display:flex;flex-direction:column;justify-content:center;align-items:center;padding-top:5%">
              <i class="fa fa-check" style="font-size:100px;color:green;background:#eee;border-radius:50%;"></i>
              <h1 style="color:white;text-align:center;padding:1%;">You submitted a schedule successfully!</h1>
              <b-button class="btn btn--radius-2 btn--blue-2 mt-2" :href="'/schedule/'">View Schedule</b-button>
              <b-button class="btn btn--radius-2 btn--blue-2 mt-2" href="/schedules">Go Back</b-button>
            </div>
        </div>
    </div>


</template>

<script>
import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;
Vue.use(Antd);
import ScheduleDataService from "../services/ScheduleDataService";
export default {
    data(){
        return {
          i: 0,
          scheduleDays: [
            {
              date:"Friday",
              events:[]
            },
            {
              date:"Saturday",
              events:[]
            },
            {
              date:"Sunday",
              events:[]
            }
          ],
          schedule: {
            id: null,
            date: "",
            phoneNumbers:[
              {
                dorm:"On Call",
                teacherName: "",
                phoneNumber: "(847) 997-0291"
              },
              {
                dorm:"Atlass Up",
                teacherName: "",
                phoneNumber: "(847) 997-0498"
              },
              {
                dorm:"Atlass Down",
                teacherName: "",
                phoneNumber: "(847) 997-2687"
              },
              {
                dorm:"Field #1",
                teacherName: "",
                phoneNumber: "(847) 997-0462"
              },
              {
                dorm:"Field #2",
                teacherName: "",
                phoneNumber: "(847) 997-2685"
              },
              {
                dorm:"Warner",
                teacherName: "",
                phoneNumber: "(847) 997-0469"
              },
              {
                dorm:"Ferry Hall",
                teacherName: "",
                phoneNumber: "(224) 300-3047"
              },
              {
                dorm:"",
                teacherName: "",
                phoneNumber: ""
              },
              {
                dorm:"",
                teacherName: "",
                phoneNumber: ""
              },
              {
                dorm:"McIntosh",
                teacherName:"",
                phoneNumber:"(847) 997-0463"
              }
            ]
          },
          submitted: false,
          edit:false,
          onDutyOpen: false,
        };
    },
    computed:{

    },
    methods:{
        moveEventUp(index){
           var array=this.i
           this.scheduleDays[array].events.splice(index-1, 2, this.scheduleDays[array].events[index], this.scheduleDays[array].events[index-1])
        },
        moveEventDown(index){
            /* let x=this.scheduleDays[array][index]
            this.scheduleDays[array][index]=this.scheduleDays[array][index+1]
            this.scheduleDays[array][index+1]=x */
            var array= this.i
            this.scheduleDays[array].events.splice(index, 2, this.scheduleDays[array].events[index+1], this.scheduleDays[array].events[index])
        },
         addNewEvent(array){
            this.scheduleDays[array].events.push({name:'',timeSlot:'', usersSignedUp:[],waitlist:[]});
         },
         addNewDay(){
           this.scheduleDays.push({
              date:"",
              events:[]
            },);
         },
         deleteEvent(array, index){
             this.scheduleDays[array].events.splice(index, 1);
         },
         removeDay(day){
           this.scheduleDays.splice(day, 1);
         },
         submit(){
               
                if(this.schedule.date.length==0)
                {
                    this.$message.error("Enter a valid date...")
                    return;
                }
                var data ={
                    date:this.schedule.date,
                    phoneNumbers:this.schedule.phoneNumbers,
                    scheduleDays:this.scheduleDays
                }
                if(this.edit){
                  ScheduleDataService.update(this.schedule.id,data)
                    .then(()=>{
                      this.submitted=true
                  })
                }
                else{
                  ScheduleDataService.create(data)
                    .then(() => {
                       this.submitted=true;
                    })
                    .catch(e => {
                      console.log(e);
                    });
                }
         },
         getSchedule(id){
           ScheduleDataService.get(id)
            .then(result=>{
              this.schedule=result.data;
              this.scheduleDays=result.data.scheduleDays;
            })
         },
         changeDutyOpen(){
           this.onDutyOpen = !this.onDutyOpen;
           if(this.onDutyOpen){
              document.getElementById('onDuty-container').style.maxHeight="1000px";
           } else {
              document.getElementById('onDuty-container').style.maxHeight="0px";
           }
         }
    },

    mounted(){
      console.log(this.schedule);
        if(JSON.parse(localStorage.getItem("user"))==null ||JSON.parse(localStorage.getItem("user")).admin==false)
        {
           this.$message.error("Sign in as an admin to access this page...")
           window.location.href="/"
        }
        if(this.$route.params.id){
          this.edit=true
          this.getSchedule(this.$route.params.id)
        }
    }

}

</script>
<style>
#onDuty-container{
  transition: max-height 0.75s;
  width:100%;
  max-height:0px;
}
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
  margin:0px;
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
.orange-underline {
  background-image: linear-gradient(to right, #f37121 0%, #f37121 100%);
    background-repeat: repeat-x;
    background-position: 0 77%;
    background-size: 100% 8px;
}

/* ==========================================================================
   #PAGE WRAPPER
   ========================================================================== */
.page-wrapper {
  min-height: 100vh;
  height:auto;
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
.p-t-100 {
  padding-top: 100px;
}

.p-t-130 {
  padding-top: 130px;
}

.p-t-180 {
  padding-top: 180px;
}

.p-t-45 {
  padding-top: 45px;
}

.p-t-20 {
  padding-top: 20px;
}

.p-t-15 {
  padding-top: 15px;
}

.p-t-10 {
  padding-top: 10px;
}

.p-t-30 {
  padding-top: 30px;
}

.p-b-100 {
  padding-bottom: 100px;
}

.p-b-50 {
  padding-bottom: 50px;
}

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
  background: #ff8216;
  border:0px 
}

.btn--blue-2:hover {
  background: #ff5b16;
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

.duty-option{
  display:inline;
  width: 35%;
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
