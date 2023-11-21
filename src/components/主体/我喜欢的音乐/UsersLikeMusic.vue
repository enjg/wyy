<template>
  <div class="zt">
    <div class="gdxq">
      <div class="gdxq_left">
        <img
          v-if="Object.keys(gdxqlb).length > 0"
          :src="gdxqlb.playlist.coverImgUrl"
          alt=""
        />
        <img v-else src="./img/未登录.png" alt="" />
      </div>
      <div class="gdxq_right">
        <p>我喜欢的音乐</p>
        <div class="yhxx">
          <img
            v-if="Object.keys(gdxqlb).length > 0"
            :src="gdxqlb.playlist.creator.avatarUrl"
            alt=""
          />
          <img v-else src="./img/未登录-头像.png" alt="" />
          &nbsp;
          <p v-if="Object.keys(gdxqlb).length > 0">
            &nbsp;&nbsp;{{ gdxqlb.playlist.creator.nickname }}
          </p>
          <p v-else @click="abcClick()">&nbsp;&nbsp;未登录</p>
          <p v-if="Object.keys(gdxqlb).length > 0">
            &nbsp;&nbsp;{{
              formatTimestampToDate(gdxqlb.playlist.createTime)
            }}创建
          </p>
        </div>
        <div class="gnann">
          <div>
            <img src="../../../assets/image/bfq.png" alt="" />
            <p>播出全部</p>
          </div>
          <div>
            <img src="../../../assets/image/收藏.png" alt="" />
            <p>
              收藏<span v-if="Object.keys(gdxqlb).length > 0"
                >({{ formatNumber(gdxqlb.playlist.subscribedCount) }})</span
              >
            </p>
          </div>
          <div>
            <img src="../../../assets/image/分享.png" alt="" />
            <p>
              分享<span v-if="Object.keys(gdxqlb).length > 0">
                ({{ formatNumber(gdxqlb.playlist.shareCount) }})
              </span>
            </p>
          </div>
          <div>
            <img src="../../../assets/image/下载.png" alt="" />
            <p>下载全部</p>
          </div>
        </div>

        <div class="gqbf">
          <span>歌曲：</span>
          <span v-if="Object.keys(gdxqlb).length > 0">{{
            gdxqlb.playlist.trackCount
          }}</span>
          <span v-else>0</span>
          &nbsp;&nbsp;
          <span>播放：</span>
          <span v-if="Object.keys(gdxqlb).length > 0">{{
            formatNumber(gdxqlb.playlist.playCount)
          }}</span>
          <span v-else>0</span>
        </div>
      </div>
    </div>
    <div class="gdplsc">
      <ul>
        <li
          :class="{ click: isRouteMatch('users-love-song-lists') }"
          @click="tzlb('/index/users-like-music/users-love-song-lists')"
        >
          歌曲列表
        </li>
        <li
          :class="{ click: isRouteMatch('users-love-song-reviews') }"
          @click="tzlb('/index/users-like-music/users-love-song-reviews')"
        >
          评论(<span v-if="Object.keys(gdxqlb).length > 0">{{
            formatNumber(gdxqlb.playlist.commentCount)
          }}</span>
          <span v-else>0</span>)
        </li>

        <li
          :class="{ click: isRouteMatch('users-love-song-collections') }"
          @click="tzlb('/index/users-like-music/users-love-song-collections')"
        >
          收藏者
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
    
    <script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useLoginStore } from "@/pinia/myLogin.js";

const myLogin = useLoginStore();
const route = useRoute();
const router = useRouter();
let idsize = ref(null);
let gdxqlb = reactive({});
function abcClick() {
  myLogin.LogInTF = 1;
}
onMounted(() => {
  console.log(1);
  if (myLogin.LoginStatus.data) {
    console.log(3);
    console.log(myLogin.LoginStatus);
    getUserPlaylist(myLogin.LoginStatus.data.account.id);
  } else {
    tzlb("/index/users-like-music/users-love-song-lists");
  }
});
watch(
  () => idsize.value,
  () => {
    tzlb("/index/users-like-music/users-love-song-lists");
  }
);
function getUserPlaylist(id) {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/user/playlist", {
      params: {
        timestamp: time,
        uid: id,
      },
    })
    .then((res) => {
      idsize.value = res.data.playlist[0].id;
      getPlaylistDetail(res.data.playlist[0].id);
    })
    .catch((err) => {
      console.error(err);
    });
}
function getPlaylistDetail(ids) {
  axios
    .get("http://47.108.209.241:8090/playlist/detail", {
      params: {
        id: ids,
      },
    })

    .then((response) => {
      console.log(response.data.playlist);
      Object.assign(gdxqlb, response.data);
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
      id: idsize.value,
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