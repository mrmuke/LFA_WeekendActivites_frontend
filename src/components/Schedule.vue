<template>

<div class = "schedule-body" v-if="currentSchedule">
    <div class="schedule-info">
    <div style="text-align:center">
            <h1 style="color:white"><span class="orange-underline">{{currentSchedule.date}}</span></h1>
    </div>
    <!-- Loop through phone numbers and display them -->
    <div class="phoneNumbers">
        <div class="phoneNumbers-header" v-on:click="showHideDuty()">On Duty This Weekend<i v-if="!displayOnDuty" style="margin-left:1em; position:relative; top:0.2em;" class="fa fa-caret-up"></i><i v-if="displayOnDuty" style="margin-left:1em; position:relative; top:0.2em;" class="fa fa-caret-down"></i></div>
        <div class="phoneNumbers-content">
            <div class="phoneNumbers-row" v-for="index in 3" :key="index">
            <div class="phoneNumbers-item" v-for="(phone,index2) in splitPhoneNumbers[index-1]" :key="index2">
                <b style="margin-right:1em;">{{phone.dorm}}:</b><span style="margin-right:1em;">{{phone.teacherName}}</span><span>{{phone.phoneNumber}}</span></div>
              
            </div>
           
        </div>
    </div>
    <!-- Event details -->
    <div class="schedule-container">
        <div v-for="(day, i) in currentSchedule.scheduleDays" :key="i" class="schedule-day">
        <h2 style="padding: 20px 40px;text-align: center;background: #3a3737;color: #fff"><span>{{day.date}}</span></h2>
            <ul>
            <li v-for="(event, index) in day.events" :key="index" >
              <div style="display:flex; padding:10px;" v-if="event" v-bind:style="{background:getBackground(index)}" class="mx-2">
                <u>{{ event.timeSlot }}</u>- {{event.name}} <div v-if="event.signUp">*</div></div>
            </li>
            </ul>
        </div>
    </div>
    <!-- Sign up event details -->
    <div style="display:flex; flex-wrap:wrap;">
           <div v-for="(event, i) in getRequiredSignUpEvents()" :key="i" class="event-signup-item">
               <div  class="flex shadow-sm border justify-content-center text-center align-items-center h-screen m-1 rounded p-3" style="background:white;" >
                   <div class="go-to-details" @click="showModal(event.info,event.date)">
                <div class="rounded overflow-hidden">
                    <div class=" p-l-6 pt-4 p-r-6">
                        <div style="font-weight:700; font-size:1.25rem; height:5em; display: flex; justify-content:center; align-items: center; overflow: auto;" class="mb-2">{{ event.info.name }}</div>
                        <div class="mb-2">{{event.info.timeSlot}}-<strong>{{event.date}}</strong></div>
                        <p style="color:#4a5568; font-size:1rem">
                        <ol>
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
                    <!-- If user has strikes don't let them sign up -->
                <div class="p-l-6 p-r-6 pb-4" v-if="strikes < 3">
                    <div class="wrap">
                         <div class="button" v-if="!signedUp(event.info)" @click="signUpEvent(event.info, event.date)">Sign Up</div><div class ="button signedup" v-else @click="deleteFromEvent(event.info, event.date)">Signed Up</div>
                    </div>
                </div>
                <div class="p-l-6 p-r-6 pb-4" v-else>
                  <div style="height:90px;display:flex;align-items:center">Please contact Mr.Freeman to have your strikes removed!</div>
                </div>
    </div></div>
    
