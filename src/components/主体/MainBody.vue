<template>
  <div class="zt">
    <div class="content" v-show="state.songBackdrop.tf == -1">
      <div class="content-left">
        <ul>
          <li
            v-for="item in left_navigation_bar"
            :key="item.name"
            @click="tz(item)"
            :class="{click:item.name===clickName}"
          >
            {{ item.name }}
          </li>
        </ul>

        <p>我的音乐</p>
        <ul>
          <li v-for="item in My_music" :key="item.name">
            <img :src="item.img" alt="" />
            {{ item.name }}
          </li>
        </ul>
        <p>创建的歌单</p>
      </div>
      <div class="content-right">
        <router-view
          class="router_view"
        ></router-view>
      </div>
    </div>
    <div v-if="state.songBackdrop.tf > 0" class="songback">
      <SongDetailsBackground></SongDetailsBackground>
    </div>
    <div class="player-button">
      <player-button></player-button>
    </div>
  </div>
</template>
  
  <script setup>
import { reactive,ref } from "vue";
import { useRouter } from "vue-router";
import { useMySong } from "@/pinia/myStore.js";
const { state } = useMySong();

import playerButton from "./播放器/playerButton.vue";
import 喜欢的音乐 from "../../assets/image/喜欢.png";
import 本地下载 from "../../assets/image/chongzhi.png";
import 最近播放 from "../../assets/image/时间.png";
import SongDetailsBackground from "./组件/歌曲详情背景/SongDetailsBackground.vue";

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
    link:"/index/video_component"
  },
  {
    name: "关注",
  },
  {
    name: "直播",
  },
  {
    name: "私人漫游",
  },
]);

const My_music = reactive([
  {
    name: "我喜欢的音乐",
    img: 喜欢的音乐,
  },
  {
    name: "本地与下载",
    img: 本地下载,
  },
  {
    name: "最近播放",
    img: 最近播放,
  },
]);
let clickName=ref("发现音乐");
const router = useRouter();
function tz(a) {
  router.push(a.link);
  clickName.value=a.name;
}
</script>
  
  <style scoped>
.click{
  font-size: 16px !important;
  font-weight: bold !important;
  background-color: rgb(241, 241, 241);
}
.zt {
  max-width: 100%;
}
.songback {
  height: 100%;
  width: 100%;
  position: absolute;
  bottom: 50px;
  left: 0;
  z-index: 999;
}
.player-button {
  width: 100%;
  z-index: 999;
  border-top: 1px solid black;
  position: fixed;
  bottom: 0;
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
  border-right: 1px solid black;
  position: fixed;
  top: 50px;
  left: 0;
}
.content-left > ul {
  margin: 0;
  list-style-type: none;
  text-align: left;
  font-size: 18px;
  padding-left: 20px;
}
.content-left > ul > li {
  font-size: 16px;
  margin-top: 5px;
  height: 40px;
  font-weight: lighter;
  line-height: 40px;
  color: black;
  padding-left: 10px;
}
.content-left > ul > li > img {
  margin: 0;
  float: left;
  height: 20px;
  margin-top: 10px;
  margin-right: 10px;
}
.content-left > ul > li:hover {
  background-color: #f6f6f7;
}
.content-left > p {
  text-align: left;
  font-size: 14px;
  margin-left: 20px;
  color: rgb(162, 162, 162);
}
.content-right {
  width: calc(100% - 200px);
  min-width: 1270px;
  position: absolute;
  left: 201px;
  padding-bottom: 70px;
}
.router_view {
  display: inline-block; /* 或者 display: inline; */
  width: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 70px;
}
</style>
  