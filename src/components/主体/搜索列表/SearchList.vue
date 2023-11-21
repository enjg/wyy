<template>
  <div class="zt">
    <div class="bt">
      <p>搜索&nbsp;{{ route.query.text }}</p>
    </div>
    <div class="gxq" v-if="SearchMultimatch !== null">
      <p>你可能感兴趣</p>
      <!--歌单-->
      <div v-if="SearchMultimatch.playlist">
        <div class="left">
          <img
            style="width: 45px"
            :src="SearchMultimatch.playlist[0].coverImgUrl"
            alt=""
          />
        </div>
        <div class="right">
          <p>歌单：{{ SearchMultimatch.playlist[0].name }}</p>
          <p>
            歌曲:{{ SearchMultimatch.playlist[0].trackCount }},播放:{{
              formatNumber(SearchMultimatch.playlist[0].playCount)
            }}
          </p>
        </div>
      </div>
      <!--歌手-->
      <div v-if="SearchMultimatch.artist">
        <div class="left">
          <img
            style="border-radius: 50%; width: 45px"
            :src="SearchMultimatch.artist[0].picUrl"
            alt=""
          />
        </div>
        <div class="right">
          <p>
            歌手：{{ SearchMultimatch.artist[0].name }}({{
              SearchMultimatch.artist[0].alias[0]
            }})
          </p>
          <p>
            粉丝:{{ formatNumber(SearchMultimatch.artist[0].fansSize) }},
            歌曲:{{ SearchMultimatch.artist[0].musicSize }}
          </p>
        </div>
      </div>
      <!--专辑-->
      <div v-if="SearchMultimatch.album">
        <div class="left">
          <img :src="SearchMultimatch.album[0].picUrl" alt="" />
        </div>
        <div class="right">
          <p>专辑：{{ SearchMultimatch.album[0].name }}</p>
          <p>{{ SearchMultimatch.album[0].artist.name }}</p>
        </div>
      </div>
      <!--视频-->
      <div v-if="SearchMultimatch.new_mlog">
        <div class="left">
          <img
            style="width: 80px"
            :src="
              SearchMultimatch.new_mlog[0].baseInfo.resource.mlogBaseData
                .coverUrl
            "
            alt=""
          />
        </div>
        <div class="right">
          <p>
            视频：{{
              SearchMultimatch.new_mlog[0].baseInfo.resource.mlogBaseData.text
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="button">
      <ul>
        <li
          @click="routerPush(item.path)"
          v-for="(item, index) in listArray"
          :key="index"
          :class="{ click: isRouteMatch(item.path) }"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <router-view class="router_view"></router-view>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const listArray = [
  {
    name: "单曲",
    path: "/index/search_list/search_single",
  },
  {
    name: "歌手",
    path: "/index/search_list/search_singer",
  },
  {
    name: "专辑",
    path: "/index/search_list/search-album",
  },
  {
    name: "视频",
    path: "/index/search_list/search_video",
  },
  {
    name: "歌单",
    path: "/index/search_list/search_songList",
  },
  {
    name: "歌词",
    path: "/index/search_list/search_lyric",
  },
  {
    name: "播客",
    path: "/index/search_list/search_podcast",
  },
  {
    name: "声音",
    path: "/index/search_list/search_audio",
  },
  {
    name: "用户",
    path: "/index/search_list/search_user",
  },
];
let SearchMultimatch = reactive({});
onMounted(() => {
  getSearchMultimatch(route.query.text);
  routerPush("/index/search_list/search_single");
});
watch(
  () => route.query.text,
  (newValue) => {
    if (route.query.text) {
      SearchMultimatch = reactive({});
      getSearchMultimatch(newValue);
      routerPush("/index/search_list/search_single");
    }
  }
);
function getSearchMultimatch(center) {
  console.log(center);
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/search/multimatch", {
      params: {
        timestamp: time,
        keywords: center,
      },
    })
    .then((res) => {
      // SearchMultimatch=Object.assign({},res.data.result)
      Object.assign(SearchMultimatch, res.data.result);
      console.log(SearchMultimatch);
      console.log(res.data.result);
    })
    .catch((err) => {
      console.error(err);
    });
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
function routerPush(center) {
  router.push({
    path: center,
    query: {
      text: route.query.text,
    },
  });
}
function isRouteMatch(routeSegment) {
  return route.path.includes(routeSegment);
}
</script>

<style scoped>
.click {
  /* font-size: 20px !important; */
  font-weight: bold !important;
  border-bottom: 3px solid red;
}
.router_view {
  width: 100%;
}
p {
  margin: 0;
}
.zt {
  width: 1170px;
  margin: auto;
  margin-top: 20px;
}
.bt {
  height: 50px;
}
.bt > p {
  line-height: 50px;
  font-size: 20px;
  font-weight: bold;
}
.gxq {
  clear: both;
  width: 1170px;
  display: inline-block;
}
.gxq > p {
  line-height: 30px;
  font-size: 12px;
  color: #6d6d6d;
}
.gxq > div {
  height: 70px;
  width: 300px;
  background-color: rgb(246, 246, 246);
  border-radius: 5px;
  float: left;
  margin-right: 10px;
  display: flex;
  /* overflow: hidden; */
}
.gxq > div > div {
  float: left;
}
.left {
  height: 70px;
}
.left > img {
  width: calc(100% - 25px);
  height: 45px;
  border-radius: 5px;
  margin: 12.5px;
}
.right {
  flex-grow: 1;
  /* width: calc(100% - 70px); */
  height: 40px;
  padding-top: 15px;
  padding-bottom: 15px;
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; */
}
.right > p {
  line-height: 20px;
  height: 20px;
  font-weight: 300;
  overflow: hidden;
}
.right > p:nth-of-type(1) {
  font-size: 14px;
}
.right > p:nth-of-type(2) {
  font-size: 11px;
  color: #7b7b7b;
}
.button {
  width: 100%;
  height: 30px;
}
.button > ul {
  padding: 0;
  margin: 0;
  margin-top: 20px;
  background-color: yellow;
}
.button > ul > li {
  margin: 0;
  line-height: 30px;
  list-style: none;
  float: left;
  font-weight: 300;
  margin-right: 30px;
}
</style>