<template>
  <div class="zt">
    <div class="bt">
      <p>热门播客></p>
    </div>
    <div class="center">
      <div class="content" v-for="(item, index) in djRadiosArray" :key="index">
        <div class="content_left">
          <img :src="item.picUrl" alt="" />
        </div>
        <div class="content_right">
          <p>{{ item.rcmdtext }}</p>
          <p>{{ item.category }}</p>
          <div class="">
            <p>{{ item.name }}</p>
            <!-- <p>{{ formatNumber(item.playCount) }}</p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";

onMounted(() => {
  getDjHot();
});
let djRadiosArray = reactive([]);
function getDjHot() {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/personalized/djprogram", {
      params: {
        timestamp: time,
        limit: 6,
      },
    })
    .then((res) => {
      Object.assign(djRadiosArray, res.data.result);
      console.log(res.data.result);
    })
    .catch((err) => {
      console.error(err);
    });
}
// function formatNumber(number) {
//   if (number >= 100000000) {
//     return Math.floor(number / 100000000) + "亿";
//   } else if (number >= 100000 && number < 100000000) {
//     return Math.floor(number / 10000) + "万";
//   } else {
//     return number.toString();
//   }
// }
</script>

<style scoped>
.zt {
  width: 100%;
  display: inline-block;
}
.bt {
  height: 50px;
  width: 100%;
}
.bt > p {
  margin: 0;
  line-height: 50px;
  font-size: 21px;
  text-align: left;
  font-weight: 550;
}
.content {
  float: left;
  width: calc(50%);
  height: 75px;
  margin: 10px 0;
}
.content_left {
  float: left;
  height: 75px;
  width: 75px;
}
.content_left > img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.content_right {
  float: left;
  margin-left: 10px;
  height: 65px;
  padding: 5px 0;
}
.content_right p {
  margin: 0;
  font-weight: 300;
}
.content_right > p:nth-of-type(1) {
  font-size: 15px;
  line-height: 20px;
}
.content_right > p:nth-of-type(2) {
  font-size: 11px;
  border: 1px solid #d0d0d0;
  display: inline-block;
  color: #8b8b8b;
  padding: 0 2px;
}
</style>