<template>
<div class="page-wrapper">
        <div class="wrapper wrapper--w900">
          <!-- If create schedule form not yet submitted -->
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
                        <!-- Phone number inputs -->
                        <div class = "form-row" style="flex-direction:column">
                            <div style="display:flex; align-items:center;width:100%; cursor:pointer; position: relative;" v-on:click="changeDutyOpen()">
                              <h1>On Duty</h1>
                              <i style="font-size:2.5rem; position: absolute; right: 1em;top:9px;" v-if="!onDutyOpen" class="fa fa-sort-up"></i>
                              <i style="font-size:2.5rem; position: absolute; right: 1em;top:-9px;" v-if="onDutyOpen" class="fa fa-sort-down"></i>
                            </div>
                            <div style="overflow:hidden;" id="onDuty-container">
                              <div style="width:100%; display:flex; justify-content:center; align-items:center; margin-bottom: 1rem; margin-top: 1rem;" v-for="(item,index) in schedule.phoneNumbers" :key="index">
                                <div class="duty-option" ><p v-if="schedule.phoneNumbers[index].dorm.length>0">{{schedule.phoneNumbers[index].dorm}}</p><input v-else placeholder="SSH/Writing Center/Math Help" v-model="schedule.phoneNumbers[index].dorm" style="border: 1px solid #b4b4b4; width:80%; padding: 6px;"></div>
                                  <input
                                  v-model="schedule.phoneNumbers[index].teacherName"
                                  style="width:37.5%; margin-right: 5%;"
                                  placeholder="Name"
                                  class="input--style-6" type="text">
                                  <input
                                  v-model="schedule.phoneNumbers[index].phoneNumber"
                                  style="width:37.5%;"
                                  placeholder="Number"
                                  class="input--style-6" type="text">
                              </div>
                              
                            </div>
                        </div>
                        <!-- Show events for all schedule days -->
                        <div class = "form-row" style="flex-direction:column" v-for="(eachDay, i) in scheduleDays" :key="i" >
                            <div style="display:flex; align-items:center;justify-content:center;width:100%;"><input placeholder="Please Enter Day" v-model="eachDay.date" style="font-size:30px;width:80%;"><b-button @click="removeDay(i)" style="background:none;border:none; padding:5px; color:black; width:134px;">Remove Day</b-button><b-button @click="addNewEvent(i)" style="background:none;border:none; padding:5px; color:black; width:100px;">Add event</b-button></div>
                            <div v-for="(event, index) in scheduleDays[i].events" :key="index" >
                              <div v-if="event" style="display:flex">
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
                                <div style="display:flex; flex-direction:column; justify-content:center;" v-if="scheduleDays[i].events.length>1"><button v-if="index>0" @click="moveEventUp(index,i)"><i class="fa fa-arrow-up m-2"></i></button><button v-if="index<scheduleDays[i].events.length-1" @click="moveEventDown(index,i)"><i class="fa fa-arrow-down m-2"></i></button></div>
                                </div>
                            </div>
                        </div>
                        <b-button @click="addNewDay()" style="background:none;border:none; padding:5px; color:black; width:100%">Add day</b-button>
                </div>
                <div class="card-footer">
                    <button @click="submit" class="btn btn--radius-2 btn--blue-2" style="width:100%">Submit Schedule</button>
                </div>
            </div>
            <!-- Scheudle submitted -->
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
                dorm:"McIntosh",
                teacherName:"",
                phoneNumber:"(847) 997-0463"
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
            ]
          },
          submitted: false,
          edit:false,
          onDutyOpen: false,
        };
    },

    methods:{
      /* Adjust placement of events */
        moveEventUp(index,i){
           var array=i
           this.scheduleDays[array].events.splice(index-1, 2, this.scheduleDays[array].events[index], this.scheduleDays[array].events[index-1])
        },
        moveEventDown(index,i){
            var array= i
            this.scheduleDays[array].events.splice(index, 2, this.scheduleDays[array].events[index+1], this.scheduleDays[array].events[index])
        },
        /* Add new events or days */
         addNewEvent(array){
            this.scheduleDays[array].events.push({name:'',timeSlot:'', usersSignedUp:[],waitlist:[]});
         },
         addNewDay(){
           this.scheduleDays.push({
              date:"",
              events:[]
            },);
         },
         /* Delete events or days */
         deleteEvent(array, index){
             this.scheduleDays[array].events.splice(index, 1);
         },
         removeDay(day){
           this.scheduleDays.splice(day, 1);
         },
         submit(){
               /* Submit schedule */
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
                /* If in edit mode update, otherwise create new schedule */
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
         /* Get schedule data by ID */
         getSchedule(id){
           ScheduleDataService.get(id)
            .then(result=>{
              console.log(result.data)
              this.schedule=result.data;
              this.scheduleDays=result.data.scheduleDays;
            })
         },
         /* Open and close on duty phone numbers dropdown */
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
      /* Get current schedule if in edit mode */
        if(this.$route.params.id){
          this.edit=true
          this.getSchedule(this.$route.params.id)
        }
    }

}

</script>
<style>
@import "../assets/generated.css";

</style>
