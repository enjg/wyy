<template>
  <div class="zt">
    <div class="bt">
      <p @click="routerPush()">独家放送></p>
    </div>
    <div class="center">
      <div class="content" v-for="(item, index) in ListArray" :key="index">
        <img :src="item.sPicUrl" alt="" @click="pushMvDetails(item)" />
        <p @click="pushMvDetails(item)">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
onMounted(() => {
  getPersonalizedPrivatecontentList();
});
let ListArray = reactive([]);
function getPersonalizedPrivatecontentList() {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/personalized/privatecontent/list", {
      params: {
        timestamp: time,
        limit: 3,
      },
    })
    .then((res) => {
      console.log(res.data.result);
      Object.assign(ListArray, res.data.result);
    })
    .catch((err) => {
      console.error(err);
    });
}
function routerPush() {
  router.push("/index/exclusive_MV");
}
function pushMvDetails(center) {
  console.log(center.id);
  router.push({
    path: "/mv_details",
    query: {
      id: center.id,
    },
  });
}
</script>

<style scoped>
.zt {
  width: 100%;
}
p {
  margin: 0;
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
.content > img {
  width: 100%;
  height: 190px;
  border-radius: 5px;
  cursor: pointer;
}
.content {
  width: 343px;
  float: left;
}
.content:nth-of-type(2) {
  margin: 0 20px;
}
.content > p {
  font-size: 14px;
  font-weight: 300;
  cursor: pointer;
}
</style>