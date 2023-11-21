<template>
  <div class="playlistDiv">
    <img @click="clickPlaylist()" src="./img/顺序播放.png" alt="" />
    <div v-if="playlistTF!==-1">
      <div class="bt">
        <p>当前播放</p>
      </div>
      <div class="button">
        <p>总{{ myPlaylist.playlistArray.length }}首</p>
        <p @click="ClearSongList()">清空列表</p>
      </div>
      <form
        action=""
        v-if="
          myPlaylist.playlistArray.length !== 0 &&
          myPlaylist.playlistContent.length !== 0
        "
      >
        <tbody>
          <tr v-for="(item, index) in myPlaylist.playlistArray" :key="index">
            <td>
              <img
                src="./img/播放.png"
                alt=""
                v-show="myPlaylist.index == index"
              />
            </td>
            <td>
              <div>
                <p
                  :class="{
                    click: myPlaylist.index == index,
                  }"
                >
                  {{ item.name }}
                </p>
              </div>
              <div>
                <p v-if="item.fee == 1" class="mv vip">VIP</p>
                <p v-if="item.fee == 1" class="mv">试听</p>
                <p v-if="item.sq !== null && item.hr == null" class="mv">SQ</p>
                <p v-if="item.hr !== null" class="mv">Hi-Res</p>
                <p v-if="item.mv !== 0" class="mv">MV</p>
              </div>
            </td>
            <td>
              <div>
                <p
                  v-for="(items, indexs) in item.ar"
                  :key="indexs"
                  v-on:click.stop="listClick(items)"
                  :class="{
                    click: myPlaylist.index == index,
                  }"
                >
                  {{ items.name }}
                  <span v-show="index !== item.ar.length - 1"> /&nbsp;</span>
                </p>
              </div>
            </td>
            <td>
              <p>{{ jstime(item.dt) }}</p>
            </td>
          </tr>
        </tbody>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useMyPlaylist } from "@/pinia/myPlaylist.js";
import { ref } from "vue";
// import { reactive } from "vue";
const myPlaylist = useMyPlaylist();

function jstime(item) {
  const minutes = Math.floor(item / 60000); // 分钟
  const seconds = Math.floor((item % 60000) / 1000); // 秒

  const formattedMinutes = minutes.toString().padStart(2, "0"); // 将分钟数补全为2位
  const formattedSeconds = seconds.toString().padStart(2, "0"); // 将秒数补全为2位

  return `${formattedMinutes}:${formattedSeconds}`;
}
function ClearSongList() {
  myPlaylist.playlistArray.length = 0;
  myPlaylist.playlistContent.length = 0;
  // myPlaylist.index = null;
}
let playlistTF = ref(-1);
function clickPlaylist() {
  playlistTF.value *= -1;
}
</script>

<style scoped>
p {
  margin: 0;
}
.click {
  color: #fd544e !important;
}
.playlistDiv {
  height: 70px;
  width: 20px;
  position: absolute;
  right: 50px;
}
.playlistDiv > img {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.playlistDiv > div {
  position: absolute;
  right: -50px;
  bottom: 70px;
  height: calc(100vh - 125px);
  width: 420px;
  background-color: white;
  box-shadow: -2px -2px 5px 0px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  overflow-x: hidden;
}
.bt {
  height: 50px;
  width: 100%;
}
.bt > p {
  margin: 0;
  line-height: 50px;
  font-weight: bold;
  font-size: 20px;
  margin-left: 20px;
}
.button {
  height: 30px;
  width: 100%;
}
.button > p:nth-of-type(1) {
  margin: 0;
  float: left;
  line-height: 30px;
  font-size: 13px;
  color: #b2b2b2;
  margin-left: 20px;
  font-weight: 300;
}
.button > p:nth-of-type(2) {
  margin: 0;
  float: right;
  font-size: 13px;
  font-weight: 300;
  margin-right: 20px;
  color: blue;
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
  color: #fd544e;
  border-radius: 2px;
}

.vip {
  color: #fd8558;
}
tr {
  width: 420px;
}
tr:nth-of-type(2n-1) {
  background-color: #fafafa;
}
td {
  height: 30px;
  padding: 0;
  margin: 0;
  position: relative;
}
td:nth-of-type(1) {
  width: 20px;
}
td:nth-of-type(2) {
  width: 200px;
  height: 30px;
  overflow: hidden !important;
}
td:nth-of-type(3) {
  width: 130px;
}
td:nth-of-type(4) {
  width: 70px;
}
td p {
  float: left;
  margin: 0;
  font-size: 11px;
  line-height: 30px;
  font-weight: 300;
}
td:nth-of-type(1) > img {
  width: 10px;
  height: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
tr > td:nth-of-type(2) {
  display: flex;
}
tr > td:nth-of-type(2) > div {
  float: left;
}
tr > td:nth-of-type(2) > div:nth-of-type(1) {
  max-width: 100%;
  height: 100%;
  display: inline-block;
}
tr > td:nth-of-type(2) > div:nth-of-type(2) {
  flex: 0 0 auto;
  height: 100%;
  display: inline-block;
}
tr > td:nth-of-type(3) > div {
  width: 130px;
  height: 30px;
  overflow: hidden;
}
tbody > tr:nth-of-type(2n-1) {
    background-color: #fafafa;
}

</style>