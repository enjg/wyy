<template>
  <div class="zt">
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
            :src="myStore.state.songurl.img"
            alt=""
          />
        </div>
      </div>
      <div class="conter-song-right">
        <div class="conter-song-right-top">
          <h2>{{ myStore.state.songurl.name }}</h2>
          <p>歌手：{{ myStore.state.songurl.songname }}</p>
        </div>
        <div ref="myDiv" v-show="gec" class="conter-song-right-conter">
          <div>
            <p v-for="item in lyricsArray" :key="item.time">{{ item.lyric }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="song-review">
      <song-review></song-review>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useMyStore, useMySong } from "@/pinia/myStore.js";
import { reactive, ref, computed, onBeforeMount, watch} from "vue";
import SongReview from "../歌曲评论/SongReview.vue";
const { state } = useMySong();
const myStore = useMyStore();
const LyricInformation = reactive({});
const gec = ref("");

onBeforeMount(() => {
  songgc();
});

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

function songgc() {
  const timestamp = Date.now(); 
  axios
    .get(
      "http://47.108.209.241:8090/lyric",
      {
        params: {
          id: state.songBackdrop.id,
          timestamp:timestamp,
        },
      }
    )
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
    const targetScroll = 0 + b * 50; // 滚动距离为当前位置加50个像素

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


</script>

<style scoped>
.zt{
  width: 100%;
  overflow: hidden;
  background: linear-gradient(to bottom, #dbddde, white);
  padding-bottom: 150px;
}
.scroll-container {
  height: 200px; /* 设置容器的高度，控制显示区域的大小 */
  overflow: auto; /* 设置溢出属性为自动，使内容超出容器高度时出现滚动条 */
}
.conter {
  width: 1000px;
  height: 500px;
  margin: auto;
  margin-top: 50px;
}
.conter-song-right {
  float: right;
  width: 400px;
  height: 500px;
}
.conter-song-right-conter {
  /* padding-top: 210px; */
  height: 420px;
  overflow: hidden;
}
.conter-song-right-conter p {
  height: 30px;
  margin-top: 20px;
}
.conter-song-right-conter > div {
  margin-top: 210px;
  margin-bottom: 210px;
}
.conter-song-right-conter:hover {
  overflow: auto;
}
.conter-song-right-top {
  height: 80px;
}
.conter-song-right-top h2 {
  margin: 0;
}
.conter-song-right-top p {
  font-size: 12px;
  margin-top: 0px;
}
.conter-song-left {
  float: left;
  width: 600px;
  height: 500px;
  position: relative;
}
.conter-song-left > div {
  width: 350px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: calc(50% + 50px);  transform: translate(-50%, -50%);
  border-radius: 50%;
  background-color: black;
  border: 15px solid rgb(170, 170, 170);
}

.conter-song-left > div > img {
  width: 260px;
  height: 260px;
  margin: 45px;
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
  width: 200px;
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
  color: black;
  font-size: 20px;
  font-weight: bold;
}
.song-review{
  width: 1000px;
  margin: auto;
  margin-top: 100px;
}
</style>