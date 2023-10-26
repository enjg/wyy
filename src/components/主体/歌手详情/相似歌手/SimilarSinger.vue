<template>
  <div class="zt">
    <div
      class="center"
      v-for="item in similarSingerArray"
      :key="item.index"
      @click="listClick(item)"
    >
      <img :src="item.img1v1Url" alt="" />
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>
  
  <script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";
import { useMysinger } from "@/pinia/myStore.js";
import { useRouter } from "vue-router";

let mySinger = useMysinger();
let similarSingerArray = reactive([]);
onMounted(() => {
  getsimilarSingerArray();
});
function getsimilarSingerArray() {
  axios
    .get("http://47.108.209.241:8090/simi/artist", {
      params: {
        id: mySinger.id,
      },
    })
    .then((response) => {
      Object.assign(similarSingerArray, response.data.artists);
      console.log(similarSingerArray);
    })
    .catch((error) => {
      console.error(error);
    });
}
const router = useRouter();
function listClick(abc) {
  mySinger.updatedsinger(abc.id);
  router.push("/index/singer_details");
}
</script>
  
  <style scoped>
.center {
  float: left;
  margin: 10px 5px;
  height: auto;
}
.center img {
  width: 224px;
  height: 224px;
  border-radius: 5px;
}
.center p {
  margin: 0px;
}
</style>