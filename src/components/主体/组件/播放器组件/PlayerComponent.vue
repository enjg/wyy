<template>
  <div class="bf" ref="myDiv">
    <div class="top">
      <img
        id="img1"
        @click="myPlaylist.PlaylistCutSong(1)"
        :src="imgObj.CutSong[0]"
        @mouseover="changeImage($event, imgObj.CutSong[1])"
        @mouseleave="restoreImage($event, imgObj.CutSong[0])"
        alt=""
      />
      <img
        ref="PlayPause"
        id="img2"
        @click="Button()"
        :src="imgObj.PlayPause[0]"
        alt=""
      />
      <img
        id="img3"
        @click="myPlaylist.PlaylistCutSong(2)"
        :src="imgObj.CutSong[0]"
        alt=""
        @mouseover="changeImage($event, imgObj.CutSong[1])"
        @mouseleave="restoreImage($event, imgObj.CutSong[0])"
      />
      <div id="div1">
        <img
          :src="PlayStateArray[PlayStateindex][0]"
          alt=""
          @mouseover="changeImage($event, PlayStateArray[PlayStateindex][1])"
          @mouseleave="restoreImage($event, PlayStateArray[PlayStateindex][0])"
          @click="PlayStateClick()"
        />
      </div>
      <p @click="mySong.LyricsTf()">词</p>
    </div>
    <div class="button">
      <p v-if="myPlaylist.playlistContent.length">{{ CurrentTime }}</p>
      <div class="content">
        <div ref="progress" class="progress" @click="clickjdt($event)">
          <span ref="progressBar"></span>
        </div>
      </div>
      <p v-if="myPlaylist.playlistContent.length">
        {{ formatTime(myPlaylist.playlistContent[0].dt, 2) }}
      </p>
    </div>
    <audio
      ref="audioPlayer"
      @timeupdate="handleTimeUpdate"
      @play="playUpdata(true)"
      @pause="playUpdata(false)"
      @ended="EndSong()"
      controls
      :src="url"
    ></audio>
  </div>
</template>
  
  <script setup>
import axios from "axios";
import { onMounted, watch } from "vue";
import { ref } from "vue";
import { useLoginStore } from "@/pinia/myLogin.js";
import { useMySong } from "@/pinia/myStore.js";
import CutSongone from "@/components/主体/组件/播放器组件/img/上一首未点击.png";
import CutSongtwo from "@/components/主体/组件/播放器组件/img/上一首未点击 (1).png";
import ListLoopone from "@/components/主体/组件/播放器组件/img/列表循环.png";
import ListLooptwo from "@/components/主体/组件/播放器组件/img/列表循环 (1).png";
import SingleCycleone from "@/components/主体/组件/播放器组件/img/单曲循环.png";
import SingleCycletwo from "@/components/主体/组件/播放器组件/img/单曲循环 (1).png";
import RandomPlayone from "@/components/主体/组件/播放器组件/img/随机播放.png";
import RandomPlaytwo from "@/components/主体/组件/播放器组件/img/随机播放 (1).png";
import SequentialPlayone from "@/components/主体/组件/播放器组件/img/顺序播放.png";
import SequentialPlaytwo from "@/components/主体/组件/播放器组件/img/顺序播放 (1).png";
import PlayPauseone from "@/components/主体/组件/播放器组件/img/播放2.png";
import PlayPausetwo from "@/components/主体/组件/播放器组件/img/暂停.png";
import { useMyPlaylist } from "@/pinia/myPlaylist.js";
import { useDynamicLyrics } from "@/pinia/myDynamicLyrics.js";