</div></div>
<!-- Modal event details -->
<modal name="event-details">
    <div style="width:100%;height:95%;padding:10px; display:flex;flex-direction:column; overflow:auto;" v-if="currentEvent">
        <div style="width:100%; display:flex; flex-direction:column; align-items:center;">
          <!-- If showing "unsign up" history -->
            <div v-if="!history" style="width: 100%; background-color: #f7931e; color: white; font-weight:600; font-size: 1.25em; padding: 0.25em 0em; text-align:center; border-radius: 0.2em;">Users Signed Up</div>
            <div v-if="history" style="width: 100%; background-color: #f7931e; color: white; font-weight:600; font-size: 1.25em; padding: 0.25em 0em; text-align:center; border-radius: 0.2em;">History</div>
            <div style="width: 95%; margin-top: 1em;" v-if="!history">
              <!-- Allow people to move users on the sign up list and shoiw people on actual list -->
                <div v-for="(user, index) in currentEvent.usersSignedUp" 
                @drop='onDrop($event, index,"list")' @dragover.prevent
      @dragenter.prevent
                :draggable="currentUser.admin"
        @dragstart='startDrag($event, index,"list")' :key="user.id"> 
                <strong>{{index+1}}.</strong> {{getFullName(user)}} <button v-if="currentUser.admin" @click="bumpToEnd(index)" style="border:0px">Bump to Waitlist</button><button v-if="currentUser.admin" @click="strike(user.id)" style="border:0px; margin-left: 10px; background-color:red; color:white">Strike!</button>
                <div style="width:100%; display:flex; justify-content:center; padding-top: 0.5em;">
                    <div style="width: 93%; border-bottom: 1.5px solid black"></div>
                </div></div>
            <u v-if="currentEvent.waitlist.length>0"><strong>Waitlist<br></strong></u>
            <!-- Allow people to move users on the waitlist and show people on the waitlist -->
            <div v-for="(user, index) in currentEvent.waitlist"
            
            @drop='onDrop($event, index,"waitlist")' @dragover.prevent
      @dragenter.prevent
                :draggable="currentUser.admin"
        @dragstart='startDrag($event, index,"waitlist")' :key="user.id">
                
                <strong>{{index+1}}.</strong> {{getFullName(user)}} 
                <div style="width:100%; display:flex; justify-content:center; padding-top: 0.5em;">
                    <div style="width: 93%; border-bottom: 1.5px solid black"></div>
                </div></div>
</div>

      <!-- Show user unsign up history -->
      <div style="width: 95%; margin-top: 1em;" v-if="history">
        <div v-for="(user, index) in currentEvent.unsignedUp" :key="index"> 
        <strong>{{index+1}}.</strong> {{getFullName(user)}} - {{user.dateString}}
        <div style="width:100%; display:flex; justify-content:center; padding-top: 0.5em;">
            <div style="width: 93%; border-bottom: 1.5px solid black"></div>
        </div></div>
      </div>
        </div>
        <!-- Notify participants of the event -->
        <div style="justify-content:space-between;display:flex;margin:5px" v-if="!history">
            <textarea v-if="currentUser.admin" style="flex:1;margin-right:10px;padding:7px" placeholder="Optional Message.." v-model="message"></textarea>
            <div class="wrap" style="width:50%" v-if="currentUser.admin">
              <div class="button" @click= "sendEmail(currentEvent)">Notify Participants</div>
            </div>
        </div>
        <!-- Check people who have unsigned up from event -->
        <div class="show-signup-history" v-if="currentUser.admin && !history" @click="changeHistory()">Unsign Up History</div>
        <div style="margin-top:10px;" class="show-signup-history" v-if="currentUser.admin && history" @click="backHistory()">Back</div>
    
    </div>
    
    </modal>
    </div>
</template>

