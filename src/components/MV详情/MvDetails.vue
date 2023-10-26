<template>
  <div class="zt">
    <div class="content">
      <div class="bt">
        <p>MV详情</p>
      </div>
      <video :src="src" controls></video>
      <div class="author" v-if="MvDetail.data != null && MvDetail.data">
        <img :src="MvDetail.data.artists[0].img1v1Url" alt="" @click="pushUserDetails(MvDetail.data.artists[0])" />
        <p v-for="(item, index) in MvDetail.data.artists" :key="index" @click="pushUserDetails(item)">
          {{ item.name }}
        </p>
      </div>
      <div class="MvDetails" v-if="MvDetail.data">
        <p>{{ MvDetail.data.name }}</p>
        <span>发布：{{ MvDetail.data.publishTime }}</span
        ><span>播放：{{ formatNumber(MvDetail.data.playCount) }}次</span>
      </div>
      <div class="function_set" v-if="MvDetail.data">
        <input type="button" :value="'赞(' + MvDetailInfo.likedCount + ')'" />
        <input type="button" :value="'收藏(' + MvDetail.data.subCount + ')'" />
        <input type="button" :value="'分享(' + MvDetailInfo.shareCount + ')'" />
        <input type="button" value="下载MV" />
      </div>
      <div class="review">
        <div class="review_bt">
          <span>评论</span><span>({{ MvDetailInfo.commentCount }})</span>
        </div>
        <div class="comment_box">
          <textarea></textarea>
          <div class="comment_box_button">
            <img src="../../assets//image/笑脸.png" alt="" />
            <input type="button" value="评论" />
          </div>
          <div
            class="ExcellentComment"
            v-if="ExcellentComment.total !== 0 && pagination == 1"
          >
            <div class="ExcellentComment_bt">
              <p>精彩评论</p>
            </div>

            <div
              class="ExcellentComment_center"
              v-for="(item, index) in ExcellentComment.hotComments"
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
                        <img src="../../assets//image/赞.png" alt="" />
                        <p>{{ item.likedCount }}</p>
                      </li>
                      <li>
                        <img src="../../assets/image/分享.png" alt="" />
                      </li>
                      <li>
                        <img src="../../assets/image/评论.png" alt="" />
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
          <div class="ExcellentComment">
            <div class="ExcellentComment_bt">
              <p>最新评论({{ MvDetailInfo.commentCount }})</p>
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
                    <p v-if="item.timeStr">{{ formatDate(item.timeStr) }}</p>
                    <p>{{ getTimeFromTimestamp(item.time) }}</p>
                  </div>
                  <div class="ExcellentComment_center_right_function_button">
                    <ul>
                      <li>
                        <img src="../../assets//image/赞.png" alt="" />
                        <p>{{ item.likedCount }}</p>
                      </li>
                      <li>
                        <img src="../../assets/image/分享.png" alt="" />
                      </li>
                      <li>
                        <img src="../../assets/image/评论.png" alt="" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="paging">
              <el-pagination
                :page-size="20"
                :pager-count="9"
                layout="prev, prev-btn, pager, next-btn, next"
                :total="MvDetailInfo.commentCount"
                class="el-pagination"
                @current-change="handlePageChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useMysinger } from "@/pinia/myStore.js";

let mySinger = useMysinger();
const router = useRouter();
const route = useRoute();
let id = ref(null);
id.value = route.query.id;
let MvDetail = reactive({});
onMounted(() => {
  getMvDetail(id.value);
  getMvUrl(id.value);
  getMvDetailInfo(id.value);
  getMvComment(id.value);
  getMvCommentAll(id.value, 1);
});

