<template>
  <div class="zt">
    <form action="">
      <tbody>
        <tr
          v-for="(item, index) in SongList"
          :key="index"
          @click="songplay(item)"
        >
        
          <td>
            <p>{{ padZero(index + 1) }}</p>
          </td>
          <td>
            <img :src="item.album.picUrl" alt="" />
            <img src="../../../../../../assets/image/未标题-2.png" alt="">
          </td>
          <td>
            <!-- <p v-if="item.fee == 1" class="mv vip">VIP</p>
            <p v-if="item.fee == 1" class="mv">试听</p> -->
            <!-- <p v-if="item.sqMusic !== null && item.song.hrMusic == null" class="mv">SQ</p> -->
            <!-- <p v-if="item.hMusic !== null" class="mv">Hi-Res</p> -->
            <!-- <p v-if="item.mvid !== 0" class="mv">MV</p> -->
            <p>{{ item.name }}</p>
          </td>
          <td>
            <p>{{ item.album.artists[0].name }}</p>
          </td>
          <td>
            <p>{{ item.album.name }}</p>
          </td>
          <td>
            <p v-if="item.mMusic && item.mMusic.playTime">
              {{ jstime(item.mMusic.playTime) }}
            </p>
          </td>
        </tr>
      </tbody>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { defineProps, onMounted, reactive, watch } from "vue";
import { useMyStore } from "@/pinia/myStore.js";

const myStore = useMyStore();
const Props = defineProps({
  message: Number,
});
onMounted(() => {
  getSongList(Props.message);
});
watch(
  () => Props.message,
  (newValue) => {
    getSongList(newValue);
  }
);
let SongList = reactive([]);
function getSongList(type) {
  axios
    .get("http://47.108.209.241:8090/top/song", {
      params: {
        type: type,
      },
    })
    .then((res) => {
      SongList.length = 0;
      Object.assign(SongList, res.data.data);
    })
    .catch((err) => {
      console.error(err);
    });
}
function jstime(item) {
  const minutes = Math.floor(item / 60000); // 分钟
  const seconds = Math.floor((item % 60000) / 1000); // 秒

  const formattedMinutes = minutes.toString().padStart(2, "0"); // 将分钟数补全为2位
  const formattedSeconds = seconds.toString().padStart(2, "0"); // 将秒数补全为2位

  return `${formattedMinutes}:${formattedSeconds}`;
}
function songplay(center) {
  const songobj = {
    id: center.id,
    img: center.album.picUrl,
    name: center.album.name,
    songname: center.album.artists[0].name,
  };
  myStore.setMessage(songobj);
}
function padZero(num) {
  var numStr = String(num);
  if (numStr.length < 2) {
    numStr = '0' + numStr;
  }
  return numStr;
}
</script>

<style scoped>
p{
  margin: 0;
  font-weight: 300;
}
form tr {
  min-width: 1070px;
  height: 80px;
  margin: 10px 0;
}
tr:nth-child(2n-1) {
  background-color: rgb(250, 250, 250);
}
tr:hover {
  background-color: rgb(240, 240, 240);
}
td {
  text-align: left;
  font-size: 13px;
  color: rgb(125, 125, 125);
}
form tr td:nth-child(2) img:nth-of-type(1) {
  width: 60px;
  height: 60px;
  border-radius: 5px;
}
form tr td:nth-child(2) img:nth-of-type(2) {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
tr td:nth-child(1) {
  width: 35px;
  text-align: center;
  color: rgb(180, 180, 180);
}
tr td:nth-child(2) {
  width: 60px;
  position: relative;
}
tr td:nth-child(3) {
  width: 440px;
  color: black;
}
tr td:nth-child(4) {
  width: 200px;
}
tr td:nth-child(5) {
  width: 280px;
}
tr td:nth-child(6) {
  width: 55px;
  text-align: center;
}
tr > td:nth-child(3) p {
  float: left;
  line-height: 80px;
  font-size: 14px;
  margin: 0;
  margin-left: 10px;
  font-weight: 300;
}
/* td>p:nth-child(3){
  color: rgb(179, 179, 179);
} */
</style>