<template>
    <div class="zt">
      <div class="top">
        <ul>
          <li v-for="item in sjarray" :key="item.index" @click="tz(item)" :class="{click:item.name==name}">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <router-view class="router-view-class"></router-view>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from "vue";
  import { useRouter } from "vue-router";
  
  let name=ref("视频")
  const router = useRouter();
  const sjarray = reactive([
    {
      index: 1,
      name: "视频",
      link:"/index/video_component/video_list"
    },
    {
      id: 2,
      name: "MV",
      link:"/index/video_component/mv_list"
    },
  ]);
  
  function tz(a) {
    router.push(a.link);
    name.value=a.name;
  }
  </script>
  

<style scoped>
.zt{
    width: 1070px;
}
.top {
  height: 50px;
  width: 100%;

}
.click{
  font-weight: bold !important;
  font-size: 20px !important;
  border-bottom: 4px solid red;
}
.top > ul {
  color: black;
  float: left;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.top > ul > li {
  float: left;
  font-size: 16px;
  line-height: 50px;
  margin-right: 20px;
  font-weight: 300;
}
.router-view-class{
  margin-top: 20px;
}
</style>