let src = ref(null);
let pagination = ref(1);
function pushUserDetails(center) {
  mySinger.updatedsinger(center.id);
  router.push("/index/singer_details");
}
function handlePageChange(currentPage) {
  getMvCommentAll(id.value, currentPage, times.value);
  pagination.value = currentPage;
}
function getMvDetail(center) {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/mv/detail", {
      params: {
        timestamp: time,
        mvid: center,
      },
    })
    .then((res) => {
      Object.assign(MvDetail, res.data);
      console.log(MvDetail.data.artistName);
    })
    .catch((err) => {
      console.error(err);
    });
}
function getMvUrl(center) {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/mv/url", {
      params: {
        timestamp: time,
        id: center,
      },
    })
    .then((res) => {
      src.value = res.data.data.url;
      console.log(res.data.data);
    })
    .catch((err) => {
      console.error(err);
    });
}
let MvDetailInfo = reactive({});
function getMvDetailInfo(center) {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/mv/detail/info", {
      params: {
        timestamp: time,
        mvid: center,
      },
    })
    .then((res) => {
      Object.assign(MvDetailInfo, res.data);
      console.log(res.data);
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
let ExcellentComment = reactive([]);
function getMvComment(center) {
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/comment/hot", {
      params: {
        timestamp: time,
        id: center,
        type: 1,
        limit: 10,
      },
    })
    .then((res) => {
      Object.assign(ExcellentComment, res.data);
      console.log("999999", res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}
let ExcellentCommentAll = reactive([]);
let times = ref(null);
function getMvCommentAll(center, size, tiems) {
  ExcellentCommentAll.length = 0;
  let time = Date.now();
  axios
    .get("http://47.108.209.241:8090/comment/new", {
      params: {
        timestamp: time,
        id: center,
        type: 1,
        sortType: 3,
        pageSize: 20,
        pageNo: size,
        cursor: tiems,
      },
    })
    .then((res) => {
      Object.assign(ExcellentCommentAll, res.data.data.comments);
      times.value =
        res.data.data.comments[res.data.data.comments.length - 1].time;
      console.log(res.data.data.comments);
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
.zt {
  width: 970px;
  margin: auto;
  margin-top: 50px;
}
.content {
  width: 600px;
}
.bt {
  height: 50px;
}
.bt > p {
  margin: 0;
  line-height: 50px;
  font-weight: bold;
}
video {
  width: 600px;
}
.author {
  clear: both;
  width: 600px;
  height: 50px;
  margin-top: 10px;
  overflow: hidden;
}
.author > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  float: left;
}
.author > p {
  float: left;
  margin: 0;
  line-height: 50px;
  margin-left: 10px;
}
.MvDetails {
  clear: both;
  width: 600px;
  height: 50px;
  margin-top: 20px;
}
.MvDetails > p:nth-of-type(1) {
  margin: 0;
  font-size: 22px;
  font-weight: bolder;
}
.MvDetails > span {
  color: #b2b2b2;
  font-size: 11px;
  margin-right: 30px;
}
.function_set {
  margin-top: 20px;
}
.function_set > input {
  cursor: pointer; /* 鼠标变为手型 */
  background-repeat: no-repeat; /* 背景图不重复 */
  background-size: 19px 19px; /* 背景图的大小 */
  background-position: 18px 8px;
  border-radius: 25% / 100%;
  margin-right: 10px;
  background-color: white;
  border: 1px solid #b2b2b2;
  font-size: 14px;
  height: 35px;
  padding: 0 20px 0 39px;
  font-weight: 300;
}
.function_set > input:nth-of-type(1) {
  background-image: url("../../assets/image/赞.png");
}
.function_set > input:nth-of-type(2) {
  background-image: url("../../assets/image/收藏.png");
}
.function_set > input:nth-of-type(3) {
  background-image: url("../../assets/image/分享.png");
}
.function_set > input:nth-of-type(4) {
  background-image: url("../../assets/image/下载.png");
}
.review {
  margin-top: 50px;
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
}
.comment_box > textarea {
  width: 600px;
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
  width: 600px;
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
  background-color: red;
}
.ExcellentComment_center_right {
  float: left;
  width: 550px;
}
.ExcellentComment_center_right_content {
  margin-top: 15px;
}
.ExcellentComment_center_right_content > span {
  line-height: 17.5px;
  font-size: 11px;
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
  width: 550px;
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
  width: 550px;
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
  width: 600px;
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
::v-deep .el-pager li.is-active {
  color: white;
  background-color: red;
  cursor: default;
  font-weight: 700;
}
.paging {
  clear: both;
  width: 600px;
  height: 50px;
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