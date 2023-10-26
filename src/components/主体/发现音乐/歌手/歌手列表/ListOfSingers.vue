<template>
  <div class="zt" ref="myDiv">
    <div
      class="center"
      v-for="item in singerArray"
      :key="item.id"
      @click="listClick(item)"
    >
      <img :src="item.img1v1Url" alt="" />
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch, ref } from "vue";
import { defineProps } from "vue";
import axios from "axios";
import { useMysinger } from "@/pinia/myStore.js";
import { useRouter } from "vue-router";

let mySinger = useMysinger();
let myDiv = ref(null);
let litem = ref(1);
// import { useRouter } from "vue-router";
const Props = defineProps({
  message: Object,
});
let singerArray = reactive([]);
onMounted(() => {
  getListOfSingers();
});
watch(
  () => Props.message,
  (newValue) => {
    console.log(newValue);
    litem.value = 1;
    singerArray.length = 0;
    getListOfSingers();
  },
  {
    deep: true,
  }
);
function getListOfSingers() {
  axios
    .get("http://47.108.209.241:8090/artist/list", {
      params: {
        type: Props.message.sort,
        area: Props.message.language,
        offset: (litem.value - 1) * 30,
        limit: 30,
      },
    })
    .then((response) => {
      if (litem.value == 1) {
        Object.assign(singerArray, response.data.artists);
      } else {
        singerArray.push(...response.data.artists);
      }
      litem.value++;
      // 在这里处理返回的数据
    })
    .catch((error) => {
      // 在这里处理错误
      console.error(error);
    });
}


const router = useRouter();

function listClick(abc) {
  mySinger.updatedsinger(abc.id);
  router.push("/index/singer_details");
}
onMounted(()=>{
  window.addEventListener("scroll", handleScroll);
})
let lastTriggerTime = 0;
function handleScroll() {
  const currentTime = Date.now();
  if (myDiv.value !== null) {
    const divs = myDiv.value.querySelectorAll("div");
    const lastDiv = divs[divs.length - 1];
    const lastDivRect = lastDiv.getBoundingClientRect();
    if (lastDivRect.top < window.innerHeight) {
      if (currentTime - lastTriggerTime > 300) {
        console.log("加载更多内容");
        getListOfSingers();
      }
      lastTriggerTime = currentTime;
    }
  }
}
</script>

<style scoped>
.center {
  width: 158px;
  height: 200px;
  margin: 10px;
  float: left;
}
.center > img {
  width: 100%;
  border-radius: 5px;
}
.center > p {
  margin: 0;
}
</style>