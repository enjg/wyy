<template>
  <div class="zt">
    <div class="top-bar">
      <top-bar></top-bar>
    </div>
    <lyrics-barrage
      class="lyrics"
      v-if="mySong.state.Lyrics.tf === 1"
    ></lyrics-barrage>
    <div class="login">
      <log-in v-if="myLogin.LogInTF===1"></log-in>
    </div>
    <router-view class="center"></router-view>
  </div>
</template>
  
<script setup>
// import { onMounted } from "vue";
import topBar from "./顶部栏/topBar.vue";
import LyricsBarrage from "../components/主体/组件/歌词弹幕/LyricsBarrage.vue";
import LogIn from "../components/主体/组件/登录页面/LogIn.vue";
import { useMySong } from "@/pinia/myStore.js";
import { useLoginStore } from "@/pinia/myLogin.js";

const myLogin = useLoginStore();
const mySong = useMySong();
// onMounted(() => {
//   // 取消浏览器默认滚动条
//   document.documentElement.style.overflow = "hidden";
//   document.body.style.overflow = "hidden";
//   document.documentElement.style.scrollBehavior = "smooth";

//   // 当组件销毁时恢复滚动条
//   const restoreScroll = () => {
//     document.documentElement.style.overflow = "auto";
//     document.body.style.overflow = "auto";
//     document.documentElement.style.removeProperty("scroll-behavior");
//     this.$nextTick(() => {
//       window.removeEventListener("beforeunload", restoreScroll);
//     });
//   };
//   window.addEventListener("beforeunload", restoreScroll);
// });
</script>
  
  <style scoped>
.lyrics {
  z-index: 99999999;
}
.zt {
  /* width: 100vw;
  overflow: hidden; */
}
.top-bar {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
.center {
  width: 100vw;
  margin-top: 50px;
  height: auto;
  /* height: calc(100vh-50px); */
  /* position: absolute;
  top: 40px;
  left: 0;
  right: 0; */
}
.login{
 
}
</style>