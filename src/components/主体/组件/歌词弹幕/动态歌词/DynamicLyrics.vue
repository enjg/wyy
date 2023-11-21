<template>
  <div class="zt">
    <div class="mydiv" ref="myDiv"></div>
  </div>
</template>

<script setup>
import { useDynamicLyrics } from "@/pinia/myDynamicLyrics.js";
import { useMyPlaylist } from "@/pinia/myPlaylist.js";
import axios from "axios";
import { onMounted, reactive, watch, ref } from "vue";

const myPlaylist = useMyPlaylist();
const myDynamicLyrics = useDynamicLyrics();
let listArray = reactive([]);
let time = ref(0);
let timerId;
let index = ref(0);
let myDiv = ref(null);
let indexSize = ref(null);
let lrclyric = reactive([]);
let lrclyricIndex = ref(0);
onMounted(() => {
  time.value = Math.round(myDynamicLyrics.PlaybackProgress * 1000);
});

watch(
  () => time.value,
  (newValue) => {
    if (listArray.length) {
      listaArrayFor(newValue);
    } else {
      lrclyricFor(newValue);
    }
  }
);
function lrclyricFor(newValue) {
  for (let i = 0; i < lrclyric.length - 1; i++) {
    if (newValue >= lrclyric[i].time && newValue <= lrclyric[i + 1].time) {
      lrclyricIndex.value = i;
      break;
    }
  }
}
function listaArrayFor(newValue) {
  for (let i = 0; i < listArray.length; i++) {
    if (
      newValue >= listArray[i].time[0] &&
      newValue <= listArray[i].time[0] + listArray[i].time[1]
    ) {
      index.value = i;
      for (let j = 0; j < listArray[i].data.length; j++) {
        if (
          newValue >= listArray[i].data[j].tiems[0] &&
          newValue <=
            listArray[i].data[j].tiems[0] + listArray[i].data[j].tiems[1]
        ) {
          indexSize.value = j;
          break;
        }
      }
      break;
    }
  }
}

watch(
  () => lrclyricIndex.value,
  (newValue) => {
    myDiv.value.innerHTML = "";
    const newElement = document.createElement("span");
    newElement.textContent = lrclyric[newValue].data;
    newElement.classList.add("lyricP");
    myDiv.value.appendChild(newElement);
  }
);
watch(
  () => index.value,
  (newValue) => {
    myDiv.value.innerHTML = "";
    listArray[newValue].data.forEach((element) => {
      const newElement = document.createElement("span"); // 创建一个新的 <p> 元素
      newElement.textContent = element.datas; // 设置新元素的文本内容
      newElement.classList.add("lyricP");
      newElement.classList.remove("lyricPtwo");

      myDiv.value.appendChild(newElement); // 将新元素添加为 MyDiv 的子元素
    });
  },
  { flush: "post" }
);
watch(
  () => indexSize.value,
  (newValue) => {
    const selectedSpan = myDiv.value.getElementsByTagName("span")[newValue]; // 选择第 n 个 <span> 元素
    if (selectedSpan) {
      selectedSpan.classList.add("lyricPtwo");
      selectedSpan.style.animation = `progress ${
        listArray[index.value].data[newValue].tiems[1]
      }ms linear forwards`;
      setTimeout(() => {
        selectedSpan.style.background = "pink";
        selectedSpan.style.backgroundRepeat = "no-repeat";
        selectedSpan.style.webkitBackgroundClip = "text";
      }, listArray[index.value].data[newValue].tiems[1]);
    }
  },
  { flush: "post" }
);
onMounted(() => {
  if (myPlaylist.playlistContent.length !== 0) {
    getLyricNew(myPlaylist.playlistContent[0].id);
  }
  if (myDynamicLyrics.PlayState) {
    postTime();
  }
});
function postTime() {
  timerId = setInterval(function () {
    time.value += 4;
  }, 4);
}

watch(
  () => myDynamicLyrics.PlayState,
  (newValue) => {
    if (newValue) {
      postTime();
    } else {
      clearInterval(timerId);
    }
  }
);
watch(
  () => myDynamicLyrics.CurrentProgress,
  (newValue) => {
    myDiv.value.innerHTML = "";

    time.value = Math.round(newValue * 1000);
  }
);
watch(
  () => myPlaylist.playlistContent,
  () => {
    getLyricNew(myPlaylist.playlistContent[0].id);
  },
  { deep: true }
);

