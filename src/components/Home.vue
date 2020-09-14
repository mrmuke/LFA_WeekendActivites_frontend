<template>
    <div class = "containerHome">

        <div>

            <div class="title">
                   <p class="text">Lake Forest Academy Weekend Activities</p>
                   <g-signin-button
                      :params="googleSignInParams"
                      @success="onSignIn"
                      v-if="signedIn"
                      class="computer-signin">
                       Signed in with LFA Email
                      </g-signin-button>
                   <g-signin-button
                       :params="googleSignInParams"
                       @success="onSignIn"
                       v-else
                       class="computer-signin">
                       Sign in with LFA Email Account
                     </g-signin-button>

                </div>
                <p class = "desc">Convenient and improved sign out system.</p>
                <div class = "column" v-if="signedIn">
                    <a href="/add" class="bigbutton">Request Activities</a>
                    <a href="/events" class="bigbutton">Vote for Activities</a>
                    <a :href="'/schedule/'" class="bigbutton">Weekend Schedule</a>

                </div>
                <a href="/schedules" class="bigbutton" v-if="admin">View All Schedules</a>


        </div>

        <modal name="tutorial-modal">
           <b-carousel
      id="carousel-1"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      
    >
      <!-- Text slides with image -->
      <b-carousel-slide
      style="font-weight:bold"
        caption="Request Events"
        text="Request the events that you want to go to."
        img-src="/img/tutorial-request.png"
      ></b-carousel-slide>

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
        <a href="/schedule" style="background:#ffab62;color:white;padding:10px;margin-bottom:50px;">This Week's Schedule</a>
      </b-carousel-slide>

      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
           </b-carousel>

    </modal>

        
    </div>



</template>
<!-- ADD SIGN OUT WHEN NOT LFA EMAIL -->
<script>
import { eventBus } from '../main.js';
import Vue from 'vue'
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)
import UserDataService from "../services/UserDataService";
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import VModal from 'vue-js-modal'
Vue.use(VModal)
export default {
    data(){
        return {
            emailAddress:"",
            signedIn:false,
            googleSignInParams: {
                    client_id: '978419002714-0ngcjc58363k85n3a6fpmrdl0tome13b.apps.googleusercontent.com'
            },
            admin:false,
        };
    },
    computed:{
    },
    components: {
    },
     methods:{
        onSignIn(user){
            console.log(user)
            const profile = user.getBasicProfile()
            this.emailAddress =profile.getEmail()
            console.log(this.emailAddress)
            if(this.emailAddress.indexOf("@students.lfanet.org")>-1){
                this.signedIn = true
                this.admin=false
                eventBus.$emit('adminSet', false);
                this.createUser()

            }
            else if(this.emailAddress.indexOf("@gmail.com")>-1){
                this.signedIn = true
                this.admin = true
                eventBus.$emit('adminSet', true);
                this.createUser()
            }
            else{
                this.$message.error("Please sign in with an LFA Email Account")
                this.signedIn=false
            }
        },
        createUser(){
            var data = {
                emailAddress:this.emailAddress,
                admin:this.admin
            };
            UserDataService.create(data)
                    .then(response => {
                      this.$cookies.set('user',response.data);
                      if(response.status==201){
                          this.$modal.show('tutorial-modal')
                      }

                    })
                    .catch(e => {
                      console.log(e);
                    });

        },

      },
      mounted() {
        if(this.$cookies.get('user')!=null)
        {
            this.signedIn=true
        }
        if(this.$cookies.get('user')&&this.$cookies.get('user').admin)
            {
                this.admin=true;
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
</style>