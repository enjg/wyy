<template>
  <div class="zt">
    <div @click="tzgd(item.id)" class="content" v-for="(item, index) in listArray" :key="index">
      <img :src="item.coverImgUrl" alt="" />
      <p v-html="highlightColor(item.name)"></p>
      <p>{{ item.trackCount }}首</p>
      <p>
        by&nbsp;&nbsp;<span>{{ item.creator.nickname }}</span>
      </p>
      <p>{{ formatNumber(item.playCount) }}</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute,useRouter } from "vue-router";
import { onMounted, reactive } from "vue";

const router = useRouter();
const route = useRoute();
onMounted(() => {
  getCloudsearch(1000, route.query.text);
});
let listArray = reactive([]);
function getCloudsearch(types, text) {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/cloudsearch", {
      params: {
        timestamp: time,
        type: types,
        keywords: text,
      },
    })
    .then((res) => {
      Object.assign(listArray, res.data.result.playlists);
    })
    .catch((err) => {
      console.error(err);
    });
}
function tzgd(a) {
  router.push({ path: "/index/playlist_details", query: { paramA: a } });
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
function highlightColor(text) {
  const regex = new RegExp(route.query.text, "g");
  return text.replace(regex, '<span style="color: #6b8fb8;">$&</span>');
}
</script>

<style scoped>
p {
  margin: 0;
  line-height: 20px;
  font-weight: 300;
  color: #6f6f6f;
}
.zt {
  width: 100%;
}
.content {
  width: 100%;
  height: 80px;
  position: relative;
}
.content:nth-of-type(2n) {
  background-color: rgb(250, 250, 250);
}
.content:hover {
  background-color: rgb(239, 239, 239);
}
.content > * {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.content > img:nth-of-type(1) {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  left: 0;
}
.content > p:nth-of-type(1) {
  font-size: 14px;
  color: rgb(50, 50, 50);
  left: 80px;
}
.content > p:nth-of-type(1):hover {
  color: rgb(0, 0, 0);
}
.content > p:nth-of-type(2) {
  font-size: 12px;
  left: 50%;
}
.content > p:nth-of-type(3) > span {
  color: rgb(50, 50, 50);
}
.content > p:nth-of-type(3) > span:hover {
  color: rgb(0, 0, 0);
}
.content > p:nth-of-type(3) {
  font-size: 12px;
  position: absolute;
  left: calc(50% + 100px);
}
.content > p:nth-of-type(4) {
  font-size: 13px;
  position: absolute;
  right: 100px;
}
</style>