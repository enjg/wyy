<template>
  <div class="zt">
    <div class="bt">
      <p @click="pushMV()">推荐MV></p>
    </div>
    <div class="center">
      <div class="content" v-for="(item, index) in ListArray" :key="index">
        <img @click="pushMvDetails(item)" :src="item.picUrl" alt="" />
        <p class="nameHover" @click="pushMvDetails(item)" >{{ item.name }}</p>
        <div class="SingerName" v-for="(items, index) in item.artists" :key="index">
          <span @click="pushSingerDetails(items.id)" class="nameHover">{{ items.name }}</span>
          <span v-if="index < item.artists.length - 1">&nbsp;/&nbsp;</span>
        </div>
        <div class="bf">
          <img src="../../../../../assets/image/bfq.png" alt="" />
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
const router = useRouter();
onMounted(() => {
  getPersonalizedPrivatecontentList();
});
let ListArray = reactive([]);
function getPersonalizedPrivatecontentList() {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/personalized/mv", {
      params: {
        timestamp: time,
        limit: 3,
      },
    })
    .then((res) => {
      console.log(res.data.result);
      Object.assign(ListArray, res.data.result);
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
function pushMvDetails(center) {
  console.log(center.id);
  router.push({
    path: "/mv_details",
    query: {
      id: center.id,
    },
  });
}
function pushMV() {
  router.push("/index/video_component/mv_list");
}
function pushSingerDetails(id) {
  mySinger.updatedsinger(id);
  router.push("/index/singer_details");
}
</script>
  
  <style scoped>
.zt {
  width: 100%;
}
p {
  margin: 0;
}
.bt {
  height: 50px;
  width: 100%;
}
.bt > p {
  margin: 0;
  line-height: 50px;
  font-size: 21px;
  text-align: left;
  font-weight: 550;
}
.content {
  float: left;
  width: 252.5px;
  margin: 0 10px;
  position: relative;
}
.content > img {
  width: 100%;
  border-radius: 5px;
}
.content:nth-of-type(4n-3) {
  margin-left: 0;
}
.content:nth-of-type(4n) {
  margin-right: 0;
}
.content > p {
  line-height: 20px;
}
.content > p:nth-of-type(1) {
  font-size: 13px;
  color: rgb(48, 48, 48);
}
.SingerName{
  float: left;
}
.SingerName>span{
  font-size: 11px;
  color: rgb(118, 118, 118);
}
.nameHover:hover{
  color: black !important;
}
.content
.bf {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 999;
}
.bf > img {
  float: left;
  width: 15px;
}
.bf > p {
  float: left;
  color: white;
  font-size: 12px;
  margin-left: 5px;
}
</style>