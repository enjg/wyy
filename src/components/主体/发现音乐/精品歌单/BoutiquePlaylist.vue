<template>
  <div class="zt">
    <p>精品歌单</p>
    <div class="center" v-for="(item, index) in paginationArray" :key="index">
      <div class="center_left">
        <img
          :src="item.coverImgUrl"
          alt=""
          @click="routerPlaylistDetails(item.id)"
        />
      </div>
      <div class="center_right">
        <p>{{ item.name }}</p>
        <span>by&nbsp;&nbsp;&nbsp;{{ item.creator.nickname }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

import axios from "axios";
import { onMounted, reactive, ref } from "vue";

const route = useRoute();
const cat = route.query.name;
let paginationNumber = ref(0);
let paginationArray = reactive([]);
onMounted(() => {
  getBoutiquePlaylist();
});
function getBoutiquePlaylist() {
  axios
    .get("http://47.108.209.241:8090/top/playlist/highquality", {
      params: {
        cat: cat,
        before: paginationNumber.value * 20,
        limit: 20,
      },
    })
    .then((response) => {
      // 在这里处理返回的数据
      Object.assign(paginationArray, response.data.playlists);
      console.log(paginationArray);
    })
    .catch((error) => {
      // 在这里处理错误
      console.error(error);
    });
}
const router = useRouter();
function routerPlaylistDetails(id) {
  console.log(id);
  router.push({ path: "/index/playlist_details", query: { paramA: id } });

}
</script>

<style scoped>
.zt {
  min-width: 1170px;
}
.zt>p{
  font-size: 22px;
  font-weight: bold;
}
.center {
  width: 380px;
  float: left;
  margin: 5px;
}
.center_left {
  width: 150px;
  height: 150px;
  float: left;
}
.center_right {
  width: 230px;
  height: 150px;
  float: left;
}
.center_left img {
  width: 150px;
  height: 150px;
  float: left;
  border-radius: 5px;
}
.center_right p {
  font-weight: 300;
  font-size: 14px;
  margin-left: 10px;
}
.center_right span {
  margin-left: 10px;
  font-size: 10px;
  color: rgb(142, 142, 142);
}
</style>