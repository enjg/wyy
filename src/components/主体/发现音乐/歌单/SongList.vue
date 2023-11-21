<template>
  <div class="song-list-zt">
    <div class="jpgd" v-if="playlists.length" @click="RouterBoutiquePlaylist()">
      <img :src="playlists[0].coverImgUrl" alt="" />
      <div class="jpgd_left">
        <img :src="playlists[0].coverImgUrl" alt="" />
      </div>
      <div class="jpgd_right">
        <div class="jpgd_name">
          <p>精品歌单</p>
        </div>
        <p>{{ playlists[0].name }}</p>
        <p>{{ playlists[0].copywriter }}</p>
      </div>
    </div>
    <div class="gdxz">
      <input
        type="button"
        :value="`${sortClick} >`"
        @click="playlistcategorybutton()"
      />
      <ul>
        <li v-for="item in rmgd" :key="item.id">
          <span
            :class="{ click: item.name === sortClick }"
            @click="postsortClickObj(item.name)"
          >
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="playlist-selection" v-show="playlistCategorytf == 1">
      <div class="fullplaylist">
        <span
          :class="{ click: sortClick === '全部歌单' }"
          @click="postsortClickObj('全部歌单')"
        >
          全部歌单
        </span>
      </div>
      <div class="center" v-for="(value, key) in categories" :key="key">
        <div class="center-sort">
          <img :src="imgage[key].url" alt="" />
          <p>{{ value }}</p>
        </div>
        <div class="center-songlist">
          <div
            v-for="(item, keytwo) in filteredSub(key)"
            :key="keytwo"
            @click="postsortClickObj(item.name)"
          >
            <span :class="{ click: item.name === sortClick }">
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <list-of-songs :message="idx"></list-of-songs>
  </div>
</template>
  
  <script setup>
import { reactive, onMounted, ref } from "vue";
import axios from "axios";
import ListOfSongs from "./歌单列表/ListOfSongs.vue";
import { useRouter } from "vue-router";

let sub = reactive([]);
const router = useRouter();
let categories = reactive([]);
let idx = ref();
let playlists = reactive([]);
let imgage = reactive([
  { url: require("@/assets/image/17-地球.png") },
  { url: require("@/assets/image/钢琴.png") },
  { url: require("@/assets/image/ic_coffee.png") },
  { url: require("@/assets/image/笑脸.png") },
  { url: require("@/assets/image/主题.png") },
]);
let rmgd = reactive({});
let playlistCategorytf = ref(-1);
let sortClick = ref("华语");
onMounted(() => {
  bqtgg(sortClick.value);
  gd();
  playlistCategory();
  getPlaylistCategory();
});
function postsortClickObj(name) {
  sortClick.value = name;
  playlistCategorytf.value = -1;
  bqtgg(sortClick.value);
}
function bqtgg(a) {
  axios
    .get("http://47.108.209.241:8090/top/playlist/highquality", {
      params: {
        cat: a,
        limit: 1,
      },
    })
    .then((response) => {
      // 在这里处理返回的数据
      if (response.data.playlists.length != 0) {
        Object.assign(playlists, response.data.playlists);
      } else {
        playlists.length = 0;
      }
      idx.value = a;
      console.log(a);
    })
    .catch((error) => {
      // 在这里处理错误
      console.error(error);
    });
}
function getPlaylistCategory() {
  axios
    .get("http://47.108.209.241:8090/playlist/catlist")
    .then((response) => {
      // 在这里处理返回的数据
      Object.assign(sub, response.data.sub);
      Object.assign(categories, response.data.categories);
    })
    .catch((error) => {
      // 在这里处理错误
      console.error(error);
    });
}
function gd() {
  axios
    .get("http://47.108.209.241:8090/playlist/hot")
    .then((response) => {
      // 在这里处理返回的数据
      Object.assign(rmgd, response.data.tags);
      console.log(rmgd);
    })
    .catch((error) => {
      // 在这里处理错误
      console.error(error);
    });
}
function playlistCategory() {
  axios
    .get("http://47.108.209.241:8090/playlist/catlist")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      // 在这里处理错误
      console.error(error);
    });
}
function filteredSub(key) {
  return sub.filter((item) => item.category === key);
}
function playlistcategorybutton() {
  playlistCategorytf.value = playlistCategorytf.value * -1;
}
function RouterBoutiquePlaylist() {
  router.push({
    path: "/index/discover_music/boutique_playlist",
    query: { name: sortClick.value },
  });
}
</script>

<style scoped>
.click {
  background-color: rgb(247, 233, 233) !important;
  border-radius: 25% / 100% !important;
  color: red !important;
}
.song-list-zt {
  width: 1070px;
}
.jpgd {
  height: 170px;
  border-radius: 10px;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 0;
}
.jpgd > img {
  width: 100%;
  filter: blur(50px) brightness(0.7);
  position: absolute;
  top: -435px;
  z-index: -1;
}
.jpgd_left {
  float: left;
  width: 170px;
  height: 170px;
}
.jpgd_right {
  float: left;
  padding: 0;
}
.jpgd_left > img {
  width: 140px;
  height: 140px;
  margin-left: 15px;
  margin-top: 15px;
  border-radius: 5%;
}
.jpgd_name {
  width: 100px;
  height: 30px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid #e7aa5a;
  margin-top: 35px;
}
.jpgd_name > p {
  line-height: 30px;
  margin: 0;
  font-size: 13px;
  color: #e7aa5a;
}
.jpgd_right > p:nth-of-type(1) {
  color: white;
  font-size: 16px;
}
.jpgd_right > p:nth-of-type(2) {
  color: rgb(188, 188, 188);
  font-size: 14px;
  margin: 0;
}
.gdxz {
  height: 70px;
}
.gdxz > input {
  width: 100px;
  height: 30px;
  margin-top: 14px;
  font-weight: 300;
  border-radius: 25px;
  border: 1px solid #d8d8d8;
  background-color: white;
  font-size: 18px;
  font-size: 15px;
}
.gdxz > ul {
  float: right;
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-top: 10px;
}
.gdxz > ul > li {
  float: left;
  margin-left: 10x;
  line-height: 50px;
  color: rgb(76, 76, 76);
}
.gdxz span {
  font-size: 12px;
  padding: 2px 10px;
}
.playlist-selection {
  width: 720px;
  height: 720px;
  position: absolute;
  top: 230px;
  left: 0;
  z-index: 9999;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(195, 195, 195, 0.5);
}
.fullplaylist {
  height: 60px;
  border-bottom: 1px solid #e6e6e6;
}
.fullplaylist > span {
  line-height: 60px;
  padding: 5px 10px;
  margin: 0;
  width: auto;
  font-size: 15px;
  margin-left: 20px;
  font-weight: 300;
}
.center {
  margin-top: 10px;
  width: 100%;
  display: inline-block;
  clear: both;
  overflow: hidden;
}
.center-sort {
  float: left;
  width: 100px;
  text-align: center;
  font-size: 14px;
  position: relative;
}
.center-sort > img {
  position: absolute;
  width: 25px;
  height: 25px;
  top: 8px;
  left: 20px;
}
.center-sort > p {
  color: rgb(153, 153, 153);
  font-size: 13px;
  margin: 0;
  margin-top: 10px;
  display: inline-block;
  margin-left: 22px;
}
.center-songlist {
  float: left;
  width: calc(100% - 100px);
}

.center-songlist > div {
  float: left;
  width: 80px;
  margin: 10px 10px;
  font-weight: 300;
  font-size: 13px;
}
.center-songlist > div > span {
  padding: 5px 10px;
}
</style>