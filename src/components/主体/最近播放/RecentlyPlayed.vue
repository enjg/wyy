<template>
  <div class="zt">
    <div class="bt">
      <p>最近播放</p>
      <p>共{{ myPlaylist.PlaybackHistory.length }}首</p>
      <p @click="myPlaylist.PlaybackHistory.length = 0">清空列表</p>
    </div>
    <div class="button">
      <div
        @click="playlist()"
        :class="{ list: myPlaylist.PlaybackHistory.length === 0 }"
      >
        <img src="../../../assets/image/bfq.png" alt="" />
        <p>播出全部</p>
      </div>
    </div>
    <table v-if="myPlaylist.PlaybackHistory.length">
      <thead>
        <tr>
          <td></td>
          <td><p>音乐标题</p></td>
          <td><p>歌手</p></td>
          <td><p>播放时间</p></td>
        </tr>
      </thead>
      <tbody>
        <tr
          @dblclick="hqurl(item.conent)"
          v-for="(item, index) in myPlaylist.PlaybackHistory"
          :key="index"
        >
          <td>
            <p>{{ padWithZero(index + 1) }}</p>
          </td>
          <td>
            <p>{{ item.conent.name }}</p>
            <p v-if="item.conent.fee == 1" class="mv vip">VIP</p>
            <p v-if="item.conent.fee == 1" class="mv">试听</p>
            <p
              v-if="item.conent.sq !== null && item.conent.hr == null"
              class="mv"
            >
              SQ
            </p>
            <p v-if="item.conent.hr !== null" class="mv">Hi-Res</p>
            <p v-if="item.conent.mv !== 0" class="mv">MV</p>
          </td>
          <td>
            <p v-on:click.stop="listClick(item.conent.ar[0].id)">
              {{ item.conent.ar[0].name }}
            </p>
          </td>
          <td>
            <p>{{ getTimeDifference(item.time) }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="ts">
        <img src="./img/未标题-10.png" alt="">
        <p>你还没有播放任何音乐</p>
    </div>
  </div>
</template>

<script setup>
import { useMyPlaylist } from "@/pinia/myPlaylist.js";
import { useRouter } from "vue-router";
import { useMysinger } from "@/pinia/myStore.js";

let mySinger = useMysinger();
let router = useRouter();
const myPlaylist = useMyPlaylist();
function getTimeDifference(timestamp) {
  const currentTime = Date.now();
  const timeDifference = currentTime - timestamp;

  // 转换为秒数
  const seconds = Math.floor(timeDifference / 1000);

  // 转换为分钟数
  const minutes = Math.floor(seconds / 60);

  // 转换为小时数
  const hours = Math.floor(minutes / 60);

  // 转换为天数
  const days = Math.floor(hours / 24);

  // 返回描述信息
  if (days > 0) {
    return `${days}天前`;
  } else if (hours > 0) {
    return `${hours}小时前`;
  } else if (minutes > 0) {
    return `${minutes}分钟前`;
  } else {
    return `刚刚`;
  }
}
function padWithZero(number) {
  const str = String(number); // 将数字转换为字符串
  if (str.length < 2) {
    return "0" + str; // 在字符串前面补齐'0'
  } else {
    return str; // 字符串已经足够长，无需补齐
  }
}
function hqurl(center) {
  myPlaylist.postPlaylistArrayPush(center);
}
function playlist() {
  let array = [];
  myPlaylist.PlaybackHistory.forEach((element) => {
    array.push(element.conent);
  });
  console.log(array);
  myPlaylist.PlaylistIndex(0);
  myPlaylist.postPlaylistArray(array);
  myPlaylist.postPlaylistContent(array[0]);
}
function listClick(id) {
  mySinger.updatedsinger(id);
  router.push("/index/singer_details");
}
</script>

<style scoped>
.ts{
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 200px;
    transform: translateX(-50%);
}
.ts>img{
    width: 200px;
}
.ts>p{
    margin: 0;
    margin-top: 30px;
    width: 200px;
    text-align: center;
    font-weight: 300;
    font-size: 13px;
    color: #999999;
}
.list {
  opacity: 0.5;
  cursor: not-allowed;
}
.mv {
  box-sizing: border-box;
  font-size: 10px !important;
  font-weight: 500 !important;
  border: 1px solid #fd544e;
  line-height: 12px !important;
  margin: 9px 3px !important;
  padding: 0 2px !important;
  height: auto !important;
  color: #fd544e !important;
  border-radius: 2px;
}

.vip {
  color: #fd8558 !important;
}
.zt {
  width: 1170px;
  margin: auto;
  margin-top: 20px;
  position: relative;
}
.bt {
  height: 40px;
}
.bt > p:nth-of-type(1) {
  margin: 0;
  font-size: 20px;
  line-height: 40px;
  font-weight: bold;
  float: left;
}
.bt > p:nth-of-type(2) {
  margin: 0;
  font-size: 13px;
  line-height: 40px;
  font-weight: 300;
  float: left;
  margin-left: 10px;
  color: #888888;
}
.bt > p:nth-of-type(3) {
  margin: 0;
  font-size: 15px;
  line-height: 40px;
  font-weight: 300;
  float: right;
  color: #507daf;
}
.button {
  display: inline-block;
  width: 100%;
  margin-top: 20px;
}
.button > div {
  float: left;
  height: 32px;
  width: 140px;
  background-color: white;
  border-radius: 20px;
  margin-right: 10px;
  border: 1px solid #b2b2b2;
  position: relative;
}
.button p {
  margin: 0;
  font-size: 14px;
  line-height: 32px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.button img {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
}
.button > div:nth-of-type(1) {
  background-color: red;
  border: none;
  color: white;
}
.button > div:nth-of-type(1):hover {
  background-color: #cd3232;
}
table {
  margin-top: 20px;
  border-collapse: collapse;
}
table p {
  margin: 0;
  font-size: 13px;
  line-height: 30px;
  font-weight: 300;
  color: #888888;
}
tbody td:nth-of-type(2) p {
  color: #323232;
  float: left;
}
tbody td:nth-of-type(3) p {
  color: #323232;
}
tbody td:nth-of-type(3) p:hover {
  color: #000000;
}
td {
  height: 30px;
}

tr > td:nth-of-type(1) {
  width: 50px;
  text-align: center;
}

tr > td:nth-of-type(2) {
  width: 560px;
}
tr > td:nth-of-type(3) {
  width: 336px;
}
tr > td:nth-of-type(4) {
  width: 224px;
}
tbody > tr:nth-of-type(2n-1) {
  background-color: #fafafa;
}
tbody > tr:hover {
  background-color: #f2f2f3;
}
</style>