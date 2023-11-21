<template>
  <div class="volume" @mouseleave="mouseenter = 0">
    <div v-show="mouseenter === 1">
      <div
        @click.capture="clickvolume($event)"
        @mousedown="startDrag"
        @mouseup="stopDrag"
        @mousemove="whileDrag($event)"
        @mouseleave="stopDrag"
      >
        <span ref="volume"></span>
      </div>
    </div>
    <img
      @mouseenter="mouseenter = 1"
      @click="Soundoff($event)"
      :src="megaphone[megaphonesize]"
      alt=""
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import soundoff from "./img/静音.png";
import Fullvolume from "./img/喇叭.png";
import { useMyPlaylist } from "@/pinia/myPlaylist.js";

const myPlaylist = useMyPlaylist();
let megaphone = [Fullvolume, soundoff];
let megaphonesize = ref(0);
let volume = ref(null);
let mouseenter = ref(-1);
onMounted(() => {
  getvolume();
});
let dragging = ref(false);
function startDrag() {
  dragging.value = true;
}
function stopDrag() {
  dragging.value = false;
}
function whileDrag(event) {
  if (dragging.value === true) {
    clickvolume(event);
  }
}
function getvolume() {
  volume.value.style.height = `${myPlaylist.volume * 100}%`;
}
function clickvolume(event) {
  const offset = Math.abs(
    event.clientY - event.currentTarget.getBoundingClientRect().top
  );
  myPlaylist.volume = (80 - offset) / 80;
}
let volumesize = 0;
function Soundoff() {
  if (megaphonesize.value === 0) {
    volumesize = myPlaylist.volume;
    megaphonesize.value = 1;
    myPlaylist.volume = 0;
  } else {
    megaphonesize.value = 0;
    myPlaylist.volume = volumesize;
  }
}
watch(
  () => myPlaylist.volume,
  () => {
    getvolume();
  }
);
</script>

<style scoped>
.volume {
  position: absolute;
  right: 90px;
  bottom: 0;
  height: 160px;
  width: 20px;
  z-index: 9999;
}
.volume > img {
  position: absolute;
  bottom: 25px;
  height: 20px;
  width: 20px;
}
.volume > div {
  width: 30px;
  height: 105px;
  left: -5px;
  background-color: white;
  position: absolute;
  top: 0;
  box-shadow: 2px -2px 5px 0px rgba(0, 0, 0, 0.1);
}
.volume > div > div {
  width: 4px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #cecece;
}
.volume > div > div > span {
  height: 0;
  display: block;
  background-color: #ff3434;
  width: 100%;
  transition: width 0.1s linear;
  position: absolute;
  bottom: 0;
}
</style>