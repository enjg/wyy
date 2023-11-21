<template>
  <div class="zt">
    <div class="center" v-for="item in singerMV" :key="item.id">
      <img @click="pushMvDetails(item)" :src="item.imgurl16v9" alt="" />
      <p @click="pushMvDetails(item)">{{ item.name }}</p>
      <div>
        <img src="../../../../assets/image/bfq.png" alt="" /><span>{{
          item.playCount
        }}</span>
      </div>
      <p>{{ jstime(item.duration) }}</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useMysinger } from "@/pinia/myStore.js";
import { useRouter } from "vue-router";

const router = useRouter();
let mySinger = useMysinger();
let singerMV = reactive([]);
onMounted(() => {
  getsingerMV();
});
function pushMvDetails(center) {
  console.log(center.id);
  router.push({
    path: "/mv_details",
    query: {
      id: center.id,
    },
  });
}
function getsingerMV() {
  axios
    .get("http://47.108.209.241:8090/artist/mv", {
      params: {
        id: mySinger.id,
      },
    })
    .then((response) => {
      Object.assign(singerMV, response.data.mvs);
      console.log(response.data.mvs);
    })
    .catch((error) => {
      console.error(error);
    });
}
function jstime(item) {
  const minutes = Math.floor(item / 60000); // 分钟
  const seconds = Math.floor((item % 60000) / 1000); // 秒

  const formattedMinutes = minutes.toString().padStart(2, "0"); // 将分钟数补全为2位
  const formattedSeconds = seconds.toString().padStart(2, "0"); // 将秒数补全为2位

  return `${formattedMinutes}:${formattedSeconds}`;
}
</script>

<style scoped>
.zt {
  width: 1170px;
}
p{
  margin: 0;
}
.center {
  /* height: 165px; */
  width: 224px;
  margin: 10px 5px;
  float: left;
  position: relative;
}
.center img {
  height: 135px;
  width: 224px;
  border-radius: 5px;
}
.center > p:nth-of-type(1) {
  margin: 0;
  font-size: 14px;
  line-height: 25px;
  font-weight: 300;
  height: 30px;
  overflow: hidden;
}
.center > p:nth-child(4) {
  position: absolute;
  right: 5px;
  top: 105px;
  font-size: 12px;
  color: white;
}
.center > div > img {
  float: left;
  height: 12px;
  width: 12px;
  margin-top: 5px;
}
.center > div {
  position: absolute;
  top: 0;
  right: 0;
  height: 20px;
  padding: 0;
}
.center > div > span {
  color: white;
  font-size: 12px;
  line-height: 20px;
  margin: 0 5px;
}
</style>