function getLyricNew(ids) {
  console.log(ids);
  myDiv.value.innerHTML = "";
  listArray.length = 0;
  lrclyric.length = 0;
  const tiemstamps = Date.now();
  axios
    .get("http://47.108.209.241:8090/lyric/new", {
      params: {
        id: ids,
        tiemstamp: tiemstamps,
      },
    })
    .then((response) => {
      if (response.data.yrc) {
        processData(response.data.yrc.lyric);
      } else {
        processDatalrc(response.data.lrc.lyric);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
function processData(input) {
  const dataArray = input.split("\n"); // 将输入按行切割成数组
  // 过滤掉不是音频数据部分，并保留其中的歌词部分
  const lyricsArray = dataArray
    .filter((item) => !item.startsWith('{"t":'))
    .map((item) => {
      return item.replace(/[{}]/g, ""); // 去除大括号
    });
  // return lyricsArray;
  let listaArray = [];
  for (let i = 0; i < lyricsArray.length; i++) {
    if (lyricsArray[i] !== "") {
      let accc = parseDatas(lyricsArray[i]);
      listaArray.push(accc);
    }
  }
  listArray.push(...listaArray);
  myDiv.value.innerHTML = "";
  listArray[0].data.forEach((element) => {
    const newElement = document.createElement("span"); // 创建一个新的 <p> 元素
    newElement.textContent = element.datas; // 设置新元素的文本内容
    newElement.classList.add("lyricP");
    myDiv.value.appendChild(newElement); // 将新元素添加为 MyDiv 的子元素
  });
}
function processDatalrc(data) {
  var startIndex = data.indexOf("[");
  var lyricsData = data.substring(startIndex);
  var lyricsArr = [];

  var lines = lyricsData.split("\n");
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    // 使用正则表达式提取时间和歌词内容
    var timeMatch = line.match(/\[(\d+:\d+\.\d+)\]/);
    var contentMatch = line.match(/\]([\s\S]*)/);

    if (timeMatch && contentMatch) {
      var timeString = timeMatch[1];
      var content = contentMatch[1].trim();

      // 将时间字符串转换为时间戳
      var timeParts = timeString.split(":");
      var minutes = parseInt(timeParts[0]);
      var seconds = parseFloat(timeParts[1]);
      var timestamp = (minutes * 60 + seconds) * 1000;

      lyricsArr.push({ time: timestamp, data: content });
    }
  }
  lrclyric.push(...lyricsArr);
  myDiv.value.innerHTML = "";
  const newElement = document.createElement("span");
  newElement.textContent = lrclyric[0].data;
  newElement.classList.add("lyricP");
  myDiv.value.appendChild(newElement);
}
function parseDatas(str) {
  const dataArr = str.match(/\(([^)]+)\)[^\(\)]+/g);
  const time = str.match(/\[(.*?)\]/)[1].split(",");

  const result = {
    time: time.map(Number),
    data: dataArr.map((item) => {
      const tiems = item
        .match(/\(([^)]+)\)/)[1]
        .split(",")
        .map(Number);
      const datas = item.match(/\)(.*)/)[1];
      return { tiems, datas };
    }),
  };

  return result;
}
</script>
<style>
.lyricP {
  font-size: 30px;
  background: white;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 0.5px rgb(124, 124, 124);
  /* font-weight: 300; */
  font-weight: bold;
  font-family: 楷体_GB2312;
  /* animation: text-gradient-animation 10s linear forwards; */
}
.lyricPtwo {
  background: white -webkit-linear-gradient(left, pink, pink) no-repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* animation: text-gradient-animation 10s linear forwards; */
}
@keyframes progress {
  0% {
    background-size: 0%;
  }
  100% {
    background-size: 100%;
  }
}
</style>
<style scoped>
.zt {
  width: 600px;
  overflow: hidden;
  height: 100%;
  position: relative;
}
p {
  width: 100%;
  overflow: hidden;
  margin: 0;
  color: white;
}
span {
  font-size: 15px;
}
.mydiv {
  width: 100%;
  text-align: center;
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>