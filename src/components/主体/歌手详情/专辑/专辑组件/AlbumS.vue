<template>
  <div class="zt">
    <div class="center-left">
      <img @click="tzgd(Props.message.id)" :src="Props.message.blurPicUrl" alt="" />
      <img :src="Props.message.artist.picUrl" alt="" />
      <p>{{ formatDate(Props.message.publishTime) }}</p>
    </div>
    <div class="center-right" ref="centerrightDiv">
      <p>{{ Props.message.name }}</p>
      <form action="">
        <tbody>
          <tr
            v-for="(item, key) in AlbumTrackList"
            :key="item.id"
            @click="songplay(item)"
          >
            <td>{{ key + 1 }}</td>
            <td><img src="../../../../../assets/image/喜欢.png" alt="" /></td>
            <td>
              <img src="../../../../../assets/image/chongzhi.png" alt="" />
            </td>
            <td>
              <p>{{ item.name }}</p>
              <p v-if="item.fee == 1" class="mv vip">VIP</p>
              <p v-if="item.fee == 1" class="mv">试听</p>
              <p v-if="item.sq !== null && item.hr == null" class="mv">SQ</p>
              <p v-if="item.hr !== null" class="mv">Hi-Res</p>
              <p v-if="item.mv !== 0" class="mv">MV</p>
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
import { useRouter } from "vue-router";

const router=useRouter();
const myStore = useMyStore();
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

  const formattedMinutes = minutes.toString().padStart(2, "0"); // 将分钟数补全为2位
  const formattedSeconds = seconds.toString().padStart(2, "0"); // 将秒数补全为2位

  return `${formattedMinutes}:${formattedSeconds}`;
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
function tzgd(a){
    console.log(a);
    router.push({ path: '/index/album_details', query: { paramA: a } });
}
</script>

<style scoped>
td > p {
  margin: 0;
  float: left;
  line-height: 35px;
}
.mv {
  box-sizing: border-box;
  font-size: 10px;
  border: 1px solid #fd544e;
  line-height: 13px;
  margin: 10px 3px;
  padding: 0 2px;
  color: #fd544e;
  border-radius: 2px;
}
.vip {
  color: #fd8558;
}
.zt {
  width: 100%;
  padding-top: 50px;
  height: auto;
  clear: both;
}
.center-left {
  position: relative;
  float: left;
}
.center-left p {
  margin: 0;
  color: rgb(97, 97, 97);
}
.center-right {
  width: calc(100% - 205px);
  float: left;
  margin-left: 60px;
}
.center-left img:nth-child(1) {
  height: 145px;
  width: 145px;
  border-radius: 5px;
  position: absolute;
  z-index: 9;
}
.center-left img:nth-child(2) {
  height: 145px;
  width: 145px;
  border-radius: 100%;
  position: relative;
  left: 20px;
}
.center-right > p {
  margin: 0px;
  font-size: 18px;
  font-weight: bold;
}
form {
  max-height: 350px;
  overflow: hidden;
  margin-top: 10px;
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
  font-size: 13px;

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
  width: 735px;
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