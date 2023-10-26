<template>
  <div class="zt">
    <form action="">
      <table>
        <thead>
          <tr>
            <td></td>
            <td>操作</td>
            <td>标题</td>
            <td>歌手</td>
            <td>专辑</td>
            <td>时间</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in SongArray.songs"
            :key="item.id"
            @click="hqurl(item.id, item.al.picUrl, item.name, item.ar[0].name)"
          >
            <td>{{ index + 1 }}</td>
            <td></td>
            <td>
              <p>{{ item.name }}</p>
            </td>
            <td>
              <p>{{ item.ar[0].name }}</p>
            </td>
            <td>
              <p>{{ item.al.name }}</p>
            </td>
            <td>
              <p>{{ jstime(item.dt) }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script setup>
import { defineProps, onMounted, reactive, ref } from "vue";
import axios from "axios";
import { useMyStore } from "@/pinia/myStore.js";

const myStore = useMyStore();
const Props = defineProps({
  message: Array,
});
let trackIds = ref();
let SongArray = reactive({});

onMounted(() => {
  trackIds = jiequesz(Props.message);
  hqsong();
});
function jiequesz(array) {
  let a = "";
  array.forEach((element, index) => {
    if (index !== 0) {
      a += ",";
    }
    a += element.id;
  });
  return a;
}
function hqsong() {
  axios
    .get(
      "https://service-a871bani-1320463985.gz.apigw.tencentcs.com/release/song/detail",
      {
        params: {
          ids: trackIds,
        },
      }
    )
    .then((response) => {
      Object.assign(SongArray, response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}
function jstime(item) {
  const minutes = Math.floor(item / 60000); // 分钟
  const seconds = Math.floor((item % 60000) / 1000); // 秒
  return `${minutes} . ${seconds} `;
}
function hqurl(id,imgc,namec,songnamec) {
  axios
    .get(
      "https://service-a871bani-1320463985.gz.apigw.tencentcs.com/release/check/music",
      {
        params: {
          id: id,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      if (response.data.message == "ok") {
        myStore.setMessage({
          id: id,
          img: imgc,
          name: namec,
          songname: songnamec,
        });
      } else {
        alert(response.data.message);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
</script>

<style scoped>
.zt {
  width: 1170px;
}
td {
  height: 35px;
  cursor: default;
  border-spacing: 0;

}
p {
  height: 35px;
  line-height: 35px;
  overflow: hidden;
}
tr > td:nth-of-type(1) {
  /* background-color: red; */
  text-align: center;
  width: 40px;
}
tr > td:nth-of-type(2) {
  /* background-color: pink; */
  width: 80px;
}
tr > td:nth-of-type(3) {
  /* background-color: yellow; */
  width: 500px;
}
tr > td:nth-of-type(4) {
  width: 200px;
  cursor: pointer;
  /* background-color: green; */
}
tr > td:nth-of-type(5) {
  width: 300px;
  /* background-color: blue; */
}
tr > td:nth-of-type(6) {
  width: 50px;
  /* background-color: purple; */
}
tbody > tr:nth-child(odd) {
  background-color: rgb(251, 251, 251);
}
</style>