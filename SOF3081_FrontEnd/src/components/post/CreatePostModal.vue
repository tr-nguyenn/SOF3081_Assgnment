<template>
  <div class="modal fade" ref="modalCreatePost" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="handleCreatePost">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">Tạo bài viết mới</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Tiêu đề</label>
              <input v-model.trim="title" type="text" class="form-control" :class="{ 'is-invalid': titleError }" />
              <div class="invalid-feedback">Vui lòng nhập tiêu đề!</div>
            </div>
            <div class="mb-3">
              <label class="form-label">Nội dung</label>
              <textarea v-model.trim="content" class="form-control" rows="4" :class="{ 'is-invalid': contentError }"></textarea>
              <div class="invalid-feedback">Vui lòng nhập nội dung!</div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Huỷ</button>
            <button type="submit" class="btn btn-primary">Tạo bài viết</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Modal } from "bootstrap";

const titleError = ref(false);
const contentError = ref(false);
const title = ref("");
const content = ref("");
const emit = defineEmits(["add-post"]);

const myModalElement = ref(null);

// 2. Biến này để giữ cái Remote điều khiển
let myModalBootstrapInstance = null;

// 3. onMounted: Khi giao diện vẽ xong, ta mới chế tạo Remote
onMounted(() => {
  // Gắn Bootstrap vào thẻ div đã đánh dấu
  myModalBootstrapInstance = new Modal(myModalElement.value, {
    backdrop: "static", // Bắt buộc bấm nút mới đóng
    keyboard: false,
  });
});

// --- CÁC HÀM ĐIỀU KHIỂN ---

// Hàm mở: Ai gọi hàm này thì modal hiện lên
const openModal = () => {
  title.value = ""; // Xóa trắng form cũ
  myModalBootstrapInstance.show(); // Bấm nút ON trên remote
};

// Hàm đóng: Ai gọi hàm này thì modal ẩn đi
const closeModal = () => {
  myModalBootstrapInstance.hide(); // Bấm nút OFF trên remote
};

// 4. QUAN TRỌNG: Phải "khai báo" hàm openModal ra ngoài
// để Component Cha (PostManager) nhìn thấy mà gọi
defineExpose({ openModal });

const handleCreatePost = () => {
  titleError.value = !title.value;
  contentError.value = !content.value;

  if (titleError.value || contentError.value) return;

  emit("add-post", {
    title: title.value,
    content: content.value,
  });

  closeModal();
};
</script>
