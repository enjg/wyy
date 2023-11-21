<template>
  <div>
    <comment-s :message="querObj"></comment-s>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { reactive } from "vue";
import CommentS from "../../组件/评论/CommentS.vue";

const route = useRoute();
const id = route.query.id;
const querObj = reactive({
  id: id,
  typeof: 3,
  pageSize:60
});
</script>

<style>
</style>