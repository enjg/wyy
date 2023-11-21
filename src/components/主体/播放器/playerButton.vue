<template>
  <div class="zt">
    <div class="name" v-if="myPlaylist.playlistContent.length">
      <div class="name_left">
        <img
          :src="myPlaylist.playlistContent[0].al.picUrl"
          alt=""
          @click="songbac(myPlaylist.playlistContent[0].id)"
        />
      </div>
      <div class="name_right">
        <div class="SongTitle">
          <p @mouseover="mouseover($event)">
            {{ myPlaylist.playlistContent[0].name }}
          </p>
          <p v-if="myPlaylist.playlistContent[0].fee == 1" class="mv vip">
            VIP
          </p>
          <p v-if="myPlaylist.playlistContent[0].fee == 1" class="mv">试听</p>
        </div>
        <div class="SingerName">
          <div
            v-for="(item, index) in myPlaylist.playlistContent[0].ar"
            :key="index"
          >
            <p>{{ item.name }}</p>
            <p v-show="index !== myPlaylist.playlistContent[0].ar.length - 1">
              &nbsp;/&nbsp;
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="bfq">
      <PlayerComponent></PlayerComponent>
    </div>
    <ToneQuality v-if="myPlaylist.playlistContent.length"></ToneQuality>
    <volumeButton v-if="myPlaylist.playlistContent.length"></volumeButton>
    <PlayList v-if="myPlaylist.playlistContent.length"></PlayList>
  </div>
</template>

<script setup>
import { useMySong } from "@/pinia/myStore.js";
import { useMyPlaylist } from "@/pinia/myPlaylist.js";
import PlayerComponent from "../组件/播放器组件/PlayerComponent.vue";
import PlayList from "@/components/主体/组件/播放列表/PlayList.vue";
import volumeButton from "@/components/主体/组件/音量/volumeButton.vue";
import ToneQuality from "@/components/主体/组件/音质/ToneQuality.vue";
import { watch } from "vue";

const mySong = useMySong();
const myPlaylist = useMyPlaylist();
function songbac() {
  mySong.setTf();
}
watch(
  () => myPlaylist.playlistContent,
  () => {
    console.log(1);
  },
  { deep: true }
);
function mouseover(event) {
  console.log(event.target.offsetWidth);
}
</script>

<style scoped>
p {
  margin: 0;
}
.zt {
  max-width: 100%;
  min-width: 1470px;
  height: 70px;
  background-color: white;
  margin: 0;
  position: relative;
}
.name {
  width: 450px;
  height: 70px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}
.name_left {
  position: absolute;
  top: 0;
  left: 0;
  width: 70px;
  height: 70px;
}
.name_left > img {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}
.name_right {
  position: absolute;
  top: 0;
  left: 70px;
  height: 70px;
  width: calc(100% - 70px);
  box-sizing: border-box;
  padding: 15px 0;
}
.name_right > div {
  height: 20px;
}
.name_right p {
  margin: 0;
  line-height: 20px;
  float: left;
}
.SongTitle {
  font-size: 15px;
}
.SingerName {
  font-weight: 300;
  font-size: 13px;
  width: 100%;
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.SongTitle > p:nth-of-type(1) {
  max-width: 170px;
  height: 20px;
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
}
.mv {
  box-sizing: border-box;
  font-size: 10px !important;
  font-weight: 500 !important;
  border: 1px solid #fd544e;
  line-height: 12px !important;
  margin: 3px 3px !important;
  padding: 0 2px !important;
  height: auto !important;
  color: #fd544e;
  border-radius: 2px;
}

.vip {
  color: #fd8558;
}
/* .name_right > p {
  margin: 0;
  line-height: 25px;
  font-weight: 300;
}
.name_right > p:nth-of-type(1) {
  font-size: 15px;
  font-weight: 350;
}
.name_right > p:nth-of-type(2) {
  font-size: 12px;
} */
.bfq {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
.playlist {
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
}
</style>