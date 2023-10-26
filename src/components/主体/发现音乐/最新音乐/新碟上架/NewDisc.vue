<template>
  <div class="zt">
    <div class="discography">
      <span
        v-for="(item, index) in SongDiscClassification"
        :key="index"
        @click="getListOfNewSongs(item.name, item.area)"
        :class="{
          discography_span_click: item.name == CurrentClassification.name,
        }"
      >
        {{ item.name }}
      </span>
    </div>
    <ListOfNewDiscsVue
      :message="CurrentClassification.area"
    ></ListOfNewDiscsVue>
  </div>
</template>
  
  <script setup>
import { reactive } from "vue";
import ListOfNewDiscsVue from "./新碟列表/ListOfNewDiscs.vue";

let CurrentClassification = reactive({
  name: "全部",
  area: "ALL",
});
let SongDiscClassification = reactive([
  {
    name: "全部",
    area: "ALL",
  },
  {
    name: "华语",
    area: "ZH",
  },
  {
    name: "欧美",
    area: "EA",
  },
  {
    name: "日本",
    area: "JB",
  },
  {
    name: "韩语",
    area: "KR",
  },
]);

function getListOfNewSongs(name, area) {
  CurrentClassification.name = name;
  CurrentClassification.area = area;
}
</script>
  
  <style scoped>
.discography {
  margin: 20px 0;
}
.discography span {
  margin-right: 20px;
  font-size: 18px;
  font-weight: 300;
}
.discography_span_click {
  color: black !important;
  font-weight: bold !important;
}
</style>