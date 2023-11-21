<template>
  <div class="review">
    <div class="review_bt">
      <span>评论</span>
    </div>
    <div class="comment_box">
      <textarea></textarea>
      <div class="comment_box_button">
        <img src="../../../../assets//image/笑脸.png" alt="" />
        <input type="button" value="评论" />
      </div>
      <div class="loader" v-show="jzdh === 1"></div>

      <div
        class="ExcellentComment"
        v-if="pages === 1 && ExcellentComment.length !== 0"
      >
        <div class="ExcellentComment_bt">
          <p>精彩评论</p>
        </div>
        <div
          class="ExcellentComment_center"
          v-for="(item, index) in ExcellentComment"
          :key="index"
        >
          <div class="ExcellentComment_center_left">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <div class="ExcellentComment_center_right">
            <div class="ExcellentComment_center_right_content">
              <span>{{ item.user.nickname }}</span>
              <img
                v-if="item.user.vipRights !== null"
                :src="getIconUrl(item.user.vipRights)"
                alt=""
              />
              ：<span>{{ item.content }}</span>
            </div>
            <div
              class="ReplyComment"
              v-if="item.beReplied && item.beReplied.length > 0"
            >
              <span>{{ item.beReplied[0].user.nickname }}：</span>
              <span>{{ item.beReplied[0].content }}</span>
            </div>
            <div class="ExcellentComment_center_right_function">
              <div class="ExcellentComment_center_right_function_time">
                <p v-if="item.timeStr">{{ formatDate(item.timeStr) }}</p>
                <p>{{ getTimeFromTimestamp(item.time) }}</p>
              </div>
              <div class="ExcellentComment_center_right_function_button">
                <ul>
                  <li>
                    <img src="../../../../assets//image/赞.png" alt="" />
                    <p>{{ item.likedCount }}</p>
                  </li>
                  <li>
                    <img src="../../../../assets/image/分享.png" alt="" />
                  </li>
                  <li>
                    <img src="../../../../assets/image/评论.png" alt="" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="More_excellent_reviews">
          <input type="button" value="更多精彩评论" />
        </div>
      </div>
      <div
        class="ExcellentComment"
        v-if="jzdh === 0 && ExcellentCommentAll.length !== 0"
      >
        <div class="ExcellentComment_bt">
          <p>最新评论{{ ArrayLength }}</p>
        </div>
        <div
          class="ExcellentComment_center"
          v-for="(item, index) in ExcellentCommentAll"
          :key="index"
        >
          <div class="ExcellentComment_center_left">
            <img :src="item.user.avatarUrl" alt="" />
          </div>
          <div class="ExcellentComment_center_right">
            <div class="ExcellentComment_center_right_content">
              <span>{{ item.user.nickname }}</span>
              <img
                v-if="item.user.vipRights !== null"
                :src="getIconUrl(item.user.vipRights)"
                alt=""
              />
              ：<span>{{ item.content }}</span>
            </div>
            <div
              class="ReplyComment"
              v-if="item.beReplied && item.beReplied.length > 0"
            >
              <span>{{ item.beReplied[0].user.nickname }}：</span>
              <span>{{ item.beReplied[0].content }}</span>
            </div>
            <div class="ExcellentComment_center_right_function">
              <div class="ExcellentComment_center_right_function_time">
                <p v-if="item.timeStr">{{ item.timeStr }}</p>
                <p>{{ getTimeFromTimestamp(item.time) }}</p>
              </div>
              <div class="ExcellentComment_center_right_function_button">
                <ul>
                  <li>
                    <img src="../../../../assets//image/赞.png" alt="" />
                    <p>{{ item.likedCount }}</p>
                  </li>
                  <li>
                    <img src="../../../../assets/image/分享.png" alt="" />
                  </li>
                  <li>
                    <img src="../../../../assets/image/评论.png" alt="" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="paging" v-if="ArrayLength > Props.message.pageSize">
          <el-pagination
            :page-size="Props.message.pageSize"
            :pager-count="9"
            layout="prev, prev-btn, pager, next"
            :total="ArrayLength"
            class="el-pagination"
            @current-change="handlePageChange"
          />
        </div>
      </div>
      <p v-show="ExcellentCommentAll.length == 0">还没有评论，赶快来抢沙发~</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, defineProps, ref, watch } from "vue";
// import { useRouter } from "vue-router";

// const router = useRouter();
const Props = defineProps({
  message: Object,
});
onMounted(() => {
  if (Props.message.id) {
    getMvComment(Props.message);
    getMvCommentAll(Props.message, 1, tiems.value);
  }
});

