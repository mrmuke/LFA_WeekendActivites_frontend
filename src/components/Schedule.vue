<template>

<div class = "schedule-body" v-if="currentSchedule">
    <div class="schedule-info">
    <div style="text-align:center">
            <h1 style="color:white"><span class="orange-underline">{{currentSchedule.date}}</span></h1>
    </div>
    <div class="phoneNumbers">
        <div class="phoneNumbers-header" v-on:click="showHideDuty()">On Duty This Weekend<i v-if="!displayOnDuty" style="margin-left:1em; position:relative; top:0.2em;" class="fa fa-caret-up"></i><i v-if="displayOnDuty" style="margin-left:1em; position:relative; top:0.2em;" class="fa fa-caret-down"></i></div>
        <div class="phoneNumbers-content">
            <div class="phoneNumebrs-row">
                <div class="phoneNumbers-item">
                    <b style="margin-right:1em;">{{currentSchedule.phoneNumbers[0].dorm}}:</b><span style="margin-right:1em;">{{currentSchedule.phoneNumbers[0].teacherName}}</span><span>{{currentSchedule.phoneNumbers[0].phoneNumber}}</span>
                </div>
                <div class="phoneNumbers-item">
                    <b style="margin-right:1em;">{{currentSchedule.phoneNumbers[1].dorm}}:</b><span style="margin-right:1em;">{{currentSchedule.phoneNumbers[1].teacherName}}</span><span>{{currentSchedule.phoneNumbers[1].phoneNumber}}</span>
                </div>
                <div class="phoneNumbers-item">
                    <b style="margin-right:1em;">{{currentSchedule.phoneNumbers[2].dorm}}:</b><span style="margin-right:1em;">{{currentSchedule.phoneNumbers[2].teacherName}}</span><span>{{currentSchedule.phoneNumbers[2].phoneNumber}}</span>
                </div>
            </div>
            <div class="phoneNumebrs-row">
                <div class="phoneNumbers-item">
                    <b style="margin-right:1em;">{{currentSchedule.phoneNumbers[3].dorm}}:</b><span style="margin-right:1em;">{{currentSchedule.phoneNumbers[3].teacherName}}</span><span>{{currentSchedule.phoneNumbers[3].phoneNumber}}</span>
                </div>
                <div class="phoneNumbers-item">
                    <b style="margin-right:1em;">{{currentSchedule.phoneNumbers[4].dorm}}:</b><span style="margin-right:1em;">{{currentSchedule.phoneNumbers[4].teacherName}}</span><span>{{currentSchedule.phoneNumbers[4].phoneNumber}}</span>
                </div>
                <div class="phoneNumbers-item">
                    <b style="margin-right:1em;">{{currentSchedule.phoneNumbers[5].dorm}}:</b><span style="margin-right:1em;">{{currentSchedule.phoneNumbers[5].teacherName}}</span><span>{{currentSchedule.phoneNumbers[5].phoneNumber}}</span>
                </div>
            </div>
            <div class="phoneNumebrs-row">
                <div class="phoneNumbers-item">
                    <b style="margin-right:1em;">{{currentSchedule.phoneNumbers[6].dorm}}:</b><span style="margin-right:1em;">{{currentSchedule.phoneNumbers[6].teacherName}}</span><span>{{currentSchedule.phoneNumbers[6].phoneNumber}}</span>
                </div>
                <div class="phoneNumbers-item">
                    <b style="margin-right:1em;">{{currentSchedule.phoneNumbers[7].dorm}}:</b><span style="margin-right:1em;">{{currentSchedule.phoneNumbers[7].teacherName}}</span><span>{{currentSchedule.phoneNumbers[7].phoneNumber}}</span>
                </div>
                <div class="phoneNumbers-item">
                    <b style="margin-right:1em;">{{currentSchedule.phoneNumbers[8].dorm}}:</b><span style="margin-right:1em;">{{currentSchedule.phoneNumbers[8].teacherName}}</span><span>{{currentSchedule.phoneNumbers[8].phoneNumber}}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="schedule-container">
        <div v-for="(day, i) in currentSchedule.scheduleDays" :key="i" class="schedule-day">
        <h2 style="padding: 20px 40px;text-align: center;background: #3a3737;color: #fff"><span>{{day.date}}</span></h2>
            <ul>
            <li v-for="(event, index) in day.events" :key="index" style="display:flex; padding:10px;" v-bind:style="{background:getBackground(index)}" class="mx-2">
                <u>{{ event.timeSlot }}</u>- {{event.name}} <div v-if="event.signUp">*</div>
            </li>
            </ul>
        </div>
    </div>

    <div style="display:flex; flex-wrap:wrap;">
           <div v-for="(event, i) in filtered()" :key="i" class="event-signup-item">
               <div  class="flex shadow-sm border justify-content-center text-center align-items-center h-screen m-1 rounded p-3" style="background:white;" >
                   <div class="go-to-details" @click="showModal(event.info,'friday')">
                <div class="rounded overflow-hidden">
                    <div class=" p-l-6 pt-4 p-r-6">
                        <div style="font-weight:700; font-size:1.25rem; height:5em; display: flex; justify-content:center; align-items: center; overflow: auto;" class="mb-2">{{ event.info.name }}</div>
                        <div class="mb-2">{{event.info.timeSlot}}-<strong>{{event.date}}</strong></div>
                        <p style="color:#4a5568; font-size:1rem">
                        <ol>
                        <!-- s -->
                    </ol>
                        </p>
                    </div>
                    <div class="p-l-6 p-r-6 pt-4 pb-4">
                        <span style="color:#4a5568; background:#edf2f7; font-weight:600; font-size: .875rem" class="inline-block rounded-lg px-3 py-1 mr-2">
                         Max. {{event.info.personLimit}}
                        </span>
                    </div>
                    </div>
                    </div>
                <div class="p-l-6 p-r-6 pb-4">
                    <div class="wrap">
                         <div class="button" v-if="!signedUp(event.info)" @click="signUpEvent(event.info, event.date)">Sign Up</div><div class ="button signedup" v-else @click="deleteFromEvent(event.info, event.date)">Signed Up</div>
                        <!-- <div class="button" v-if="$cookies.get('user').admin" @click= "sendEmail(event)">Send Notification</div> -->
                    </div>
                </div>
    </div></div>
    
