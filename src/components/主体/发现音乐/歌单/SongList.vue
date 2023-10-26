<template>
  <div class="song-list-zt">
    <div class="jpgd" v-if="playlists.length" @click="RouterBoutiquePlaylist()">
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
        :value="sortClick"
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
          <p
            v-for="(item, keytwo) in filteredSub(key)"
            :key="keytwo"
            :class="{ click: item.name === sortClick }"
            @click="postsortClickObj(item.name)"
          >
            {{ item.name }}
          </p>
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
let playlists=reactive([])
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
      Object.assign(playlists, response.data.playlists);
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
  position: relative;
}
.jpgd {
  height: 180px;
  border-radius: 10px;
  background: linear-gradient(
    to right,
    #747d74,
    #493b2e,
    #695a46,
    #625242,
    #92978b
  );
  padding: 0;
}
.jpgd_left {
  float: left;
  width: 180px;
  height: 180px;
}
.jpgd_right {
  float: left;
  padding: 0;
}
.jpgd_left > img {
  width: 150px;
  height: 150px;
  margin-left: 15px;
  margin-top: 15px;
  border-radius: 2%;
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
  font-size: 14px;
  color: #e7aa5a;
}
.jpgd_right > p:nth-of-type(1) {
  color: white;
  font-size: 18px;
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
  width: 130px;
  height: 40px;
  margin-top: 15px;
  border-radius: 25px;
  border: 1px solid rgb(138, 138, 138);
  background-color: white;
  font-size: 18px;
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
  font-size: 14px;
  padding: 2px 10px;
}
.playlist-selection {
  width: 780px;
  height: 810px;
  position: absolute;
  top: 290px;
  left: 0;
  z-index: 9999;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(195, 195, 195, 0.5);
}
.fullplaylist {
  height: 80px;
  border-bottom: 1px solid #b2b2b2;
}
.fullplaylist > span {
  line-height: 80px;
  padding: 5px 10px;
  margin: 0;
  width: auto;
  font-size: 22px;
  margin-left: 30px;
  font-weight: 300;
}
.center {
  margin-top: 20px;
  width: 780px;
  display: inline-block;
  clear: both;
}
.center-sort {
  float: left;
  width: 150px;
  text-align: center;
  font-size: 14px;
  position: relative;
}
.center-sort > img {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 10px;
  left: 20px;
}
.center-sort > p {
  color: rgb(153, 153, 153);
  font-size: 14px;
}
.center-songlist {
  float: left;
  width: 630px;
}

.center-songlist p {
  float: left;
  width: 75px;
  margin: 15px;
  font-weight: 300;
  font-size: 14px;
}
</style>