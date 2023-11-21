<template>
  <div class="zt">
    <div class="official_list">
      <p class="bt">官方榜</p>
      <leaderboard-component
        v-for="(item, index) in OfficialList"
        :key="index"
        :message="item"
      ></leaderboard-component>
    </div>
    <div class="global_list">
      <p class="bt">全球榜</p>
      <div class="center" v-for="(item, index) in GlobalList" :key="index">
        <img :src="item.coverImgUrl" alt="" @click="tzgd(item.id)" />
        <p @click="tzgd(item.id)">{{ item.name }}</p>
        <div class="center_numberofplays">
          <img src="../../../../assets/image/bfq.png" alt="" />
          <p>{{ formatNumber(item.playCount) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted, reactive } from "vue";
import LeaderboardComponent from "./排行榜组件/LeaderboardComponent.vue";
import { useRouter } from "vue-router";


onMounted(() => {
  getLeaderboardList();
});
let LeaderboardList = reactive([]);
let OfficialList = computed(() => LeaderboardList.slice(0, 4));
let GlobalList = computed(() => LeaderboardList.slice(4));
function getLeaderboardList() {
  axios
    .get("http://47.108.209.241:8090/toplist")
    .then((response) => {
      Object.assign(LeaderboardList, response.data.list);
      console.log(response.data.list);
    })
    .catch((error) => {
      console.error(error);
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
const router=useRouter();
function tzgd(a){
    console.log(a);
    router.push({ path: '/index/playlist_details', query: { paramA: a } });
}
</script>

<style scoped>

.zt {
  width: 1070px;
}
.bt{
  font-size: 20px;
  font-weight: bold;
}
.center > img {
  width: 194px;
  border-radius: 5px;
  margin: 0;
  cursor: pointer;
}
.center {
  float: left;
  width: 194px;
  height: 234px;
  margin: 10px 10px;
  position: relative;
  /* overflow: hidden; */
}
.center_numberofplays {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 9;
}
.center_numberofplays > img {
  float: left;
  width: 15px;
  margin-top: 2.5px;
}
.center > P {
  margin: 0;
  font-size: 15px;
  /* line-height: ; */
  overflow: hidden;
  height: 40px;
  cursor: pointer;
}
.center_numberofplays > p {
  float: left;
  margin: 0;
  color: white;
  margin-left: 5px;
  font-size: 14px;
}
</style>