</div></div><modal name="event-details">
    <div style="width:100%;height:95%;padding:10px; display:flex;flex-direction:column; overflow:auto;" v-if="currentEvent">
        <div style="width:100%; display:flex; flex-direction:column; align-items:center;">
            <div style="width: 100%; background-color: #f7931e; color: white; font-weight:600; font-size: 1.25em; padding: 0.25em 0em; text-align:center; border-radius: 0.2em;">Users Signed Up</div>
            <div style="width: 95%; margin-top: 1em;" >
                <div v-for="(user, index) in currentEvent.usersSignedUp" :key="index"> 
                <strong>{{index+1}}.</strong> {{getFullName(user)}} <button v-if="currentUser.admin" @click="bumpToEnd(index)" style="border:0px">Bump to Waitlist</button>
                <div style="width:100%; display:flex; justify-content:center; padding-top: 0.5em;">
                    <div style="width: 93%; border-bottom: 1.5px solid black"></div>
                </div></div>
            <u v-if="currentEvent.waitlist.length>0"><strong>Waitlist<br></strong></u>
            <div v-for="(user, index) in currentEvent.waitlist" :key="index">
                
                <strong>{{index+1}}.</strong> {{getFullName(user)}} 
                <div style="width:100%; display:flex; justify-content:center; padding-top: 0.5em;">
                    <div style="width: 93%; border-bottom: 1.5px solid black"></div>
                </div></div>
