<template>
  <div class="login_zt">
    <img src="./img/差号.png" alt="" @click="clickgb()" />
    <h1>扫码登录</h1>
    <img :src="image" alt="" />
  </div>
</template>

<script setup>
import axios from "axios";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useLoginStore } from "@/pinia/myLogin.js";

const myLogin = useLoginStore();

var intervalId;
onMounted(() => {
  getLogInKey();
  //   setTimeout(() => {
  //     getLogInCheck();
  //   }, 1000);
  //   setTimeout(getLogInCheck();, 1000);
  intervalId = setInterval(() => {
    getLogInCheck();
  }, 1000);
});
let image = ref("");
let key = ref("");
function clickgb() {
  myLogin.LogInTF = 0;
}
function getLogInKey() {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/login/qr/key", {
      params: {
        timestamp: time,
      },
    })
    .then((res) => {
      console.log(res);
      key.value = res.data.data.unikey;
    })
    .catch((err) => {
      console.error(err);
    });
}
watch(
  () => key.value,
  (newValue) => {
    getLogInImg(newValue);
  }
);
function getLogInImg(keys) {
  axios
    .get("http://47.108.209.241:8090/login/qr/create", {
      params: {
        key: keys,
        qrimg: keys,
      },
    })
    .then((resa) => {
      console.log(resa);
      image.value = resa.data.data.qrimg;
      console.log(resa.data.data.qrimg);
    })
    .catch((err) => {
      console.error(err);
    });
}
function getLogInCheck() {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/login/qr/check", {
      params: {
        key: key.value,
        timestamp: time,
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.code == 803) {
        clearInterval(intervalId);
        getLoginStatus(res.data.cookie);
        myLogin.postCookie(res.data.cookie);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
function getLoginStatus(abc) {
  console.log(abc);
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/login/status", {
      params: {
        timestamp: time,
        cookie: abc,
      },
    })
    .then((res) => {
      myLogin.postLoginStatus(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}
onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
.login_zt {
  width: 350px !important;
  height: 530px !important;
  background-color: white;
  box-shadow: 0 0 10px rgba(120, 120, 120, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999999999999;
}
.login_zt h1 {
  font-weight: 300;
  text-align: center;
  margin-top: 100px;
}

.login_zt img:nth-of-type(1) {
  width: 15px;
  position: absolute;
  right: 10px;
  top: 10px;
}
.login_zt img:nth-of-type(2) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
}
</style>