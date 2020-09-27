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
                        </div>
                        <div style="display:flex;flex-direction:column;">
                            <b-button class = "orange-default"
                                :href="'/schedule/' + schedule.id"
                            >
                            View Schedule
                            </b-button>
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
.schedules-container {
  background: #343a40;
  min-height:100vh;
  text-align: center;
  display:flex;
  justify-content: center;
  background:url(/img/background-wave.png);
  background-size:cover


} 
.schedule-item{  list-style-type: none; /* Remove bullets */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margins */
  width:25%}
  .orange-default{
      border:#Ffab62;
      background:#ffab62;
      margin:2%;
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
</style>