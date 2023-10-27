<template>
  <div class="zt">
    <div class="gdxq" v-if="gdxqlb.playlist">
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
          <input type="button" value="播放全部" />
          <input type="button" value="收藏" />
          <input type="button" value="分享" />
          <input type="button" value="下载全部" />
        </div>

        <div class="bq" v-if="gdxqlb.playlist.tags.length>0">
          <span>标题：</span>
          <span v-for="(item, index) in gdxqlb.playlist.tags" :key="index">
            {{ item }}/
          </span>
        </div>

        <div class="gqbf" v-if="gdxqlb.playlist.trackCount">
          <span>歌曲：</span>
          <span>{{ gdxqlb.playlist.trackCount }}</span>&nbsp;&nbsp;
          <span>播放：</span>
          <span>{{ formatNumber(gdxqlb.playlist.playCount )}}</span>
        </div>

        <div class="jj" v-if="gdxqlb.playlist.description">
          <span>简介：</span>
          <span>
            {{ gdxqlb.playlist.description }}
          </span>
        </div>
      </div>
    </div>
    <div class="gdplsc">
      <ul>
        <li @click="tzlb(1)">歌曲列表</li>
        <li @click="tzlb(2)">评论</li>
        <li @click="tzlb(3)">收藏</li>
      </ul>
    </div>
    <SongList :message="paramA" v-if="xz === 1"></SongList>
  </div>
</template>
  
  <script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import SongList from "./歌曲列表/SongList.vue";

const route = useRoute();
const paramA = route.query.paramA;
let gdxqlb = reactive({});
let trackIds = reactive([]);
let xz = ref(0);

function tzlb(a) {
  xz.value = a;
}

onMounted(() => {
  xz = 1;
  axios
    .get(
      "http://47.108.209.241:8090/playlist/detail",
      {
        params: {
          id: paramA,
        },
      }
    )
    .then((response) => {
      Object.assign(gdxqlb, response.data);
      Object.assign(trackIds, response.data.playlist.trackIds);

      gdxqlb.playlist.createTime = formatTimestampToDate(
        gdxqlb.playlist.createTime
      );
    })
    .catch((error) => {
      console.error(error);
    });
});

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
</script>
  
  <style scoped>
.zt {
  width: 1170px !important;
  padding-top: 20px;
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

input[type="button"] {
  padding: 0 20px;
  height: 30px;
  background-color: white;
  border-radius: 20px;
  margin-right: 10px;
  border: 1px solid #b2b2b2;
  font-size: 16px;
}
input[type="button"]:nth-of-type(1) {
  background-color: red;
  border: none;
  color: white;
}
p {
  font-size: 13px;
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
  font-size: 18px;
  line-height: 30px;
  margin-left: 20px;
  font-weight: 300;
}
.yhxx{
  height: 25px;
  width: 100%;
}
.yhxx>img{
  width: 25px;
  float: left;
  border-radius: 50%;
}
.yhxx>p{
  float: left;
  height: 25px;
  line-height: 25px;
  margin: 0;
}
.yhxx>p:nth-of-type(1){
  color: #6b8fb8;
}
.gqbf>span{
  font-size: 13px;
  font-weight: 300;
}
.jj>span{
  font-size: 13px;
  font-weight: 300;
}
</style>