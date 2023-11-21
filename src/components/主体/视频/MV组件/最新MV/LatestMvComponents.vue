<template>
  <div class="zt">
    <div class="header">
      <p @click="pushAllMv()">最新MV</p>
      <ul>
        <li v-for="(item, index) in SortedArray" :key="index">
          <span
            @click="sortClick(item)"
            :class="{ click: item == CurrentClassification }"
            >{{ item }}</span
          >
        </li>
      </ul>
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
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import MvBlock from "../../../组件/MV组件/MvBlock.vue";

let CurrentClassification = ref("内地");
let ListArray = reactive([]);
let SortedArray = reactive(["内地", "港台", "欧美", "日本", "韩国"]);

onMounted(() => {
  getMvFirst(CurrentClassification.value);
});
watch(
  () => CurrentClassification.value,
  (newValue) => {
    getMvFirst(newValue);
  }
);
function sortClick(center) {
  CurrentClassification.value = center;
}
function getMvFirst(center) {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/mv/first", {
      params: {
        timestamp: time,
        limit: 8,
        area: center,
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
      district: CurrentClassification.value,
      type: "全部",
      sort: "最新",
    },
  });
}
</script>
  
  <style scoped>
.click {
  background-color: rgb(247, 233, 233) !important;
  border-radius: 50% / 100% !important;
  color: red !important;
}
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
.header ul {
  float: right;
  list-style: none;
}
.header li {
  float: left;
  margin-right: 10px;
}
.header li span {
  font-size: 12px;
  color: rgb(123, 123, 123);
  padding: 5px 10px;
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