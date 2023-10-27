<template>
  <div class="zt">
    <img src="../../assets/image/logo.jpg" alt="" />
    <div class="login_button">
      <img
        v-if="myLogin.LoginStatus.data"
        :src="myLogin.LoginStatus.data.profile.avatarUrl"
        alt=""
      />
      <img
        v-else
        src="../../assets/image/未登录.png"
        alt=""
        @click="abcClick()"
      />
      <p v-if="myLogin.LoginStatus.data">
        {{ myLogin.LoginStatus.data.profile.nickname }}
      </p>
      <p v-else @click="abcClick()">未登录</p>
    </div>
    <div class="dl" v-if="abc === 1">
      <div class="ch">
        <img src="../../assets/image/差号.png" alt="" @click="abcClick" />
      </div>
      <LogInVue></LogInVue>
    </div>
  </div>
</template>

<script setup>
// import axios from "axios";
import { ref, watch } from "vue";
import LogInVue from "../主体/组件/登录页面/LogIn.vue";
import { useLoginStore } from "@/pinia/myLogin.js";

const myLogin = useLoginStore();
watch(
  () => myLogin.cookie,
  () => {
    abc.value = -1;
  }
);
let abc = ref(-1);
function abcClick() {
  console.log(111);
  abc.value = abc.value * -1;
}
</script>

<style scoped>
.ch {
  height: 30px;
}
.ch img:nth-of-type(1) {
  position: absolute;
  right: 15px;
  top: 10px;
  width: 20px;
}
.dl {
  width: 350px;
  height: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: white;
  background-color: white;
  box-shadow: 0 0 10px rgba(120, 120, 120, 0.5);
}
.dl h1 {
  font-weight: 300;
}

.login_button > img {
  float: left;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.login_button > p {
  float: left;
  margin: 0;
  text-align: left;
  font-size: 12px;
  width: 100px;
  overflow: hidden;
  line-height: 30px;
  margin-left: 5px;
  color: white;
}
.zt {
  background-color: #ec4141;
  /* max-width: 100%; */
  max-width: 100%;
  min-width: 1470px;
  height: 50px !important;
  position: relative;
}
.zt > img {
  height: 50px;
  background-color: yellow;
  position: absolute;
  left: 0;
}
.login_button {
  position: absolute;
  height: 30px;
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
}
input {
  line-height: 30px;
  height: 30px;
  background-color: none;
  border: none;
}
</style>