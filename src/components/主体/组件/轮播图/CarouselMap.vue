<template>
  <div class="zt">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item
        v-for="(item, key) in carouselArray"
        :key="key"
        @dblclick="postcarousel(item.targetId, item.url)"
      >
        <img :src="item.imageUrl" />
        <p :class="{ pback: item.typeTitle === '新歌首发' }">
          {{ item.typeTitle }}
        </p>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
  
  <script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";
import { useMyStore } from "@/pinia/myStore.js";
const myStore = useMyStore();

let carouselArray = reactive([]);

onMounted(() => {
  getcarousel();
});

function getcarousel() {
  axios
    .get("http://47.108.209.241:8090/banner")
    .then((response) => {
      Object.assign(carouselArray, response.data.banners);
      //   gec.value = response.data.lrc.lyric;
      console.log(carouselArray);
    })
    .catch((error) => {
      console.error(error);
    });
}

function postcarousel(id, url) {
  if (id == 0) {
    window.open(url, "_blank");
  } else {
    console.log(id);

    axios
      .get("http://47.108.209.241:8090/song/detail", {
        params: {
          ids: id,
        },
      })
      .then((response) => {
        myStore.setMessage({
          id: response.data.songs[0].id,
          img: response.data.songs[0].al.picUrl,
          name: response.data.songs[0].name,
          songname: response.data.songs[0].ar[0].name,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
</script>
  
  <style scoped>
.el-carousel {
  height: 205px;
  width: 1070px;
  margin: 0;
}
.el-carousel__item {
  height: 205px;
  width: 50%;
  border-radius: 10px;
}
.el-carousel__item p {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: #4a79cc;
  color: white;
  margin: 0;
  padding: 5px 10px;
  border-radius: 10px 0 0 0;
}
.el-carousel__item > p.pback {
  background-color: #cc4a4a !important;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
</style>