<template>

<div class = "schedule-body" v-if="currentSchedule">
    <div class="schedule-info">
    <div style="text-align:center">
            <h1 style="color:white"><u>{{this.currentSchedule.date}}</u></h1>
    </div>
    <div class = "schedule-container">

    <div class="schedule-day">
     <h2 style="text-align:center; text-decoration:underline;">Friday </h2>
        <ul>
          <li v-for="(event, index) in currentSchedule.friday" :key="index" style="display:flex; background:#eee;padding:10px;" class="m-2">
              <u>{{ event.timeSlot }}</u>- {{event.name}} <div v-if="event.signUp">*</div>
          </li>
        </ul>
    </div>
    <div class="schedule-day">
     <h2 style="text-align:center; text-decoration:underline;">Saturday </h2>
       <ul>
            <li v-for="(event, index) in currentSchedule.saturday" :key="index" style="display:flex; background:#eee;padding:10px;" class="m-2">
                <u>{{ event.timeSlot }}</u>- {{event.name}} <div v-if="event.signUp">*</div>
            </li>
       </ul>
    </div>
    <div class="schedule-day">
       <h2 style="text-align:center; text-decoration:underline;">Sunday </h2>
        <ul>
             <li v-for="(event, index) in currentSchedule.sunday" :key="index" style="display:flex; background:#eee;padding:10px;" class="m-2">
                  <u>{{ event.timeSlot }}</u>- {{event.name}} <div v-if="event.signUp">*</div>
             </li>
        </ul>
    </div>
    
    </div><div style="display:flex">
           <div v-for="(event, index) in filtered('friday')" :key="index" class="event-signup-item">
               <div  class="flex shadow-sm border justify-content-center text-center align-items-center h-screen m-1 rounded p-3" style="background:white;" >
                <div class="rounded overflow-hidden">
                    <div class=" p-l-6 pt-4 p-r-6">
                        <div style="font-weight:700; font-size:1.25rem" class="mb-2">{{ event.name }}</div>
                        <div class="mb-2">{{event.timeSlot}}</div>
                    
                        <p style="color:#4a5568; font-size:1rem">
                        <ol>
                        <li v-for="(user, index) in event.usersSignedUp" :key = "index">
                            {{getFullName(user)}}
                        </li>
                    </ol>
                        </p>
                    </div>
                
                    <div class="p-l-6 p-r-6 pt-4">
                        <span style="color:#4a5568; background:#edf2f7; font-weight:600; font-size: .875rem" class="inline-block rounded-lg px-3 py-1 mr-2">
                         Max. {{event.personLimit}}
                        </span>
                    
                    </div>
                <div class="p-l-6 p-r-6 pb-4 pt-4">
                    <div class="wrap">
                        <div class="button" v-if="$cookies.get('user').admin" @click= "sendEmail(event)">Send Notification</div>
                        


                    </div>
   
                </div>
                    
                </div>  

            
        

    </div></div>
</div></div></div>
</template>

<script>
import EmailDataService from "../services/EmailDataService"
import ScheduleDataService from '../services/ScheduleDataService'
export default{
    data(){
        return {
            currentSchedule:null,
            
        };
    },
    computed:{
        
    },
    methods:{
        filtered(date){
            if(this.currentSchedule){   
                return this.currentSchedule[date].filter(e=>e.signUp==true)
            }
            return []
            
        },
        getFullName(user){
            return user.userName + user.emailAddress.substring(user.emailAddress.indexOf(".")+1,user.emailAddress.indexOf("@"));
        },
        sendEmail(event){
            for(var i =0;i<event.usersSignedUp.length;i++){
                EmailDataService.sendEmail(event.usersSignedUp[i].emailAddress, event.name, event.timeSlot)
            }
            alert("Emails Successfully Sent!")


        },

        getCurrentSchedule(){
            ScheduleDataService.getCurrent()
                .then(result=>{
                    this.currentSchedule=result.data
                })
        },
        getSchedule(id){
            ScheduleDataService.get(id)
                .then(response => {
                  this.currentSchedule = response.data;
                })
                
        },
    },
    mounted(){
        if(this.$route.params.id){
            this.getSchedule(this.$route.params.id)
        }
        else{
            this.getCurrentSchedule()
        }
        
    }

}
</script>
<style>
.schedule-body {
    overflow-y: auto;
    background: url(/img/background-wave.png);
    background-size: cover;
    background-repeat: no-repeat;
    justify-content: center;
    display:flex;
    min-height: 100vh;
    width: 100%;
    background-position: 50% 50%;
}
.schedule-info{
    width:1000px;
    
}
.schedule-container{
    background:white;
    border:2px solid #eee;
    padding:15px;
    display:flex;
}
.event-signup-item{
    width:100%;
}
  @media screen and (max-width:1000px){
      .schedule-info{
          width:100%;
      }
  }
  @media screen and (max-width:500px){
      .schedule-container{
          flex-direction:column
      }
      .schedule-day{
          
          width:100% !important;
      }

  }
  li{
    list-style-type: none;
    padding:0px;
    margin:0px; 
  }
  ul{
      padding:0px;
  }
  .schedule-day{
      width:33%;
      border:1px solid #eee;
      padding:10px;

  }
</style>