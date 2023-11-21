<template>
  <div class="zt">
    <img src="../../assets/image/logo.jpg" alt="" />
    <div class="gn">
      <input type="button" value="&#x25C0;" @click="goBack" />
      <input type="button" value="&#x25B6;" @click="goForward" />
    </div>
    <div class="search">
      <img src="../../assets/image/3.1-搜索.png" @click="pushSearchList()" />
      <input
        type="text"
        v-on:focus="handleFocus"
        v-on:blur="handleBlur"
        v-model="textValue"
        :placeholder="placeholder"
      />
    </div>
    <div class="search_tips" ref="myElement" v-show="GetcursorTF === 1">
      <div class="Top_trending_Searches" v-if="textValue === ''">
        <div>
          <p>热搜榜</p>
        </div>
        <div
          class="Top_trending_Searches_center"
          v-for="(item, index) in SearchHotDetailArray"
          :key="index"
        >
          <div class="Top_trending_Searches_center_left">
            <p :style="{ color: index < 3 ? 'red' : '#b2b2b2' }">
              {{ index + 1 }}
            </p>
          </div>
          <div class="Top_trending_Searches_center_right">
            <div>
              <p :style="{ fontWeight: index < 3 ? 'bold' : '300' }">
                {{ item.searchWord }}
              </p>
              <img v-if="item.iconUrl" :src="item.iconUrl" alt="" />
              <p>{{ item.score }}</p>
            </div>
            <div v-if="item.content !== ''">
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="searchs" v-if="textValue !== ''">
        <!-- <div class="bt">
          <img src="./img/搜索.png" alt="" />
          <p>猜你想搜</p>
        </div> -->
        <div class="single">
          <div class="bt">
            <img src="../顶部栏/img/音符.png" alt="" />
            <p>单曲</p>
          </div>
          <div v-for="(item, index) in SearchSuggest.songs" :key="index">
            <p>{{ item.name }}</p>
            <p v-if="item.transNames" class="ts">({{ item.transNames[0] }})</p>
            <p>-</p>
            <p v-for="(items, index) in item.artists" :key="index">
              {{ items.name }}&nbsp;
            </p>
          </div>
        </div>
        <div class="Singer">
          <div class="bt">
            <img src="../顶部栏/img/歌手.png" alt="" />
            <p>歌手</p>
          </div>
          <div v-for="(item, index) in SearchSuggest.artists" :key="index">
            <p>{{ item.name }}</p>
          </div>
        </div>
        <div class="album">
          <div class="bt">
            <img src="../顶部栏/img/专辑.png" alt="" />
            <p>专辑</p>
          </div>
          <div v-for="(item, index) in SearchSuggest.albums" :key="index">
            <p>{{ item.name }}</p>
            <p>-</p>
            <p>{{ item.artist.name }}</p>
          </div>
        </div>
        <div class="Songlist">
          <div class="bt">
            <img src="../顶部栏/img/歌单.png" alt="" />
            <p>歌单</p>
          </div>
          <div v-for="(item, index) in SearchSuggest.playlists" :key="index">
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="login_button">
      <img
        v-if="myLogin.LoginStatus.data"
        :src="myLogin.LoginStatus.data.profile.avatarUrl"
        alt=""
      />
      <img
        v-else
        src="../../assets/image/未登录.png"
        alt=""
        @click="abcClick()"
      />
      <p v-if="myLogin.LoginStatus.data">
        {{ myLogin.LoginStatus.data.profile.nickname }}
      </p>
      <p v-else @click="abcClick()">未登录</p>
    </div>
    <!-- <div class="dl" v-if="abc === 1">
      <div class="ch">
        <img src="../../assets/image/差号.png" alt="" @click="abcClick" />
      </div>
      <LogInVue></LogInVue>
    </div> -->
    <div class="ScreenScaling">
      <img @click="toggleFullscreen()" src="./img/全屏.png" alt="" />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref, watch } from "vue";
// import LogInVue from "../主体/组件/登录页面/LogIn.vue";
import { useLoginStore } from "@/pinia/myLogin.js";
import { useRouter } from "vue-router";

const router = useRouter();
const myLogin = useLoginStore();
let GetcursorTF = ref(0);
let textValue = ref("");

