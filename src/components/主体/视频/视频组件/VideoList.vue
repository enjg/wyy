<template>
  <div class="zt">
    <div class="top">
      <input type="button" :value="videoDetails.name" @click="storButton()"/>
      <ul>
        <li v-for="item in categoryList" :key="item.id">
          <span
            @click="SortClick(item)"
            :class="{ click: item.name === videoDetails.name }"
          >
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="storList" v-show="storbutton===1">
      <div class="storList_bt">
        <p
          @click="SortClick({ name: '全部视频', id: '' })"
          :class="{ click:videoDetails.name=='全部视频' }"
        >
          全部视频
        </p>
      </div>
      <div class="storList_center">
        <p
          v-for="item in SortList"
          :key="item.id"
          :class="{ click: item.name === videoDetails.name }"
          @click="SortClick(item)"
        >
          {{ item.name }}
        </p>
      </div>
    </div>
    <VideoListSequenceVue :message="videoDetails"></VideoListSequenceVue>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive,ref } from "vue";
import VideoListSequenceVue from "./视频列表/VideoListSequence.vue";

onMounted(() => {
  getcategorylist();
  getSortList();
});
let videoDetails = reactive({
  id: "",
  name: "全部视频",
});
let categoryList = reactive([]);
function getcategorylist() {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/video/category/list", {
      params: {
        timestamp: time,
      },
    })
    .then((res) => {
      Object.assign(categoryList, res.data.data);
      console.log(res.data.data);
    })
    .catch((err) => {
      console.error(err);
    });
}
let storbutton=ref(-1)
function storButton(){
  storbutton.value=storbutton.value*-1;
}
function SortClick(center) {
  videoDetails.id = center.id;
  videoDetails.name = center.name;
}
let SortList = reactive([]);
function getSortList() {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/video/group/list", {
      params: {
        timestamp: time,
      },
    })
    .then((res) => {
      Object.assign(SortList, res.data.data);
      console.log(res.data.data);
    })
    .catch((err) => {
      console.error(err);
    });
}
</script>

<style scoped>
.zt {
  width: 1070px;
  position: relative;
}
.top {
  width: 100%;
}
.top > input {
  width: 130px;
  height: 40px;
  margin-top: 15px;
  border-radius: 25px;
  border: 1px solid rgb(138, 138, 138);
  background-color: white;
  font-size: 18px;
}
.top > input:hover {
  background-color: rgb(228, 228, 228);
}
.top > ul {
  float: right;
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-top: 10px;
}
.top > ul > li {
  float: left;
  margin-left: 10x;
  color: rgb(76, 76, 76);
  padding: 0;
}
.top span {
  font-size: 14px;
  line-height: 40px;
  padding: 2px 10px;
}
.storList {
  width: 600px;
  height: 480px;
  position: absolute;
  top: 60px;
  left: 0;
  z-index: 999;
  padding: 0 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(195, 195, 195, 0.5);
  overflow-y: auto;
  overflow-x: hidden;
}
.storList_bt > p {
  font-size: 13px;
  display: inline-block;
  padding: 10px 20px;
}
.storList_bt {
  border-bottom: 1px solid #b2b2b2;
  width: 600px;
}
.storList_center {
  width: 600px;
}
.storList_center > p {
  padding: 0;
  width: 80px;
  height: 30px;
  margin: 10px;
  float: left;
  text-align: center;
  font-size: 13px;
  line-height: 30px;
}
.click {
  background-color: rgb(247, 233, 233) !important;
  border-radius: 25% / 100% !important;
  color: red !important;
}
</style>