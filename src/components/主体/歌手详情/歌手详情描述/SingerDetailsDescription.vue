<template>
  <div class="zt">
    <div class="center" v-for="(item, index) in singerDetails" :key="index">
      <h3>{{ item.ti }}</h3>
      <p v-for="(ite,index) in addNewline(item.txt)" :key="index">
        {{ ite }}
      </p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useMysinger } from "@/pinia/myStore.js";

let mySinger = useMysinger();
let singerDetails = reactive([]);
onMounted(() => {
  getsingerDetails();
});
function getsingerDetails() {
  axios
    .get("http://47.108.209.241:8090/artist/desc", {
      params: {
        id: mySinger.id,
      },
    })
    .then((response) => {
      Object.assign(singerDetails, response.data.introduction);
      console.log(singerDetails);
    })
    .catch((error) => {
      console.error(error);
    });
}
function addNewline(str) {
  // 使用正则表达式替换所有 `\n` 为特定的分隔符
  var separator = '##'; // 设置分隔符，可以根据实际需求修改
  var result = str.replace(/\n/g, separator);

  // 使用 split 方法将字符串拆分为数组
  var arr = result.split(separator);

  // 返回结果数组
  return arr;
}
</script>

<style scoped>
p {
  text-indent: 2em;
  font-weight: 300;
}
</style>