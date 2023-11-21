<template>
  <div class="zt">
    <div class="top">
      <div class="top_left" v-if="listArray.length">
        <img :src="listArray[0].album.blurPicUrl" alt="" />
        <p>{{ listArray[0].album.blurPicUrl }}</p>
      </div>
      <div class="top_right"></div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
// import { useMyPlaylist } from "@/pinia/myPlaylist.js";

// const myPlaylist = useMyPlaylist();

let listArray = reactive([]);
let indexsize = ref(0);
let CurrentSongArray = reactive([]);
onMounted(() => {
  getPersonalFm();
  CurrentSongArray.push(listArray[indexsize.value]);
  console.log(indexsize.value);
  console.log(listArray[0]);
});
function getPersonalFm() {
  const timestamp = Date.now();
  axios
    .get("//47.108.209.241:8090/personal_fm", {
      params: {
        timestamp: timestamp,
      },
    })
    .then((response) => {
      console.log(response.data.data);
      listArray.push(...response.data.data);
      console.log(listArray[0]);
      
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>

<style scoped>
.zt {
  margin: auto;
  margin-top: 20px;
  width: 800px;
}
.top {
  width: 100%;
  height: 450px;
}
.top_left {
  width: 50%;
  height: 100%;
  float: left;
  background-color: pink;
}
.top_right {
  width: 50%;
  height: 100%;
  float: left;
  background-color: aqua;
}
</style>