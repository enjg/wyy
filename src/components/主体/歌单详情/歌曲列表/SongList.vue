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
            @click="hqurl(item.id, item.al.picUrl, item.name, item.ar[0].name)"
          >
            <td>{{ index + 1 }}</td>
            <td></td>
            <td>
              <p>{{ item.name }}</p>
              <p v-if="item.fee == 1" class="mv vip">VIP</p>
              <p v-if="item.fee == 1" class="mv">试听</p>
              <p v-if="item.sq !== null && item.hr == null" class="mv">SQ</p>
              <p v-if="item.hr !== null" class="mv">Hi-Res</p>
              <p v-if="item.mv !== 0" class="mv">MV</p>
            </td>
            <td>
              <p>{{ item.ar[0].name }}</p>
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
import { defineProps, onMounted, reactive } from "vue";
import axios from "axios";
import { useMyStore } from "@/pinia/myStore.js";
import { useLoginStore } from "@/pinia/myLogin.js";

const myLogin = useLoginStore();
const myStore = useMyStore();
const Props = defineProps({
  message: Array,
});
let SongArray = reactive({});

onMounted(() => {
  hqsong();
});

function hqsong() {
  axios
    .get("http://47.108.209.241:8090/playlist/track/all", {
      params: {
        id: Props.message,
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
function hqurl(id, imgc, namec, songnamec) {
  axios
    .get(
      "https://service-a871bani-1320463985.gz.apigw.tencentcs.com/release/check/music",
      {
        params: {
          id: id,
          cookie: myLogin.cookie,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      if (response.data.message == "ok") {
        myStore.setMessage({
          id: id,
          img: imgc,
          name: namec,
          songname: songnamec,
        });
      } else {
        console.log(response.data);
        alert(response.data.message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
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
}
td:nth-of-type(1){
  font-size: 13px;
  font-weight: 300;
  color: #656565;
}
td > p {
  float: left;
}
td > p:nth-of-type(1) {
  height: 35px;
  line-height: 35px;
  overflow: hidden;
  margin: 0;
  font-size: 13px;
  font-weight: 300;
}
.mv {
  box-sizing: border-box;
  font-size: 10px;
  border: 1px solid #fd544e;
  line-height: 12px;
  margin: 11.5px 3px;
  padding: 0 2px;
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
  cursor: pointer;
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
  background-color: rgb(250, 250, 250);
}
</style>