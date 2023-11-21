<template>
  <div class="zt">
    <div class="content">
      <div class="content-left">
        <ul>
          <li
            v-for="item in left_navigation_bar"
            :key="item.name"
            @click="tz(item)"
            :class="{ click: isRouteMatch(item.link) }"
          >
            {{ item.name }}
          </li>
        </ul>

        <p>我的音乐</p>
        <ul>
          <li
            v-for="item in My_music"
            :key="item.name"
            @click="tz(item)"
            :class="{ clicktwo: isRouteMatch(item.link) }"
          >
            <img :src="item.img" alt="" />
            {{ item.name }}
          </li>
        </ul>
        <p>创建的歌单</p>
      </div>
      <div class="content-right">
        <router-view class="router_view"></router-view>
      </div>
    </div>
    <div ref="myDiv" v-show="tf > 0" class="songback">
      <SongDetailsBackground v-if="tf > 0"></SongDetailsBackground>
    </div>
    <div class="player-button">
      <player-button></player-button>
    </div>
  </div>
</template>
  
  <script setup>
import { reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMySong } from "@/pinia/myStore.js";
const { state } = useMySong();

import playerButton from "./播放器/playerButton.vue";
import 喜欢的音乐 from "../../assets/image/喜欢.png";
import 本地下载 from "../../assets/image/chongzhi.png";
import 最近播放 from "../../assets/image/时间.png";
import SongDetailsBackground from "./组件/歌曲详情背景/SongDetailsBackground.vue";

let myDiv = ref(null);
const left_navigation_bar = reactive([
  {
    name: "发现音乐",
    link: "/index/discover_music",
  },
  {
    name: "播客",
  },
  {
    name: "视频",
    link: "/index/video_component",
  },
  // {
  //   name: "关注",
  // },
  // {
  //   name: "直播",
  // },
  {
    name: "私人漫游",
    link:"/index/private-roaming"
  },
]);

const My_music = reactive([
  {
    name: "我喜欢的音乐",
    img: 喜欢的音乐,
    link: "/index/users-like-music",
  },
  {
    name: "本地与下载",
    img: 本地下载,
  },
  {
    name: "最近播放",
    img: 最近播放,
    link: "/index/recently-played",
  },
]);
let clickName = ref("发现音乐");
const router = useRouter();
function tz(a) {
  router.push(a.link);
  clickName.value = a.name;
}
let route = useRoute();
function isRouteMatch(routeSegment) {
  return route.path.includes(routeSegment);
}
let tf = ref(0);
watch(
  () => state.songBackdrop.tf,
  (newValue) => {
    if (newValue === 1) {
      tf.value = 1;
      myDiv.value.classList.add("songbackClick");
      setTimeout(() => {
        myDiv.value.classList.remove("songbackClick");
      }, 480);
    } else {
      myDiv.value.classList.add("songbackClicktwo");
      setTimeout(() => {
        myDiv.value.classList.remove("songbackClicktwo");
        tf.value = -1;
      }, 480);
    }
  }
);
</script>
  
  <style scoped>
@keyframes scrollAnimation {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
.songbackClick {
  animation: scrollAnimation 0.5s infinite;
}
@keyframes scrollAnimationtwo {
  100% {
    transform: translateY(100%);
  }
  0% {
    transform: translateY(0);
  }
}
.songbackClicktwo {
  animation: scrollAnimationtwo 0.5s infinite;
}
.click {
  font-size: 17px !important;
  font-weight: bold !important;
  background-color: rgb(241, 241, 241);
}
.clicktwo {
  background-color: rgb(241, 241, 241);
}
.zt {
  max-width: 100%;
}
.songback {
  width: 100%;
  /* min-width: 1470px; */
  z-index: 2;
  margin: 0;
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0;
  bottom: 50px;
  overflow-y: scroll;
}
.player-button {
  height: 70px;
  width: 100%;
  z-index: 999;
  border-top: 1px solid #cecece;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0;
}

.top-bar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
.content {
  width: 100%;
}
.content-left {
  width: 200px;
  height: 100vh;
  border-right: 1px solid #cecece;
  position: fixed;
  top: 50px;
  left: 0;
}
.content-left > ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-align: left;
  font-size: 18px;
  padding-left: 10px;
}
.content-left > ul > li {
  font-size: 16px;
  margin: 0;
  padding: 0;
  margin-top: 5px;
  height: 30px;
  font-weight: 300;
  line-height: 30px;
  color: black;
  padding-left: 10px;
}
.content-left>ul:nth-of-type(2)>li{
  font-size: 14px;
}
.content-left > ul > li > img {
  margin: 0;
  float: left;
  height: 20px;
  margin-top: 5px;
  margin-right: 10px;
}
.content-left > ul > li:hover {
  background-color: #f6f6f7;
}
.content-left > p {
  text-align: left;
  font-size: 13px;
  margin-left: 20px;
  color: rgb(162, 162, 162);
}
.content-right {
  width: calc(100% - 200px);
  min-width: 1270px;
  /* position: absolute;
  left: 201px; */
  padding-bottom: 70px;
  position: fixed;
  top: 50px;
  left: 201px;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
}
.router_view {
  /* display: inline-block; 
  width: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 70px; */
}
</style>
  