<template>
  <div>
    <div class="gnann">
      <div>
        <img src="../../../../assets/image/bfq.png" alt="" />
        <p>播出全部</p>
      </div>
      <div>
        <img src="../../../../assets/image/下载.png" alt="" />
        <p>下载全部</p>
      </div>
    </div>
    <form action="">
      <table>
        <thead>
          <tr>
            <td></td>
            <td></td>
            <td>音乐标题</td>
            <td>歌手</td>
            <td>专辑</td>
            <td>时长</td>
            <td>热度</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in listArray"
            :key="item.id"
            @click="hqurl(item)"
          >
            <td>
              <p>{{ padZero(index + 1) }}</p>
            </td>
            <td></td>
            <td>
              <p v-html="highlightColor(item.name)"></p>
              <p v-if="item.fee == 1" class="mv vip">VIP</p>
              <p v-if="item.fee == 1" class="mv">试听</p>
              <p v-if="item.sq !== null && item.hr == null" class="mv">SQ</p>
              <p v-if="item.hr !== null" class="mv">Hi-Res</p>
              <p v-if="item.mv !== 0" class="mv">MV</p>
            </td>
            <td>
              <p
                v-for="(items, index) in item.ar"
                :key="index"
                v-on:click.stop="listClick(items)"
              >
                {{ items.name }}
                <span v-show="index !== item.ar.length - 1"> /&nbsp;</span>
              </p>
            </td>
            <td>
              <p v-on:click.stop="pushClick(item.al.id)">{{ item.al.name }}</p>
            </td>
            <td>
              <p>{{ jstime(item.dt) }}</p>
            </td>
            <td>
              <div>
                <div :style="{ width: `${item.pop}%` }"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMysinger } from "@/pinia/myStore.js";
import { useMyPlaylist } from "@/pinia/myPlaylist.js";

const myPlaylist = useMyPlaylist();
let mySinger = useMysinger();
const route = useRoute();
const router = useRouter();
onMounted(() => {
  getCloudsearch(1, route.query.text);
});
let listArray = reactive([]);
function getCloudsearch(types, text) {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/cloudsearch", {
      params: {
        timestamp: time,
        type: types,
        keywords: text,
        limit: 100,
      },
    })
    .then((res) => {
      Object.assign(listArray, res.data.result.songs);
    })
    .catch((err) => {
      console.error(err);
    });
}
function hqurl(center) {
  myPlaylist.postPlaylistArrayPush(center);
}
function padZero(num) {
  var numStr = String(num);
  if (numStr.length < 2) {
    numStr = "0" + numStr;
  }
  return numStr;
}
function jstime(item) {
  const minutes = Math.floor(item / 60000); // 分钟
  const seconds = Math.floor((item % 60000) / 1000); // 秒

  const formattedMinutes = minutes.toString().padStart(2, "0"); // 将分钟数补全为2位
  const formattedSeconds = seconds.toString().padStart(2, "0"); // 将秒数补全为2位

  return `${formattedMinutes}:${formattedSeconds}`;
}
function listClick(abc) {
  mySinger.updatedsinger(abc.id);
  router.push("/index/singer_details");
}
function pushClick(id) {
  router.push({ path: "/index/album_details", query: { paramA: id } });
}
function highlightColor(text) {
  const regex = new RegExp(route.query.text, "g");
  return text.replace(regex, '<span style="color: #6b8fb8;">$&</span>');
}
</script>

<style scoped>
.gnann {
  width: 100%;
  height: 50px;
  clear: both;
  margin: 10px 0;
}
.gnann > div {
  float: left;
  padding: 0 20px;
  height: 30px;
  background-color: white;
  border-radius: 20px;
  margin-right: 10px;
  margin-top: 10px;
  border: 1px solid #b2b2b2;
}
.gnann p {
  margin: 0;
  font-size: 14px;
  font-weight: 300;
  line-height: 30px;
  float: left;
}
.gnann img {
  float: left;
  height: 20px;
  width: 20px;
  margin-top: 5px;
}
.gnann > div:nth-of-type(1) {
  background-color: red;
  border: none;
  color: white;
}
.mv {
  font-size: 10px;
  border: 1px solid #fd544e;
  line-height: 12px;
  padding: 0 2px;
  margin: 8px 0px;
  margin-left: 5px;
  color: #fd544e;
  border-radius: 2px;
}
.vip {
  color: #fd8558;
}
tr > td:nth-of-type(7) > div {
  height: 6px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 10% / 100%;
}
tr > td:nth-of-type(7) > div:nth-of-type(1) {
  width: 100%;
  background-color: rgb(218, 218, 218);
  overflow: hidden;
}
tr > td:nth-of-type(7) > div > div {
  height: 6px;
  background-color: rgb(200, 200, 200);
}
.zt {
  width: 1170px;
}
table {
  border-collapse: collapse;
}
thead td {
  margin: 0;
  font-size: 12px;
  font-weight: 300;
  color: #656565;
}
td {
  height: 30px;
  cursor: default;
  border-spacing: 0;
  overflow: hidden;
  font-size: 12px;
  font-weight: 300;
  color: #656565;
  position: relative;
}
td:nth-of-type(3) {
  color: black;
}
td > p {
  float: left;
  margin: 0;
}
td > p:nth-of-type(1) {
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  margin: 0;
}
tr > td:nth-of-type(4) > p {
  height: 30px;
  line-height: 30px;
  margin: 0;
  font-size: 13px;
  font-weight: 300;
}
tr > td:nth-of-type(4) > p:hover {
  color: black;
}

tr > td:nth-of-type(1) {
  /* background-color: red; */
  text-align: center;
  width: 40px;
}
tr > td:nth-of-type(2) {
  /* background-color: pink; */
  width: 60px;
}
tr > td:nth-of-type(3) {
  /* background-color: yellow; */
  width: 450px;
}
tr > td:nth-of-type(4) {
  width: 200px;
  cursor: pointer;
  /* background-color: green; */
}
tr > td:nth-of-type(5) {
  width: 250px;
  /* background-color: blue; */
}
tr > td:nth-of-type(6) {
  width: 85px;
  /* background-color: purple; */
}
tr > td:nth-of-type(7) {
  width: 85px;
  /* background-color: purple; */
}

tbody > tr:nth-of-type(2n-1) {
  background-color: rgb(250, 250, 250);
}
tbody > tr:hover {
  background-color: rgb(240, 240, 240);
}
</style>