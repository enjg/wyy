<template>
  <div class="zt">
    <div class="bt">
      <p>全部MV</p>
    </div>
    <div class="header">
      <form action="">
        <tbody>
          <tr>
            <td>地区:</td>
            <td
              v-for="(item, index) in AllCategories.RegionalClassification"
              :key="index"
            >
              <p>
                <span
                  :class="{
                    click: item == sortClick.ReadableByteStreamController,
                  }"
                  @click="sortClick.ReadableByteStreamController = item"
                  >{{ item }}</span
                >
              </p>
            </td>
          </tr>
          <tr>
            <td>类型：</td>
            <td
              v-for="(item, index) in AllCategories.TypeClassification"
              :key="index"
            >
              <p>
                <span
                  :class="{ click: item == sortClick.TypeClassification }"
                  @click="sortClick.TypeClassification = item"
                  >{{ item }}</span
                >
              </p>
            </td>
          </tr>
          <tr>
            <td>排序：</td>
            <td v-for="(item, index) in AllCategories.sort" :key="index">
              <p>
                <span
                  :class="{ click: item == sortClick.sort }"
                  @click="sortClick.sort = item"
                  >{{ item }}</span
                >
              </p>
            </td>
          </tr>
        </tbody>
      </form>
    </div>
    <div class="center">
      <MvBlock
        v-for="(item, index) in AllListArray"
        :key="index"
        class="content"
        :message="{
          id: item.id,
          src: item.cover,
          name: item.name,
          artists: item.artists,
          playCount: item.playCount,
        }"
      ></MvBlock>
    </div>

    <div class="paging">
      <el-pagination
        :page-size="96"
        :pager-count="9"
        layout="prev, prev-btn, pager, next-btn, next"
        :total="count"
        class="el-pagination"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, watch, ref } from "vue";
import { useRoute } from "vue-router";
import MvBlock from "../组件/MV组件/MvBlock.vue";

const route = useRoute();
let sortClick = reactive({
  ReadableByteStreamController: "全部",
  TypeClassification: "全部",
  sort: "上升最快",
});
sortClick.ReadableByteStreamController = route.query.district;
sortClick.TypeClassification = route.query.type;
sortClick.sort = route.query.sort;
function handlePageChange(currentPage) {
  getAllList(sortClick, currentPage - 1);
}
onMounted(() => {
  getAllList(sortClick, 0);
});
watch(
  () => sortClick,
  (newValue) => {
    console.log(newValue);
    getAllList(newValue, 0);
  },
  {
    deep: true,
  }
);

const AllCategories = reactive({
  RegionalClassification: ["全部", "内地", "港台", "欧美", "韩国", "日本"],
  TypeClassification: ["全部", "官方版", "原声", "现场版", "网易出品"],
  sort: ["上升最快", "最热", "最新"],
});
let AllListArray = reactive([]);
let count = ref(0);
function getAllList(center, offset) {
  AllListArray.length = 0;
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/mv/all", {
      params: {
        timestamp: time,
        offset: 96 * offset,
        limit: 96,
        area: center.ReadableByteStreamController,
        type: center.TypeClassification,
        order: center.sort,
      },
    })
    .then((res) => {
      console.log(res);
      Object.assign(AllListArray, res.data.data);
      if (offset === 0) {
        count.value = res.data.count;
        console.log(count.value);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
</script>

<style scoped>
.click {
  background-color: rgb(247, 233, 233) !important;
  border-radius: 30% / 100% !important;
  color: red !important;
}
.zt {
  width: 1070px;
  margin: auto;
}
/* .header tr{
    background-color: red;
    margin-top: 20px;
} */
.bt {
  font-size: 20px;
  font-weight: bold;
  width: 1070px;
}
.header td {
  width: 100px;
  height: 30px;
  text-align: center;
  font-size: 12px;
}

.header tr > td:nth-of-type(1) {
  text-align: left;
  width: 40px;
  border: none;
}
.header tr > td:nth-of-type(2) > p {
  border: none;
}
td > p {
  margin: 0;
  border-left: 1px solid rgb(228, 228, 228);
}
td span {
  padding: 5px 10px;
}
tr > td:nth-of-type(2) > span {
  border: none;
}
.center {
  clear: both;
  width: 1070px;
  display: inline-block;
}
.content {
  float: left;
  margin: 0 10px;
  margin-top: 20px;
  padding: 0;
}
.content:nth-of-type(4n) {
  margin-right: 0;
}
.content:nth-of-type(4n-3) {
  margin-left: 0;
}

::v-deep .el-pagination > button {
  border-radius: 5px;
  border: 1px solid rgb(183, 183, 183);
  margin: 0 3px;
}
::v-deep .el-pagination li {
  border: 1px solid rgb(183, 183, 183);
  border-radius: 5px;
  margin: 0 3px;
}
::v-deep .el-pagination li:hover {
  color: black;
  background-color: rgb(236, 236, 236);
}
::v-deep .el-pager li {
  min-width: 25px !important;
  height: 25px !important;
  font-size: 12px;
  font-weight: 300;
}
::v-deep .el-pagination > button {
  min-width: 25px !important;
  height: 25px !important;
  font-size: 12px;
  font-weight: 300;
}
::v-deep .el-pager li.is-active {
  color: white;
  background-color: red;
  cursor: default;
}
.paging {
  width: 1070px;
  height: 100px;
  position: relative;
}
.paging .el-pagination {
  margin: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>