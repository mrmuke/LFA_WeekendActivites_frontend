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
           <div v-for="(event, i) in filtered()" :key="i" class="event-signup-item">
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
        @dragstart='startDrag($event, index,"list")' :key="index"> 
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
        @dragstart='startDrag($event, index,"waitlist")' :key="index">
                
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

        <div class="show-signup-history" v-if="currentUser.admin && !history" @click="changeHistory()">Unsign Up History</div>
        <div style="margin-top:10px;" class="show-signup-history" v-if="currentUser.admin && history" @click="backHistory()">Back</div>
    
    </div>
    
    </modal></div>
</template>

<script>
import EmailDataService from "../services/EmailDataService";
import ScheduleDataService from "../services/ScheduleDataService";
import Vue from "vue";
import VModal from "vue-js-modal";
Vue.use(VModal);
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import UserDataService from "../services/UserDataService";
Vue.config.productionTip = false;
Vue.use(Antd);
export default {
  data() {
    return {
      currentSchedule: null,
      currentEvent: null,
      currentDate: null,
      currentUser: JSON.parse(localStorage.getItem("user")),
      message: "",
      displayOnDuty: false,
      count: 0,
      strikes: 0,
      history: false    };
  },
  computed: {
    splitPhoneNumbers() {
      
      let phoneNumbers = this.currentSchedule.phoneNumbers.filter(phone=>phone.phoneNumber.length>0)
    let result = [];
    for (let i = 3; i > 0; i--) {
        result.push(phoneNumbers.splice(0, Math.ceil(phoneNumbers.length / i)));
    }
    return result;
  },
  },

  methods: {
     

    getBackground(index) {
      if (index % 2 == 0) {
        return "rgba(215, 211, 211, 0.3)";
      } else {
        return "rgba(215, 211, 211, 0.1)";
      }
    },
    bumpToEnd(index) {
      ScheduleDataService.get(this.currentSchedule.id).then((response) => {
        let schedule = response.data;

        let updatedSchedule = schedule.scheduleDays.find(
          (e) => e.date == this.currentDate
        );
        let updatedEvent = updatedSchedule.events.find(
          (e) => e.name === this.currentEvent.name
        );
        if (updatedEvent.waitlist.length > 0) {
          updatedEvent.usersSignedUp.push(
            updatedEvent.waitlist.splice(0, 1)[0]
          );
        }
        updatedEvent.waitlist.push(
          updatedEvent.usersSignedUp.splice(index, 1)[0]
        );
        ScheduleDataService.update(schedule.id, schedule);
      });
      if (this.currentEvent.waitlist.length > 0) {
        this.currentEvent.usersSignedUp.push(
          this.currentEvent.waitlist.splice(0, 1)[0]
        );
      }
      this.currentEvent.waitlist.push(
        this.currentEvent.usersSignedUp.splice(index, 1)[0]
      );
    },
    showModal(event, date) {
      this.currentEvent = event;
      this.currentDate = date;
      this.$modal.show("event-details");
      this.message = "";
    },
    filtered() {
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
        return arr;
      }
      return [];
    },
    getFullName(user) {
      
      return user.userName;
    },
    startDrag: (evt, index, list) => {
        evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      evt.dataTransfer.setData("index", index);
      evt.dataTransfer.setData("list", list);
      
      
    },
    onDrop(evt, index, list) {
      if (this.currentUser.admin) {
        let receiveArr =
          list == "waitlist"
            ? this.currentEvent.waitlist
            : this.currentEvent.usersSignedUp;
        const sendList = evt.dataTransfer.getData("list");
        const sendIndex = evt.dataTransfer.getData("index");
        if (sendIndex < index || list != sendList) {
          let sendArr =
            sendList == "waitlist"
              ? this.currentEvent.waitlist
              : this.currentEvent.usersSignedUp;
          let temp = receiveArr[index];

          receiveArr.splice(index, 1);
          receiveArr.splice(index, 0, sendArr[sendIndex]);

          sendArr.splice(sendIndex, 1);
          sendArr.splice(sendIndex, 0, temp);
          ScheduleDataService.get(this.currentSchedule.id).then((response) => {
            let schedule = response.data;

            let updatedSchedule = schedule.scheduleDays.find(
              (e) => e.date == this.currentDate
            );
            let updatedEvent = updatedSchedule.events.find(
              (e) => e.name === this.currentEvent.name
            );

            if (list == "waitlist") {
              updatedEvent.waitlist = receiveArr;
            } else {
              updatedEvent.usersSignedUp = receiveArr;
            }

            if (sendList == "waitlist") {
              updatedEvent.waitlist = sendArr;
            } else {
              updatedEvent.usersSignedUp = sendArr;
            }

            ScheduleDataService.update(schedule.id, schedule);
          });
        }
      }
    },
    sendEmail(event) {
      var total = event.usersSignedUp.concat(event.waitlist);
      for (var i = 0; i < total.length; i++) {
        this.$message.info("Sending email...");
        EmailDataService.sendEmail(
          { event: event, message: this.message },
          total[i].id
        ).then(() => {
          this.$message.success("Emails Successfully Sent!");
        });
      }
      this.message = "";
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

    async getCurrentSchedule() {
      this.currentSchedule = (await ScheduleDataService.getCurrent()).data
      
    },
    async getSchedule(id) {
      this.currentSchedule = (await ScheduleDataService.get(id)).data
    },
    signUpEvent(event, date) {
      this.$message.success("Signed up for " + event.name);
      this.$message.info("Refresh the site to verify your place on the list");
      //doesnt work when two people on at same time
      var waitlist = event.usersSignedUp.length >= event.personLimit;
      if (waitlist) {
        this.$message.info("You're on the waitlist");

        event.waitlist.push(this.currentUser);
      } else if (this.count >= 2) {
        this.$message.info(
          "You have been pushed to the waitlist (3 event limit) "
        );
        event.waitlist.push(this.currentUser);
      } else {
        this.count++;
        event.usersSignedUp.push(this.currentUser);
      }
      ScheduleDataService.get(this.currentSchedule.id).then((response) => {
        let schedule = response.data;
        let updatedSchedule = schedule.scheduleDays.find(
          (e) => e.date === date
        );
        let updatedEvent = updatedSchedule.events.find(
          (e) => e.name === event.name
        );
        waitlist = updatedEvent.usersSignedUp.length >= event.personLimit;
        if (waitlist) {
          updatedEvent.waitlist.push(this.currentUser);
        } else {
          updatedEvent.usersSignedUp.push(this.currentUser);
        }
        ScheduleDataService.update(schedule.id, schedule);
      });
      this.showModal(event, date);
    },
    deleteFromEvent(event, date) {
      console.log("event");
      console.log(event);
      if (confirm("Are you sure you want to be removed from the list?")) {
        var i = event.usersSignedUp.findIndex(
          (e) => e.id === this.currentUser.id
        );
        var k = event.waitlist.findIndex((e) => e.id === this.currentUser.id);
        if (i == -1) {
          event.waitlist.splice(k, 1);
        } else {
          this.count--;
          event.usersSignedUp.splice(i, 1);
            
          event.unsignedUp.push({
            userName:this.currentUser.userName,
            dateString: (new Date()).toLocaleString()
          })

          
        }
        ScheduleDataService.get(this.currentSchedule.id).then((response) => {
          let schedule = response.data;
          let updatedSchedule = schedule.scheduleDays.find(
            (e) => e.date === date
          );
          let updatedEvent = updatedSchedule.events.find(
            (e) => e.name === event.name
          );
          if (i == -1) {
            updatedEvent.waitlist.splice(k, 1);
          } else {
            updatedEvent.usersSignedUp.splice(i, 1);
            updatedEvent.unsignedUp.push({
              userName:this.currentUser.userName,
              dateString: (new Date()).toLocaleString()
            })
          }
          ScheduleDataService.update(schedule.id, schedule);
        });
        this.$message.error("Removed from " + event.name);
        this.showModal(event, date);
      }
    },
    signedUp(event) {
      let signed =
        event.usersSignedUp.filter((e) => e.id === this.currentUser.id).length >
          0 ||
        event.waitlist.filter((e) => e.id === this.currentUser.id).length > 0;
      return signed;
    },
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
    strike(id) {
      UserDataService.strike(id);
      this.$message.success("User has been striked!");
    },
    changeHistory() {
      this.history = true;
    },
    backHistory(){
      this.history = false;
    },
    removeNullUsers(){
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
    countSignUps(){
      this.currentSchedule.scheduleDays.forEach((day) => {
          day.events.forEach((e) => {
            if (
              e && e.usersSignedUp.some(user=>user.id==this.currentUser.id)
            ) {
              this.count++;
            }
          });
        });
    },
    async getStrikes(){
      this.strikes = (
        await UserDataService.get(this.currentUser.id)
      ).data.strikes;
    }
  },
  async mounted() {
    /* TO FIX: Cannot sign up on other scheduled IDs */
      if (this.$route.params.id) {
        await this.getSchedule(this.$route.params.id);
      } else {
        await this.getCurrentSchedule();
      }
      this.getStrikes()
      this.removeNullUsers()
      this.countSignUps()
    
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