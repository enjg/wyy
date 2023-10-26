<template>
  <div class="zt">
    <div class="bt">
      <p>MV排行榜</p>
    </div>
    <div class="header">
      <p>最近更新：今天</p>
      <img
        src="../../../assets/image/_问号小.png"
        alt=""
        @mouseover="onMouseover(1)"
        @mouseleave="onMouseover(0)"
      />
      <div class="tips" v-show="tipsMouseove">
        <p>选取云音乐中三个月内发布的热度最高的50支MV，每天更新</p>
        <p>热度由MV播放、收藏、分享数量综合计算</p>
      </div>
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
    <div class="center">
      <div class="content" v-for="(item, index) in ListArray" :key="index">
        <div
          :class="{
            rise: item.lastRank > index + 1,
            descend: item.lastRank < index + 1,
            hold: item.lastRank == index + 1,
          }"
        ></div>
        <p>{{ formatNumber(index + 1) }}</p>
        <img :src="item.cover" alt="" @click="pushMvDetails(item)" />
        <p>
          <span v-for="(items, index) in item.artists" :key="index" @click="pushUserDetails(items)"
            >{{ items.name
            }}<span v-show="index + 1 < item.artists.length"> / </span></span
          >
        </p>
        <p @click="pushMvDetails(item)">{{ item.mv.title }}</p>
        <div class="content_heat">
          <p>{{ item.score }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script setup>
import axios from "axios";
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useMysinger } from "@/pinia/myStore.js";

let mySinger = useMysinger();
const route = useRoute();
let CurrentClassification = ref("内地");
CurrentClassification.value = route.query.CurrentClassification;
let ListArray = reactive([]);
let SortedArray = reactive(["内地", "港台", "欧美", "日本", "韩国"]);
let tipsMouseove = ref(0);

onMounted(() => {
  getMvFirst(CurrentClassification.value);
});
watch(
  () => CurrentClassification.value,
  (newValue) => {
    getMvFirst(newValue);
  }
);
function pushUserDetails(center) {
  mySinger.updatedsinger(center.id);
  router.push("/index/singer_details");
}
function onMouseover(center) {
  tipsMouseove.value = center;
}
function sortClick(center) {
  CurrentClassification.value = center;
}
function getMvFirst(center) {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/top/mv", {
      params: {
        timestamp: time,
        limit: 50,
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
function formatNumber(value) {
  if (value < 10) {
    return "0" + value;
  }
  return value;
}
// function formatNumber(number) {
//   if (number >= 100000000) {
//     return Math.floor(number / 100000000) + "亿";
//   } else if (number >= 100000 && number < 100000000) {
//     return Math.floor(number / 10000) + "万";
//   } else {
//     return number.toString();
//   }
// }
const router = useRouter();
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
.click {
  background-color: rgb(247, 233, 233) !important;
  border-radius: 50% / 100% !important;
  color: red !important;
}
.rise {
  width: 1px;
  height: 6px;
  position: absolute;
  background-color: red;
  top: 50%;
  left: 30px;
  transform: translateY(calc(-50% + 30px));
  /* transform: rotate(-40deg);  /* 旋转角度 */
}
.rise::after {
  content: "";
  display: block;
  position: absolute;
  left: 50%; /* 箭头位置 */
  top: -2px; /* 箭头位置 */
  transform: translateX(-50%);
  border-bottom: 4px solid red; /* 箭头高低 */
  border-left: 4px solid transparent; /* 箭头高低 */
  border-right: 4px solid transparent; /* 箭头长度*/
}
.descend {
  width: 1px;
  height: 6px;
  position: absolute;
  background-color: green;
  top: 50%;
  left: 30px;
  transform: translateY(calc(-50% + 30px));
  /* transform: rotate(-40deg);  /* 旋转角度 */
}
.descend::after {
  content: "";
  display: block;
  position: absolute;
  left: 50%; /* 箭头位置 */
  bottom: -2px; /* 箭头位置 */
  transform: translateX(-50%);
  border-top: 4px solid green; /* 箭头高低 */
  border-left: 4px solid transparent; /* 箭头高低 */
  border-right: 4px solid transparent; /* 箭头长度*/
}
.hold {
  width: 5px;
  height: 1.5px;
  position: absolute;
  background-color: #b2b2b2;
  top: 50%;
  left: 30px;
  transform: translateY(calc(-50% + 30px));
}
.zt {
  clear: both;
  width: 1070px;
  display: inline-block;
}
.header {
  width: 1070px;
  height: 50px;
  position: relative;
}
.bt p {
  font-size: 20px;
  font-weight: bold;
  width: 1070px;
}
.tips {
  width: 220px;
  height: 115px;
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 9999;
  background-color: white;
  border-radius: 5px;
  box-shadow: 5px 0px 15px rgb(150, 150, 150);
  padding: 10px;
  box-sizing: border-box;
}
.tips > p {
  margin: 0;
  font-size: 12px;
  line-height: 25px;
  color: #b2b2b2;
}
.header > p {
  float: left;
  font-size: 12px;
  color: #b2b2b2;
  margin: 0;
  line-height: 50px;
}
.header > img {
  width: 15px;
  position: absolute;
  left: 90px;
  top: 50%;
  transform: translateY(-50%);
}
.header ul {
  float: right;
  list-style: none;
  margin: 0;
}
.header li {
  float: left;
  margin: 0;
  margin-right: 10px;
  line-height: 50px;
}
.header li span {
  font-size: 12px;
  color: #b2b2b2;
  padding: 5px 10px;
}
.center {
  clear: both;
}
.content {
  box-sizing: border-box;
  width: 535px;
  height: 140px;
  float: left;
  border-bottom: 1px solid rgb(235, 235, 235);
  position: relative;
}
.content:nth-child(2n) {
  border-left: 1px solid rgb(235, 235, 235);
}
.content > p:nth-of-type(1) {
  font-size: 22px;
  color: rgb(161, 161, 161);
  width: 40px;
  text-align: center;
  margin: 0;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.content > img {
  width: 178px;
  height: 100px;
  position: absolute;
  left: 50px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 5px;
}
.content > p:nth-of-type(2) {
  font-size: 13px;
  line-height: 20px;
  height: 20px;
  overflow: hidden;
  margin: 0;
  position: absolute;
  left: 240px;
  top: 50%;
  transform: translateY(-50%);
  color: rgb(161, 161, 161);
}
.content > p:nth-of-type(3) {
  margin: 0;
  position: absolute;
  left: 240px;
  top: 50%;
  transform: translateY(calc(-50% - 40px));
}
.content_heat {
  position: absolute;
  right: 315px;
  top: 10px;
}
.content_heat > P {
  font-size: 12px;
  font-weight: 100;
  color: white;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
}
</style>