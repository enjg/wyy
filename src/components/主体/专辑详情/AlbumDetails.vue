<template>
  <div class="zt" v-if="gdxqlb.name">
    <div class="gdxq">
      <div class="gdxq_left">
        <img :src="gdxqlb.blurPicUrl" alt="" />
        <div></div>
      </div>
      <div class="gdxq_right">
        <div class="bt">
          <p>专辑</p>
          <p>{{ gdxqlb.name }}</p>
        </div>
        <div class="gnann">
          <input type="button" value="播放全部" />
          <input
            type="button"
            :value="'收藏(' + AlbumDetailDynamic.subCount + ')'"
          />
          <input type="button" value="下载全部" />
          <input type="button" :value="AlbumDetailDynamic.shareCount" />
        </div>
        <p>
          歌手：<span>{{ gdxqlb.artist.name }}</span>
        </p>
        <p>
          时间：<span>{{ formatDate(gdxqlb.publishTime) }}</span>
        </p>
      </div>
    </div>
    <div class="gdplsc">
      <ul>
        <li
          :class="{ click: isRouteMatch('album_song_list') }"
          @click="tzlb('/index/album_details/album_song_list')"
        >
          歌曲列表
        </li>
        <li
          :class="{ click: isRouteMatch('album_details_component') }"
          @click="tzlb('/index/album_details/album_details_component')"
        >
          评论(<span>{{ AlbumDetailDynamic.commentCount }}</span
          >)
        </li>
        <li
          :class="{ click: isRouteMatch('album_introduction') }"
          @click="tzlb('/index/album_details/album_introduction')"
        >
          专辑详情
        </li>
      </ul>
    </div>
    <div></div>
    <router-view></router-view>
  </div>
</template>
  
  <script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const paramA = route.query.paramA;
let gdxqlb = reactive({});
function tzlb(a) {
  router.push({
    path: a,
    query: {
      id: paramA,
    },
  });
}

onMounted(() => {
  getAlbum(paramA);
  getAlbumDetailDynamic(paramA);
  tzlb('/index/album_details/album_song_list')
});
function getAlbum(id) {
  axios
    .get("http://47.108.209.241:8090/album", {
      params: {
        id: id,
      },
    })
    .then((response) => {
      Object.assign(gdxqlb, response.data.album);
      console.log(response.data.album);
      // gdxqlb.playlist.createTime = formatTimestampToDate(
      //   gdxqlb.playlist.createTime
      // );
    })
    .catch((error) => {
      console.error(error);
    });
}
let AlbumDetailDynamic = reactive({});
function getAlbumDetailDynamic(id) {
  axios
    .get("http://47.108.209.241:8090/album/detail/dynamic", {
      params: {
        id: id,
      },
    })
    .then((response) => {
      Object.assign(AlbumDetailDynamic, response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}
function isRouteMatch(routeSegment) {
  return route.path.includes(routeSegment);
}
function formatDate(milliseconds) {
  const date = new Date(milliseconds);
  const year = date.getFullYear(); // 获取年份
  const month = date.getMonth() + 1; // 获取月份（注意月份是从 0 开始的，所以需要加 1）
  const day = date.getDate(); // 获取日期

  // 将月份和日期转换为两位数的格式
  const formattedMonth = month.toString().padStart(2, "0");
  const formattedDay = day.toString().padStart(2, "0");

  // 返回格式化后的年月日字符串
  return `${year}-${formattedMonth}-${formattedDay}`;
}
// function formatTimestampToDate(timestamp) {
//   const date = new Date(timestamp);
//   const year = date.getFullYear();
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const day = date.getDate().toString().padStart(2, "0");

//   return `${year}-${month}-${day}`;
// }
// function formatNumber(number) {
//   if (number >= 100000000) {
//     return Math.floor(number / 100000000) + "亿";
//   } else if (number >= 100000 && number < 100000000) {
//     return Math.floor(number / 10000) + "万";
//   } else {
//     return number.toString();
//   }
// }
</script>
  
  <style scoped>
.click {
  font-size: 20px !important;
  font-weight: bold !important;
  border-bottom: 4px solid red;
}
.zt {
  width: 1170px !important;
  padding-top: 20px;
  margin: auto;
}
.gdxq {
  width: 1170px;
  height: 190px;
}
.gdxq_left {
  float: left;
  height: 190px;
  width: 220px;
  position: relative;
}
.gdxq_left > div {
  width: 190px;
  height: 190px;
  border-radius: 50%;
  position: absolute;
  background-color: black;
  right: 0;
  z-index: -1;
}
.gdxq_left > img {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 5px;
  height: 190px;
  width: 190px;
}
.gdxq_right {
  float: left;
  width: 930px;
  height: 190px;
  padding: 0;
  overflow: hidden;
  margin-left: 20px;
}
.gdxq_right > p {
  font-size: 13px;
  margin: 10px 0;
  font-weight: 300;
}
.gdxq_right > p:nth-of-type(1) > span {
  color: #6b8fb8;
}
.bt > p {
  float: left;
  margin: 0;
}
.bt > p:nth-of-type(2) {
  font-size: 22px;
  font-weight: bold;
  padding: 0;
  line-height: 25px;
}
.bt > p:nth-of-type(1) {
  color: #fd544e;
  border: 1px solid #fd544e;
  font-size: 14px;
  font-weight: 300;
  border-radius: 3px;
  margin-right: 10px;
  padding: 1px 5px;
  line-height: 23px;
  box-sizing: border-box;
}
.gnann {
  width: 100%;
  margin: 50px 0 20px 0;
}
input[type="button"] {
  padding: 0 20px;
  height: 30px;
  background-color: white;
  border-radius: 20px;
  margin-right: 10px;
  border: 1px solid #b2b2b2;
  font-size: 15px;
}
input[type="button"]:nth-of-type(1) {
  background-color: red;
  border: none;
  color: white;
}
p {
  font-size: 13px;
}

.gdplsc {
  width: 1170px;
  height: 30px;
  margin-top: 20px;
}
.gdplsc > ul {
  list-style-type: none;
  padding: 0;
}
.gdplsc > ul > li {
  float: left;
  font-size: 16px;
  line-height: 30px;
  margin-right: 20px;
  font-weight: 300;
}
li > span {
  font-size: 13px;
}
</style>