<template>
  <div class="zt" v-if="gdxqlb.playlist">
    <div class="gdxq">
      <div class="gdxq_left">
        <img :src="gdxqlb.playlist.coverImgUrl" alt="" />
      </div>
      <div class="gdxq_right">
        <p>{{ gdxqlb.playlist.name }}</p>
        <div class="yhxx">
          <img :src="gdxqlb.playlist.creator.avatarUrl" alt="" />&nbsp;
          <p>&nbsp;&nbsp;{{ gdxqlb.playlist.creator.nickname }}</p>
          <p>&nbsp;&nbsp;{{ gdxqlb.playlist.createTime }}创建</p>
        </div>
        <div class="gnann">
          <div>
            <img src="../../../assets/image/bfq.png" alt="" />
            <p>播出全部</p>
          </div>
          <div>
            <img src="../../../assets/image/收藏.png" alt="" />
            <p>收藏({{ formatNumber(gdxqlb.playlist.subscribedCount) }})</p>
          </div>
          <div>
            <img src="../../../assets/image/分享.png" alt="" />
            <p>分享({{ formatNumber(gdxqlb.playlist.shareCount) }})</p>
          </div>
          <div>
            <img src="../../../assets/image/下载.png" alt="" />
            <p>下载全部</p>
          </div>
        </div>
        <!-- 
        <div class="bq" v-if="gdxqlb.playlist.tags.length>0">
          <span>标题：</span>
          <span v-for="(item, index) in gdxqlb.playlist.tags" :key="index">
            {{ item }}/
          </span>
        </div> -->

        <div class="gqbf" v-if="gdxqlb.playlist.trackCount">
          <span>歌曲：</span>
          <span>{{ gdxqlb.playlist.trackCount }}</span
          >&nbsp;&nbsp;
          <span>播放：</span>
          <span>{{ formatNumber(gdxqlb.playlist.playCount) }}</span>
        </div>

        <div class="jj">
          <span>简介：</span>
          <span>
            {{ gdxqlb.playlist.description }}
          </span>
        </div>
      </div>
    </div>
    <div class="gdplsc">
      <ul>
        <li
          :class="{ click: isRouteMatch('playlist_song_list') }"
          @click="tzlb('/index/playlist_details/playlist_song_list')"
        >
          歌曲列表
        </li>
        <li
          :class="{ click: isRouteMatch('playlist_review') }"
          @click="tzlb('/index/playlist_details/playlist_review')"
        >
          评论(<span>{{ formatNumber(gdxqlb.playlist.commentCount) }}</span
          >)
        </li>
        
        <li
          :class="{ click: isRouteMatch('playlist_collection') }"
          @click="tzlb('/index/playlist_details/playlist_collection')"
        >
          收藏者
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
  
  <script setup>
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const paramA = route.query.paramA;
let gdxqlb = reactive({});
let trackIds = reactive([]);
onMounted(() => {
  getPlaylistDetail(paramA);
  tzlb("/index/playlist_details/playlist_song_list");
  console.log(paramA);
});

function getPlaylistDetail(ids) {
  axios
    .get("http://47.108.209.241:8090/playlist/detail", {
      params: {
        id: ids,
      },
    })

    .then((response) => {
      console.log(response.data.playlist.commentCount);
      Object.assign(gdxqlb, response.data);
      Object.assign(trackIds, response.data.playlist.trackIds);

      gdxqlb.playlist.createTime = formatTimestampToDate(
        gdxqlb.playlist.createTime
      );
    })
    .catch((error) => {
      console.error(error);
    });
}
function formatTimestampToDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
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
function tzlb(a) {
  console.log(a);
  router.push({
    path: a,
    query: {
      id: paramA,
    },
  });
}
function isRouteMatch(routeSegment) {
  return route.path.includes(routeSegment);
}
</script>
  
  <style scoped>
.click {
  font-size: 20px !important;
  font-weight: bold !important;
  border-bottom: 4px solid red;
}
.zt {
  width: 1170px !important;
  margin: auto;
  margin-top: 20px;
}
.gdxq {
  width: 1170px;
  height: 190px;
}
.gdxq_left {
  float: left;
  height: 190px;
  width: 190px;
}
.gdxq_left > img {
  border-radius: 5px;
  height: 190px;
  width: 190px;
}
.gdxq_right {
  float: left;
  width: 940px;
  height: 190px;
  padding: 0;
  overflow: hidden;
  margin-left: 20px;
}
.gdxq_right > p {
  margin: 0;
  font-size: 22px;
  font-weight: bold;
}
.gnann {
  width: 940px;
  display: inline-block;
  clear: both;
}
.gnann > div {
  float: left;
  padding: 0 20px;
  height: 30px;
  background-color: white;
  border-radius: 20px;
  margin-right: 10px;
  border: 1px solid #b2b2b2;
}
.gnann p {
  margin: 0;
  font-size: 14px;
  font-weight: 300;
  line-height: 30px;
  float: left;
}
.gnann img {
  float: left;
  height: 20px;
  width: 20px;
  margin-top: 5px;
}
.gnann > div:nth-of-type(1) {
  background-color: red;
  border: none;
  color: white;
}

.gdxq_right > div {
  margin-top: 10px;
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
.yhxx {
  height: 25px;
  width: 100%;
}
.yhxx > img {
  width: 25px;
  float: left;
  border-radius: 50%;
}
.yhxx > p {
  float: left;
  font-size: 13px;
  font-weight: 300;
  height: 25px;
  line-height: 25px;
  margin: 0;
}
.yhxx > p:nth-of-type(1) {
  color: #6b8fb8;
}
.gqbf {
  height: 20px;
}
.gqbf > span {
  font-size: 13px;
  font-weight: 300;
  line-height: 20px;
}
.jj {
  height: 20px;
  overflow: hidden;
}
.jj > span {
  font-size: 13px;
  font-weight: 300;
  line-height: 20px;
}
</style>