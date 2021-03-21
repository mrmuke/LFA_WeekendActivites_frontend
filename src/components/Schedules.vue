<template>
<div class = "schedules-container">
   
    <div class="schedule-list">
         <h1 class="text-center" style="color:white"><span class="orange-underline"> Welcome, Admin </span></h1>
        <div>
            <div style="display:flex;justify-content:center;">
             <i class="fa fa-search" style="background:#efefef; border-top-left-radius:10px; border-bottom-left-radius:10px;display:flex; align-items:center;width:5%;height:35px; justify-content:center;"></i>
        <input type="text" style="width:50%;height:35px;border-top-left-radius:0px; border-bottom-left-radius:0px;" class="form-control" placeholder="Search by date"
          v-model="date"/></div>

            
            <div class="button_cont" style="margin:3%;display:flex;justify-content:center;"><a style="width:75%;" class="create" href="/createSchedule" rel="nofollow noopener">Create Schedule</a></div>
            <ul style="display:flex;flex-wrap:wrap; margin:0;padding:0">
                <li class="schedule-item"
                v-for="(schedule, index) in filteredSchedules"
                :key="index"
                >
                <div  class="flex shadow-sm border justify-content-center text-center align-items-center h-screen m-1 rounded p-3" style="background:white;">
                    <div class="rounded overflow-hidden">
                        <div class=" p-l-6 pt-4 p-r-6">
                            <div style="font-weight:700; font-size:1.25rem" class="mb-2">{{ schedule.date }}</div>
                            <label class="switch">
  <input type="checkbox" :disabled="schedule.displayed" v-model="schedule.displayed" v-on:change="publishSchedule(schedule)" >
  <span class="slider round"></span>
</label>
                        </div>
                        <div style="display:flex;flex-direction:column;">
                            <b-button class = "orange-default" :href="'/schedule/' + schedule.id">View Schedule</b-button>
                                          
                            <b-button style="background:darkgrey; border:darkgrey; margin-bottom:0.4em !important; padding:0.6em;" class="mb-1" :href="'/editSchedule/' +schedule.id">Edit Schedule</b-button>

                            <button class = "downloadpdf" @click = "downloadpdf(schedule)">Download As PDF</button>

                            <button class = "default-yellow" @click = "deleteSchedule(schedule.id)">Delete Schedule</button>

                        </div>
                    </div>  
                </div>
                </li>
            </ul>
        </div>
        
            
    </div>

