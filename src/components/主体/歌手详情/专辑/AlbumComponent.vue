<template>
  <div class="zt" v-if="top50.length > 0">
    <div class="top50">
      <div class="top50left">
        <img src="../../../../assets/image/top50.jpg" alt="" />
      </div>
      <div class="top50right" ref="topDiv">
        <p>热门50首</p>
        <form action="">
          <tbody>
            <tr
              v-for="(item, key) in top50"
              :key="item.id"
              @click="songplay(top50, key)"
            >
              <td>{{ key + 1 }}</td>
              <td><img src="../../../../assets/image/喜欢.png" alt="" /></td>
              <td>
                <img src="../../../../assets/image/chongzhi.png" alt="" />
              </td>
              <td>
                <p>{{ item.name }}</p>
                <p v-if="item.tns">({{ item.tns[0] }})</p>
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
        <input type="button" value="查看全部50首>" @click="getlistall()" />
      </div>
    </div>
    <div ref="center">
      <AlbumS
        v-for="(item, key) in albumList"
        :key="key"
        :message="item"
      ></AlbumS>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useMysinger } from "@/pinia/myStore.js";
import axios from "axios";
import AlbumS from "./专辑组件/AlbumS.vue";
import { useMyPlaylist } from "@/pinia/myPlaylist.js";

const myPlaylist = useMyPlaylist();
let topDiv = ref(null);
let mySinger = useMysinger();
let top50 = reactive([]);
let albumList = reactive([]);
let center = ref(null);
onMounted(() => {
  gettop50();
  getAlbumList();
  window.addEventListener("scroll", handleScroll);
});
function gettop50() {
  axios
    .get("http://47.108.209.241:8090/artist/top/song", {
      params: {
        id: mySinger.id,
      },
    })
    .then((response) => {
      Object.assign(top50, response.data.songs);
    })
    .catch((error) => {
      console.error(error);
    });
}
function songplay(array, index) {
  console.log(index)
  myPlaylist.postPlaylistArray(array);
  myPlaylist.PlaylistIndex(index);

}
function jstime(item) {
  const minutes = Math.floor(item / 60000); // 分钟
  const seconds = Math.floor((item % 60000) / 1000); // 秒

  const formattedMinutes = minutes.toString().padStart(2, "0"); // 将分钟数补全为2位
  const formattedSeconds = seconds.toString().padStart(2, "0"); // 将秒数补全为2位

  return `${formattedMinutes}:${formattedSeconds}`;
}
function getlistall() {
  console.log(topDiv.value);
  const formDiv = topDiv.value.querySelector("form");
  const inputDiv = topDiv.value.querySelector("input");
  formDiv.style.height = "auto";
  inputDiv.style.display = "none";
}
let offset = 1;
function getAlbumList() {
  axios
    .get("http://47.108.209.241:8090/artist/album", {
      params: {
        id: mySinger.id,
        limit: 5,
        offset: (offset - 1) * 5,
      },
    })
    .then((response) => {
      if (offset == 1) {
        Object.assign(albumList, response.data.hotAlbums);
      } else {
        albumList.push(...response.data.hotAlbums);
      }
      offset++;
    })
    .catch((error) => {
      console.error(error);
    });
}
let lastTriggerTime = 0;
function handleScroll() {
  const currentTime = Date.now();
  if (center.value !== null) {
    const divs = center.value.querySelectorAll("div");
    const lastDiv = divs[divs.length - 1];
    const lastDivRect = lastDiv.getBoundingClientRect();
    if (lastDivRect.top < window.innerHeight) {
      if (currentTime - lastTriggerTime > 300) {
        console.log("加载更多内容");
        getAlbumList();
      }
      lastTriggerTime = currentTime;
    }
  }
}
</script>

<style scoped>
.zt {
}
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
.top50left {
  float: left;
  width: 145px;
}
.top50left img {
  width: 145px;
  height: 145px;
  border-radius: 5px;
}
.top50right {
  float: left;
  width: calc(100% - 205px);
  margin-left: 60px;
}
.top50right > p {
  margin: 0px;
  font-size: 18px;
  font-weight: bold;
}
form {
  margin-top: 10px;
  height: 350px;
  width: 100%;
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
  font-weight: 300;
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
.top50right input {
  width: 930px;
  height: 40px;
  text-align: right;
  background-color: rgb(245, 245, 245);
  color: rgb(142, 142, 142);
  border: 0;
  font-size: 16px;
}
.top50right input:hover {
  color: black;
}
.center > * {
  margin: 20px 0;
}
</style>