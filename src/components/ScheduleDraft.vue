<template>

<div class = "schedule-body">
    <div class = "header">
        <div class = "container">
            <h1 v-if="currentSchedule"><u>{{this.currentSchedule.date}}</u></h1>
        </div>
    </div>
    <div class = "container">

    <div v-if="currentSchedule">
        <h2>Friday: </h2>
        <ul>
          <li v-for="(event, index) in currentSchedule.friday" :key="index">
              {{ event.timeSlot }} {{event.name}} <div v-if="!event.signUp"></div><button class="default" v-else @click = "signUpUser(event)">{{signUpText(event)}}</button>
          </li>
        </ul>
    </div>
    <div v-if="currentSchedule">
       <h2>Saturday: </h2>
       <ul>
            <li v-for="(event, index) in currentSchedule.saturday" :key="index">
               {{ event.timeSlot }} {{event.name}} <div v-if="!event.signUp"></div><button class="default" v-else @click = "signUpUser(event)">{{signUpText(event)}}</button>
            </li>
       </ul>
    </div>
    <div v-if="currentSchedule">
       <h2>Sunday: </h2>
        <ul>
             <li v-for="(event, index) in currentSchedule.sunday" :key="index">
                 {{ event.timeSlot }} {{event.name}} <div v-if="!event.signUp"></div><button class="default" v-else @click = "signUpUser(event)">{{signUpText(event)}}</button>
             </li>
        </ul>
    </div>
    <div v-if="currentSchedule">
        <h1> Events That Require Sign Up: </h1>
        <ul>
           <div v-for="(event, index) in currentSchedule.friday" :key="index">
               <div class = "eventPeople" v-if="event.signUp">
               <h3><u> {{ event.name }} </u></h3>
                <h4> Max Number of People: {{event.personLimit}}</h4>
                    <ol>
                        <li v-for="(user, index) in event.usersSignedUp" :key = "index">
                            {{user.userName}} {{getLastName(user)}}
                        </li>
                    </ol>
                    <button class="default" v-if="$cookies.get('user').admin" @click= "sendEmail(event)">Send Notification</button>
               </div>
           </div>
        </ul>
        <ul>
           <div v-for="(event, index) in currentSchedule.saturday" :key="index">
              <div class = "eventPeople" v-if="event.signUp">
                  <h3><u> {{ event.name }}  </u></h3>
                  <h4> Max Number of People: {{event.personLimit}}</h4>
                      <ol>
                          <li v-for="(user, index) in event.usersSignedUp" :key = "index">
                                {{user.userName}} {{getLastName(user)}}
                          </li>
                      </ol>
                      <button class="default" v-if="$cookies.get('user').admin" @click= "sendEmail(event)">Send Notification</button>
              </div>
           </div>
        </ul>
        <ul>
           <div v-for="(event, index) in currentSchedule.sunday" :key="index">
               <div class = "eventPeople" v-if="event.signUp">
                   <h3><u> {{ event.name }} </u></h3>
                   <h4> Max Number of People: {{event.personLimit}}</h4>
                       <ol>
                            <li v-for="(user, index) in event.usersSignedUp" :key = "index">
                                {{user.userName}} {{getLastName(user)}}
                            </li>
                       </ol>
                       <button class="default" v-if="$cookies.get('user').admin" @click= "sendEmail(event)">Send Notification</button>
               </div>
           </div>
        </ul>

    </div>
    </div>
</div>
</template>

<script>
import EmailDataService from "../services/EmailDataService"
import ScheduleDataService from '../services/ScheduleDataService'
export default{
    data(){
        return {
            currentSchedule:null
        };
    },
    computed:{

    },
    methods:{
        getLastName(user){
            return user.emailAddress.substring(user.emailAddress.indexOf(".")+1,user.emailAddress.indexOf("@"));
        },
        place(event){
            return event.usersSignedUp.findIndex(e=>e.userName===this.$cookies.get('user').userName)+1

        },
        /* full(event){
            return event.personLimit-event.usersSignedUp.length==0
        }, */
        sendEmail(event){
            for(var i =0;i<event.usersSignedUp.length;i++){
                EmailDataService.sendEmail(event.usersSignedUp[i].emailAddress, event.name, event.timeSlot)
            }
            alert("Emails Successfully Sent!")


        },
        signUpText(event){
            if(event.usersSignedUp.some(e=>e.userName===this.$cookies.get('user').userName))
            {
                return "Signed Up (Rank " + this.place(event) + ")"
            }
            if(event.waitlist.some(e=>e.userName===this.$cookies.get('user')))
            {
                return "On Waitlist"
            }
            else{
                return "Sign up (" + this.spotsLeft(event) + ")"
            }
        },
        spotsLeft(event){
            return "" + (event.personLimit-event.usersSignedUp.length) + " spots left";
        },
        removeFromList(event)
        {
            if (window.confirm('Are you sure you want to be removed from the sign up list?'))
            {
                event.usersSignedUp.splice(event.usersSignedUp.find(e=>e.userName===this.$cookies.get('user').userName),1)
                event.waitlist.splice(event.waitlist.find(e=>e.userName===this.$cookies.get('user').userName),1)
                ScheduleDataService.update(this.currentSchedule.id, this.currentSchedule)
            }
            else
            {
                return;
            }


        },
        notSignedUp(event){
            var notSignedUp=true;
            if(event.usersSignedUp.some(e=>e.userName===this.$cookies.get('user').userName))
            {
                notSignedUp=false
            }
            return notSignedUp
        },
        
        signUpUser(event){
            if(event.personLimit-event.usersSignedUp.length>0)
            {
                event.usersSignedUp.push(this.$cookies.get('user'))
            }
            else{
                event.waitlist.push(this.$cookies.get('user'))
            }
            
            ScheduleDataService.update(this.currentSchedule.id, this.currentSchedule)
        },
        removeUser(event){

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
