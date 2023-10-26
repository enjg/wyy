<template>
  <div class="zt">
    <div class="div1">
      <img
        :src="myStore.state.songurl.img"
        alt=""
        @click="songbac(myStore.state.songurl.id)"
      />
      <p>{{ myStore.state.songurl.name }}</p>
      <p>{{ myStore.state.songurl.songname }}</p>
      <audio
        ref="audioPlayer"
        @timeupdate="handleTimeUpdate"
        @play="playUpdata(true)"
        @pause="playUpdata(false)"
        controls
        :src="url"
      ></audio>
    </div>
  </div>
</template>

<script setup>
import { useMyStore } from "@/pinia/myStore.js";
import axios from "axios";
import { watch } from "vue";
import { ref } from "vue";
import { useLoginStore } from "@/pinia/myLogin.js";

const myLogin = useLoginStore();


const myStore = useMyStore();
let url = ref("");

watch(
  () => myStore.state.songurl.id,
  (newId) => {
    hqsongurl(newId);
    console.log(newId);
  }
);

function hqsongurl(id) {
  const timestamps = Date.now();
  axios
    .get("http://47.108.209.241:8090/song/url", {
      params: {
        id: id,
        timestamp:timestamps,
        cookie:myLogin.cookie
      },
    })
    .then((response) => {
      // myStore.setUrl(response.data.data[0].url);
      url.value = response.data.data[0].url;
      console.log(url.value);
      console.log(response.data.data[0].url);
    })
    .catch((error) => {
      console.error(error);
    });
}

let audioPlayer = ref();
let currentTimea = ref(0);
import { useMySong } from "@/pinia/myStore.js";
const state = useMySong();

watch(
  () => currentTimea.value,
  (newtime) => {
    state.setPlaytime(newtime);
  }
);

function songbac(id) {
  state.setTf();
  state.setId(id);
}
function handleTimeUpdate() {
  currentTimea.value = formatTime(audioPlayer.value.currentTime);
}
function playUpdata(a) {
  state.setPlaytf(a);
}
/**
@params{tiemValue:'59133633'}
@return(00,00.000)
 **/

function formatTime(timeValue) {
  const minutes = Math.floor(timeValue / 60);
  const seconds = Math.floor(timeValue % 60);
  const milliseconds = Math.floor((timeValue - Math.floor(timeValue)) * 1000);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  const formattedMilliseconds = String(milliseconds).padStart(3, "0");

  const formattedTime = `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;

  return formattedTime;
}
</script>

<style scoped>
.div1 {
  max-width: 100%;
  min-width: 1470px;
  height: 70px;
  background-color: white;
  position: relative;
  bottom: 0;
}
img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  position: absolute;
  left: 10px;
  top: 10px;
  border: 1px solid rgb(208, 208, 208);
}
p {
  margin: 0;
}
p:nth-of-type(1) {
  font-size: 18px;
  position: absolute;
  left: 80px;
  top: 10px;
  width: 200px;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
}
p:nth-of-type(2) {
  font-size: 14px;
  position: absolute;
  left: 80px;
  top: 40px;
}
p:nth-of-type(3) {
  font-size: 14px;
  position: absolute;
  left: 300px;
  top: 40px;
}
p:nth-of-type(4) {
  font-size: 14px;
  position: absolute;
  left: 300px;
  top: 0px;
}
audio {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
}
</style>