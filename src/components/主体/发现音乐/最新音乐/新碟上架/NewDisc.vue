<template>
  <div class="zt">
    <div class="discography">
      <p
        v-for="(item, index) in SongDiscClassification"
        :key="index"
        @click="getListOfNewSongs(item.name, item.type)"
        :class="{
          discography_span_click: item.name == CurrentClassification.name,
        }"
      >
        {{ item.name }}
      </p>
      <ul>
        <li>
          <p>推荐</p>
        </li>
        <li>
          <p>全部</p>
        </li>
      </ul>
    </div>
    <div class="center">
      <div class="content-left">
        <div class="yaer">
          {{ getYearMonth("月") }}
        </div>
        <div class="month">
          {{ getYearMonth("年") }}
        </div>
      </div>
      <div class="centent-right"></div>
    </div>
  </div>
</template>
  
  <script setup>
import { reactive } from "vue";

let CurrentClassification = reactive({
  name: "全部",
  type: 0,
});
let SongDiscClassification = reactive([
  {
    name: "全部",
    type: "ALL",
  },
  {
    name: "华语",
    type: "ZH",
  },
  {
    name: "欧美",
    type: "EA",
  },
  {
    name: "日本",
    type: "KR",
  },
  {
    name: "韩语",
    type: "JP",
  },
]);

function getListOfNewSongs(name, type) {
  CurrentClassification.name = name;
  CurrentClassification.type = type;
}
function getYearMonth(center) {
  const currentDate = new Date();
  if (center == "年") {
    return currentDate.getFullYear();
  } else {
    return currentDate.getMonth() + 1;
  }
}
</script>
  
  <style scoped>
.discography {
  width: 1070px;
  display: inline-block;
  margin: 20px 0;
}
.discography > p {
  margin: 0;
  margin-right: 20px;
  font-size: 16px;
  line-height: 30px;
  font-weight: 300;
  float: left;
}
.discography_span_click {
  color: black !important;
  font-weight: bold !important;
}
ul {
  float: right;
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  float: left;
  padding: 0 30px;
  margin: 0;
}
li:nth-of-type(2) {
  border-left: 1px solid black;
  padding-right: 0;
}
li > p {
  line-height: 30px;
  margin: 0;
  font-size: 13px;
}
.yaer {
  width: 200px;
  height: 100px;
  background-color: #f1f1f1;
  clip-path: polygon(0 0, 100% 0, 80% 100%, 0% 100%);
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5)
}
</style>