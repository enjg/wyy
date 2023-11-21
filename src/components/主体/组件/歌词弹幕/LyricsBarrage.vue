<template>
  <div
    ref="draggable"
    class="draggable"
    @mousedown="dragStart"
    :style="{ top: `${top}px`, left: `${left}px` }"
  >
  <dynamic-lyrics></dynamic-lyrics>
    <!-- <div ref="MyDiv" class="mydiv"></div> -->
    <!-- <p>{{ listArray[0] }}</p> -->
    <!-- <p>{{ timeStringToMilliseconds(state.songBackdrop.playtime) }}</p>
    <p>{{ state.songBackdrop.playtime }}</p> -->
    <!-- <p v-for="(item,index) in listArray" :key="index">{{ item }}</p> -->
  </div>
</template>
  

  <script setup>
import { ref, onMounted } from "vue";
import DynamicLyrics from './动态歌词/DynamicLyrics'

const draggable = ref(null);
const dragging = ref(false);
const top = ref(0);
const left = ref(0);
const initialX = ref(0);
const initialY = ref(0);

onMounted(() => {
  // Set initial position to center of the window
  top.value = window.innerHeight / 2 - 60;
  left.value = window.innerWidth / 2 - 300;
});

const dragStart = (e) => {
  dragging.value = true;
  initialX.value = e.clientX - left.value;
  initialY.value = e.clientY - top.value;
};

const drag = (e) => {
  if (dragging.value) {
    e.preventDefault();
    left.value = e.clientX - initialX.value;
    top.value = e.clientY - initialY.value;

    // Restrict within the window boundaries
    if (top.value < 0) {
      top.value = 0;
    }
    if (left.value < 0) {
      left.value = 0;
    }
    if (top.value > window.innerHeight - draggable.value.clientHeight) {
      top.value = window.innerHeight - draggable.value.clientHeight;
    }
    if (left.value > window.innerWidth - draggable.value.clientWidth) {
      left.value = window.innerWidth - draggable.value.clientWidth;
    }
  }
};

const dragEnd = () => {
  dragging.value = false;
};

onMounted(() => {
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", dragEnd);
});
// watch(
//   () => state.songBackdrop.playtime,
//   (newValue) => {
//     Refresh(newValue);
//     // console.log(newValue)
//   }
// );
// let lyric = ref(0);
// let lyricelemt = ref(null);
// function Refresh(tiem) {
//   let abcd = timeStringToMilliseconds(tiem);
//   for (let i = 0; i < listArray.length; i++) {
//     if (listArray[i].time[0] <= abcd && listArray[i + 1].time[0] >= abcd) {
//       lyric.value = i;
//       break;
//     }
//   }
//   //   classList.add("songbackClick");
//   // console.log(listArray[lyric.value].data.length)
//   //   for (let f = 0; f < listArray[lyric.value].data.length; f++) {
//   //     if (
//   //       listArray[lyric.value].data[f].tiems[0] <= abcd &&
//   //       listArray[lyric.value].data[f].tiems[0] +
//   //         listArray[lyric.value].data[f].tiems[1] >=
//   //         abcd
//   //     ) {
//   //       lyricelemt.value = f;
//   //       break;
//   //     }
//   //   }
// }
// watch(
//   () => lyricelemt.value,
//   (newValue) => {
//     console.log(newValue);
//     console.log(MyDiv.value.childNodes[newValue]);
//     if (MyDiv.value.childNodes[newValue]) {
//       //   for (let i = 0; i < newValue; i++) {
//       //     MyDiv.value.childNodes[i].style.color = "red";
//       //   }
//       MyDiv.value.childNodes[newValue].classList.add("colorChangingAnimation");
//     }
//   }
// );
// watch(
//   () => lyric.value,
//   (newValue) => {
//     MyDiv.value.innerHTML = "";
//     listArray[newValue].data.forEach((element) => {
//       // console.log(77,element.datas)
//       const newElement = document.createElement("span"); // 创建一个新的 <p> 元素
//       newElement.textContent = element.datas; // 设置新元素的文本内容
//       //   newElement.classList.add("lyricP");
//       MyDiv.value.appendChild(newElement); // 将新元素添加为 MyDiv 的子元素
//     });
//   }
// );
// onMounted(() => {
//   getLyricNew(myPlaylist.playlistContent[0].id);
// });
// let listArray = reactive([]);
// function getLyricNew(ids) {
//   console.log(ids);
//   const timestamps = Date.now();
//   axios
//     .get("http://47.108.209.241:8090/lyric/new", {
//       params: {
//         id: ids,
//         timestamp: timestamps,
//       },
//     })
//     .then((response) => {
//       console.log(response.data.yrc.lyric);
//       processData(response.data.yrc.lyric);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }
// function processData(input) {
//   const dataArray = input.split("\n"); // 将输入按行切割成数组
//   // 过滤掉不是音频数据部分，并保留其中的歌词部分
//   const lyricsArray = dataArray
//     .filter((item) => !item.startsWith('{"t":'))
//     .map((item) => {
//       return item.replace(/[{}]/g, ""); // 去除大括号
//     });
//   // return lyricsArray;
//   let listaArray = [];
//   for (let i = 0; i < lyricsArray.length; i++) {
//     if (lyricsArray[i] !== "") {
//       let accc = parseDatas(lyricsArray[i]);
//       listaArray.push(accc);
//     }
//   }
//   listArray.push(...listaArray);
// }
// function parseDatas(str) {
//   // console.log(str)
//   const dataArr = str.match(/\(([^)]+)\)[^\(\)]+/g);
//   const time = str.match(/\[(.*?)\]/)[1].split(",");

//   const result = {
//     time: time.map(Number),
//     data: dataArr.map((item) => {
//       const tiems = item
//         .match(/\(([^)]+)\)/)[1]
//         .split(",")
//         .map(Number);
//       const datas = item.match(/\)(.*)/)[1];
//       return { tiems, datas };
//     }),
//   };

//   // console.log(result);
//   return result;
// }
// function timeStringToMilliseconds(timeString) {
//   const [minutes, seconds] = timeString.split(":");
//   const [parsedSeconds, centiseconds] = seconds.split(".");
//   const milliseconds =
//     parseInt(minutes, 10) * 60 * 1000 +
//     parseInt(parsedSeconds, 10) * 1000 +
//     parseFloat("0." + centiseconds) * 1000;
//   return milliseconds;
// }
</script>
  
  <style scoped>
@keyframes colorChange {
  0% {
    color: white;
  }
  100% {
    color: pink;
  }
}

.colorChangingAnimation {
  animation: colorChange 1s linear infinite;
  color: pink;
}
.mydiv {
  border: 1px solid black;
}
.mydiv {
  margin: 0 !important;
  color: white !important;
  font-size: 25px;
  line-height: 50px;
  text-align: center;
}
.lyricP {
  color: pink !important;
}
.draggable {
  position: fixed;

  cursor: move;
  background-color: rgb(0, 0, 0, 0.4);
  height: 120px;
  min-width: 600px;
}
.draggable > p {
  margin: 0;
}
</style>