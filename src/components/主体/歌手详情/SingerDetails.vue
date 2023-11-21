<template>
  <div class="zt">
    <div class="gsxq">
      <div class="gsxq_left">
        <img :src="artist.img1v1Url" alt="" />
      </div>
      <div class="gsxq_right">
        <p>{{ artist.name }}</p>
        <div class="gsxq_bm">
          <span v-for="(item, key) in artist.alias" :key="key"
            >{{ item }}&nbsp;&nbsp;</span
          >
        </div>
        <div class="gn">
          <div>
            <img src="../../../assets/image/收藏.png" alt="" />
            <p>收藏</p>
          </div>
          <div>
            <img src="../../../assets/image/未登录-头像.png" alt="" />
            <p>个人主页</p>
          </div>
        </div>
        <div class="gsxq_right_xq">
          <span>单曲数:{{ artist.musicSize }}</span
          >&nbsp;&nbsp;&nbsp;&nbsp;
          <span>专辑数:{{ artist.albumSize }}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span>MV数:{{ artist.mvSize }}</span>
        </div>
      </div>
    </div>
    <div class="center">
      <ul>
        <li
          v-for="(item, key) in singerFeatureArray"
          :key="key"
          @click="routerPush(item.path)"
          :class="{ click: isRouteMatch(item.path) }"
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
import { useRoute } from "vue-router";

const route = useRoute();
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
    path: null,
  },
]);
onMounted(() => {
  getArtists(mySinger.id);
});
watch(
  () => mySinger.id,
  (newValue) => {
    getArtists(newValue);
  }
);
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
function isRouteMatch(routeSegment) {
  console.log(route.path.includes(routeSegment));

  return route.path.includes(routeSegment);
}
</script>

<style scoped>
.click {
  font-size: 20px !important;
  font-weight: bold !important;
  border-bottom: 4px solid red;
}
.zt {
  width: 1170px;
  padding-top: 5px;
  margin: auto;
}
.gsxq {
  width: 100%;
  height: 200px;
  margin-top: 20px;
}
.gsxq_left {
  float: left;
  height: 180px;
  width: 180px;
}
.gsxq_right {
  float: left;
  height: 180px;
  width: calc(100% - 200px);
  margin-left: 20px;
}
.gsxq_left img {
  height: 180px;
  width: 180px;
  border-radius: 10px;
}
.gsxq_right > p {
  font-size: 22px;
  font-weight: bold;
  margin: 0;
}
.gsxq_bm {
  margin-top: 10px;
}
.gsxq_bm > span {
  font-size: 14px !important;
  font-weight: 300;
}
.gn {
  width: 100%;
  display: inline-block;
  margin-top: 10px;
}
.gn > div > * {
  float: left;
}
.gn > div {
  float: left;
  padding: 0 15px;
  height: 30px;
  margin-right: 5px;
  border-radius: 17.5px;
  border: 1px solid rgb(200, 200, 200);
}
.gn img {
  width: 20px;
  height: 20px;
  margin: 5px;
}
.gn > div:hover {
  background-color: rgb(242, 242, 242);
}
.gn p {
  margin: 0;
  line-height: 30px;
  font-size: 14px;
  font-weight: 300;
}
.gsxq_right_xq {
  margin-top: 10px;
}
.gsxq_right_xq span {
  font-size: 13px;
  font-weight: 300;
}
.center {
  margin-top: 10px;
  display: inline-block;
}
.center > ul {
  list-style-type: none;
  padding: 0;
}
.center> ul > li {
  float: left;
  font-size: 16px;
  line-height: 30px;
  margin-right: 20px;
  font-weight: 300;
}

.router {
  width: 100%;
  margin-top: 10px;
}
</style>