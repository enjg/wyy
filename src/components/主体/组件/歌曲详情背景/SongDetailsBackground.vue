<template>
  <div class="zt">
    <div class="divbac"></div>
    <div class="conter">
      <div class="conter-song-left">
        <img
          :class="{ 'reverse-animation': !state.songBackdrop.playbacktf }"
          src="../../../../assets/image/唱片指针.png"
          alt=""
        />
        <div>
          <img
            :class="[state.songBackdrop.playbacktf ? 'cpt' : 'cpf']"
            :src="myPlaylist.playlistContent[0].al.picUrl"
            alt=""
          />
        </div>
      </div>
      <div class="conter-song-right">
        <div class="conter-song-right-top">
          <p>{{ myPlaylist.playlistContent[0].name }}</p>
          <div>
            <div>
              <div
                v-for="(item, index) in myPlaylist.playlistContent[0].ar"
                :key="index"
              >
                <p>{{ item.name }}</p>
                <p v-if="index !== myPlaylist.playlistContent[0].ar.length - 1">
                  &nbsp;/&nbsp;
                </p>
              </div>
            </div>
            <div>
              <p>专辑：{{ myPlaylist.playlistContent[0].al.name }}</p>
            </div>
          </div>
          <!-- <p>歌手：{{ myStore.state.songurl.songname }}</p> -->
        </div>
        <div ref="myDiv" v-show="gec" class="conter-song-right-conter">
          <div>
            <p v-for="item in lyricsArray" :key="item.time">{{ item.lyric }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="song-review">
      <div class="song-review-left">
        <SongReview :message="querObj"></SongReview>
      </div>
      <div class="song-review-right">
        <div class="songList">
          <div class="bt">
            <p>包含这首歌的歌单</p>
          </div>
          <div
            class="content"
            v-for="(item, index) in SimiPlaylistArray"
            :key="index"
          >
            <div class="content_left">
              <img :src="item.coverImgUrl" alt="" />
            </div>
            <div class="content_right">
              <p>{{ item.name }}</p>
            </div>
          </div>
        </div>
        <div class="recommendedSong">
          <div class="bt">
            <p>喜欢这首歌的人也听</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useMySong } from "@/pinia/myStore.js";
import { reactive, ref, computed, watch, onMounted } from "vue";
import SongReview from "../歌曲评论/SongReview.vue";
import { useMyPlaylist } from "@/pinia/myPlaylist.js";

const myPlaylist = useMyPlaylist();
const { state } = useMySong();
const LyricInformation = reactive({});
const gec = ref("");
let querObj = reactive({
  id: myPlaylist.playlistContent[0].id,
  typeof: 0,
  pageSize: 20,
});
watch(
  () => querObj,
  () => {
    console.log("hj");
  },
  { deep: true }
);
onMounted(() => {
  songgc(myPlaylist.playlistContent[0].id);
  getSimiPlaylist(myPlaylist.playlistContent[0].id);
});
watch(
  () => myPlaylist.playlistContent,
  () => {
    songgc(myPlaylist.playlistContent[0].id);
    getSimiPlaylist(myPlaylist.playlistContent[0].id);
    querObj.id = myPlaylist.playlistContent[0].id;
  },
  { deep: true }
);
const lyricsArray = computed(() => {
  const lines = gec.value ? gec.value.split("\n") : [];
  const lyricRegex = /\[(.*?)\]/; // 歌词正则表达式，匹配 [] 之间的内容
  return lines.map((line) => {
    const match = line.match(lyricRegex);
    const time = match ? match[1] : "";
    const lyric = line.replace(lyricRegex, "").trim();
    return { time, lyric };
  });
});

function songgc(id) {
  const timestamp = Date.now();
  axios
    .get("http://47.108.209.241:8090/lyric", {
      params: {
        id: id,
        timestamp: timestamp,
      },
    })
    .then((response) => {
      Object.assign(LyricInformation, response.data);
      gec.value = response.data.lrc.lyric;
    })
    .catch((error) => {
      console.error(error);
    });
}
let myDiv = ref(null);
function dj(b) {
  if (myDiv.value !== null && myDiv.value && myDiv.value.classList) {
    const targetScroll = 0 + b * 35; // 滚动距离为当前位置加50个像素

    const duration = 200; // 滚动持续时间（毫秒）
    const startTime = performance.now();
    const startScroll = myDiv.value.scrollTop;

    const scrollToTarget = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const scrollProgress = Math.min(elapsedTime / duration, 1);
      const currentScroll =
        startScroll + (targetScroll - startScroll) * scrollProgress;

      if (myDiv.value && myDiv.value.classList) {
        myDiv.value.scrollTop = currentScroll;
      }

      if (scrollProgress < 1) {
        requestAnimationFrame(scrollToTarget);
      }
    };

    requestAnimationFrame(scrollToTarget);
  }
}
let songgctime = ref(1);
watch(
  () => state.songBackdrop.playtime,
  (newtime) => {
    newtimec(newtime);
  }
);
watch(
  () => songgctime.value,
  (newValue, oldValue) => {
    if (myDiv.value !== null) {
      const pElement = myDiv.value
        .querySelector("div:first-child")
        .querySelector(`p:nth-child(${newValue})`);

      if (pElement !== null && pElement.classList !== null) {
        pElement.classList.add("Lyric-highlighting");
      }

      if (oldValue !== null) {
        const pElementtwo = myDiv.value
          .querySelector("div:first-child")
          .querySelector(`p:nth-child(${oldValue})`);

        if (pElementtwo !== null && pElementtwo.classList !== null) {
          pElementtwo.classList.remove("Lyric-highlighting");
        }
      }

      setTimeout(() => {
        dj(newValue);
      }, 300);
    }
  }
);
function newtimec(a) {
  let result = 0;
  for (let i = 0; i < lyricsArray.value.length; i++) {
    if (
      lyricsArray.value[i].time &&
      isTime1LessThanTime2(a, lyricsArray.value[i].time)
    ) {
      result = i + 1;
    }
  }
  songgctime.value = result;
  // dj(result.length);
  // 这里可以对结果进行进一步处理和使用
}