<script>
import EmailDataService from "../services/EmailDataService";
import ScheduleDataService from "../services/ScheduleDataService";
import Vue from "vue";
import VModal from "vue-js-modal";
Vue.use(VModal);
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import SockJS from "sockjs-client";
import Stomp from "webstomp-client"
import UserDataService from "../services/UserDataService";
import { decrypt } from '../utils/encrypt';
Vue.config.productionTip = false;
Vue.use(Antd);
export default {
  data() {
    return {
      currentSchedule: null,
      currentEvent: null,
      currentDate: null,
      currentUser: decrypt(localStorage.getItem("user")),
      message: "",
      displayOnDuty: false,
      signUpCount: 0,
      strikes: 0,
      history: false,
      websocket_connected: false,
      stompClient: null
    };
  },
  computed: {
    splitPhoneNumbers() {
      /* Split phone numbers into three equal columns */
      let phoneNumbers = this.currentSchedule.phoneNumbers.filter(
        (phone) => phone.phoneNumber.length > 0
      );
      let result = [];
      for (let i = 3; i > 0; i--) {
        result.push(phoneNumbers.splice(0, Math.ceil(phoneNumbers.length / i)));
      }
      return result;
    },
  },

  methods: {
    sendSocket(){
      console.log("Sending message to server...");
      if(this.connected){
        this.stompClient.send("/ws/send", JSON.stringify(this.currentSchedule));
      }
    },
    /* Altenrate background color for each event */
    getBackground(index) {
      if (index % 2 == 0) {
        return "rgba(215, 211, 211, 0.3)";
      } else {
        return "rgba(215, 211, 211, 0.1)";
      }
    },
    getDataIndex(event, date){
      var day_index = -1;
      var event_index = -1;

      this.currentSchedule.scheduleDays.find(function(day, index){
        if(day.date == date){
          day_index = index;
          return true;
        }
      });

      this.currentSchedule.scheduleDays[day_index].events.find(function(find_event, index){
        if(find_event.name == event.name){
          event_index = index;
          return true;
        }
      });
      return [day_index, event_index];
    },
    /* Bump people to end of waitlist and move waitlist event first person to list if they are first on it */
    async bumpToEnd(index) {
      var data_index = this.getDataIndex(this.currentEvent, this.currentDate);
      this.currentSchedule = (await ScheduleDataService.bumpUser(this.currentSchedule.id, {
        "action": "all",
        "day": data_index[0],
        "event": data_index[1],
        "user": this.currentEvent.usersSignedUp[index]
      })).data;
      this.sendSocket();
    },
    /* Display selected event details and users signed up */
    showModal(event, date) {
      this.currentEvent = event;
      this.currentDate = date;
      this.$modal.show("event-details");
      this.message = "";
    },
    /* Get only events that require sign up */
    getRequiredSignUpEvents() {
      if (this.currentSchedule) {
        var arr = [];
        for (let i = 0; i < this.currentSchedule.scheduleDays.length; i++) {
          for (
            let j = 0;
            j < this.currentSchedule.scheduleDays[i].events.length;
            j++
          ) {
            if (
              this.currentSchedule.scheduleDays[i].events[j] &&
              this.currentSchedule.scheduleDays[i].events[j].signUp
            ) {
              let object = {
                info: this.currentSchedule.scheduleDays[i].events[j],
                date: this.currentSchedule.scheduleDays[i].date,
              };
              arr.push(object);
            }
          }
        }
        console.log(arr)
        return arr;
      }
      return [];
    },
    /* Get full name of user */
    getFullName(user) {
      return user.userName;
    },
    /* Start dragging users on list to move them */
    startDrag: (evt, index, list) => {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("index", index);
      evt.dataTransfer.setData("list", list);
    },
    /* Swap users on dropping them */
    async onDrop(evt, index, list) {
      if (this.currentUser.admin) {
        let data_index = this.getDataIndex(this.currentEvent, this.currentDate);
        /* Depending on where the user was dropped on */
        let receiveArr =
          list == "waitlist"
            ? this.currentEvent.waitlist
            : this.currentEvent.usersSignedUp;
        /* Which list user was sent from */
        const sendList = evt.dataTransfer.getData("list");
        const sendIndex = evt.dataTransfer.getData("index");
        let sendArr =
          sendList == "waitlist"
            ? this.currentEvent.waitlist
            : this.currentEvent.usersSignedUp;
        //(sendIndex < index || list != sendList)
        /* Only allows user to be dropped later in list */
        this.currentSchedule = (await ScheduleDataService.swapUser(this.currentSchedule.id, {
          "sendArr": sendList == "list" ? "usersSignedUp" : "waitlist",
          "receivedArr": list == "list" ? "usersSignedUp" : "waitlist",
          "day": data_index[0],
          "event": data_index[1],
          "firstUser": sendArr[sendIndex],
          "secondUser": receiveArr[index]
        })).data;

        this.sendSocket();
      }
    },
    /* Send email to users */
    sendEmail(event) {
      var totalUsers = event.usersSignedUp.concat(event.waitlist);
      totalUsers.push(this.currentUser);
      /* Loop through all users */
      for (var i = 0; i < totalUsers.length; i++) {
        this.$message.info("Sending email...");
        EmailDataService.sendEmail(
          { event: event, message: this.message, showPlace:totalUsers[i]!=this.currentUser },
          totalUsers[i].id
        ).then(() => {
          this.$message.success("Emails Successfully Sent!");
        });
      }
      this.message = "";
    },

    // Get current schedule
    async getCurrentSchedule() {
      this.currentSchedule = (await ScheduleDataService.getCurrent()).data;
    },
    // Get schedule
    async getSchedule(id) {
      this.currentSchedule = (await ScheduleDataService.get(id)).data;
    },
    // Sign up event
    async signUpEvent(event, date) {
      this.$message.success("Signed up for " + event.name);
      this.$message.info("Refresh the site to verify your place on the list..");
      var data_index = this.getDataIndex(event, date);

      // Check if user should be on the waitlist then push to waitlist
      var onWaitlist = event.usersSignedUp.length >= event.personLimit;
      if (onWaitlist) {
        this.$message.info("You're on the waitlist");
        event.waitlist.push(this.currentUser);

        this.currentSchedule = (await ScheduleDataService.addUser(this.currentSchedule.id, {
          "action": "waitlist",
          "day": data_index[0],
          "event": data_index[1],
          "user": this.currentUser
        })).data;
      }
      // Make sure users haven't signed up for more than 2 events
      else if (this.signUpCount >= 2) {
        this.$message.info(
          "You have been pushed to the waitlist (2 event limit) "
        );
        event.waitlist.push(this.currentUser);

        this.currentSchedule = (await ScheduleDataService.addUser(this.currentSchedule.id, {
          "action": "waitlist",
          "day": data_index[0],
          "event": data_index[1],
          "user": this.currentUser
        })).data;
      //sign up into the main list
      } else {
        this.signUpCount++;
        event.usersSignedUp.push(this.currentUser);

        this.currentSchedule = (await ScheduleDataService.addUser(this.currentSchedule.id, {
          "action": "usersSignedUp",
          "day": data_index[0],
          "event": data_index[1],
          "user": this.currentUser
        })).data;
      }
      this.showModal(event, date);
      this.sendSocket();
    },
    /* Remove user from event */
    async deleteFromEvent(event, date) {
      var data_index = this.getDataIndex(event, date);

      if (confirm("Are you sure you want to be removed from the list?")) {
        var i = event.usersSignedUp.findIndex(
          (e) => e.id === this.currentUser.id
        );
        var k = event.waitlist.findIndex((e) => e.id === this.currentUser.id);
        /* If on waitlist remove from waitlist otherwise remove from list */
        if (i == -1) {
          event.waitlist.splice(k, 1);
        } else {
          this.signUpCount--;
          event.usersSignedUp.splice(i, 1);
          event.unsignedUp.push({
            userName: this.currentUser.userName,
            dateString: new Date().toLocaleString(),
          });

          if(event.usersSignedUp.length<event.personLimit&&event.waitlist.length>0){
          event.usersSignedUp.push(event.waitlist.splice(0, 1)[0])
        }
        }
        this.currentSchedule = (await ScheduleDataService.removeUser(this.currentSchedule.id, {
            "action": "all",
            "day": data_index[0],
            "event": data_index[1],
            "user": this.currentUser
        })).data;
        /* Update schedule with new list */
        this.$message.error("Removed from " + event.name);
        this.showModal(event, date);
        this.sendSocket();
      }
    },
    //Check if user is signed up for event
    signedUp(event) {
      let signed =
        event.usersSignedUp.some(
          (e) => e != null && e.id === this.currentUser.id
        ) ||
        event.waitlist.some((a) => a != null && a.id === this.currentUser.id);
      return signed;
    },
    /* Hide or show phone numbers that are on duty */
    showHideDuty() {
      this.displayOnDuty = !this.displayOnDuty;
      var amount = "0px";
      if (window.innerWidth < 900) {
        amount = "400px";
      } else {
        amount = "200px";
      }
      if (this.displayOnDuty) {
        document.getElementsByClassName(
          "phoneNumbers-content"
        )[0].style.display = "flex";
        setTimeout(function () {
          document.getElementsByClassName(
            "phoneNumbers-content"
          )[0].style.maxHeight = amount;
        }, 10);
      } else {
        document.getElementsByClassName(
          "phoneNumbers-content"
        )[0].style.maxHeight = "0px";
        setTimeout(function () {
          document.getElementsByClassName(
            "phoneNumbers-content"
          )[0].style.display = "none";
        }, 300);
      }
    },
    /* Strike user */
    strike(id) {
      UserDataService.strike(id);
      this.$message.success("User has been striked!");
    },
    /* Turn on and off sign up history */
    changeHistory() {
      this.history = true;
    },
    backHistory() {
      this.history = false;
    },
    removeNullUsers() {
      /* Get rid of null users */
      for (let day of this.currentSchedule.scheduleDays) {
        for (let event of day.events) {
          var i = event.usersSignedUp.indexOf(null);
          while (i != -1) {
            event.usersSignedUp.splice(i, 1);
            i = event.usersSignedUp.indexOf(null);
          }

          i = event.waitlist.indexOf(null);
          while (i != -1) {
            event.waitlist.splice(i, 1);
            i = event.waitlist.indexOf(null);
          }
        }
      }
    },
    countSignUps(userID) {
      /* Loop through events and count how many users have signed up for */
      let count = 0;
      for (var i = 0; i < this.currentSchedule.scheduleDays.length; i++) {
        let currentDayEvents = this.currentSchedule.scheduleDays[i].events;
        for (var j = 0; j < currentDayEvents.length; j++) {
          if (
            currentDayEvents[j] &&
            currentDayEvents[j].usersSignedUp.some((user) => user.id == userID)
          ) {
            count++;
          }
        }
      }
      return count;
    },
    async getStrikes() {
      /* Get how many strikes current user has */
      this.strikes = (
        await UserDataService.get(this.currentUser.id)
      ).data.strikes;
    },
    websocketFindCurrentEvent(){
      for(let days of this.currentSchedule.scheduleDays){
        for(let events of days.events){
          if(  events.name == this.currentEvent.name  &&  events.timeSlot == this.currentEvent.timeSlot &&  events.personLimit == this.currentEvent.personLimit){
            this.currentEvent = events;
          }
        }
      }
    }
  },
  created: function(){
    console.log("Starting connection to WebSocket server...");
    this.socket = new SockJS("http://localhost:8080/connect");
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.debug = function(){};
    this.stompClient.connect({
        "Content-type":"application/json",
        "token":localStorage.getItem("token")
      },
      frame => {
        this.connected = true;
        this.stompClient.subscribe("/topic/messages", tick => {
          this.currentSchedule = JSON.parse(tick.body).body;
          this.websocketFindCurrentEvent();
        });
      },
      error => {
        console.log(error);
        this.connected = false;
      }
    );
  },
  async mounted() {
    /* Call all initialization functions */
    if (this.$route.params.id) {
      await this.getSchedule(this.$route.params.id);
    } else {
      await this.getCurrentSchedule();
    }
    this.getStrikes();
    this.removeNullUsers();
    this.signUpCount = this.countSignUps(this.currentUser.id);
  },
};
</script>
<style>
.phoneNumbers {
  width: 100%;
  background-color: white;
  margin-bottom: 1em;
  border-radius: 0.5em;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.phoneNumbers-header {
  font-weight: 600;
  font-size: 2rem;
  padding: 0.25em 0em;
  display: flex;
  justify-content: center;
  cursor: pointer;
  background-color: rgb(58, 55, 55);
  color: white;
  width: 98.7%;
  margin-top: 0.2em;
  margin-bottom: 0.2em;
}
.phoneNumbers-content {
  max-height: 0px;
  padding-bottom: 1em;
  width: 100%;
  display: none;
  transition: max-height 0.5s;
}
.phoneNumbers-row {
  width: 33.33%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.phoneNumbers-item {
  margin-top: 1em;
  width: 100%;
  position: relative;
  text-align: right;
  padding-right: 1em;
}
.phoneNumbers-item b {
  position: absolute;
  left: 1em;
}
@media screen and (max-width: 900px) {
  .phoneNumbers-header {
    font-size: 1.5em;
  }
  .phoneNumbers-content {
    flex-direction: column;
  }
  .phoneNumbers-row {
    width: 100%;
  }
}
.orange-underline {
  background-image: linear-gradient(to right, #f37121 0%, #f37121 100%);
  background-repeat: repeat-x;
  background-position: 0 85%;
  background-size: 100% 8px;
}
.go-to-details {
  margin-bottom: 7px;
}

.schedule-body {
  overflow-y: auto;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(/img/background-wave.jpg);
  padding-top: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  justify-content: center;
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-position: 50% 50%;
}
.schedule-info {
  width: 1000px;
}
.go-to-details:hover {
  background: #eee;
  border-radius: 10px;
  cursor: pointer;
}
.schedule-container {
  border-radius: 5px;
  background: white;
  border: 2px solid #eee;

  display: flex;
}
.event-signup-item {
  width: 33%;
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
  padding: 15px;
  min-height: 60px;
  background: #f7931e;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
}

.signedup {
  background: #f37121 !important;
}

.signedup:hover {
  background: #f7931e !important;
}

.wrap .button:hover {
  background: #f37121;
}

@media screen and (max-width: 768px) {
  .vm--modal {
    width: 100% !important;
    left: 0px !important;
  }
}
@media screen and (max-width: 1000px) {
  .schedule-info {
    width: 100%;
  }
}
@media screen and (max-width: 500px) {
  .schedule-container {
    flex-direction: column;
  }
  .schedule-day {
    width: 100% !important;
  }
  .event-signup-item {
    width: 100%;
  }
}
li {
  list-style-type: none;
  padding: 0px;
  margin: 0px;
}
ul {
  padding: 0px;
}
.schedule-day {
  width: 34%;
  border: 1px solid #eee;
  padding: 5px;
}
.show-signup-history {
  background-color: #f7931e;
  padding: 15px;
  margin: 5px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 5px;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.show-signup-history:hover {
  background-color: #f37121;
}
</style>