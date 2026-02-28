<template>
  <h1>Quản lý bài viết</h1>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import postServiceAdmin from "./services/post.service";

const fetchPosts = async () => {
  const posts = await postServiceAdmin.getAllUser();
  console.log(posts);
};

onMounted(() => {
  fetchPosts();
});
</script>
