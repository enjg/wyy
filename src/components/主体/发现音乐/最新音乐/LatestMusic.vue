<template>
  <div class="zt">
    <div class="song_disc_toggle">
      <p
        :class="{ song_disc_toggle_click: song_disc_toggle === 0 }"
        @click="DiscSwitching(0)"
      >
        {{ songDiscs[0].name }}
      </p>
      <p
        :class="{ song_disc_toggle_click: song_disc_toggle === 1 }"
        @click="DiscSwitching(1)"
      >
        {{ songDiscs[1].name }}
      </p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
let song_disc_toggle = ref(0);
let songDiscs = reactive([
  {
    name: "新歌速迭",
    path: "/index/discover_music/latest_music/new_song",
  },
  {
    name: "新碟上架",
    path: "/index/discover_music/latest_music/new_disc",
  },
]);

function DiscSwitching(NumberTF) {
  song_disc_toggle.value = NumberTF;
  router.push(songDiscs[NumberTF].path)
}
</script>

<style scoped>
.zt {
  width: 1070px;
}
.song_disc_toggle {
  width: 260px;
  height: 30px;
  border: 1px solid rgb(179, 179, 179);
  border-radius: 10% / 100%;
  margin: 20px auto 50px auto;
}
.song_disc_toggle p {
  width: 130px;
  height: 30px;
  /* background-color: pink; */
  float: left;
  margin: 0;
  text-align: center;
  line-height: 30px;
  border-radius: 10% / 50%;
}
.song_disc_toggle p:hover {
  background-color: rgb(244, 244, 244);
}
.song_disc_toggle_click {
  background-color: rgb(179, 179, 179) !important;
  color: white;
}
</style>