<template>
  <div class="ToneQuality">
    <p @click="ToneQualityTf *= -1">{{ myPlaylist.ToneQuality.name }}</p>
    <div class="ToneQualite_center" v-show="ToneQualityTf === 1">
      <p>歌曲音质</p>
      <div class="content">
        <div
          @click="clickPostToneQuality('标准', 'standard')"
          v-if="myPlaylist.playlistContent[0].l !== null"
        >
          <div>
            <img
              v-show="myPlaylist.ToneQuality.name === '标准'"
              src="./img/勾.png"
              alt=""
            />
          </div>

          <p>标准音质</p>
          <p v-show="myPlaylist.playlistContent[0].fee === 1">VIP</p>
        </div>
        <div
          @click="clickPostToneQuality('极高', 'exhigh')"
          v-if="myPlaylist.playlistContent[0].h !== null"
        >
          <div>
            <img
              v-show="myPlaylist.ToneQuality.name === '极高'"
              src="./img/勾.png"
              alt=""
            />
          </div>
          <p>极高音质</p>
          <p
            v-show="
              myPlaylist.playlistContent[0].fee === 1 ||
              myPlaylist.playlistContent[0].fee === 8
            "
          >
            VIP
          </p>
        </div>
        <div
          @click="clickPostToneQuality('无损', 'lossless')"
          v-if="myPlaylist.playlistContent[0].sq !== null"
        >
          <div>
            <img
              v-show="myPlaylist.ToneQuality.name === '无损'"
              src="./img/勾.png"
              alt=""
            />
          </div>
          <p>无损音质</p>
          <p>VIP</p>
        </div>
        <div
          @click="clickPostToneQuality('Hi-Res', 'hires')"
          v-if="myPlaylist.playlistContent[0].hr !== null"
        >
          <div>
            <img
              v-show="myPlaylist.ToneQuality.name === 'Hi-Res'"
              src="./img/勾.png"
              alt=""
            />
          </div>
          <p>Hi-Res音质</p>
          <p>VIP</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMyPlaylist } from "@/pinia/myPlaylist.js";
import { ref } from "vue";

let ToneQualityTf = ref(-1);
const myPlaylist = useMyPlaylist();
function clickPostToneQuality(name, argument) {
  myPlaylist.ToneQuality.name = name;
  myPlaylist.ToneQuality.argument = argument;
}
</script>

<style scoped>
.ToneQuality {
  height: 70px;
  position: absolute;
  right: 130px;
  bottom: 0;
  z-index: 999999;
}
p {
  margin: 0;
  display: inline-block;
}

.ToneQuality > p {
  margin-top: 25px;
  display: inline-block;
  height: 18px;
  border: 1px solid #fd544e;
  border-radius: 3px;
  font-size: 11px;
  line-height: 18px;
  font-weight: 300;
  text-align: center;
  padding: 0px 2px;
  color: #fd544e;
}
.ToneQualite_center {
  width: 200px;
  height: 170px;
  position: absolute;
  box-sizing: border-box;
  bottom: 65px;
  background-color: white;
  border-radius: 5px;
  right: -85px;
  padding: 15px 15px;
  /* 使用逗号分隔来设置多个阴影效果 */
  box-shadow: 2px 2px 5px 0px rgba(100, 100, 100, 0.2),
    -2px 2px 5px 0px rgba(100, 100, 100, 0.2),
    2px -2px 5px 0px rgba(100, 100, 100, 0.2),
    -2px -2px 5px 0px rgba(100, 100, 100, 0.2);
}
.ToneQualite_center > p {
  font-size: 12px;
  font-weight: 700;
}
.content {
  width: 170px;
  display: inline-block;
  margin-top: 10px;
}
.content > div {
  clear: both;
  width: 100%;
  height: 25px;
}
.content > div > div {
  width: 15px;
  height: 15px;
  margin: 5px 0;
  float: left;
}
.content > div > div > img {
  width: 15px;
  height: 15px;
}
.content > div > p:nth-of-type(1) {
  font-size: 12px;
  font-weight: 300;
  line-height: 25px;
  height: 25px;
  margin: 0;
  margin-left: 5px;
  float: left;
}
.content > div > p:nth-of-type(2) {
  font-size: 10px;
  border: 1px solid #fd544e;
  height: 12px;
  color: #fd544e;
  line-height: 12px;
  padding: 0 2px;
  margin: 5.5px 5px;
  float: left;
}
</style>