</div>
</template>
<script>
import ScheduleDataService from '../services/ScheduleDataService';
import Vue from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { jsPDF } from 'jspdf';
Vue.config.productionTip = false;
Vue.use(Antd);
export default{
    data(){
        return{
            date: "",
            schedules:[],
        }
    },
    computed:{
        filteredSchedules(){
             return this.schedules.filter(schedule => {
                return schedule.date.toLowerCase().includes(this.date.toLowerCase())
             })
        }
    },
    methods:{
        publishSchedule(schedule){
            
            ScheduleDataService.publish(schedule.id).then(result=>{
                this.schedules=result.data
            })
        },
        retrieveSchedules(){
            ScheduleDataService.getAll()
               .then(response => {
                 this.schedules = response.data;


               })


               .catch(e => {
                 console.log(e);
               });
        },

        deleteSchedule(id){
            if(confirm("Are you sure you want to delete this schedule?"))
            {
                ScheduleDataService.delete(id)
                        .then(() => {
                            this.schedules=this.schedules.filter(schedule=>schedule.id!=id)
                            this.$message.success("Schedule deleted")
                        })
                        .catch(e => {
                          console.log(e);
                        });
            }
        },

        downloadpdf(item){
            console.log(item);
            //210 297
            var doc = new jsPDF();
            //HEADER
            doc.setFillColor(0, 0, 0);
            doc.rect(5, 5, 200, 15, 'F');
            doc.setFont('Helvetica', '', "bold");
            doc.setFontSize(30);
            doc.setTextColor(255,255,255);
            doc.text('Weekend Activities',8.5, 16.5);
            doc.setFontSize(15);
            doc.text(item.date, 170, 16.5);
            doc.setTextColor(0,0,0);
            doc.setFontSize(8.5);

            //PHONE NUMBERS TITLE
            doc.setFont("Helvetica", "", 'bold');
            doc.text('On Call:', 5, 28);
            doc.text('Atlass Up:', 5, 34);
            doc.text('Atlass Down:', 5, 40);
            doc.text('Field #1:', 71.67, 28);
            doc.text('Field #2:', 71.67, 34);
            doc.text('Warner:', 71.67, 40);
            doc.text('Ferry:', 138.33, 28);
            doc.text(item.phoneNumbers[7].dorm, 138.33, 34);
            doc.text(item.phoneNumbers[8].dorm, 138.33, 40);

            //PHONE NUMBERS INFO
            doc.setFont("Helvetica", "", 'normal');
            doc.text(item.phoneNumbers[0].teacherName + "   " + item.phoneNumbers[0].phoneNumber, 68, 28, {align:"right"});
            doc.text(item.phoneNumbers[1].teacherName + "   " + item.phoneNumbers[1].phoneNumber, 68, 34, {align:"right"});
            doc.text(item.phoneNumbers[2].teacherName + "   " + item.phoneNumbers[2].phoneNumber, 68, 40, {align:"right"});
            doc.text(item.phoneNumbers[3].teacherName + "   " + item.phoneNumbers[3].phoneNumber, 135, 28, {align:"right"});
            doc.text(item.phoneNumbers[4].teacherName + "   " + item.phoneNumbers[4].phoneNumber, 135, 34, {align:"right"});
            doc.text(item.phoneNumbers[5].teacherName + "   " + item.phoneNumbers[5].phoneNumber, 135, 40, {align:"right"});
            doc.text(item.phoneNumbers[6].teacherName + "   " + item.phoneNumbers[6].phoneNumber, 205, 28, {align:"right"});
            doc.text(item.phoneNumbers[7].teacherName + "   " + item.phoneNumbers[7].phoneNumber, 205, 34, {align:"right"});
            doc.text(item.phoneNumbers[8].teacherName + "   " + item.phoneNumbers[8].phoneNumber, 205, 40, {align:"right"});

            //Friday Title
            //16 is text x axis
            doc.setFillColor(200,200,200);
            doc.rect(5,50,13,item.friday.length * 8 + 2,'F');
            doc.setDrawColor(0,0,0);
            doc.setLineWidth(0.5);
            doc.rect(5,50,13,item.friday.length * 8 + 2);
            doc.setFont("Helvetica", "", 'bold');
            doc.setFontSize(25);
            doc.text("Friday", 14, 50 + (item.friday.length * 8 + 27)/2, {angle:90});
            //Saturday Title
            doc.setFillColor(200,200,200);
            doc.rect(5,50 + item.friday.length * 8 + 2 + 10,13, item.saturday.length * 8 + 2,'F');
            doc.setDrawColor(0,0,0);
            doc.setLineWidth(0.5);
            doc.rect(5,50 + item.friday.length * 8 + 2 + 10, 13, item.saturday.length * 8 + 2);
            doc.text("Saturday", 14, 50 + item.friday.length * 8 + 2 + 10 + (item.saturday.length * 8 + 38)/2, {angle:90});

            //Sunday Title
            doc.setFillColor(200,200,200);
            doc.rect(5,50 + item.friday.length * 8 + 2 + 10 + item.saturday.length * 8 + 2 + 10,13, item.sunday.length * 8 + 2,'F');
            doc.setDrawColor(0,0,0);
            doc.setLineWidth(0.5);
            doc.rect(5,50 + item.friday.length * 8 + 2 + 10 + item.saturday.length * 8 + 2 + 10, 13, item.sunday.length * 8 + 2);
            doc.text("Sunday", 14, 50 + item.friday.length * 8 + 2 + 10 + item.saturday.length * 8 + 2 + 10 + (item.sunday.length * 8 + 33.5)/2, {angle:90});

            //Friday Events
            doc.setFontSize(12);
            for(let i = 0; i < item.friday.length; i++){
                doc.text(item.friday[i].timeSlot, 20, 56 + 8 * i);
                let required = "";
                if(item.friday[i].signUp){
                    required = "  *";
                }
                doc.text(item.friday[i].name + required, 45, 56 + 8 * i);
            }

            //Saturday Events
            for(let i = 0; i < item.saturday.length; i++){
                doc.text(item.saturday[i].timeSlot, 20, 50 + item.friday.length * 8 + 2 + 10 + 6 + (8 * i));
                let required = "";
                if(item.saturday[i].signUp){
                    required = "  *";
                }
                doc.text(item.saturday[i].name + required, 45, 50 + item.friday.length * 8 + 2 + 10 + 6 + (8 * i));
            }

            //Sunday Events
            for(let i = 0; i < item.sunday.length; i++){
                doc.text(item.sunday[i].timeSlot, 20, 50 + item.friday.length * 8 + 2 + 10 + item.saturday.length * 8 + 2 + 10 + 6 + (8 * i));
                let required = "";
                if(item.sunday[i].signUp){
                    required = "  *";
                }
                doc.text(item.sunday[i].name + required, 45, 50 + item.friday.length * 8 + 2 + 10 + item.saturday.length * 8 + 2 + 6 + 10 + (8 * i));
            }

            doc.save('Weekend Schedule: ' + item.date + ".pdf");
        }

    },
    mounted(){
        if(!(JSON.parse(localStorage.getItem("user"))&&JSON.parse(localStorage.getItem("user")).admin))
        {
           this.$message.error("Sign in as an admin to access this page...")
           this.$router.push('/')
        }
        else{
            this.retrieveSchedules()
        }
        
        
    }
}
</script>
<style>
.orange-underline {
  background-image: linear-gradient(to right, #f37121 0%, #f37121 100%);
    background-repeat: repeat-x;
    background-position: 0 77%;
    background-size: 100% 8px;
}
.schedule-list {
  width: 900px;
}

.downloadpdf{
    padding:0.6em;
    margin-bottom:0.4em;
    border:none;
    border-radius:0.5em;
}

.schedules-container {
   
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
  background-size:cover;
  


} 
.schedule-item{  list-style-type: none; /* Remove bullets */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
  width:25%}
  .orange-default{
      border:#f7931e;
      background:#f7931e;
      margin-bottom:0.4em;
      padding:0.6em;
  }
  .orange-default:hover{
      background: #ff8216;
      
  }
  .default-yellow{

  border: 2px solid transparent;
    margin: 0;
    padding: 10px 20px;
    background: #f7e212;

    text-align: center;
    -webkit-transition: .3s;
    transition: .3s;
  border-radius:7px;

}

  @media screen and (max-width:500px){
      .schedule-item{
          width:50%;
      }
  }
  @media screen and (max-width:900px){
      .schedule-list{
          width:100%;
      }
  }
  .switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>