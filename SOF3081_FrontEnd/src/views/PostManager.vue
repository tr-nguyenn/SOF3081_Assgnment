<template>
  <div class="container-fluid py-4">
    <!-- Header Section -->
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h1 class="h3 mb-0 fw-bold text-dark">Quản lý bài viết</h1>
          </div>
          <div class="col-md-6 text-md-end mt-3 mt-md-0">
            <button class="btn btn-primary btn-add-post" data-bs-toggle="modal" data-bs-target="#modalCreatePost">
              <i class="bi bi-plus-circle me-2"></i>
              Thêm bài viết
            </button>
          </div>
        </div>
      </div>
    </div>

    <CreatePostModal @add-post="handleAddPost" ref="modalRef" />

    <!-- Search & Filter Section -->
    <!-- <div class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-8">
            <div class="input-group">
              <span class="input-group-text bg-white">
                <i class="bi bi-search"></i>
              </span>
              <input type="text" class="form-control search-input" placeholder="Tìm kiếm theo tiêu đề, tác giả..." />
            </div>
          </div>
          <div class="col-md-4">
            <select class="form-select filter-status">
              <option value="">Tất cả trạng thái</option>
              <option value="published">Đã xuất bản</option>
              <option value="draft">Bản nháp</option>
              <option value="pending">Chờ duyệt</option>
            </select>
          </div>
        </div>
      </div>
    </div> -->

    <!-- Posts Table -->
    <div class="p-3 bg-white rounded-3 shadow-sm mb-3">
      <table class="table table-bordered">
        <thead>
          <tr class="text-center text-white">
            <th class="bg-primary text-white" scope="col">ID</th>
            <th class="bg-primary text-white" scope="col">Tiêu đề</th>
            <th class="bg-primary text-white" scope="col">Nội dung</th>
            <th class="bg-primary text-white" scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <th class="text-center">{{ post.id }}</th>
            <td>{{ post.title }}</td>
            <td>{{ post.content }}</td>
            <td class="text-center">
              <div class="btn-group">
                <button class="btn btn-sm btn-outline-warning mx-1" title="Sửa">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger mx-1" title="Xóa">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination Section -->
    <div class="card shadow-sm">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-md-6 mb-3 mb-md-0">
            <nav aria-label="Phân trang bài viết">
              <ul class="pagination mb-0 pagination-controls">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
                    <i class="bi bi-chevron-left"></i>
                    Trước
                  </a>
                </li>
                <li class="page-item active" aria-current="page">
                  <a class="page-link page-number" href="#" data-page="1">1</a>
                </li>
                <li class="page-item">
                  <a class="page-link page-number" href="#" data-page="2">2</a>
                </li>
                <li class="page-item">
                  <a class="page-link page-number" href="#" data-page="3">3</a>
                </li>
                <li class="page-item">
                  <a class="page-link page-number" href="#" data-page="3">3</a>
                </li>
                <li class="page-item disabled">
                  <span class="page-link">...</span>
                </li>
                <li class="page-item">
                  <a class="page-link page-number" href="#" data-page="10">10</a>
                </li>
                <li class="page-item">
                  <a class="page-link" href="#">
                    Sau
                    <i class="bi bi-chevron-right"></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="col-md-6 text-md-end">
            <span class="text-muted pagination-info">
              Hiển thị
              <strong>1-10</strong>
              trên
              <strong>100</strong>
              bài viết
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CreatePostModal from "@/components/post/CreatePostModal.vue";
import postService from "@/services/post.service";
import type { IPost } from "@/types/Post";
import { onMounted, ref } from "vue";

// 1. Tạo biến để kết nối với component con
const modalRef = ref(null);

const posts = ref<IPost[]>([]);

const fetchPost = async () => {
  const response = await postService.getAll();
  posts.value = await response.data;
};

const handleAddPost = async (data: IPost) => {
  try {
    await postService.create(data);
    await fetchPost();
  } catch (error) {
    console.error("Lỗi khi tạo bài viết:", error);
  }
};

onMounted(() => {
  fetchPost();
});
</script>
