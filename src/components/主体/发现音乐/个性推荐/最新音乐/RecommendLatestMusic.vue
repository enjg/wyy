<template>
  <div class="zt">
    <div class="bt">
      <p>最新音乐></p>
    </div>
    <div class="center">
      <div class="content" v-for="(item, index) in ListArray" :key="index">
        <div class="content_left">
          <img :src="item.picUrl" alt="" />
          <img src="../../../../../assets/image/未标题-2.png" alt="" />
        </div>
        <div class="content_right">
          <p>{{ item.name }}</p>
          <div>
            <p v-if="item.fee == 1" class="mv vip">VIP</p>
            <p v-if="item.fee == 1" class="mv">试听</p>
            <p v-if="item.song.sqMusic !== null && item.song.hrMusic == null" class="mv">SQ</p>
            <p v-if="item.song.hrMusic !== null" class="mv">Hi-Res</p>
            <p v-if="item.song.mvid !== 0" class="mv">MV</p>
            <p v-for="(items,index) in item.song.artists" :key="index">{{ items.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import axios from "axios";
import { onMounted, reactive } from "vue";
onMounted(() => {
  getPersonalizedNewsong();
});
let ListArray = reactive([]);
function getPersonalizedNewsong() {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/personalized/newsong", {
      params: {
        timestamp: time,
        limit: 12,
      },
    })
    .then((res) => {
      console.log(res.data.result);
      Object.assign(ListArray, res.data.result);
    })
    .catch((err) => {
      console.error(err);
    });
}
</script>
  
  <style scoped>
.zt {
  width: 100%;
}
p {
  margin: 0;
}
.bt {
  height: 50px;
  width: 100%;
}
.bt > p {
  margin: 0;
  line-height: 50px;
  font-size: 21px;
  text-align: left;
  font-weight: 550;
}
.content {
  width: 356px;
  float: left;
  margin: 5px 0;
}
.content_left {
  width: 50px;
  float: left;
  position: relative;
}
.content_right {
  float: left;
  width: 296px;
  margin-left: 10px;
  height: 40px;
  padding: 5px 0;
}
.content_left > img:nth-of-type(1) {
  width: 100%;
  border-radius: 5px;
}
.content_left > img:nth-of-type(2) {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.content_right > p {
  font-size: 13px;
  line-height: 20px;
}
.content_right>div{
  height: 15px;
  margin-top: 5px;
}
.content_right > div > p {
  float: left;
}
.content_right > div > p {
  font-size: 11px;
  color: #b2b2b2;
  line-height: 15px;
}
.mv {
  box-sizing: border-box;
  font-size: 10px;
  font-weight: 500;
  border: 1px solid #fd544e !important;
  line-height: 12px !important;
  margin: 1.5px 6px 0 0;
  padding: 0 2px;
  color: #fd544e !important;
  border-radius: 2px;
}

.vip {
  color: #fd8558;
}
</style>