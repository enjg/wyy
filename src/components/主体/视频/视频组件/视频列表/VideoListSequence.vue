<template>
  <div class="zt" ref="center">
    <div class="center" v-for="(item, index) in List" :key="index">
      <img
        :src="item.data.coverUrl"
        alt=""
        @mouseover="handleMouseover($event, item, index)"
        @mouseleave="mouseLeave($event, item)"
      />
      <img
        v-if="index == vids"
        src="../../../../../assets/image/未标题-2.png"
        alt=""
      />
      <p>{{ item.data.title }}</p>
      <p v-if="item.data.creator && item.data.creator.nickname">
        {{ item.data.creator.nickname }}
      </p>
      <div class="numberOfPlays">
        <img src="../../../../../assets/image/bfq.png" alt="" />
        <p>{{ formatNumber(item.data.playTime) }}</p>
      </div>
      <div class="video_duration">
        <p>{{ jstime(item.data.durationms) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, defineProps, reactive, ref, watch } from "vue";

let center = ref(null);
const Props = defineProps({
  message: Object,
});
watch(
  () => Props.message,
  (newValue) => {
    console.log(newValue);
    if (newValue.id != "") {
      List.length = 0;
      getList(newValue);
    } else {
      gettimelineAllList();
    }
  },
  { deep: true }
);

onMounted(() => {
  console.log(Props.message);
  gettimelineAllList();
  window.addEventListener("scroll", handleScroll);
});
var timer;
let vids = ref(-1);
var timer2;
let List = reactive([]);
watch(
  () => List,
  (newValue) => {
    console.log("newValue", newValue);
  }
);
function handleMouseover(a, b, c) {
  var img = a.currentTarget;
  const image = b;

  clearTimeout(timer); // 清除之前的定时器

  timer = setTimeout(function () {
    if (b.data.previewUrl != null) {
      img.classList.add("fade-out");
      setTimeout(function () {
        img.classList.remove("fade-out");
        img.src = b.data.previewUrl;
        img.classList.add("fade-in");
      }, 150);
      timer2 = setTimeout(function () {
        mouseLeave({ currentTarget: img }, image);
        setTimeout(function () {
          vids.value = c;
        }, 150);
      }, 4500);
    } else {
      vids.value = c;
    }
  }, 500);
}

function mouseLeave(a, b) {
  vids.value = -1;
  var img = a.currentTarget;
  clearTimeout(timer); // 清除第一个定时器
  clearTimeout(timer2); // 清除第二个定时器

  if (img.src == b.data.previewUrl) {
    img.classList.remove("fade-out");
    setTimeout(function () {
      img.classList.remove("fade-out");
      img.src = b.data.coverUrl;
      img.classList.add("fade-in");
    }, 150);
    img.classList.remove("fade-in");
  }
}

function gettimelineAllList() {
  List.length=0;
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/video/timeline/all", {
      params: {
        timestamp: time,
      },
    })
    .then((res) => {
      Object.assign(List, res.data.datas);
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}
async function getList(center) {
  let ListArray = [];

  async function getGroupList(center, b) {
    let time = Date.now();

    try {
      const res = await axios.get("http://47.108.209.241:8090/video/group", {
        params: {
          timestamp: time,
          id: center.id,
          offset: b,
        },
      });

      console.log(b);
      console.log(res.data.datas);

      if (res.data.datas.length > 20 - ListArray.length) {
        let abcArray = res.data.datas.slice(0, 20 - ListArray.length);
        ListArray.push(...abcArray);
      } else {
        ListArray.push(...res.data.datas);
      }

      if (ListArray.length < 20) {
        await getGroupList(center, ListArray.length + List.length); // 继续请求数据
      }
    } catch (err) {
      console.error(err);
    }
  }

  await getGroupList(center, List.length + ListArray.length);
  List.push(...ListArray);
}
let lastTriggerTime = 0;
function handleScroll() {
  const currentTime = Date.now();
  if (center.value !== null) {
    const divs = center.value.querySelectorAll("div");
    const lastDiv = divs[divs.length - 1];
    const lastDivRect = lastDiv.getBoundingClientRect();
    if (lastDivRect.top < window.innerHeight) {
      if (currentTime - lastTriggerTime > 300) {
        console.log("加载更多内容");
        getList(Props.message);
      }
      lastTriggerTime = currentTime;
    }
  }
}
function formatNumber(number) {
  if (number >= 100000000) {
    return Math.floor(number / 100000000) + "亿";
  } else if (number >= 100000 && number < 100000000) {
    return Math.floor(number / 10000) + "万";
  } else {
    return number.toString();
  }
}
function jstime(item) {
  const minutes = Math.floor(item / 60000); // 分钟
  const seconds = Math.floor((item % 60000) / 1000); // 秒

  const formattedMinutes = minutes.toString().padStart(2, "0"); // 将分钟数补全为2位
  const formattedSeconds = seconds.toString().padStart(2, "0"); // 将秒数补全为2位
  
  return `${formattedMinutes}:${formattedSeconds}`;
}
</script>

<style scoped>
.center {
  width: 247.5px;
  height: 190px;
  margin: 10px;
  float: left;
  position: relative;
}
.center img:nth-of-type(1) {
  width: 100%;
  border-radius: 5px;
}
.center p {
  font-size: 12px;
  line-height: 20px;
  height: 20px;
  overflow: hidden;
  margin: 0;
}
.center p:nth-of-type(2) {
  color: rgb(143, 143, 143);
}
.center img:nth-of-type(2) {
  width: 60px;
  position: absolute;
  left: 93px;
  top: 40px;
  pointer-events: none;
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.8;
  }
}

.fade-out {
  animation: fadeOut 0.2s ease-in-out;
}
@keyframes fadeIn {
  0% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.8s ease-in-out;
}
.numberOfPlays {
  position: absolute;
  top: 5px;
  right: 5px;
}
.numberOfPlays > img {
  float: left;
  height: 15px;
  width: 15px !important;
  margin: 2.5px;
}
.numberOfPlays > p {
  line-height: 20px;
  margin: 0;
  height: 20px;
  color: white;
  font-size: 14px;
  float: right;
}
.video_duration{
  position: absolute;
  top: 115px;
  right: 5px;
  color: white;
}
.video_duration > p{
  font-size: 14px;
}
</style>