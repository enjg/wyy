<template>
  <div class="zt">
    <form action="">
      <table>
        <thead>
          <tr>
            <td></td>
            <td>操作</td>
            <td>标题</td>
            <td>歌手</td>
            <td>专辑</td>
            <td>时间</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in SongArray.songs"
            :key="item.id"
            @dblclick="playlist(SongArray.songs, index, item)"
          >
            <td>{{ padZero(index + 1) }}</td>
            <td></td>
            <td>
              <div>
                <p>{{ item.name }}</p>
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
                  v-for="(items, index) in item.ar"
                  :key="index"
                  v-on:click.stop="listClick(items)"
                >
                  {{ items.name }}
                  <span v-show="index !== item.ar.length - 1"> /&nbsp;</span>
                </p>
              </div>
            </td>
            <td>
              <p>{{ item.al.name }}</p>
            </td>
            <td>
              <p>{{ jstime(item.dt) }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";
import { useMysinger } from "@/pinia/myStore.js";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useMyPlaylist } from "@/pinia/myPlaylist.js";

let route = useRoute();
let mySinger = useMysinger();
let router = useRouter();
const myPlaylist = useMyPlaylist();
const id = route.query.id;

let SongArray = reactive({});

onMounted(() => {
  hqsong(id);
});

function hqsong(ids) {
  console.log(ids);
  axios
    .get("http://47.108.209.241:8090/playlist/track/all", {
      params: {
        id: ids,
      },
    })
    .then((response) => {
      Object.assign(SongArray, response.data);
      console.log(response.data);
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
function playlist(array, index, center) {
  console.log(array, index, center);
  myPlaylist.PlaylistIndex(index);
  myPlaylist.postPlaylistArray(array);
  myPlaylist.postPlaylistContent(center);
}

function listClick(abc) {
  mySinger.updatedsinger(abc.id);
  router.push("/index/singer_details");
}
function padZero(num) {
  var numStr = String(num);
  if (numStr.length < 2) {
    numStr = "0" + numStr;
  }
  return numStr;
}
</script>

<style scoped>
.zt {
  width: 1170px;
}
table {
  border-collapse: collapse;
}
thead td {
  margin: 0;
  font-size: 13px;
  font-weight: 300;
  color: #656565;
}
td {
  height: 30px;
  cursor: default;
  border-spacing: 0;
  font-size: 13px;
  font-weight: 300;
  color: #656565;
  padding: 0;
  margin: 0;
}
td:nth-of-type(3) {
  color: black;
}

td p {
  float: left;

  height: 30px;
  line-height: 30px;
  overflow: hidden;
  margin: 0;
  font-size: 13px;
  font-weight: 300;
}
tbody td:nth-of-type(3) {
  display: flex;
}
tbody td:nth-of-type(3) > div {
  float: left;
}
tbody td:nth-of-type(3) > div:nth-of-type(1) {
  max-width: 100%;
  height: 100%;
  margin: 0;
  display: inline-block;
}
tbody td:nth-of-type(3) > div:nth-of-type(1) p{
  line-height: 30px;
}
tbody td:nth-of-type(3) > div:nth-of-type(2) {
  flex: 0 0 auto;
  height: 100%;
  margin: 0;
  display: inline-block;
}
tr > td:nth-of-type(4) > div {
  height: 30px;
  overflow: hidden;
}
tr > td:nth-of-type(4) > div > p {
  height: 30px;
  line-height: 30px;
  margin: 0;
  font-size: 13px;
  font-weight: 300;
  cursor: pointer;
}
tr > td:nth-of-type(4) > div > p:hover {
  color: black;
}
.mv {
  box-sizing: border-box;
  font-size: 10px !important;
  font-weight: 500 !important;
  border: 1px solid #fd544e;
  line-height: 12px !important;
  height: 12px;
  margin: 8px 3px !important;
  padding: 0 2px !important;
  color: #fd544e;
  border-radius: 2px;
}

.vip {
  color: #fd8558;
}
tr > td:nth-of-type(1) {
  /* background-color: red; */
  text-align: center;
  width: 40px;
}
tr > td:nth-of-type(2) {
  /* background-color: pink; */
  width: 80px;
}
tr > td:nth-of-type(3) {
  /* background-color: yellow; */
  width: 500px;
}
tr > td:nth-of-type(4) {
  width: 200px;
  /* background-color: green; */
}
tr > td:nth-of-type(5) {
  width: 300px;
  /* background-color: blue; */
}
tr > td:nth-of-type(6) {
  width: 50px;
  /* background-color: purple; */
}

tbody > tr:nth-of-type(2n-1) {
  /* background-color: rgb(250, 250, 250); */
}
</style>