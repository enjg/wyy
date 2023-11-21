<template>
  <div class="zt">
    <div v-if="myLogin.cookie!==null">
      <div class="carousel">
        <CarouselMap></CarouselMap>
      </div>
      <div class="tjgd">
        <recommended-playlist></recommended-playlist>
      </div>
      <!-- <div class="rmbk">
        <popular-podcast></popular-podcast>
      </div> -->
      <div class="djfs">
        <ExclusiveBroadcastVue></ExclusiveBroadcastVue>
      </div>
      <div>
        <recommend-latest-music></recommend-latest-music>
      </div>
      <div>
        <RecommendedMV></RecommendedMV>
      </div>
    </div>
  </div>
</template>

<script setup>
import CarouselMap from "../../组件/轮播图/CarouselMap.vue";
import RecommendedPlaylist from "./推荐歌单/RecommendedPlaylist.vue";
// import PopularPodcast from "./热门博客/PopularPodcast.vue";
import ExclusiveBroadcastVue from "./独家放送/ExclusiveBroadcast.vue";
import RecommendLatestMusic from "./最新音乐/RecommendLatestMusic.vue";
import RecommendedMV from "./推荐MV/RecommendedMV.vue";
import { useLoginStore } from "@/pinia/myLogin.js";

const myLogin = useLoginStore();
</script>

<style scoped>
.zt {
  width: 1070px;
  display: inline-block;
}
.zt > div {
  margin-bottom: 20px;
}
.carousel {
  height: 205px;
  margin: 0;
}
</style>