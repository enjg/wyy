<template>
  <div class="zt">
    <div class="tjgd_bt">
      <p @click="pushgd()">推荐歌单></p>
    </div>
    <div class="kuai">
      <img src="../../../../../assets/image/每日推荐歌曲背景.jpg" alt="" />
      <p>每日歌曲推荐</p>
      <p>{{ timeDate() }}</p>
    </div>
    <div class="kuai" v-for="item in abc" :key="item.id">
      <img :src="item.picUrl" alt="" @click="tzgd(item.id)" />
      <p @click="tzgd(item.id)">{{ item.name }}</p>
      <div>
        <p><img src="../../../../../assets/image/bfq.png" alt="" /></p>
        <p>{{ formatNumber(item.playCount) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";
import { useLoginStore } from "@/pinia/myLogin.js";
import { useRouter } from "vue-router";

const router=useRouter();
const myLogin = useLoginStore();
const abc = reactive([]);
onMounted(() => {
  getRecommendResource(myLogin.cookie);
});
function getRecommendResource(cookies) {
  abc.length = 0;
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/personalized", {
      params: {
        limit: 9,
        timestamp: time,
        cookie: cookies,
      },
    })
    .then((res) => {
      console.log(res.data.result);
      let Array = res.data.result.slice(0, 9);
      Object.assign(abc, Array);
    })
    .catch((err) => {
      console.error(err);
    });
}

function timeDate() {
  const currentDate = new Date();
  return currentDate.getDate();
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
function tzgd(a) {
  console.log(a);
  router.push({ path: "/index/playlist_details", query: { paramA: a } });
}
function pushgd(){
  router.push('/index/discover_music/song_list');
}
</script>

<style scoped>
.zt {
  width: 100%;
}
.tjgd_bt {
  height: 50px;
}
.tjgd_bt > p {
  margin: 0;
  line-height: 50px;
  font-size: 21px;
  text-align: left;
  font-weight: 550;
}
.kuai:nth-of-type(5n + 1) {
  margin-right: 0;
}
.kuai:nth-of-type(5n-3) {
  margin-left: 0;
}
.kuai {
  float: left;
  width: 198px;
  height: 250px;
  margin: 10px;
  position: relative;
}

.kuai > img {
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
}
.kuai > p {
  font-size: 14px;
  margin: 0;
  font-weight: 300;
  height: 50px;
  cursor: pointer;
}
.kuai > p:nth-of-type(2) {
  position: absolute;
  top: 85px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  font-size: 30px;
  color: white;
  font-weight: 500;
}
.kuai > div {
  z-index: 999;
  position: absolute;
  top: 5px;
  right: 5px;
  color: white;
  padding: 0;
}
.kuai > div p {
  float: left;
  margin: 0;
  font-size: 12px;
  line-height: 15px;
}
.kuai > div img {
  height: 15px;
  width: 15px;
  margin-right: 5px;
}
</style>