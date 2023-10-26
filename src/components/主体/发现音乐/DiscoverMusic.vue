<template>
  <div class="zt">
    <div class="top">
      <ul>
        <li v-for="item in sjarray" :key="item.index" @click="tz(item)" :class="{click:item.name==name}">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <router-view class="router-view-class"></router-view>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

let name=ref("个性推荐")
const router = useRouter();
const sjarray = reactive([
  {
    index: 1,
    name: "个性推荐",
    link: "/index/discover_music/personality_recommendation",
  },
  {
    id: 2,
    name: "专属订制",
  },
  {
    id: 3,
    name: "歌单",
    link:"/index/discover_music/song_list"
  },
  {
    id: 4,
    name: "排行榜",
    link:"/index/discover_music/leader_board"
  },
  {
    id: 5,
    name: "歌手",
    link:"/index/discover_music/singer_module"
  },
  {
    id: 6,
    name: "最新音乐",
    link:"/index/discover_music/latest_music"
  },
]);

function tz(a) {
  router.push(a.link);
  name.value=a.name;
}
</script>

<style scoped>
.zt{
  display: inline-block; /* 或者 display: inline; */
  width: auto;
  margin: auto;
}
.top {
  height: 50px;
  width: 100%;

}
.click{
  font-weight: bold !important;
  font-size: 20px !important;
  border-bottom: 4px solid red;
}
.top > ul {
  color: black;
  float: left;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.top > ul > li {
  float: left;
  font-size: 16px;
  line-height: 50px;
  margin-right: 20px;
  font-weight: 300;
}
.router-view-class{
  margin-top: 20px;
}
</style>