function abcClick() {
  myLogin.LogInTF=1;
}
onMounted(() => {
  getRegisterAnonimous();
  getSearchDefault();
});
function getRegisterAnonimous() {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/register/anonimous", {
      params: {
        timestamp: time,
      },
    })
    .then((res) => {
      myLogin.postCookie(res.data.cookie);
    })
    .catch((err) => {
      console.error(err);
    });
}
function handleFocus() {
  GetcursorTF.value = 1;
  if (textValue.value === "") {
    getSearchHotDetail();
  }
}
function handleBlur() {
  GetcursorTF.value = 0;
}
let SearchHotDetailArray = reactive([]);
let placeholder = ref(null);
function getSearchDefault() {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/search/default", {
      params: {
        timestamp: time,
      },
    })
    .then((res) => {
      console.log(res.data.data);
      placeholder.value = res.data.data.showKeyword;
    })
    .catch((err) => {
      console.error(err);
    });
}
function getSearchHotDetail() {
  SearchHotDetailArray.length = 0;
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/search/hot/detail", {
      params: {
        timestamp: time,
      },
    })
    .then((res) => {
      Object.assign(SearchHotDetailArray, res.data.data);
      console.log(res.data.data);
    })
    .catch((err) => {
      console.error(err);
    });
}
const myElement = ref(null);
watch(
  () => textValue.value,
  (newValue, oldValue) => {
    if (newValue !== "") {
      getSearchSuggest(newValue);
    }
    if (
      oldValue === "" &&
      newValue !== "" &&
      myElement.value.clientWidth === 335
    ) {
      console.log(111, myElement.value.clientWidth);
      myElement.value.classList.add("mynoe-class");

      myElement.value.style.width = "400px";
      setTimeout(() => {
        myElement.value.classList.remove("mynoe-class");
      }, 1000);
    }
    if (
      oldValue !== "" &&
      newValue === "" &&
      myElement.value.clientWidth === 400
    ) {
      console.log(222, oldValue, newValue);

      myElement.value.classList.add("mytwo-class");

      myElement.value.style.width = "350px";
      setTimeout(() => {
        myElement.value.classList.remove("mytwo-class");
      }, 1000);
    }
  }
);
let SearchSuggest = reactive({});
function getSearchSuggest(center) {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/search/suggest", {
      params: {
        timestamp: time,
        keywords: center,
      },
    })
    .then((res) => {
      Object.assign(SearchSuggest, res.data.result);
      console.log(res.data.result);
    })
    .catch((err) => {
      console.error(err);
    });
}
function pushSearchList() {
  // console.log(typeof(text))
  if (textValue.value == "") {
    textValue.value = placeholder.value;
  }
  if (textValue.value !== "") {
    router.push({
      path: "/index/search_list",
      query: {
        text: textValue.value,
      },
    });
  }
}
function goBack() {
  window.history.back();
}

function goForward() {
  window.history.forward();
}
function toggleFullscreen() {
  if (document.fullscreenElement) {
    exitFullscreen();
  } else {
    enterFullscreen();
  }
}

function enterFullscreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    // 兼容 Firefox
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    // 兼容 Chrome, Safari 和 Opera
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    // 兼容 IE/Edge
    document.documentElement.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    // 兼容 Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    // 兼容 Chrome, Safari 和 Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    // 兼容 IE/Edge
    document.msExitFullscreen();
  }
}
</script>

