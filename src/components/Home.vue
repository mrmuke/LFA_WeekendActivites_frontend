<template>
    <div class = "containerHome">
      <!-- Home page containing all navigation buttons -->
        <small style="position:absolute;bottom:10px;right:10px;color:white;">@owencoxe2</small>
        <div>

            <div class="title">
                   <p class="text">Lake Forest Academy Weekend Activities</p>
                   <div v-if="loading" class="computer-signin">Loading...</div>
                   <g-signin-button
                      :params="googleSignInParams"
                      @success="onSignIn"
                      v-else-if="signedIn"
                      class="computer-signin">
                      <i class="fa fa-google"></i>
                       Signed in with LFA Email
                      </g-signin-button>
                   <g-signin-button
                       :params="googleSignInParams"
                       @success="onSignIn"
                       v-else
                       class="computer-signin">
                       <i class="fa fa-google"></i>
                       Sign in with LFA Email
                     </g-signin-button>

                </div>
                <p class = "desc">Convenient and improved weekend activities.</p>
                <div class = "column" v-if="signedIn">
                    <a href="/add" class="bigbutton">Request Activities</a>
                    <a href="/events" class="bigbutton">Vote for Activities</a>
                    <a :href="'/schedule/'" class="bigbutton">Weekend Schedule</a>

                </div>
                <a href="/schedules" class="bigbutton" v-if="currentUser&&currentUser.admin">View All Schedules</a>


        </div>

        <modal name="tutorial-modal">
           <b-carousel
      id="carousel-1"
      controls
      indicators
      v-model="slide"
      background="#343a40"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      
    >
      <!-- Text slides with image -->
      <b-carousel-slide
      style="font-weight:bold"
        img-src="/img/tutorial-request.png"
      >
      <h2>Request Events</h2>
        <p>Request the events that you want to go to</p>
    </b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="/img/tutorial-upvote.png">
        <h2>Upvote</h2>
        <p>Upvote events that interest you.</p>
      </b-carousel-slide>

      <!-- Slides with image only -->
      <b-carousel-slide img-src="/img/tutorial-signup.png">
      <h2>Sign Up</h2>
      <p>View this weekend's schedule and sign up for activities. You will be notified by email.</p></b-carousel-slide>

      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide img-src="/img/tutorial-start.png">
        <h2 class="mb-3">Welcome</h2>
        <a href="/schedule" style="background:#f7931e;color:white;padding:10px;margin-bottom:50px;">This Week's Schedule</a>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
           </b-carousel>

    </modal>

        
    </div>



</template>
<script>
import { eventBus } from '../main.js';
import Vue from 'vue'
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)
import UserDataService from "../services/UserDataService";
import VModal from 'vue-js-modal'
Vue.use(VModal)
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { decrypt, encrypt } from '../utils/encrypt';
Vue.config.productionTip = false;
Vue.use(Antd)
export default {
    data(){
        return {
            signedIn:false,
            loading:false,
            googleSignInParams: {
                    client_id: '978419002714-0ngcjc58363k85n3a6fpmrdl0tome13b.apps.googleusercontent.com'
            },
            currentUser:decrypt(localStorage.getItem("user")),
            
            
        };
    },
     methods:{
        onSignIn(user){
                this.createUser(user.getAuthResponse().id_token)
        },
        createUser(idToken){
          this.loading=true
          this.$message.info("Logging in...")
            UserDataService.create(idToken)
                    .then(response => {
                      /* If logged with non-LFA account */
                        this.$message.success("Logged In!")
                        localStorage.setItem("user", encrypt(response.data.user))
                      localStorage.setItem("token", response.data.token)
                      eventBus.$emit('userSet', true);
                      this.signedIn = true
                      if(response.status==201){
                        /* If created new user */
                          this.$modal.show('tutorial-modal')
                      }
                      
                      this.loading=false
                    })
                    .catch(() => {
                      /* If logged in with non-LFA account */
                      this.$message.error("Please sign in with an LFA Email Account")
                      this.signedIn=false
                      localStorage.setItem("user",null)
                      localStorage.setItem("token",null)
                      eventBus.$emit('userSet', null);
                      this.loading=false

                    });

        },

      },
      mounted() {
        if(this.currentUser!=null)
        {
            this.signedIn=true
        }
        else{
          this.$message.info("Sign in to get started..")
        }

      }
}
</script>

<style>
@media screen and (max-width:768px)
{
    .vm--modal{
        width:100% !important;
        left:0px !important;
    }
}
.carousel{
    height:100%
}
.carousel div{
    height:100%;

}
.carousel-item{
    height:100%;

}
.carousel-caption{
    bottom:-50%;
}

.carousel div img{
    height:100%;
}
h2{
    color:white
}

</style>