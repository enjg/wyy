<template>
  <div class="zt">
    <div class="discography">
      <p
        v-for="(item, index) in SongDiscClassification"
        :key="index"
        @click="getListOfNewSongs(item.type)"
        :class="{
          discography_span_click: item.name == CurrentClassification.name,
        }"
      >
        {{ item.name }}
      </p>
      <ul>
        <li>
          <p @click="clicktype('推荐')">推荐</p>
        </li>
        <li>
          <p @click="clicktype('全部')">全部</p>
        </li>
      </ul>
    </div>
    <div class="center">
      <div class="center-left">
        <div class="yaer">
          {{ getYearMonth("月") }}
        </div>
        <div class="line"></div>

        <div class="month">
          {{ getYearMonth("年") }}
        </div>
      </div>
      <div class="center-right">
        <div class="content" v-for="(item, index) in ListArray" :key="index">
          <div class="content-top">
            <img @click="tzgd(item.id)" :src="item.picUrl" alt="" />
            <div></div>
          </div>
          <p @click="tzgd(item.id)">{{ item.name }}</p>
          <p>{{ item.artist.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { onMounted, reactive, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

let CurrentClassification = reactive({
  area: "ALL",
  type: "推荐",
});
let SongDiscClassification = reactive([
  {
    name: "全部",
    type: "ALL",
  },
  {
    name: "华语",
    type: "ZH",
  },
  {
    name: "欧美",
    type: "EA",
  },
  {
    name: "韩国",
    type: "KR",
  },
  {
    name: "日本",
    type: "JP",
  },
]);

function getListOfNewSongs(type) {
  CurrentClassification.area = type;
}
function clicktype(center) {
  CurrentClassification.type = center;
}
function getYearMonth(center) {
  const currentDate = new Date();
  if (center == "年") {
    return currentDate.getFullYear();
  } else {
    return currentDate.getMonth() + 1;
  }
}
onMounted(() => {
  getTopAlbum(CurrentClassification.area);
});
watch(
  () => CurrentClassification,
  (newValue) => {
    console.log(newValue);
    if (newValue.type === "推荐") {
      getTopAlbum(newValue.area);
    } else {
      getAlbumNew(newValue.area);
    }
  },
  { deep: true }
);
let ListArray = reactive([]);
function getTopAlbum(areas) {
  ListArray.length = 0;
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/top/album", {
      params: {
        timestamp: time,
        area: areas,
        limit: 20,
        offset: 0,
      },
    })
    .then((res) => {
      console.log(res.data.monthData);
      ListArray.push(...res.data.monthData);
    })
    .catch((err) => {
      console.error(err);
    });
}
function getAlbumNew(areas) {
  ListArray.length = 0;
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/album/new", {
      params: {
        timestamp: time,
        area: areas,
        limit: 20,
      },
    })
    .then((res) => {
      console.log(res.data.albums);
      ListArray.push(...res.data.albums);
    })
    .catch((err) => {
      console.error(err);
    });
}
const router = useRouter();
function tzgd(a) {
  console.log(a);
  router.push({ path: '/index/album_details', query: { paramA: a } });
}
</script>
  
  <style scoped>
.discography {
  width: 1070px;
  display: inline-block;
  margin: 20px 0;
}
.discography > p {
  margin: 0;
  margin-right: 20px;
  font-size: 16px;
  line-height: 30px;
  font-weight: 300;
  float: left;
}
.discography_span_click {
  color: black !important;
  font-weight: bold !important;
}
ul {
  float: right;
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  float: left;
  padding: 0 30px;
  margin: 0;
}
li:nth-of-type(2) {
  padding-right: 0;
}
li > p {
  line-height: 30px;
  margin: 0;
  font-size: 13px;
}
.center-left {
  width: 40px;
  position: relative;
  float: left;
}
.yaer {
  font-size: 32px;
  width: 40px;
  height: 45px;
  text-align: center;
}
.month {
  font-size: 13px;
  font-weight: 300;
  width: 40px;
  text-align: center;
}
.line {
  width: 42px;
  height: 2px;
  position: absolute;
  top: 45px;
  background-color: white;
  box-shadow: 0px -4px 5px rgba(0, 0, 0, 0.4);
  transform: rotate(-20deg);
  transform-origin: top left;
}
.center-right {
  float: left;
  width: 1020px;
  margin-left: 10px;
}
.content {
  float: left;
  margin-right: 15px;
  width: 191px;
  height: 255px;
  margin-bottom: 10px;
}
.content:nth-of-type(5n) {
  margin-right: 0;
}
.content-top {
  width: 191px;
  height: 176px;
  position: relative;
}
.content-top > img {
  width: 170px;
  height: 170px;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.content-top > div {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background-color: black;
  position: absolute;
  top: 0;
  left: 21px;
}
.content > p {
  margin: 0;
  line-height: 25px;
  font-weight: 300;
}
.content > p:nth-of-type(1) {
  font-size: 14px;
  width: 170px;
  min-height: 25px;
  max-height: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content > p:nth-of-type(2) {
  font-size: 12px;
  color: rgb(150, 150, 150);
}
</style>