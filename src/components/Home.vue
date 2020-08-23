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
                    <a :href="'/schedule/'" class="bigbutton">View Weekend Schedule</a>

                </div>
                <a href="/schedules" class="bigbutton" v-if="admin">View All Schedules</a>


        </div>

        


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
export default {
    data(){
        return {
            emailAddress:"",
            userName:"",
            signedIn:false,
            googleSignInParams: {
                    client_id: '978419002714-0ngcjc58363k85n3a6fpmrdl0tome13b.apps.googleusercontent.com'
            },
            user:"",
            currentUser:null,
            admin:false,
        };
    },
    computed:{
    },
    components: {
    },
     methods:{
        onSignIn(user){
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
                alert("Please sign in with an LFA Email Account")
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
                      this.currentUser = response.data;
                      this.$cookies.set('user',response.data);

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
        if(this.$cookies.get('user').admin==true)
            {
                this.admin=true;
            }

      }
}
</script>
