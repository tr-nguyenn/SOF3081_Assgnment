<template>
  <BaseModal ref="baseModalRef">
    <div class="modal-header">
      <h5 class="modal-title">
        {{ mode === "create" ? "Thêm mới bài viết" : "Cập nhật bài viết" }}
      </h5>
      <button type="button" class="btn-close" @click="close"></button>
    </div>

    <div class="modal-body">
      <div class="mb-4">
        <label class="form-label text-black">Tiêu đề:</label>
        <input v-model="title" type="text" class="form-control" :class="{ 'is-invalid': titleError }" />
        <div class="invalid-feedback">Vui lòng nhập tiêu đề.</div>
      </div>

      <div class="mb-3">
        <label class="form-label text-black">Nội dung:</label>
        <textarea v-model="content" rows="3" type="text" class="form-control" :class="{ 'is-invalid': contentError }"></textarea>
        <div class="invalid-feedback">Vui lòng nhập nội dung.</div>
      </div>

      <div class="mb-3">
        <label class="form-label text-black">Ảnh bài viết:</label>
        <input ref="fileInputRef" type="file" class="form-control" accept="image/jpeg,image/png" @change="handleImageUpload" />

        <img v-if="imageBase64" :src="imageBase64" class="img-thumbnail mt-2" style="max-height: 150px; object-fit: cover" alt="Preview" />
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-danger" @click="close">Hủy</button>
      <button type="button" class="btn btn-primary" @click="handleSubmitForm">
        {{ mode === "create" ? "Tạo bài viết" : "Lưu thay đổi" }}
      </button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseModal from "@/components/common/BaseModal.vue";
import type { IPost } from "@/types/Post";
import { useImageUpload } from "@/composables/useImageUpload";

const props = defineProps<{
  mode: "create" | "update";
}>();
const emit = defineEmits(["create-post", "update-post"]);
const baseModalRef = ref<InstanceType<typeof BaseModal> | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);
const postId = ref();
const title = ref("");
const content = ref("");
const titleError = ref(false);
const contentError = ref(false);
const { imageBase64, uploadError, handleImageUpload, resetImage, setImage } = useImageUpload();

const setFormData = (post: IPost) => {
  postId.value = post.id;
  title.value = post.title;
  content.value = post.content;
  setImage(post.image || "");
  titleError.value = false;
  contentError.value = false;
};

const resetForm = () => {
  postId.value = "";
  title.value = "";
  content.value = "";
  titleError.value = false;
  contentError.value = false;
  resetImage();
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
};

const handleSubmitForm = () => {
  titleError.value = !title.value.trim();
  contentError.value = !content.value.trim();
  if (titleError.value || contentError.value) return;

  if (props.mode === "create") {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    emit("create-post", {
      title: title.value,
      content: content.value,
      image: imageBase64.value,
      creationDate: `${day}/${month}/${year}`,
    });
  } else if (props.mode === "update") {
    emit("update-post", {
      id: postId.value,
      title: title.value,
      content: content.value,
      image: imageBase64.value,
    });
  }
};

const open = () => {
  if (props.mode === "create") {
    resetForm();
  }
  baseModalRef.value?.open();
};

const close = () => {
  baseModalRef.value?.close();
  resetForm();
};

defineExpose({ open, close, setFormData });
</script>
