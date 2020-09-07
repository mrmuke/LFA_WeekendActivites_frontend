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
    
    </div><div style="display:flex; flex-wrap:wrap;">
           <div v-for="(event) in filtered('friday')" :key="event.id" class="event-signup-item">
               <div  class="flex shadow-sm border justify-content-center text-center align-items-center h-screen m-1 rounded p-3" style="background:white;" >
                   <div class="go-to-details" @click="showModal(event)">
                <div class="rounded overflow-hidden">
                    <div class=" p-l-6 pt-4 p-r-6">
                        <div style="font-weight:700; font-size:1.25rem" class="mb-2">{{ event.name }}</div>
                        <div class="mb-2">{{event.timeSlot}}-Sunday</div>
                    
                        <p style="color:#4a5568; font-size:1rem">
                        <ol>
                        <!-- s -->
                    </ol>
                        </p>
                    </div>
                
                    <div class="p-l-6 p-r-6 pt-4 pb-4">
                        <span style="color:#4a5568; background:#edf2f7; font-weight:600; font-size: .875rem" class="inline-block rounded-lg px-3 py-1 mr-2">
                         Max. {{event.personLimit}}
                        </span>
                    
                    </div>
                    </div>
                    </div>
                <div class="p-l-6 p-r-6 pb-4">
                    <div class="wrap">
                         <div class="button" v-if="!signedUp(event)" @click="signUpEvent(event)">Sign Up</div><div class ="button" v-else @click="deleteFromEvent(event)">Signed Up</div>
                        <!-- <div class="button" v-if="$cookies.get('user').admin" @click= "sendEmail(event)">Send Notification</div> -->
                        


                    </div>
   
                </div>
                    
                  

            
        

    </div></div>
    <div v-for="(event) in filtered('saturday')" :key="event.id" class="event-signup-item">
               <div  class="flex shadow-sm border justify-content-center text-center align-items-center h-screen m-1 rounded p-3" style="background:white;" >
                   <div class="go-to-details" @click="showModal(event)">
                <div class="rounded overflow-hidden">
                    <div class=" p-l-6 pt-4 p-r-6">
                        <div style="font-weight:700; font-size:1.25rem" class="mb-2">{{ event.name }}</div>
                        <div class="mb-2">{{event.timeSlot}}-Sunday</div>
                    
                        <p style="color:#4a5568; font-size:1rem">
                        <ol>
                        <!-- s -->
                    </ol>
                        </p>
                    </div>
                
                    <div class="p-l-6 p-r-6 pt-4 pb-4">
                        <span style="color:#4a5568; background:#edf2f7; font-weight:600; font-size: .875rem" class="inline-block rounded-lg px-3 py-1 mr-2">
                         Max. {{event.personLimit}}
                        </span>
                    
                    </div>
                    </div>
                    </div>
                <div class="p-l-6 p-r-6 pb-4">
                    <div class="wrap">
                         <div class="button" v-if="!signedUp(event)" @click="signUpEvent(event)">Sign Up</div><div class ="button" v-else @click="deleteFromEvent(event)">Signed Up</div>
                        <!-- <div class="button" v-if="$cookies.get('user').admin" @click= "sendEmail(event)">Send Notification</div> -->
                        


                    </div>
   
                </div>
                    
                  

            
        

    </div></div>
    <div v-for="(event) in filtered('sunday')" :key="event.id" class="event-signup-item">
               <div  class="flex shadow-sm border justify-content-center text-center align-items-center h-screen m-1 rounded p-3" style="background:white;" >
                   <div class="go-to-details" @click="showModal(event)">
                <div class="rounded overflow-hidden">
                    <div class=" p-l-6 pt-4 p-r-6">
                        <div style="font-weight:700; font-size:1.25rem" class="mb-2">{{ event.name }}</div>
                        <div class="mb-2">{{event.timeSlot}}-Sunday</div>
                    
                        <p style="color:#4a5568; font-size:1rem">
                        <ol>
                        <!-- s -->
                    </ol>
                        </p>
                    </div>
                
                    <div class="p-l-6 p-r-6 pt-4 pb-4">
                        <span style="color:#4a5568; background:#edf2f7; font-weight:600; font-size: .875rem" class="inline-block rounded-lg px-3 py-1 mr-2">
                         Max. {{event.personLimit}}
                        </span>
                    
                    </div>
                    </div>
                    </div>
                <div class="p-l-6 p-r-6 pb-4">
                    <div class="wrap">
                         <div class="button" v-if="!signedUp(event)" @click="signUpEvent(event)">Sign Up</div><div class ="button" v-else @click="deleteFromEvent(event)">Signed Up</div>
                        <!-- <div class="button" v-if="$cookies.get('user').admin" @click= "sendEmail(event)">Send Notification</div> -->
                        


                    </div>
   
                </div>
                    
                  

            
        

    </div></div>
