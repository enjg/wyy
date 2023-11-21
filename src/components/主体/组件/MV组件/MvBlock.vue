<template>
  <div class="content">
    <img
      @click="pushMvDetails(Props.message.id)"
      :src="Props.message.src"
      alt=""
    />
    <p @click="pushMvDetails(Props.message.id)" class="nameHover">
      {{ Props.message.name }}
    </p>
    <div class="SingerName">
      <div v-for="(item, index) in Props.message.artists" :key="index">
        <p @click="pushSingerDetails(item.id)" class="nameHover">{{
          item.name
        }}</p>
        <p v-if="index < Props.message.artists.length - 1"
          >&nbsp;/&nbsp;</p
        >
      </div>
    </div>
    <div class="bf">
      <img src="../../../../assets/image/bfq.png" alt="" />
      <p>{{ formatNumber(Props.message.playCount) }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { useMysinger } from "@/pinia/myStore.js";

let mySinger = useMysinger();
const router = useRouter();
const Props = defineProps({
  message: Object,
});
function formatNumber(number) {
  if (number >= 100000000) {
    return Math.floor(number / 100000000) + "亿";
  } else if (number >= 100000 && number < 100000000) {
    return Math.floor(number / 10000) + "万";
  } else {
    return number.toString();
  }
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
</script>

<style scoped>
p {
  margin: 0;
}
.content {
  width: 252.5px;
  display: inline-block;
  position: relative;
}
.content > img {
  width: 100%;
  height: 145px;
  border-radius: 5px;
  cursor: pointer;
}
.content > p:nth-of-type(1) {
  font-size: 13px;
  color: rgb(48, 48, 48);
  line-height: 20px;
  height: 20px;
  overflow: hidden;
  cursor: pointer;
}
.SingerName{
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
  color: rgb(118, 118, 118);
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