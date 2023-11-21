<template>
  <div class="zt">
    <div class="content" v-for="(item, index) in listArray" :key="index" @click="listClick(item)">
      <img :src="item.img1v1Url" alt="" />
      <p v-html="highlightColor(item.name)">
      </p>
      <p v-if="item.alias.length > 0">({{ item.alias[0] }})</p>
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
  getCloudsearch(100, route.query.text);
});
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
      Object.assign(listArray, res.data.result.artists);
    })
    .catch((err) => {
      console.error(err);
    });
}
function listClick(abc) {
  mySinger.updatedsinger(abc.id);
  router.push("/index/singer_details");
}
function highlightColor(text) {
  const regex = new RegExp(route.query.text, "g");
  return text.replace(regex, '<span style="color: #6b8fb8;">$&</span>');
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
.content > img {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  margin-top: 10px;
  float: left;
}
.content > p {
  float: left;
  margin-left: 10px;
  line-height: 80px;
  font-weight: 300;
  font-size: 14px;
}
.content >p:nth-of-type(2) {
  margin-left: 5px;
  color: #6f6f6f;
}
</style>