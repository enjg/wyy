<template>
  <div class="zt">
    <div class="discography">
      <span
        v-for="(item, index) in SongDiscClassification"
        :key="index"
        @click="getListOfNewSongs(item.name,item.type)"
        :class="{discography_span_click:item.name==CurrentClassification.name}"
      >
        {{ item.name }}
      </span>
    </div>
    <ListOfNewSongsVue :message="CurrentClassification.type"></ListOfNewSongsVue>
  </div>
</template>
  
  <script setup>
import { reactive } from "vue";
import ListOfNewSongsVue from "./新歌列表/ListOfNewSongs.vue";

let CurrentClassification = reactive({
    name:"全部",
    type:0,
});
let SongDiscClassification = reactive([
  {
    name: "全部",
    type: 0,
  },
  {
    name: "华语",
    type: 7,
  },
  {
    name: "欧美",
    type: 96,
  },
  {
    name: "日本",
    type: 8,
  },
  {
    name: "韩语",
    type: 16,
  },
]);

function getListOfNewSongs(name,type) {
  CurrentClassification.name = name;
  CurrentClassification.type=type;
}
</script>
  
  <style scoped>
.discography {
  width: 1070px;
  display: inline-block;
  margin: 20px 0;
}
.discography span {
  margin-right: 20px;
  font-size: 16px;
  font-weight: 300;
  line-height: 30px;
}
.discography_span_click {
  color: black !important;
  font-weight: bold !important;
}
</style>