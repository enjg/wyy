<template>
  <div class="zt">
    <div class="content" v-for="(item, index) in listArray" :key="index">
      <img @click="pushMvDetails(item.vid)" :src="item.coverUrl" alt="" />
      <div>
        <p class="mv">MV</p>
        <p
          @click="pushMvDetails(item.vid)"
          class="nameHover"
          v-html="highlightColor(item.title)"
        ></p>
      </div>

      <div class="SingerName">
        <div v-for="(items, index) in item.creator" :key="index">
          <p @click="pushSingerDetails(items.userId)" class="nameHover">
            {{ items.userName }}
          </p>
          <p v-if="index < item.creator.length - 1">&nbsp;/&nbsp;</p>
        </div>
      </div>
      <div class="bf">
        <img src="../../../../assets/image/bfq.png" alt="" />
        <p>{{ formatNumber(item.playTime) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import { useMysinger } from "@/pinia/myStore.js";
import { onMounted, reactive } from "vue";

let mySinger = useMysinger();
const router = useRouter();
const route = useRoute();
onMounted(() => {
  getCloudsearch(1014, route.query.text);
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
      Object.assign(listArray, res.data.result.videos);
    })
    .catch((err) => {
      console.error(err);
    });
}
function pushMvDetails(ids) {
  console.log(ids);
  router.push({
    path: "/mv_details",
    query: {
      id: ids,
    },
  });
}
function pushSingerDetails(id) {
  mySinger.updatedsinger(id);
  router.push("/index/singer_details");
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
.zt {
  width: 100%;
}
p {
  margin: 0;
}
.content {
  width: 277.5px;
  /* display: inline-block; */
  position: relative;
  float: left;
  margin: 10px;
}
.content:nth-of-type(4n) {
  margin-right: 0;
}
.content:nth-of-type(4n-3) {
  margin-left: 0;
}
.content > img {
  width: 100%;
  height: 160px;
  border-radius: 5px;
  cursor: pointer;
}
.mv {
  box-sizing: border-box;
  font-size: 10px;
  border: 1px solid #fd544e;
  line-height: 12px;
  padding: 0 2px;
  margin: 4px 3px;
  color: #fd544e;
  border-radius: 2px;
}
.content >div:nth-of-type(1)> p {
  float: left;
}
.content >div:nth-of-type(1)> p:nth-of-type(2) {
  line-height: 20px;
  font-size: 13px;
  color: rgb(48, 48, 48);
  line-height: 20px;
  height: 20px;
  overflow: hidden;
  cursor: pointer;
}
.SingerName {
  display: inline-block;
  width: 100%;
  height: 20px;
  overflow: hidden;
}
.SingerName > div {
  float: left;
}
.SingerName > div > p {
  float: left;
  font-size: 11px;
  height: 20px;
  line-height: 20px;
  margin: 0;
  color: rgb(167, 167, 167);
}
.SingerName > div > p:nth-of-type(1) {
  cursor: pointer;
}
.nameHover:hover {
  color: black !important;
}
.content .bf {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 999;
}
.bf > img {
  float: left;
  width: 15px;
}
.bf > p {
  float: left;
  color: white;
  font-size: 12px;
  margin-left: 5px;
}
</style>