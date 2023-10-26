<template>
  <div class="zt">
    <div class="gsxq">
      <div class="gsxq_left">
        <img :src="artist.img1v1Url" alt="" />
      </div>
      <div class="gsxq_right">
        <h2>{{ artist.name }}</h2>
        <div class="gsxq_bm">
          <span v-for="(item, key) in artist.alias" :key="key"
            >{{ item }}&nbsp;&nbsp;</span
          >
        </div>
        <input type="button" value="收藏" />
        <div class="gsxq_right_xq">
          <span>单曲数:{{ artist.musicSize }}</span
          >&nbsp;&nbsp;&nbsp;&nbsp;
          <span>专辑数:{{ artist.albumSize }}</span>
        </div>
        <span>{{ artist.id }}</span>
      </div>
    </div>
    <div class="center">
      <ul>
        <li
          v-for="(item, key) in singerFeatureArray"
          :key="key"
          @click="routerPush(item.path)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="router">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import { useMysinger } from "@/pinia/myStore.js";

let mySinger = useMysinger();
const router = useRouter();
let singerFeatureArray = reactive([
  {
    name: "专辑",
    path: "/index/singer_details/album_component",
  },
  {
    name: "MV",
    path: "/index/singer_details/singer_music_video",
  },
  {
    name: "歌手详情",
    path: "/index/singer_details/singer_details_description",
  },
  {
    name: "相似歌手",
    path: "/index/singer_details/similar_singer",
  },
  {
    name: "演出",
    path: "",
  },
]);
onMounted(() => {
  getArtists(mySinger.id);
});
watch(()=>mySinger.id,(newValue)=>{
  getArtists(newValue)
})
let artist = reactive({});
function getArtists(center) {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/artists", {
      params: {
        timestamp: time,
        id: center,
      },
    })
    .then((res) => {
      Object.assign(artist, res.data.artist);
      console.log(res.data.artist);
    })
    .catch((err) => {
      console.error(err);
    });
}

function routerPush(path) {
  router.push(path);
}
</script>

<style scoped>
.zt {
  width: 1170px;
  padding-top: 5px;
}
.gsxq {
  width: 100%;
  height: 200px;
  margin-top: 20px;
}
.gsxq_left {
  float: left;
  height: 220px;
  width: 220px;
}
.gsxq_right {
  float: left;
  height: 220px;
  width: 930px;
  margin-left: 20px;
}
.gsxq_left img {
  height: 220px;
  width: 220px;
  border-radius: 10px;
}
.gsxq_right > * {
  margin: 10px 0;
}
.gsxq_right h2 {
  margin: 0;
}
.gsxq_right input[type="button"] {
  width: 90px;
  height: 35px;
  border-radius: 17.5px;
  border: 1px solid rgb(200, 200, 200);
  background-color: white;
  font-size: 16px;
}
.gsxq_right span {
  font-size: 16px;
}
.center {
  margin-top: 50px;
  background-color: yellow;
}
.center ul {
  padding: 0;
}
.center li {
  float: left;
  list-style-type: none;
  margin-right: 20px;
  font-size: 17px;
  font-weight: 300;
}
.router {
  width: 100%;
  height: 50px;
  margin-top: 100px;
}
</style>