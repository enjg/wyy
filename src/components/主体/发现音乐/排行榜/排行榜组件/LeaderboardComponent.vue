<template>
  <div class="zt">
    <div class="center_left">
      <img
        :src="Props.message.coverImgUrl"
        alt=""
        @click="tzgd(Props.message.id)"
      />
    </div>
    <div class="center_right">
      <form action="">
        <tbody>
          <tr
            v-for="(item, index) in songlist"
            :key="index"
            @click="postSongListClick(item)"
          >
            <td :style="{ color: index < 3 ? 'red' : '' }">
              {{ index + 1 }}
            </td>
            <td>
              {{ item.name }}<span v-if="item.tns">({{ item.tns[0] }})</span
              ><span v-if="item.alia">({{ item.alia[0] }})</span>
            </td>
            <td>{{ item.ar[0].name }}</td>
          </tr>
        </tbody>
      </form>
      <p>查看全部></p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { defineProps, onMounted, reactive } from "vue";
import { useMyStore } from "@/pinia/myStore.js";
import { useRouter } from "vue-router";

const Props = defineProps({
  message: Object,
});
onMounted(() => {
  console.log(Props.message);
  getSongList();
});
let songlist = reactive([]);
function getSongList() {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/playlist/track/all", {
      params: {
        id: Props.message.id,
        limit: 5,
        offset: 0,
        timestamp: time,
      },
    })
    .then((response) => {
      Object.assign(songlist, response.data.songs);
      console.log(response.data.songs);
    })
    .catch((error) => {
      console.error(error);
    });
}
const myStore = useMyStore();
function postSongListClick(center) {
  const songobj = {
    id: center.id,
    img: center.al.picUrl,
    name: center.ar[0].name,
    songname: center.name,
  };
  myStore.setMessage(songobj);
}

const router = useRouter();
function tzgd(a) {
  console.log(a);
  router.push({ path: "/index/playlist_details", query: { paramA: a } });
}
</script>

<style scoped>
.zt {
  min-width: 1070px;
  height: 200px;
  margin: 30px 0;
}
.center_left {
  float: left;
  width: 170px;
}
.center_right {
  float: left;
  width: 880px;
  margin-left: 20px;
}
.center_left > img {
  width: 170px;
  height: 170px;
  border-radius: 5px;
  cursor: pointer;
}
form tr {
  height: 34px;
}
tr td {
  font-size: 14px;
  color: rgb(136, 136, 136);
}
tr > td:nth-of-type(1) {
  width: 30px;
}
tr > td:nth-of-type(2) {
  width: 650px;
  color: black;
}
tr > td:nth-of-type(3) {
  width: 200px;
  text-align: right;
}
tr:nth-child(2n-1) {
  background-color: rgb(250, 250, 250);
}
tr:hover {
  background-color: rgb(240, 240, 240);
}
.center_right > p {
  margin: 0;
  line-height: 30px;
  color: rgb(136, 136, 136);
  cursor: pointer;
}
td > span {
  color: rgb(136, 136, 136);
}
</style>