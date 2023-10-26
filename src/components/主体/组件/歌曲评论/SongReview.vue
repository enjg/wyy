<template>
  <div class="song-review">
    <div class="song-review-left">
      <div class="hotComments" v-if="ReviewPageNumber === 1">
        <h3>全部评论({{ NumberOfComments }})</h3>
        <div
          class="hotComments-comments"
          v-for="item in hotComments"
          :key="item.commentId"
        >
          <div class="hotComment-imgleft">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <div class="hotComment-right">
            <p>
              <span>{{ item.user.nickname }}：</span>{{ item.content }}
            </p>
            <p
              v-if="
                item.beReplied &&
                item.beReplied[0] &&
                item.beReplied[0].user &&
                item.beReplied[0].user.nickname
              "
              class="hf"
            >
              <span>@{{ item.beReplied[0].user.nickname }}：</span>
              {{ item.beReplied[0].content }}
            </p>
            <p>{{ datatime(item.timeStr) }} {{ time(item.time) }}</p>
          </div>
        </div>
      </div>
      <div class="Comments">
        <h3>最新评论({{ NumberOfComments }})</h3>
        <div
          class="hotComments-comments"
          v-for="item in Comments"
          :key="item.commentId"
        >
          <div class="hotComment-imgleft">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <div class="hotComment-right">
            <p>
              <span>{{ item.user.nickname }}：</span>{{ item.content }}
            </p>
            <p
              v-if="
                item.beReplied &&
                item.beReplied[0] &&
                item.beReplied[0].user &&
                item.beReplied[0].user.nickname
              "
              class="hf"
            >
              <span>@{{ item.beReplied[0].user.nickname }}：</span>
              {{ item.beReplied[0].content }}
            </p>
            <p>{{ datatime(item.timeStr) }} {{ time(item.time) }}</p>
          </div>
        </div>
      </div>
      <div class="paging">
        <el-pagination
          :page-size="20"
          :pager-count="10"
          layout="prev, prev-btn, pager, next-btn, next"
          :total="NumberOfComments"
          class="el-pagination"
          @current-change="handlePageChange"
        />
      </div>
    </div>
    <div class="song-review-right"></div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useMyStore } from "@/pinia/myStore.js";
import { onMounted, reactive, ref } from "vue";
const myStore = useMyStore();
let hotComments = reactive([]);
let Comments = reactive([]);
let ReviewPageNumber = ref(1);
let NumberOfComments = ref(0);

onMounted(() => {
  gethotComments();
  getComments();
});

function handlePageChange(currentPage){
  ReviewPageNumber.value=currentPage;
  console.log(currentPage);
  getComments();
}


function gethotComments() {
  
  axios
    .get("http://47.108.209.241:8090/comment/music", {
      params: {
        id: myStore.state.songurl.id,
        offset: 0,
        limit: 20,
      },
    })
    .then((response) => {
      Object.assign(hotComments, response.data.hotComments);
      NumberOfComments.value = response.data.total;
      console.log(response.data.hotComments);
    })
    .catch((error) => {
      console.error(error);
    });
}
function getComments() {
  axios
    .get("http://47.108.209.241:8090/comment/music", {
      params: {
        id: myStore.state.songurl.id,
        offset: 20*(ReviewPageNumber.value-1),
        limit: 20,
      },
    })
    .then((response) => {
      Object.assign(Comments, response.data.comments);
      console.log(response.data.comments);
    })
    .catch((error) => {
      console.error(error);
    });
}
function datatime(date) {
  const dtime = date;
  if (date.length === 10) {
    const [year, month, day] = date.split("-");
    const datetime = `${year}年${month}月${day}日`;

    return datetime;
  } else if (date.length === 5) {
    const [month, day] = date.split("-");
    const datetime = `${month}月${day}日`;

    return datetime;
  } else {
    return dtime;
  }
}
function time(timestamp) {
  const date = new Date(timestamp);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const formattedTime = hours + ":" + minutes;

  return formattedTime;
}
</script>

<style scoped>
.song-review {
  width: 1000px;
  height: 100px;
}
.song-review-left {
  width: 700px;
  float: left;
}
.song-review-right {
  width: 250px;
  height: 500px;
  float: right;
}
.hotComments-comments {
  width: 100%;
  height: auto;
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 10px;
  overflow: hidden;
  border-bottom: 1px solid rgb(212, 212, 212);
}
.hotComment-imgleft {
  float: left;
  width: 70px;
}
.hotComment-imgleft > img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 10px;
}
.hotComment-right {
  width: 630px;
  float: left;
}
.hotComment-right p {
  line-height: 30px;
  margin: 0;
}
.hotComment-right p:last-child {
  color: rgb(139, 139, 139);
}
.hotComment-right span {
  color: #6b8fb8;
}
.hf {
  background-color: #edebea;
  border-radius: 5px;
  padding: 10px;
}
.paging {
  width: 700px;
  background-color: red;
  text-align: center;
  position: relative;
  margin-top: 20px;
}
.paging .el-pagination {
  margin: auto;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 50px;
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
::v-deep .el-pager li.is-active {
  color: white;
  background-color: red;
  cursor: default;
  font-weight: 700;
}
</style>