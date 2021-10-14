<template>
    <div class = "containerHome">
      <div class="listContainer">
        <div class="listHead">
          <div>Name</div>
          <div>Strikes</div>
          <div>Action</div>
        </div>
        <div class="item" v-for="(user, index) in users" :key="index">
          <div>{{user.userName}}</div>
          <div>{{user.strikes}}</div>
          <div><button @click="resetStrike(user.id)" class="strike-button">Reset Strikes</button></div>
        </div>
      </div>
    </div>
</template>


<script>
import Vue from 'vue'
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)
import VModal from 'vue-js-modal'
Vue.use(VModal)
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import UserDataService from '../services/UserDataService'
Vue.config.productionTip = false;
Vue.use(Antd)
export default {
    data(){
        return {
          currentUser:JSON.parse(localStorage.getItem("user")),
          users: [],
        };
    },
    methods:{
      async getUsers(){
        this.users = (await UserDataService.getAll()).data.sort(this.compare);
        console.log(this.users);
      },
      compare(a,b){
        if(a.strikes > b.strikes){
          return -1;
        } else {
          return 1;
        }
      },
      async resetStrike(id){
        await UserDataService.resetStrike(id);
        this.$router.go();
      }
    },
    mounted() {
      if(!(JSON.parse(localStorage.getItem("user"))&&JSON.parse(localStorage.getItem("user")).admin))
      {
        this.$message.error("Sign in as an admin to access this page...")
        this.$router.push('/')
      }
      else{
        this.getUsers();
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
.containerHome{
  display:flex;
  justify-content: center;
}
.listContainer{
  width:80vw;
  background-color:white;
  margin-top: 50px;
  border-radius: 10px;
  padding: 8px;
  height:fit-content;
}
.listHead{
  background-color:#3a3737;
  height:80px;
  display:flex;
  flex-direction:"row";
  margin-bottom: 8px;
}
.listHead div{
  display:flex;
  font-size: 2rem;
  color:white;
  width:33%;
  height:100%;
  justify-content: center;
  align-items: center;
}
.item:nth-child(even){
  background-color:#d7d3d34d;
  display:flex;
  flex-direction:row;
}
.item:nth-child(odd){
  display:flex;
  flex-direction:row;
}
.item div{
  width:33%;
  padding:10px;
  display:flex;
  justify-content: center;
  align-items:center;
}
.strike-button{
  background-color:#f7931e;
  border:0px;
  color:white;
  padding: 5px;
  border-radius: 5px;
}
.strike-button:hover{
  background-color:#ff8216;
}
</style>