const myDynamicLyrics = useDynamicLyrics();
const myPlaylist = useMyPlaylist();
const mySong = useMySong();
const myLogin = useLoginStore();
let myDiv = ref(null);
let url = ref("");
let audioPlayer = ref(null);
let currentTimea = ref(0);
let CurrentTime = ref("00.00");
let CurrentSongDurationTime = ref(null);
let PlayPause = ref(null);
let imgObj = {
  CutSong: [CutSongone, CutSongtwo],
  PlayPause: [PlayPauseone, PlayPausetwo],
};
const PlayStateArray = [
  [ListLoopone, ListLooptwo],
  [SingleCycleone, SingleCycletwo],
  [RandomPlayone, RandomPlaytwo],
  [SequentialPlayone, SequentialPlaytwo],
];
const progressBar = ref(null);
const progress = ref(null);
onMounted(() => {
  audioPlayer.value.volume = myPlaylist.volume;
  console.log(audioPlayer.value.volume);
  if (myPlaylist.playlistContent.length !== 0) {
    hqsongurl(
      myPlaylist.playlistContent[0].id,
      myPlaylist.ToneQuality.argument
    );
  } else {
    const descendants = myDiv.value.querySelectorAll("*");
    descendants.forEach((element) => {
      element.classList.add("Hidden");
    });
  }
});
watch(
  () => myPlaylist.volume,
  (newValue) => {
    console.log(newValue);
    audioPlayer.value.volume = newValue;
  }
);

let PlayStateindex = ref(0);
function PlayStateClick() {
  if (PlayStateindex.value === 3) {
    PlayStateindex.value = 0;
  } else {
    PlayStateindex.value += 1;
  }
}
function clickjdt(event) {
  console.log(1);
  const offset = event.offsetX;
  console.log(
    progress.value.clientWidth,
    offset,
    CurrentSongDurationTime.value
  );
  audioPlayer.value.currentTime =
    ((offset / progress.value.clientWidth) * CurrentSongDurationTime.value) /
    1000;
  myDynamicLyrics.CurrentProgress = audioPlayer.value.currentTime;
}
function handleTimeUpdate() {
  myDynamicLyrics.PlaybackProgress = audioPlayer.value.currentTime;
  // console.log(audioPlayer.value.currentTime)
  const duration = audioPlayer.value.duration;
  const currentTime = audioPlayer.value.currentTime;
  progressBar.value.style.width = `${(currentTime / duration) * 100}%`;
  currentTimea.value = formatTime(audioPlayer.value.currentTime, 1);
  CurrentTime.value = formatTime(audioPlayer.value.currentTime, 3);
}

function Button() {
  if (audioPlayer.value.paused) {
    audioPlayer.value.play();
  } else {
    audioPlayer.value.pause();
  }
}
watch(
  () => myPlaylist.playlistArray,
  () => {
    if (myPlaylist.playlistArray.length === 0) {
      const descendants = myDiv.value.querySelectorAll("*");
      descendants.forEach((element) => {
        element.classList.add("Hidden");
      });
      url.value = "";
    } else {
      const descendants = myDiv.value.querySelectorAll("*");
      descendants.forEach((element) => {
        element.classList.remove("Hidden");
      });
    }
  },
  { deep: true }
);
watch(
  () => myPlaylist.playlistContent,
  () => {
    if (myPlaylist.playlistContent.length !== 0) {
      hqsongurl(
        myPlaylist.playlistContent[0].id,
        myPlaylist.ToneQuality.argument
      );
    }
  },
  {
    deep: true,
  }
);
watch(
  () => url.value,
  (newValue) => {
    progressBar.value.style.width = "0px";
    if (newValue !== "") {
      setTimeout(() => {
        audioPlayer.value.play();
      }, 50);
    }
  }
);

watch(
  () => myPlaylist.ToneQuality,
  (newValue) => {
    hqsongurl(myPlaylist.playlistContent[0].id, newValue.argument);
  },
  {
    deep: true,
  }
);

function hqsongurl(id, center) {
  console.log(center);
  const timestamps = Date.now();
  axios
    .get("http://47.108.209.241:8090/song/url/v1", {
      params: {
        id: id,
        level: center,
        timestamp: timestamps,
        cookie: myLogin.cookie,
      },
    })
    .then((response) => {
      url.value = response.data.data[0].url;
      CurrentSongDurationTime.value = response.data.data[0].time;
      progress.value.style.width = `${
        (response.data.data[0].time / myPlaylist.playlistContent[0].dt) * 100
      }%`;
    })
    .catch((error) => {
      console.error(error);
    });
}

watch(
  () => currentTimea.value,
  (newtime) => {
    mySong.setPlaytime(newtime);
  }
);

