<template>
  <h1>999</h1>
</template>

<script setup>
import axios from "axios";
import { defineProps, onMounted, watch } from "vue";
// import { useMyStore } from "@/pinia/myStore.js";

// const myStore=useMyStore();
const Props = defineProps({
  message: String,
});
onMounted(() => {
  console.log(Props.message);
  getListOfSongDiscs(Props.message);
});
watch(
  () => Props.message,
  (newValue) => {
    console.log(newValue);
    getListOfSongDiscs(newValue);
  }
);
function getListOfSongDiscs(center) {
  axios
    .get("http://47.108.209.241:8090/album/new", {
      params: {
        area: center,
        limit: 1,
        type: "hot",
      },
    })
    .then((res) => {
      console.log(res.data.albums);
    })
    .catch((err) => {
      console.error(err);
    });
}
</script>

<style>
</style>