</div>
        </div>
        <div style="justify-content:space-between;display:flex;margin:5px">
            <textarea v-if="currentUser.admin" style="flex:1;margin-right:10px;padding:7px" placeholder="Optional Message.." v-model="message"></textarea>
        <div class="wrap" style="width:50%" v-if="currentUser.admin">
        <div class="button" @click= "sendEmail(currentEvent)">Notify Participants</div>
        
    </div></div>
    
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
            currentDate:null,
            currentUser:JSON.parse(localStorage.getItem("user")),
            message:"",
            displayOnDuty:false
        };
    },
    computed:{
        
    },
    
    methods:{
        getBackground(index){
            if(index%2==0)
            {
                return "rgba(215, 211, 211, 0.3)"
            }
            else{
                return "rgba(215, 211, 211, 0.1)"
            }
        },
        bumpToEnd(index){

                ScheduleDataService.get(this.currentSchedule.id)
                    .then(response=>{
                        let schedule= response.data
                        let updatedSchedule = schedule.scheduleDays.find(e=>e.date===this.currentDate)
                        let updatedEvent = updatedSchedule.events.find(e=>e.name===this.currentEvent.name)
                        if(updatedEvent.waitlist.length>0){
                            updatedEvent.usersSignedUp.push(updatedEvent.waitlist.splice(0,1)[0])
                        }
                        updatedEvent.waitlist.unshift(updatedEvent.usersSignedUp.splice(index, 1)[0])
                        ScheduleDataService.update(schedule.id, schedule)
                    })    
                    if(this.currentEvent.waitlist.length>0){
  
            this.currentEvent.usersSignedUp.push(this.currentEvent.waitlist.splice(0,1)[0])
                    }
            this.currentEvent.waitlist.unshift( this.currentEvent.usersSignedUp.splice(index, 1)[0]);

           

        },
        showModal(event,date){
            this.currentEvent=event
            this.currentDate=date
            this.$modal.show('event-details')
            this.message=""
        },
        filtered(){
            if(this.currentSchedule){   
                var arr = [];
                for(let i = 0; i < this.currentSchedule.scheduleDays.length; i++){
                    for(let j = 0; j < this.currentSchedule.scheduleDays[i].events.length; j++){
                        if(this.currentSchedule.scheduleDays[i].events[j].signUp){
                            let object = {
                                info:this.currentSchedule.scheduleDays[i].events[j],
                                date:this.currentSchedule.scheduleDays[i].date
                            }
                            arr.push(object);
                        }
                    }
                }
                return arr;
            }
            return []
        },
        getFullName(user){
            return user.userName
        },
        sendEmail(event){
            var total = event.usersSignedUp.concat(event.waitlist)
            for(var i =0;i<total.length;i++){
                this.$message.info("Sending email...")
                EmailDataService.sendEmail({"event":event,"message":this.message},total[i].id)
                    .then(result=>{
                        console.log(result)
                        this.$message.success("Emails Successfully Sent!")
                    })
            } 
            this.message=""
        },

        /* gettext(pdfUrl){
        var pdf = PDFJS.getDocument(pdfUrl);
        return pdf.then(function(pdf) { // get all pages text
            var maxPages = pdf.pdfInfo.numPages;
            var countPromises = []; // collecting all page promises
            for (var j = 1; j <= maxPages; j++) {
            var page = pdf.getPage(j);

            countPromises.push(page.then(function(page) { // add page promise
                var textContent = page.getTextContent();
                return textContent.then(function(text){ // return content promise
                return text.items.map(function (s) { return s.str; }).join(''); // value page text 
                });
            }));
            }
            // Wait for all pages and join text
            return Promise.all(countPromises).then(function (texts) {
            return texts.join('');
            });
        });
        }, */

        getCurrentSchedule(){
            ScheduleDataService.getCurrent()
                .then(result=>{
                    this.currentSchedule=result.data
                    console.log(result.data.scheduleDays);
                })
        },
        getSchedule(id){
            ScheduleDataService.get(id)
                .then(response => {
                  this.currentSchedule = response.data;
                })
                
        },
        signUpEvent(event, date){
            this.$message.success("Signed up for " + event.name)
            var waitlist=event.usersSignedUp.length>=event.personLimit
            if(waitlist){
                event.waitlist.push(this.currentUser)
            }
            else{
                event.usersSignedUp.push(this.currentUser)
            }
            ScheduleDataService.get(this.currentSchedule.id)
                    .then(response=>{
                        let schedule= response.data
                        let updatedSchedule = schedule.scheduleDays.find(e=>e.date===date)
                        let updatedEvent = updatedSchedule.events.find(e=>e.name===event.name)
                        if(waitlist){
                            updatedEvent.waitlist.push(this.currentUser)
                        }
                        else{
                            updatedEvent.usersSignedUp.push(this.currentUser)
                        }   
                        ScheduleDataService.update(schedule.id, schedule)
                    })
            this.showModal(event,date)
        },
        deleteFromEvent(event,date){
            if(confirm("Are you sure you want to be removed from the list?"))
            {
                var i =event.usersSignedUp.findIndex(e=>e.id===this.currentUser.id)
                var k=event.waitlist.findIndex(e=>e.id===this.currentUser.id)
                if(i==-1){
                    event.waitlist.splice(k,1)
                }
                else{
                    event.usersSignedUp.splice(i,1)
                }
                ScheduleDataService.get(this.currentSchedule.id)
                    .then(response=>{
                        let schedule= response.data
                        let updatedSchedule = schedule.scheduleDays.find(e=>e.date===date)
                        let updatedEvent = updatedSchedule.events.find(e=>e.name===event.name)
                        if(i==-1){
                            updatedEvent.waitlist.splice(k,1)
                        }
                        else{
                        updatedEvent.usersSignedUp.splice(i,1)

                        }
                        ScheduleDataService.update(schedule.id, schedule)
                    })
                this.$message.error("Removed from " + event.name)
                this.showModal(event,date)
            }
            
        },
        signedUp(event){
            return event.usersSignedUp.filter(e=>e.id===this.currentUser.id).length>0 || event.waitlist.filter(e=>e.id===this.currentUser.id).length>0
        },
        showHideDuty(){
            this.displayOnDuty = !this.displayOnDuty;
            var amount = "0px";
            if(window.innerWidth < 900){
                amount = "400px";
            } else {
                amount = "200px";
            }
            if(this.displayOnDuty){
                document.getElementsByClassName('phoneNumbers-content')[0].style.display="flex";
                setTimeout(function(){
                    document.getElementsByClassName('phoneNumbers-content')[0].style.maxHeight=amount;
                }, 10);
            } else {
                document.getElementsByClassName('phoneNumbers-content')[0].style.maxHeight="0px";
                setTimeout(function(){
                    document.getElementsByClassName('phoneNumbers-content')[0].style.display="none";
                },300);
            }
        }
    },
    mounted(){
        if(this.currentUser==null)
        {
            this.$message.error("Sign in to access this page")
            window.location.href="/"
        }
        else{
            if(this.$route.params.id){
            this.getSchedule(this.$route.params.id)
            }
            else{
                this.getCurrentSchedule()
            }
        }
    }

}
</script>
<style>
.phoneNumbers{
    width:100%;
    background-color:white;
    margin-bottom: 1em;
    border-radius: 0.5em;
    overflow:hidden;
    display:flex;
    flex-direction: column;
    align-items: center;
}
.phoneNumbers-header{
    font-weight: 600;
    font-size:2rem;
    padding: 0.25em 0em;
    display:flex;
    justify-content: center;
    cursor:pointer;
    background-color:rgb(58, 55, 55);
    color:white;
    width: 98.7%;
    margin-top:0.2em;
    margin-bottom:0.2em;
}
.phoneNumbers-content{
    max-height:0px;
    padding-bottom: 1em;
    width:100%;
    display:none;
    transition: max-height 0.5s;
}
.phoneNumebrs-row{
    width:33.33%;
    display:flex;
    justify-content:center;
    align-items: center;
    flex-direction:column;
}
.phoneNumbers-item{
    margin-top: 1em;
    width:100%;
    position:relative;
    text-align: right;
    padding-right:1em;
}
.phoneNumbers-item b{
    position:absolute;
    left:1em;
}
@media screen and (max-width:900px){
    .phoneNumbers-header{
        font-size:1.5em;
    }
    .phoneNumbers-content{
        flex-direction:column;
    }
    .phoneNumebrs-row{
        width:100%;
    }
}
.orange-underline {
  background-image: linear-gradient(to right, #f37121 0%, #f37121 100%);
    background-repeat: repeat-x;
    background-position: 0 85%;
    background-size: 100% 8px;
}
.go-to-details{
    margin-bottom:7px;
}

.schedule-body {
    overflow-y: auto;
    background-image: 
    linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url(/img/background-wave.jpg);
    padding-top:20px;
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
    border-radius:10px;
    cursor:pointer
}
.schedule-container{
    border-radius:5px;
    background:white;
    border:2px solid #eee;

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
    padding:15px;
    min-height: 60px;
    background: #f7931e;
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
}

.signedup{
    background: #f37121 !important;
}

.signedup:hover{
    
    background: #f7931e !important;
}

.wrap .button:hover {
    background: #f37121;
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
      width:34%;
      border:1px solid #eee;
      padding:5px;

  }


</style>