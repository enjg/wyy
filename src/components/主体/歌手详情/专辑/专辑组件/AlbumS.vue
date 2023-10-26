<template>
  <div class="zt">
    <div class="center-left">
      <img :src="Props.message.blurPicUrl" alt="" />
      <img :src="Props.message.artist.picUrl" alt="" />
      <p>{{ formatDate(Props.message.publishTime) }}</p>
    </div>
    <div class="center-right" ref="centerrightDiv">
      <h2>{{ Props.message.name }}</h2>
      <form action="">
        <tbody>
          <tr
            v-for="(item, key) in AlbumTrackList"
            :key="item.id"
            @click="songplay(item)"
          >
            <td>{{ key + 1 }}</td>
            <td><img src="../../../../../assets/image/喜欢.png" alt="" /></td>
            <td><img src="../../../../../assets/image/chongzhi.png" alt="" /></td>
            <td>
              {{ item.name }}
            </td>
            <td>{{ jstime(item.dt) }}</td>
          </tr>
        </tbody>
      </form>
      <input
        v-if="AlbumTrackList.length > 10"
        type="button"
        :value="`查看全部${AlbumTrackList.length}首`"
        @click="getlistall()"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, reactive, ref } from "vue";
import axios from "axios";
import { useMyStore } from "@/pinia/myStore.js";

const myStore=useMyStore();
const Props = defineProps({
  message: Object,
});
let AlbumTrackList = reactive([]);
let centerrightDiv = ref(null);

onMounted(() => {
  getAlbumTrackList();
});
function getAlbumTrackList() {
  axios
    .get("http://47.108.209.241:8090/album", {
      params: {
        id: Props.message.id,
      },
    })
    .then((response) => {
      Object.assign(AlbumTrackList, response.data.songs);
    })
    .catch((error) => {
      console.error(error);
    });
}
function jstime(item) {
  const minutes = Math.floor(item / 60000); // 分钟
  const seconds = Math.floor((item % 60000) / 1000); // 秒
  return `${minutes} . ${seconds} `;
}
function getlistall() {
  const formDiv = centerrightDiv.value.querySelector("form");
  const inputDiv = centerrightDiv.value.querySelector("input");
  formDiv.style.maxHeight = "none";
  inputDiv.style.display = "none";
}
function formatDate(milliseconds) {
  const date = new Date(milliseconds);
  const year = date.getFullYear(); // 获取年份
  const month = date.getMonth() + 1; // 获取月份（注意月份是从 0 开始的，所以需要加 1）
  const day = date.getDate(); // 获取日期

  // 将月份和日期转换为两位数的格式
  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");

  // 返回格式化后的年月日字符串
  return `${year}-${formattedMonth}-${formattedDay}`;
}
function songplay(center) {
  const songobj = {
    id: center.id,
    img: center.al.picUrl,
    name: center.name,
    songname: center.ar[0].name,
  };
  myStore.setMessage(songobj);
}
</script>

<style scoped>
.zt {
  width: 100%;
  padding-top: 50px;
  height: auto;
  clear: both;
}
.center-left {
  position: relative;
  float: left;
  width: 240px;
}
.center-left p {
  margin: 0;
  color: rgb(97, 97, 97);
}
.center-right {
  width: 930px;
  float: left;
}
.center-left img:nth-child(1) {
  height: 180px;
  width: 180px;
  border-radius: 5px;
  position: absolute;
  z-index: 9;
}
.center-left img:nth-child(2) {
  height: 180px;
  width: 180px;
  border-radius: 100%;
  position: relative;
  left: 25px;
}
.center-right h2 {
  margin: 5px 0px;
}
form {
  max-height: 350px;
  overflow: hidden;
}
td {
  border: none;
  padding: 0;
}
tr {
  border: none;
  padding: 0;
}
td > img {
  width: 20px;
  height: 20px;
  margin: auto;
}
td {
  text-align: center;
  height: 35px;
  color: rgb(142, 142, 142);
}
tr td:nth-child(1) {
  width: 30px;
  margin: auto;
  padding: 0;
}
tr td:nth-child(2) {
  width: 30px;
}
tr td:nth-child(3) {
  width: 30px;
}
tr td:nth-child(4) {
  font-size: 10px;
  width: 700px;
  text-align: left;
  color: black;
  padding-left: 10px;
}
tr td:nth-child(5) {
  width: 140px;
  text-align: left;
}
tr {
  background-color: rgb(245, 245, 245);
}
tr:nth-child(2n) {
  background-color: white;
}
td > span {
  color: rgb(142, 142, 142);
}
tr:hover {
  background-color: rgb(239, 239, 239);
}
.center-right input {
  width: 930px;
  height: 40px;
  text-align: right;
  background-color: rgb(245, 245, 245);
  color: rgb(142, 142, 142);
  border: 0;
  font-size: 16px;
}
.center-right input:hover {
  color: black;
}
</style>