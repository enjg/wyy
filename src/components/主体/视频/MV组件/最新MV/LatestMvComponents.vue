<template>
  <div class="zt">
    <div class="header">
      <p @click="pushAllMv()">最新MV</p>
      <ul>
        <li v-for="(item, index) in SortedArray" :key="index">
          <span
            @click="sortClick(item)"
            :class="{ click: item == CurrentClassification }"
            >{{ item }}</span
          >
        </li>
      </ul>
    </div>
    <div class="zt_center">
      <div class="center" v-for="(item, index) in ListArray" :key="index">
        <img :src="item.cover" @click="pushMvDetails(item)"/>
        <img
          v-if="index == vids"
          src="../../../../../assets/image/未标题-2.png"
          alt=""
        />
        <p @click="pushMvDetails(item)">{{ item.name }}</p>
        <p @click="pushUserDetails(item)">
          {{ item.artistName }}
        </p>
        <div class="numberOfPlays">
          <img src="../../../../../assets/image/bfq.png" alt="" />
          <p>{{ formatNumber(item.playCount) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import axios from "axios";
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useMysinger } from "@/pinia/myStore.js";

let mySinger = useMysinger();
let CurrentClassification = ref("内地");
let ListArray = reactive([]);
let SortedArray = reactive(["内地", "港台", "欧美", "日本", "韩国"]);

onMounted(() => {
  getMvFirst(CurrentClassification.value);
});
watch(
  () => CurrentClassification.value,
  (newValue) => {
    getMvFirst(newValue);
  }
);
function pushUserDetails(center){
  mySinger.updatedsinger(center.artists[0].id);
  router.push("/index/singer_details");
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
function sortClick(center) {
  CurrentClassification.value = center;
}
function getMvFirst(center) {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/mv/first", {
      params: {
        timestamp: time,
        limit: 8,
        area: center,
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
      district: CurrentClassification.value,
      type: "全部",
      sort: "最新",
    },
  });
}
</script>
  
  <style scoped>
.click {
  background-color: rgb(247, 233, 233) !important;
  border-radius: 50% / 100% !important;
  color: red !important;
}
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
.header ul {
  float: right;
  list-style: none;
}
.header li {
  float: left;
  margin-right: 10px;
}
.header li span {
  font-size: 12px;
  color: rgb(123, 123, 123);
  padding: 5px 10px;
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