<template>
  <div class="zt">
    <div class="bt">
      <p>独家放送</p>
    </div>
    <div class="center" ref="myDiv">
      <div class="content" v-for="(item, index) in ListArray" :key="index">
        <img :src="item.picUrl" alt="" @click="pushMvDetails(item)" />
        <p @click="pushMvDetails(item)">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
let myDiv = ref(null);
onMounted(() => {
  getPersonalizedPrivatecontentList(0);
});
let size = ref(0);
watch(
  () => size.value,
  (newValue) => [getPersonalizedPrivatecontentList(newValue)]
);
let ListArray = reactive([]);
function getPersonalizedPrivatecontentList(size) {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/personalized/privatecontent/list", {
      params: {
        timestamp: time,
        limit: 60,
        offset: size * 60,
      },
    })
    .then((res) => {
      console.log(res.data.result);
      ListArray.push(...res.data.result);
    })
    .catch((err) => {
      console.error(err);
    });
}
let lastTriggerTime = 0;
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});
function handleScroll() {
  const currentTime = Date.now();
  if (myDiv.value !== null) {
    const divs = myDiv.value.querySelectorAll("div");
    const lastDiv = divs[divs.length - 1];
    
    if (lastDiv) { // 添加判断条件，确保 lastDiv 存在
      const lastDivRect = lastDiv.getBoundingClientRect();
      if (lastDivRect && lastDivRect.top < window.innerHeight) {
        console.log("加载更多内容");

        if (currentTime - lastTriggerTime > 300) {
          console.log("加载更多内容");
          size.value = size.value + 1;
        }
        lastTriggerTime = currentTime;
      }
    }
  }
}
const router = useRouter();
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
  width: 1070px;
  margin: auto;
  margin-top: 20px;
}
p {
  margin: 0;
}
.bt {
  height: 50px;
}
.bt > p {
  line-height: 50px;
  font-size: 21px;
  font-weight: bold;
}
.content > img {
  width: 100%;
  height: 140px;
  border-radius: 5px;
  cursor: pointer;
}
.content {
  width: 343px;
  float: left;
  margin-bottom: 20px;
  display: inline-block;
}
.content:nth-of-type(3n-1) {
  margin: 0px 20px 20px;
}
.content > p {
  height: 40px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 300;
  cursor: pointer;
  margin: 0;
}
</style>