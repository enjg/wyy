<template>
  <div class="zt">
    <img src="../../assets/image/logo.jpg" alt="" />
    <div class="login_button">
      <input type="button" value="登录" name="" id="" @click="abcClick()" v-if="!myLogin.cookie"/>
      <div class="Login_status" v-if="myLogin.cookie">
        <p>{{ myLogin.LoginStatus }}</p>
      </div>
    </div>
    <LogInVue class="dl" v-if="abc===1"></LogInVue>
  </div>
</template>

<script setup>
// import axios from "axios";
import { ref } from "vue";
import LogInVue from "../主体/组件/登录页面/LogIn.vue";
import { useLoginStore } from "@/pinia/myLogin.js";

const myLogin = useLoginStore();
let abc = ref(-1);
function abcClick() {
  abc.value = abc.value * -1;
}

// onMounted(()=>{
//   getLogout()
// })
// function getLogout() {
//   let time = Date.now();
//   axios
//     .get("http://47.108.209.241:8090/logout", {
//       params: {
//         timestamp: time,
//       },
//     })
//     .then((res) => {
//       console.log(res.data);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }
</script>

<style scoped>
.dl {
  width: 350px;
  height: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.dl h1 {
  font-weight: 300;
}
.Login_status{
  float: left;
}
.zt {
  background-color: #ec4141;
  /* max-width: 100%; */
  max-width: 100%;
  min-width: 1470px;
  height: 50px !important;
  position: relative;
}
img {
  height: 50px;
  background-color: yellow;
  position: absolute;
  left: 0;
}
.login_button {
  position: absolute;
  right: 100px;
}
input {
  line-height: 50px;
  height: 50px;
  background-color: none;
  border: none;
}
</style>