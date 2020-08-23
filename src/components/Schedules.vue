<template>
<div class = "schedules-container">
   
    <div class="schedule-list">
         <h1 class="text-center" style="color:white"> Welcome, Admin </h1>
        <div style="background:white;border:2px solid #eee; padding:20px;box-shadow: 0 0 0 1px #d9d9d9, 0 1px 8px 0 rgba(0,0,0,0.25)">
            
            <div class="input-group mb-3">
               <input type="text" class="form-control" placeholder="Search by date"
                v-model="date"/>
            </div>
            
            <div class="button_cont" style="margin:3%;display:flex;justify-content:center;"><a style="width:60%;" class="create" href="/createSchedule" rel="nofollow noopener">Create Schedule</a></div>
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
                            <b-button class = "red-default" @click = "deleteSchedule(schedule.id)">Delete Schedule</b-button>
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

                        })
                        .catch(e => {
                          console.log(e);
                        });
            }
        },

    },
    mounted(){
        this.retrieveSchedules()
        if(this.$cookies.get('user') ==null ||this.$cookies.get('user').admin==false)
        {
           alert("Sign in as an admin to access this page...")
           this.$router.push('home')
        }
    }
}
</script>
<style>

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
  .red-default{
      border:#ea3c53;
      background:#ea3c53;
  }
  .red-default:hover{
      background:#cd3549;
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