function isTime1LessThanTime2(time1, time2) {
  const formatRegex = /^(\d{2}):(\d{2}).(\d{3})$/;
  const [, min1, sec1, ms1] = formatRegex.exec(time1) || [];

  let [, min2, sec2, ms2] = formatRegex.exec(time2) || [];
  if (!min2 || !sec2 || !ms2) {
    const [, min2Alt, sec2Alt] =
      /^(\d{2}):(\d{2}).(\d{2,3})$/.exec(time2) || [];
    min2 = min2Alt || "00";
    sec2 = sec2Alt || "00";
    ms2 = "000";
  }

  const totalMs1 =
    parseInt(min1 || 0) * 60000 +
    parseInt(sec1 || 0) * 1000 +
    parseInt(ms1 || 0);
  const totalMs2 =
    parseInt(min2 || 0) * 60000 +
    parseInt(sec2 || 0) * 1000 +
    parseInt(ms2 || 0);
  return totalMs1 > totalMs2;
}
let SimiPlaylistArray = reactive([]);
function getSimiPlaylist(id) {
  const timestamp = Date.now();
  axios
    .get("http://47.108.209.241:8090/simi/playlist", {
      params: {
        id: id,
        timestamp: timestamp,
      },
    })
    .then((response) => {
      Object.assign(SimiPlaylistArray, response.data.playlists);
      console.log(111, response.data.playlists);
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>

<style scoped>
.zt {
  width: 100%;
  display: inline-block;
  /* background: linear-gradient(to bottom, #dbddde, white); */
  /* background-color: aquamarine; */
}
.divbac {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: -1;
  background: linear-gradient(to bottom, #dbddde, white);
}
.scroll-container {
  height: 200px; /* 设置容器的高度，控制显示区域的大小 */
  overflow: auto; /* 设置溢出属性为自动，使内容超出容器高度时出现滚动条 */
}
.conter {
  width: 870px;
  height: 430px;
  margin: auto;
  margin-top: 50px;
  /* background-color: red; */
}
.conter-song-right {
  float: right;
  width: 350px;
  height: 430px;
}
.conter-song-right-conter {
  /* padding-top: 210px; */
  margin-top: px;
  height: 330px;
  overflow: hidden;
}
.conter-song-right-conter p {
  margin: 0;
  height: 25px;
  margin-top: 10px;
  font-weight: 300;
  font-size: 14px;
  color: #5c5c5e;
}
.conter-song-right-conter > div {
  margin-top: 180px;
  margin-bottom: 150px;
}
.conter-song-right-conter:hover {
  overflow: auto;
}
.conter-song-right-top {
  height: 100px;
}
.conter-song-right-top > p:nth-of-type(1) {
  margin: 0;
  font-size: 23px;
  color: black;
}
.conter-song-right-top > div > div {
  float: left;
  width: 95px;
  height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 20px;
}
.conter-song-right-top > div > div p {
  float: left;
  height: 20px;
  line-height: 20px;
  margin: 0;
  font-size: 13px;
  color: #808185;
}
/* .conter-song-right-top p {
  font-size: 12px;
  margin-top: 0px;
} */
.conter-song-left {
  float: left;
  height: 430px;
  width: 450px;
  position: relative;
}
.conter-song-left > div {
  width: 300px;
  height: 300px;
  position: absolute;
  left: 50%;
  top: calc(430px - 330px);
  transform: translateX(-50%);
  border-radius: 50%;
  background-color: black;
  border: 15px solid rgb(170, 170, 170);
}

.conter-song-left > div > img {
  width: 220px;
  height: 220px;
  margin: 40px;
  border-radius: 50%;
  animation: rotate 50s infinite linear;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.conter-song-left > div > img.cpt {
  animation-play-state: running;
}
.conter-song-left > div > img.cpf {
  animation-play-state: paused;
}
.conter-song-left > img {
  width: 180px;
  position: absolute;
  left: 50%;
  top: 0;
  animation: rotate1 0.5s forwards;
  animation-fill-mode: forwards;
  transform-origin: 10px 10px;
  z-index: 999;
}
@keyframes rotate1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(30deg);
  }
}
@keyframes reverseRotate {
  0% {
    transform: rotate(30deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.conter-song-left > img.reverse-animation {
  animation: reverseRotate 0.5s forwards;
}

p {
  color: rgb(149, 149, 149);
}

.Lyric-highlighting {
  color: black !important;
  font-size: 16px !important;
  font-weight: bold !important;
}
.song-review {
  width: 870px;
  margin: auto;
  margin-top: 100px;
  background-color: pink;
}
.song-review-left {
  float: left;
  width: 550px;
}
.song-review-right {
  float: left;
  margin-left: 70px;
  width: 250px;
}
.bt > p {
  color: black;
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  line-height: 30px;
}
.content {
  width: 100%;
  height: 35px;
  margin: 10px 0;
}
.content > div {
  float: left;
}
.content_left {
  width: 35px;
  height: 35px;
}
.content_left > img {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin: 2.5px;
}
.content_right {
  width: calc(100% - 45px);
  margin-left: 10px;
  height: 35px;
}
.content_right > p {
  margin: 0;
  line-height: 35px;
  height: 35px;
  font-size: 12px;
  font-weight: 300;
  overflow: hidden;
  color: black;
}
</style>