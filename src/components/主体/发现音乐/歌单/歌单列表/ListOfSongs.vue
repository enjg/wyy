<template>
  <div class="zt">
    <div v-for="item of abc.playlists" :key="item.id" class="gd" @click="tzgd(item.id)">
      <img :src="item.coverImgUrl" alt="" />
      <div>
        <p><img src="./bfq.png" alt="" /></p>
        <p>{{ formatNumber(item.playCount) }}</p>
      </div>
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, reactive, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const abc = reactive({});
const Props = defineProps({
  message: String,
});
onMounted(() => {
  hqgdlb(Props.message);
});
watch(
  () => Props.message,
  (newValue) => {
    hqgdlb(newValue);
  }
);
function hqgdlb(a) {
  axios
    .get(
      "http://47.108.209.241:8090/top/playlist",
      {
        params: {
          cat: a,
          limit: 100,
          order: "hot",
        },
      }
    )
    .then((response) => {
      // 在这里处理返回的数据
      Object.assign(abc, response.data);
    })
    .catch((error) => {
      // 在这里处理错误
      console.error(error);
    });
}
const router=useRouter();
function tzgd(a){
    console.log(a);
    router.push({ path: '/index/playlist_details', query: { paramA: a } });
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

</script>

<style scoped>
.zt {
  width: 100%;
  
}
.gd:nth-of-type(5n){
  margin-right: 0;
}
.gd:nth-of-type(5n-4){
  margin-left: 0;
}
.gd {
  float: left;
  width: 198px;
  height: 250px;
  margin: 10px;
  position: relative;
}
.gd > img {
  width: 100%;
  border-radius: 5px;
}
.gd > p{
  font-size: 14px;
  margin: 0;
  font-weight: 300;
  height: 50px;
}
.gd > div {
  z-index: 999;
  position: absolute;
  top: 5px;
  right: 5px;
  color: white;
  padding: 0;
}
.gd > div p {
  float: left;
  margin: 0;
  font-size: 12px;
  line-height: 15px;
}
.gd > div img {
  height: 15px;
  width: 15px;
  margin-right: 5px;
}
</style>