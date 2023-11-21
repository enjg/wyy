<template>
  <div class="zt">
    <div class="loader" v-show="abc.length === 0"></div>

    <div class="center">
      <div v-for="item of abc" :key="item.id" class="gd" @click="tzgd(item.id)">
        <img :src="item.coverImgUrl" alt="" />
        <div>
          <p><img src="./bfq.png" alt="" /></p>
          <p>{{ formatNumber(item.playCount) }}</p>
        </div>
        <p>{{ item.name }}</p>
      </div>
    </div>

    <div class="paging" v-show="abc.length !== 0">
      <el-pagination
        :page-size="100"
        :pager-count="9"
        layout="prev, prev-btn, pager, next-btn, next"
        :total="totals"
        class="el-pagination"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const abc = reactive([]);
const Props = defineProps({
  message: String,
});
onMounted(() => {
  hqgdlb(Props.message, 0);
});
watch(
  () => Props.message,
  (newValue) => {
    hqgdlb(newValue,0);
  }
);
function handlePageChange(currentPage) {
  console.log(currentPage);
  hqgdlb(Props.message,currentPage-1)
}
let totals = ref(0);
function hqgdlb(a, offsets) {
  abc.length = 0;
  axios
    .get("http://47.108.209.241:8090/top/playlist", {
      params: {
        cat: a,
        limit: 100,
        offset: offsets * 100,
        order: "hot",
      },
    })
    .then((response) => {
      // 在这里处理返回的数据
      console.log(response.data);
      Object.assign(abc, response.data.playlists);
      totals.value = response.data.total;
    })
    .catch((error) => {
      // 在这里处理错误
      console.error(error);
    });
}
const router = useRouter();
function tzgd(a) {
  console.log(a);
  router.push({ path: "/index/playlist_details", query: { paramA: a } });
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
.loader {
  margin: 100px auto;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1.5s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.zt {
  width: 100%;
}
.center {
  display: inline-block;
}
.gd:nth-of-type(5n) {
  margin-right: 0;
}
.gd:nth-of-type(5n-4) {
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
.gd > p {
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
::v-deep .el-pagination > button {
  border-radius: 5px;
  border: 1px solid rgb(183, 183, 183);
  margin: 0 3px;
}
::v-deep .el-pagination li {
  border: 1px solid rgb(183, 183, 183);
  border-radius: 5px;
  margin: 0 3px;
}
::v-deep .el-pagination li:hover {
  color: black;
  background-color: rgb(236, 236, 236);
}
::v-deep .el-pager li {
  min-width: 25px !important;
  height: 25px !important;
  font-size: 12px;
  font-weight: 300;
}
::v-deep .el-pagination > button {
  min-width: 25px !important;
  height: 25px !important;
  font-size: 12px;
  font-weight: 300;
}
::v-deep .el-pager li.is-active {
  color: white;
  background-color: red;
  cursor: default;
}
.paging {
  width: 1070px;
  height: 100px;
  position: relative;
}
.paging .el-pagination {
  margin: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>