<template>
  <div class="zt">
    <div
      class="content"
      v-for="(item, index) in listArray"
      :key="index"
      @click="routerPush(item.id)"
    >
      <div>
        <img :src="item.picUrl" alt="" />
        <div></div>
      </div>
      <p v-html="highlightColor(item.name)"></p>
      <p v-on:click.stop="listClick(item.artist)">
        {{ item.artist.name }}
        <span v-if="item.artist.alias.length > 0"
          >({{ item.artist.alias[0] }})</span
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMysinger } from "@/pinia/myStore.js";

let mySinger = useMysinger();
const router = useRouter();
const route = useRoute();
let listArray = reactive([]);
onMounted(() => {
  getCloudsearch(10, route.query.text);
});
function highlightColor(text) {
  const regex = new RegExp(route.query.text, "g");
  return text.replace(regex, '<span style="color: #6b8fb8;">$&</span>');
}
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
      Object.assign(listArray, res.data.result.albums);
    })
    .catch((err) => {
      console.error(err);
    });
}
function listClick(abc) {
  mySinger.updatedsinger(abc.id);
  router.push("/index/singer_details");
}
function routerPush(id) {
  router.push({ path: "/index/album_details", query: { paramA: id } });
}
</script>

<style scoped>
p {
  margin: 0;
}
.zt {
  width: 100%;
}
.content {
  width: 100%;
  height: 80px;
  position: relative;
  cursor: pointer;
}
.content:nth-of-type(2n) {
  background-color: rgb(250, 250, 250);
}
.content:hover {
  background-color: rgb(239, 239, 239);
}
.content > div {
  width: 70px;
  height: 60px;
  border-radius: 5px;
  float: left;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.content > div > img {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  position: absolute;
  left: 0;
  z-index: 1;
}
.content > div > div {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: black;
  position: absolute;
  left: 10px;
}
.content > p {
  float: left;
  margin-left: 10px;
  font-weight: 300;
  font-size: 14px;
  color: rgb(50, 50, 50);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.content > p:nth-of-type(1) {
  position: absolute;
  left: 75px;
}
.content > p:nth-of-type(2) {
  position: absolute;
  left: 50%;
  font-size: 12px;
  display: inline-block;
}
.content > p:hover {
  color: rgb(0, 0, 0) !important;
}
.content span {
  margin-left: 5px;
  color: #6f6f6f;
}
</style>