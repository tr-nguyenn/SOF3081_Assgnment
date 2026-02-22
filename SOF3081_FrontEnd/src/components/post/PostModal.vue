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
        <input type="file" class="form-control" accept="image/jpeg,image/png" />
        <img class="img-thumbnail mt-2" style="max-height: 150px" />
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

const props = defineProps<{
  mode: "create" | "update";
}>();

// 1. Khai báo Emit cho cả Create và Update
const emit = defineEmits(["create-post", "update-post"]);

const baseModalRef = ref<InstanceType<typeof BaseModal> | null>(null);

// 2. State quản lý form
const postId = ref(""); // Rất quan trọng: cần lưu ID để biết đang sửa bài nào
const title = ref("");
const content = ref("");
const titleError = ref(false);
const contentError = ref(false);

// 3. Hàm nhận dữ liệu từ PostManager truyền vào khi bấm "Sửa"
const setFormData = (post: IPost) => {
  postId.value = post.id;
  title.value = post.title;
  content.value = post.content;
  // Reset lỗi nếu có
  titleError.value = false;
  contentError.value = false;
};

// 4. Hàm reset form về trống (Dùng khi tạo mới hoặc đóng Modal)
const resetForm = () => {
  postId.value = "";
  title.value = "";
  content.value = "";
  titleError.value = false;
  contentError.value = false;
};

const handleSubmitForm = () => {
  // Validate input
  titleError.value = !title.value.trim();
  contentError.value = !content.value.trim();
  if (titleError.value || contentError.value) return;

  // Xử lý Gửi Form
  if (props.mode === "create") {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    emit("create-post", {
      title: title.value,
      content: content.value,
      creationDate: `${day}/${month}/${year}`,
    });
  } else if (props.mode === "update") {
    emit("update-post", {
      id: postId.value, // Trả về kèm ID để gọi API update
      title: title.value,
      content: content.value,
    });
  }
};

const open = () => {
  // Nếu mở lên để tạo mới thì xóa trắng form cũ
  if (props.mode === "create") {
    resetForm();
  }
  baseModalRef.value?.open();
};

const close = () => {
  baseModalRef.value?.close();
  resetForm(); // Đóng xong thì clear form
};

// 5. Expose hàm setFormData ra ngoài để component cha (PostManager) có thể gọi
defineExpose({ open, close, setFormData });
</script>