function playUpdata(a) {
  console.log(1, audioPlayer.value.currentTime);
  mySong.setPlaytf(a);
  if (a === false) {
    myDynamicLyrics.PlayState = a;
    PlayPause.value.src = imgObj.PlayPause[0];
  } else {
    myDynamicLyrics.PlayState = a;
    myDynamicLyrics.CurrentProgress = audioPlayer.value.currentTime;
    PlayPause.value.src = imgObj.PlayPause[1];
  }
}

function formatTime(timeValue, center) {
  if (center == 1) {
    const minutes = Math.floor(timeValue / 60);
    const seconds = Math.floor(timeValue % 60);
    const milliseconds = Math.floor((timeValue - Math.floor(timeValue)) * 1000);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedMilliseconds = String(milliseconds).padStart(3, "0");

    const formattedTime = `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;

    return formattedTime;
  }
  if (center === 2) {
    const minutes = Math.floor(timeValue / 1000 / 60);
    const seconds = Math.floor((timeValue / 1000) % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    const formattedTime = `${formattedMinutes}:${formattedSeconds}`;

    return formattedTime;
  }
  if (center === 3) {
    const minutes = Math.floor(timeValue / 60);
    const seconds = Math.floor(timeValue % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    const formattedTime = `${formattedMinutes}:${formattedSeconds}`;

    return formattedTime;
  }
}
function changeImage(event, path) {
  event.target.src = path;
}
function restoreImage(event, path) {
  event.target.src = path;
}
function EndSong() {
  myPlaylist.PlaylistIndex(myPlaylist.index + 1);
  PlayPause.value.src = imgObj.PlayPause[0];
  // setTimeout(() => {
  //   audioPlayer.value.play();
  // }, 100);
}
</script>
  
  <style scoped>
.bf {
  height: 70px;
  width: 450px;
}
.Hidden {
  pointer-events: none !important;
  opacity: 0.8 !important;
}

.top {
  width: 100%;
  height: 45px;
  position: relative;
}

.top > img {
  float: left;
}

.button {
  width: 100%;
  height: 25px;
  position: relative;
}
.button > p {
  margin: 0;
  line-height: 10px;
  height: 9px;
  width: 35px;
  font-size: 10px;
  font-weight: 300;
  color: #b2b2b2;
  text-align: center;
}
.button > p:nth-of-type(1) {
  position: absolute;
  left: 0;
  top: 50%;

  font-size: 10px;
  transform: translateY(-50%);
  z-index: 9999;
}
.button > p:nth-of-type(2) {
  position: absolute;
  left: 415px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9999;
}
.content {
  width: 380px;
  background-color: #ededed;
  height: 2px;
  width: 380px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 35px;
  transform: translateY(-50%);
}
.progress {
  background-color: #cecece;
  height: 2px;
  width: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.content:hover {
  height: 3px !important;
  width: 380px;
  cursor: pointer;
}
.content:hover .progress {
  height: 4px !important;
}
.progress span {
  height: 100%;
  display: block;
  background-color: #ff3434;
  width: 0;
  transition: width 0.1s linear;
}
.top > img:nth-of-type(2) {
  width: 15px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.top > img:nth-of-type(2):hover {
  background-color: #e5e5e5;
}

.top > img:nth-of-type(1) {
  width: 10px;
  position: absolute;
  left: calc(50% - 50px);
  top: 50%;
  transform: translate(-50%, -50%);
}

.top > img:nth-of-type(3) {
  width: 10px;
  position: absolute;
  left: calc(50% + 50px);
  top: calc(50%);
  transform: translate(-50%, -50%) rotate(180deg);
}

.top > p {
  margin: 0;
  height: 10px;
  line-height: 10px;
  font-size: 10px;
  position: absolute;
  left: calc(50% + 100px);
  top: 50%;
  transform: translate(-50%, -50%);
}
.top > p:hover {
  color: #f06767;
}
.top > div {
  position: absolute;
  left: calc(50% - 100px);
  top: 50%;
  transform: translate(-50%, -50%);
  height: 15px;
  width: 18px;
}

.top > div > img {
  height: 15px;
  width: 18px;
  margin: 0;
  position: absolute;
  top: 0px;
  left: 0px;
}
.top > div > p {
  line-height: 15px;
  height: 15px;
  font-size: 5px;
  margin: 0;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translateX(-50%);
}
</style>