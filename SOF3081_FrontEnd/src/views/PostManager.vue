<template>
  <div class="container py-4">
    <button class="btn btn-primary me-2" @click="openCreate">Thêm bài viết</button>
    <button class="btn btn-warning" @click="openUpdate">Sửa bài viết</button>

    <PostModal ref="modalRef" :mode="mode" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PostModal from "@/components/post/PostModal.vue";

const modalRef = ref<InstanceType<typeof PostModal> | null>(null);
const mode = ref<"create" | "update">("create");

const openCreate = () => {
  mode.value = "create";
  modalRef.value?.open();
};

const openUpdate = () => {
  mode.value = "update";
  modalRef.value?.open();
};
</script>
