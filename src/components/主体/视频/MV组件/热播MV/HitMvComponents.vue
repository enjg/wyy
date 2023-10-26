<template>
  <div class="zt">
    <div class="header">
      <p @click="pushAllMv()">热播MV</p>
    </div>
    <div class="zt_center">
      <div class="center" v-for="(item, index) in ListArray" :key="index">
        <img :src="item.cover" @click="pushMvDetails(item)" />
        <img
          v-if="index == vids"
          src="../../../../../assets/image/未标题-2.png"
          alt=""
        />
        <p @click="pushMvDetails(item)">{{ item.name }}</p>
        <p @click="pushUserDetails(item)" >
          {{ item.artistName }}
        </p>
        <div class="numberOfPlays">
          <img src="../../../../../assets/image/bfq.png" alt=""  />
          <p>{{ formatNumber(item.playCount) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useMysinger } from "@/pinia/myStore.js";

let mySinger = useMysinger();
let ListArray = reactive([]);

onMounted(() => {
  getMvFirst();
});
function pushUserDetails(center) {
  mySinger.updatedsinger(center.artists[0].id);
  router.push("/index/singer_details");
}
function getMvFirst() {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/mv/all", {
      params: {
        timestamp: time,
        limit: 8,
        order: "最热",
      },
    })
    .then((res) => {
      Object.assign(ListArray, res.data.data);
      console.log(ListArray);
    })
    .catch((err) => {
      console.error(err);
    });
}
function formatNumber(number) {
  if (number >= 100000000) {
    return Math.floor(number / 100000000) + "亿";
  } else if (number >= 100000 && number < 100000000) {
    return Math.floor(number / 10000) + "万";
  } else {
    return number.toString();
  }
}
const router = useRouter();
function pushAllMv() {
  router.push({
    path: "/index/all_mv",
    query: {
      district: "全部",
      type: "全部",
      sort: "最热",
    },
  });
}
function pushMvDetails(center) {
  console.log(center.id);
  router.push({
    path: "/mv_details",
    query: {
      id: center.id,
    },
  });
}
</script>
    
    <style scoped>
.zt {
  clear: both;
  width: 1070px;
  display: inline-block;
}
.header {
  width: 1070px;
}
.header p {
  float: left;
  font-weight: 600;
  font-size: 18px;
}
.zt_center {
  clear: both;
}
.center {
  width: 247.5px;
  float: left;
  position: relative;
  margin: 10px;
}
.center > img {
  width: 100%;
  border-radius: 2%;
  height: 150px;
}
.center > p {
  margin: 5px 0;
}
.center > p:nth-of-type(1) {
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  overflow: none;
}
.center > p:nth-of-type(2) {
  font-size: 10px;
  color: rgb(123, 123, 123);
}
.numberOfPlays {
  position: absolute;
  top: 5px;
  right: 5px;
}
.numberOfPlays > img {
  width: 13px;
  float: left;
  margin: 1px;
}
.numberOfPlays > p {
  font-size: 10px;
  float: left;
  margin: 0;
  line-height: 15px;
  color: white;
}
</style>