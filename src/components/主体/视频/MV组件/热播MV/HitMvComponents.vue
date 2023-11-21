<template>
  <div class="zt">
    <div class="header">
      <p @click="pushAllMv()">热播MV</p>
    </div>
    <div class="center">
      <MvBlock
        v-for="(item, index) in ListArray"
        :key="index"
        class="content"
        :message="{
          id: item.id,
          src: item.cover,
          name: item.name,
          artists: item.artists,
          playCount: item.playCount,
        }"
      ></MvBlock>
    </div>
  </div>
</template>
    
    <script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import MvBlock from "../../../组件/MV组件/MvBlock.vue";

let ListArray = reactive([]);

onMounted(() => {
  getMvFirst();
});
function getMvFirst() {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/mv/all", {
      params: {
        timestamp: time,
        limit: 8,
        order: "最热",
      },
    })
    .then((res) => {
      Object.assign(ListArray, res.data.data);
      console.log(ListArray);
    })
    .catch((err) => {
      console.error(err);
    });
}

const router = useRouter();
function pushAllMv() {
  router.push({
    path: "/index/all_mv",
    query: {
      district: "全部",
      type: "全部",
      sort: "最热",
    },
  });
}
</script>
    
    <style scoped>
p {
  margin: 0;
}
.zt {
  clear: both;
  width: 1070px;
  display: inline-block;
}
.header {
  width: 1070px;
}
.header p {
  float: left;
  font-weight: 600;
  font-size: 18px;
}
.center {
  clear: both;
  width: 1070px;
  display: inline-block;
}
.content {
  float: left;
  margin: 10px;
  padding: 0;
}
.content:nth-of-type(4n) {
  margin-right: 0;
}
.content:nth-of-type(4n-3) {
  margin-left: 0;
}
</style>