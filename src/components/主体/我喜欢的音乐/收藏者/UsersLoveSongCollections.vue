<template>
  <div class="zt">
    <div
      class="center"
      v-for="(item, index) in PlaylistSubscribersArray"
      :key="index"
    >
      <div class="center_left">
        <img :src="item.avatarUrl" alt="" />
      </div>
      <div class="center_right">
        <div>
          <p>{{ item.nickname }}</p>
          <img
            src="../../../../assets/image/男.png"
            v-show="item.gender === 1"
            alt=""
          />
          <img
            src="../../../../assets/image/女.png"
            v-show="item.gender === 2"
            alt=""
          />
        </div>
        <div v-if="item.signature !== ''">
          <p>{{ item.signature }}</p>
        </div>
      </div>
    </div>
    <p v-show="id || PlaylistSubscribersArray.length === 0">暂无收藏者</p>
  </div>
</template>
    
    <script setup>
import { useRoute } from "vue-router";
import axios from "axios";
import { onMounted, reactive } from "vue";

const route = useRoute();
const id = route.query.id;
onMounted(() => {
  if (id !== null) {
    getPlaylistSubscribers(id);
  }
});
let PlaylistSubscribersArray = reactive([]);
function getPlaylistSubscribers(ids) {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/playlist/subscribers", {
      params: {
        id: ids,
        limit: 30,
        timestamp: time,
      },
    })

    .then((response) => {
      Object.assign(PlaylistSubscribersArray, response.data.subscribers);
      console.log(response.data.subscribers);
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>
    
    <style scoped>
.zt {
  width: 100%;
  position: relative;
}
.zt>p{
  position: absolute;
  font-size: 18px;
  left: 50%;
  top: 100px;
  transform: translateY(-50%);
  color: #b2b2b2;

}
p {
  margin: 0;
  font-weight: 300;
}
.center {
  float: left;
  width: 390px;
  margin-top: 20px;
}
.center_left {
  float: left;
  width: 90px;
  height: 90px;
}
.center_right {
  float: left;
  width: calc(100% - 100px);
  height: 90px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 可选：如果需要让多行元素水平居中 */
  flex-wrap: wrap;
}
.center_right > div {
  height: 20px;
  line-height: 20px;
  /* flex: 1; */
  overflow: hidden;
  flex-basis: 100%;
  display: flex;
}
.center_right > div:nth-of-type(1) > p {
  font-size: 14px;
  float: left;
}
.center_right > div:nth-of-type(1) > img {
  width: 16px;
  height: 16px;
  padding: 2px;
  border-radius: 50%;
  margin-left: 5px;
}
.center_right > div:nth-of-type(1) > img:nth-of-type(1) {
  background-color: #bff3ff;
}
.center_right > div:nth-of-type(1) > img:nth-of-type(2) {
  background-color: #ffcce7;
}
.center_right > div:nth-of-type(2) > p {
  font-size: 11px;
}
.center_left > img {
  width: 100%;
  border-radius: 50%;
}
</style>