let ExcellentComment = reactive([]);
let pages = ref(1);
function handlePageChange(page) {
  pages.value = page;
}
watch(
  () => pages.value,
  (newValue, oldValue) => {
    console.log(newValue, oldValue);
    if (newValue > 1) {
      if (newValue > oldValue) {
        if (newValue - oldValue > 1) {
          getTime(
            Props.message,
            (newValue - oldValue - 1) * 60,
            newValue,
            tiems.value
          );
        } else {
          getMvCommentAll(Props.message, newValue, tiems.value);
        }
      } else {
        getTime(Props.message, (newValue - 1) * 60, newValue, tiems.value);
      }
    } else {
      getMvCommentAll(Props.message, newValue, null);
    }
  }
);
let jzdh = ref(0);
// watch(ExcellentComment,(newItems,oldItems)=>{
//   console.log(96333)
//   console.log(newItems.length,oldItems.length)
// },{deep:true})
function getMvComment(center) {
  console.log(center);
  let time = Date.now();
  //   http://47.108.209.241:8090/comment/hot?id=176456056
  axios
    .get("http://47.108.209.241:8090/comment/hot", {
      params: {
        timestamp: time,
        id: center.id,
        type: center.typeof,
        limit: 10,
      },
    })
    .then((res) => {
      Object.assign(ExcellentComment, res.data.hotComments);
    })
    .catch((err) => {
      console.error(err);
    });
}
let ExcellentCommentAll = reactive([]);
let ArrayLength = ref(1);
let tiems = ref(null);
function getMvCommentAll(center, size, tiemsdata) {
  ExcellentCommentAll.length = 0;
  console.log(tiemsdata);
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/comment/new", {
      params: {
        timestamp: time,
        id: center.id,
        type: center.typeof,
        sortType: 3,
        pageSize: center.pageSize,
        pageNo: size,
        cursor: tiemsdata,
      },
    })
    .then((res) => {
      Object.assign(ExcellentCommentAll, res.data.data.comments);
      jzdh.value = 0;
      tiems.value =
        res.data.data.comments[res.data.data.comments.length - 1].time;
      ArrayLength.value = res.data.data.totalCount;
    })
    .catch((err) => {
      console.error(err);
    });
}
function getTime(center, pageSizes, size, tiemdata) {
  jzdh.value = 1;
  ExcellentCommentAll.length = 0;
  console.log(pageSizes, size);
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/comment/new", {
      params: {
        timestamp: time,
        id: center.id,
        type: center.typeof,
        sortType: 3,
        pageSize: pageSizes,
        pageNo: 1,
        cursor: tiemdata,
      },
    })
    .then((res) => {
      console.log(
        res.data.data.comments[res.data.data.comments.length - 1].time
      );
      getMvCommentAll(
        Props.message,
        size,
        res.data.data.comments[res.data.data.comments.length - 1].time
      );
    })
    .catch((err) => {
      console.error(err);
    });
}
let timeArray = reactive([null]);
onMounted(() => {
  if (Props.message.id) {
    getArray(Props.message, timeArray[timeArray.length - 1]);
  }
});
let ilength = ref(60);
function getArray(center, tiemdata) {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/comment/new", {
      params: {
        timestamp: time,
        id: center.id,
        type: center.typeof,
        sortType: 3,
        pageSize: 60,
        cursor: tiemdata,
      },
    })
    .then((res) => {
      console.log(
        res.data.data.comments[res.data.data.comments.length - 1].time
      );
      timeArray.push(
        res.data.data.comments[res.data.data.comments.length - 1].time
      );
      ilength.value += 60;
      if (ilength.value < res.data.data.totalCount) {
        getArray(Props.message, timeArray[timeArray.length - 1]);
      } else {
        console.log(timeArray);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
function getTimeFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const time = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

  return time;
}
function formatDate(date) {
  if (/\d{2}-\d{2}/.test(date)) {
    // 判断是否是 "09-01" 样式
    const [month, day] = date.split("-");
    return `${parseInt(month)}月${parseInt(day)}日`;
  } else if (/\d{4}-\d{2}-\d{2}/.test(date)) {
    //判断是否是 "2023-09-01" 样式
    const [year, month, day] = date.split("-");
    return `${parseInt(year)}年${parseInt(month)}月${parseInt(day)}日`;
  } else {
    return "";
  }
}
function getIconUrl(data) {
  if (data.redplus !== null) {
    return data.redplus.iconUrl;
  } else if (data.associator !== null) {
    return data.associator.iconUrl;
  } else if (data.musicPackage !== null) {
    return data.musicPackage.iconUrl;
  }
  return null; // 如果三个对象的 iconUrl 都为空，返回 null 或其他默认值
}
</script>

<style scoped>
.loader {
  margin: 0 auto;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.review {
  margin-top: 50px;
  width: 100%;
}
.review_bt > span:nth-of-type(1) {
  font-size: 22px;
  font-weight: bolder;
  margin-right: 5px;
}
.review_bt > span:nth-of-type(2) {
  color: #b2b2b2;
  font-size: 12px;
}
.comment_box {
  margin-top: 20px;
  position: relative;
}
.comment_box>p{
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #b2b2b2;
}
.comment_box > textarea {
  width: 100%;
  height: 70px;
  resize: none;
  outline: none;
  border: 1px solid #b2b2b2 !important;
  border-radius: 3px;
}
.comment_box_button {
  height: 30px;
}
.comment_box_button > img {
  height: 20px;
  float: left;
  margin: 5px;
}
.comment_box_button > input {
  float: right;
  height: 30px;
  padding: 0 15px;
  border-radius: 35% / 100%;
  resize: none;
  outline: none;
  border: none;
  border: 1px solid #b2b2b2 !important;
  background-color: white;
  font-size: 15px;
}
.ExcellentComment {
}
.ExcellentComment_center {
  width: 100%;
  clear: both;
  display: inline-block;
  padding-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
}
.ExcellentComment_bt {
  margin-top: 20px;
}
.ExcellentComment_bt > p {
  font-weight: bold;
  margin: 0;
}
.ExcellentComment_center_left {
  width: 50px;
  float: left;
}
.ExcellentComment_center_left > img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: 20px 15px 0 0;
}
.ExcellentComment_center_right {
  float: left;
  width: calc(100% - 50px);
}
.ExcellentComment_center_right_content {
  margin-top: 15px;
}
.ExcellentComment_center_right_content > span {
  line-height: 17px;
  font-size: 12px;
  font-weight: 300;
}
.ExcellentComment_center_right_content > span:nth-of-type(1) {
  color: #6b8fb8;
}
.ExcellentComment_center_right_content > img {
  height: 15px;
  display: inline-block;
  line-height: 15px;
  margin: -2.5px 2px;
}
.ReplyComment {
  clear: both;
  width: 100%;
  display: inline-block;
  background-color: #f5f5f5;
  padding: 8px;
}
.ReplyComment > span:nth-of-type(1) {
  color: #6b8fb8;
}
.ReplyComment > span {
  margin: 0;
  font-size: 11px;
  font-weight: 300;
  display: inline;
  margin: 0;
  padding: 0;
  line-height: 1;
}
.ExcellentComment_center_right_function {
  width: 100%;
  height: 20px;
  padding: 0;
  margin-top: 2px;
}
.ExcellentComment_center_right_function_time > p {
  float: left;
  font-size: 12px;
  color: #b2b2b2;
  line-height: 20px;
  margin: 0;
  font-weight: 300;
  margin-right: 5px;
}
.ExcellentComment_center_right_function_time {
  float: left;
  padding: 0;
}
.ExcellentComment_center_right_function_button {
  float: right;
}
.ExcellentComment_center_right_function_button > ul {
  float: right;
  list-style: none;
  margin: 0;
  height: 20px;
  padding: 0;
}
.ExcellentComment_center_right_function_button > ul > li {
  float: left;
  height: 15px;
  margin: 2.5px 0;
  padding: 0 15px;
  border-left: 1px solid #b2b2b2;
}
.ExcellentComment_center_right_function_button > ul > li:nth-of-type(1) {
  border: none;
}
.ExcellentComment_center_right_function_button > ul > li > img {
  float: left;
  width: 15px;
  height: 15px;
  margin-right: 2px;
}
.ExcellentComment_center_right_function_button > ul > li > p {
  float: left;
  font-size: 12px;
  line-height: 15px;
  height: 15px;
  margin: 0;
  font-weight: 300;
}
.More_excellent_reviews {
  clear: both;
  width: 100%;
  height: 100px;
  position: relative;
}
.More_excellent_reviews > input {
  border-radius: 25% / 100%;
  margin-right: 10px;
  background-color: white;
  border: 1px solid #b2b2b2;
  font-size: 14px;
  height: 30px;
  padding: 0 20px 0 20px;
  font-weight: 300;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
::v-deep .el-pager li:last-child {
  display: none;
}
.paging {
  clear: both;
  width: 100%;
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