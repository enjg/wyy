<template>
  <div class="zt">
    <h3>专辑介绍</h3>
    <p v-for="(item,index) in splitStringByNewline(singerDetails)" :key="index">{{ item }}</p>
    <!-- <p v-for="(ite, index) in addNewline(singerDetails)" :key="index">
      {{ ite }}
    </p> -->
  </div>
</template>
  
  <script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
let singerDetails = ref("");
let id = route.query.id;
onMounted(() => {
  getAlbum(id);
});
function getAlbum(id) {
  axios
    .get("http://47.108.209.241:8090/album", {
      params: {
        id: id,
      },
    })
    .then((response) => {
      singerDetails.value=response.data.album.description;
    })
    .catch((error) => {
      console.error(error);
    });
}
// function addNewline(str) {
//   // 使用正则表达式替换所有 `\n` 为特定的分隔符
//   var separator = "##"; // 设置分隔符，可以根据实际需求修改
//   var result = str.replace(/\n/g, separator);

//   // 使用 split 方法将字符串拆分为数组
//   var arr = result.split(separator);

//   // 返回结果数组
//   return arr;
// }
function splitStringByNewline(str) {
  return str.split('\n');
}
</script>
  
  <style scoped>
p {
  text-indent: 2em;
  font-weight: 300;
}
</style>