</div></div><modal name="event-details" v-if="currentEvent">
    <div style="width:100%;height:100%;padding:15px; display:flex;justify-content:space-between ">
        <div>
    <u><strong>Users Signed Up:</strong></u>
    <p v-for="(user, index) in currentEvent.usersSignedUp" :key="index">
        <u><strong v-if="index===currentEvent.personLimit">Waitlist<br></strong></u>
        {{index+1}}. {{getFullName(user)}} <button v-if="$cookies.get('user').admin" @click="bumpToEnd(index)" style="border:0px">Bump to End</button>
    </p></div>
    <div class="wrap" v-if="$cookies.get('user').admin" style="align-self:flex-end;width:50%;">
        <div class="button" @click= "sendEmail(currentEvent)">Notify Participants</div>
        


    </div>
    </div>
    <!-- <p v-for="(user, index) in currentEvent.usersSignedUp" :key="index">
        {{user.userName}}
    </p> -->
    </modal></div>
</template>

<script>
import EmailDataService from "../services/EmailDataService"
import ScheduleDataService from '../services/ScheduleDataService'
import Vue from 'vue'
import VModal from 'vue-js-modal'
Vue.use(VModal)
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false;
Vue.use(Antd);
export default{
    data(){
        return {
            currentSchedule:null,
            currentEvent:null,
        };
    },
    computed:{
        
    },
    
    methods:{
        bumpToEnd(index){
            this.currentEvent.usersSignedUp.push( this.currentEvent.usersSignedUp.splice(index, 1)[0]);
        },
        showModal(event){
            this.currentEvent=event
            this.$modal.show('event-details')
        },
        filtered(date){
            if(this.currentSchedule){   
                return this.currentSchedule[date].filter(e=>e.signUp==true)
            }
            return []
            
        },
        getFullName(user){
            return user.userName +" "+ user.emailAddress.substring(user.emailAddress.indexOf(".")+1,user.emailAddress.indexOf("@"));
        },
        sendEmail(event){
            for(var i =0;i<event.usersSignedUp.length;i++){
                EmailDataService.sendEmail(event.usersSignedUp[i].emailAddress, event.name, event.timeSlot)
            } 
            this.$message.success("Emails Successfully Sent!")


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
        signUpEvent(event){
            event.usersSignedUp.push(this.$cookies.get('user'))
            ScheduleDataService.update(this.currentSchedule.id,this.currentSchedule)
            this.showModal(event)
        },
        deleteFromEvent(event){
            if(confirm("Are you sure you want to be removed from the list?"))
            {
                event.usersSignedUp.splice(event.usersSignedUp.find(e=>e.userName===this.$cookies.get('user').userName),1)
            ScheduleDataService.update(this.currentSchedule.id, this.currentSchedule)
            }
            
        },
        signedUp(event){
            return event.usersSignedUp.filter(e=>e.userName===this.$cookies.get('user').userName).length>0
        }
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
.go-to-details:hover{
    background:#eee;
    cursor:pointer
}
.schedule-container{
    background:white;
    border:2px solid #eee;
    padding:15px;
    display:flex;
}
.event-signup-item{
    width:33%;
}
.wrap {
    width: 100%;
    height: auto;
    position: relative;
}

.wrap .button {
    -webkit-transition: 0.3s;
    transition: 0.3s;
    border-radius: 5px;
    text-align: center;
    color: #fff;
    line-height: 60px;
    min-height: 60px;
    background: #ffab62;
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
}


.wrap .button:hover {
    background: #2980b9;
}

@media screen and (max-width:768px)
{
    .vm--modal{
        width:100% !important;
        left:0px !important;
    }
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
      .event-signup-item{
          width:100%;
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