<style scoped>
.gn {
  position: absolute;
  left: 200px;
  z-index: 999999999;
}
.gn > input {
  width: 25px;
  height: 25px;
  line-height: 25px;
  border-radius: 50%;
  margin-top: 12.5px;
  background-color: rgba(0, 0, 0, 0.05);
  color: white;
  margin-right: 10px;
}
.ts {
  color: #b2b2b2;
  margin-left: 5px;
}
.searchs {
  width: 100%;
}
.searchs > div > div {
  clear: both;
  height: 30px;
  width: 100%;
  padding-left: 36px;
}
.searchs > div p {
  line-height: 30px;
  font-size: 12px;
  float: left;
  font-weight: 300;
}
.searchs .bt {
  width: 100%;
  height: 50px;
  padding: 0;
}
.searchs .bt > * {
  float: left;
}
.searchs .bt > img {
  width: 16px;
  height: 16px;
  margin: 17px 10px;
}
.searchs .bt > p {
  line-height: 50px;
  font-size: 14px;
  font-weight: 300;
  color: #b2b2b2;
}
p {
  margin: 0;
}
.Top_trending_Searches > div:nth-of-type(1) {
  height: 50px;
  width: 100%;
  position: relative;
}
.Top_trending_Searches > div:nth-of-type(1) > p {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  font-size: 15px;
  color: #b2b2b2;
  font-weight: 300;
}
.Top_trending_Searches_center {
  height: 50px;
  width: 100%;
  box-sizing: border-box;
}
.Top_trending_Searches_center_left {
  float: left;
  width: 50px;
  height: 50px;
  position: relative;
}
.Top_trending_Searches_center_left > p {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #b2b2b2;
}
.Top_trending_Searches_center_right {
  float: left;
  width: calc(100% - 60px);
  height: 50px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.Top_trending_Searches_center_right > div {
  width: 100%;
  height: 25px;
}
.Top_trending_Searches_center_right > div > * {
  float: left;
  line-height: 25px;
  font-weight: 300;
  font-size: 12px;
  color: #b2b2b2;
  margin-right: 5px;
}
.Top_trending_Searches_center_right > div > img {
  height: 12px;
  margin-top: 6.5px;
}
.Top_trending_Searches_center_right > div:nth-of-type(1) > p:nth-of-type(1) {
  color: black;
}
.Top_trending_Searches_center_right > div:nth-of-type(1) > p:nth-of-type(2) {
  font-size: 10px;
}
.Top_trending_Searches_center_right > div {
  height: 25px;
}
.search {
  height: 50px;
  width: 200px;
  position: absolute;
  left: 280px;
  z-index: 999;
}
.search > img {
  height: 15px;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  z-index: 999;
}
.search > img:hover {
  opacity: 0.5;
}
.search > input {
  height: 25px;
  width: 120px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 25px / 100%;
  background-color: rgba(0, 0, 0, 0.05);
  caret-color: white;
  padding-left: 30px; /* 为图标留出空间 */
  color: white;
  font-size: 12px;
}
.search > input[type="text"]::-webkit-input-placeholder {
  /* WebKit（Chrome、Safari）浏览器 */
  color: white;
  opacity: 0.5;
}

.search > input[type="text"]:-moz-placeholder {
  /* Firefox 18-26 */
  color: white;
  opacity: 0.5;
}

.search > input[type="text"]::-moz-placeholder {
  /* Firefox 27- */
  color: white;
  opacity: 0.5;
}

.search > input[type="text"]:-ms-input-placeholder {
  /* IE 10 */
  color: white;
  opacity: 0.5;
}
input:focus {
  outline: none;
}
.search_tips {
  width: 350px;
  height: 550px;
  background-color: white;
  position: fixed;
  top: 55px;
  left: 220px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(195, 195, 195, 0.5);
  overflow: auto;
  padding-bottom: 20px;
}
.mynoe-class {
  animation: widthAnimationnoe 1s forwards;
}

@keyframes widthAnimationnoe {
  from {
    width: 350px;
  }

  to {
    width: 400px;
  }
}
.mytwo-class {
  animation: widthAnimationtwo 1s forwards;
}

@keyframes widthAnimationtwo {
  from {
    width: 400px;
  }

  to {
    width: 350px;
  }
}
.ch {
  height: 30px;
}
.ch img:nth-of-type(1) {
  position: absolute;
  right: 15px;
  top: 10px;
  width: 20px;
}
.dl {
  width: 350px;
  height: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  background-color: white;
  background-color: white;
  box-shadow: 0 0 10px rgba(120, 120, 120, 0.5);
}
.dl h1 {
  font-weight: 300;
}

.login_button > img {
  float: left;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.login_button > p {
  float: left;
  margin: 0;
  text-align: left;
  font-size: 12px;
  width: 100px;
  overflow: hidden;
  line-height: 30px;
  margin-left: 5px;
  color: white;
}
.zt {
  background-color: #ec4141;
  /* max-width: 100%; */
  max-width: 100%;
  min-width: 1470px;
  height: 50px !important;
  position: relative;
}
.zt > img {
  height: 50px;
  background-color: yellow;
  position: absolute;
  left: 0;
}
.login_button {
  position: absolute;
  height: 30px;
  right: 100px;
  top: 50%;
  transform: translateY(-50%);
}
input {
  line-height: 30px;
  height: 30px;
  background-color: none;
  border: none;
}
.ScreenScaling {
  position: absolute;
  right: 50px;
  height: 50px;
  width: 20px;
}
.ScreenScaling > img {
  width: 15px;
  height: 15px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
</style>