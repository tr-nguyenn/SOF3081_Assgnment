<script setup>
import { ref, onMounted } from "vue";
import PostService from "../services/post.service"; // Import service đã tách

// Biến trạng thái
const posts = ref([]);
const isEditing = ref(false);
const currentId = ref(null);

const postForm = ref({
  title: "",
  content: "",
  image: "",
});

// 1. Lấy danh sách bài viết
const fetchPosts = async () => {
  try {
    // Gọi qua service thay vì axios trực tiếp
    const response = await PostService.getAll();
    posts.value = response.data;
  } catch (error) {
    console.error("Lỗi tải dữ liệu:", error);
  }
};

// 2. Xử lý Submit (Thêm/Sửa)
const handleSubmit = async () => {
  try {
    if (isEditing.value) {
      // Gọi service cập nhật
      await PostService.update(currentId.value, postForm.value);
      alert("Cập nhật thành công!");
    } else {
      // Gọi service thêm mới
      await PostService.create(postForm.value);
      alert("Đăng bài thành công!");
    }

    resetForm();
    fetchPosts();
  } catch (error) {
    console.error("Lỗi lưu bài viết:", error);
  }
};

// 3. Xóa bài viết
const deletePost = async (id) => {
  if (confirm("Bạn có chắc muốn xóa bài viết này?")) {
    try {
      // Gọi service xóa
      await PostService.delete(id);
      fetchPosts();
    } catch (error) {
      console.error("Lỗi xóa bài viết:", error);
    }
  }
};

// Các hàm hỗ trợ UI giữ nguyên
const editPost = (post) => {
  isEditing.value = true;
  currentId.value = post.id;
  postForm.value = { ...post };
};

const resetForm = () => {
  postForm.value = { title: "", content: "", image: "" };
  isEditing.value = false;
  currentId.value = null;
};

onMounted(fetchPosts);
</script>

<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Quản lý Bài viết</h2>

    <div class="card mb-4">
      <div class="card-header bg-primary text-white">
        {{ isEditing ? "Cập nhật bài viết" : "Đăng bài viết mới" }}
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label">Tiêu đề</label>
            <input v-model="postForm.title" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label">Link Hình ảnh</label>
            <input v-model="postForm.image" type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Nội dung</label>
            <textarea v-model="postForm.content" class="form-control" rows="3" required></textarea>
          </div>
          <button type="submit" class="btn btn-success me-2">
            {{ isEditing ? "Lưu thay đổi" : "Đăng bài" }}
          </button>
          <button type="button" class="btn btn-secondary" v-if="isEditing" @click="resetForm">Hủy</button>
        </form>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 mb-3" v-for="post in posts" :key="post.id">
        <div class="card h-100">
          <img :src="post.image || 'https://via.placeholder.com/150'" class="card-img-top" style="height: 200px; object-fit: cover" />
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text text-truncate">{{ post.content }}</p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-warning btn-sm" @click="editPost(post)">Sửa</button>
            <button class="btn btn-danger btn-sm" @click="deletePost(post.id)">Xóa</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
