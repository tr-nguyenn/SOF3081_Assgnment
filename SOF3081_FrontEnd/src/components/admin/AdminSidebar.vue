<template>
  <div class="sidebar d-flex flex-column p-3 bg-white shadow-sm" style="width: 260px; height: 100vh; position: sticky; top: 0">
    <a href="/" class="d-flex align-items-center mb-4 text-dark text-decoration-none">
      <i class="bi bi-rocket-takeoff-fill text-primary fs-3 me-2"></i>
      <span class="fs-4 fw-bold">Blog Admin</span>
    </a>

    <hr class="mt-0" />

    <ul class="nav nav-pills flex-column mb-auto gap-2">
      <li class="nav-item">
        <router-link to="/admin/dashboard" class="nav-link text-dark fw-medium d-flex align-items-center" exact-active-class="active bg-primary-subtle text-primary">
          <i class="bi bi-grid-1x2-fill me-3 fs-5"></i>
          Dashboard
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin/posts-manager" class="nav-link text-dark fw-medium d-flex align-items-center" active-class="active bg-primary-subtle text-primary">
          <i class="bi bi-file-earmark-text me-3 fs-5"></i>
          Quản lí bài viết
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/admin/user-manager" class="nav-link text-dark fw-medium d-flex align-items-center" active-class="active bg-primary-subtle text-primary">
          <i class="bi bi-person-circle me-3 fs-5"></i>
          Quản lý người dùng
        </router-link>
      </li>
    </ul>

    <hr />
    <button @click="handleLogout" class="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center">
      <i class="bi bi-box-arrow-right me-2"></i>
      Đăng xuất
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem("user");
  router.replace("/login");
};
</script>

<style scoped>
/* Tuỳ chỉnh màu xanh nhạt giống ảnh mẫu khi active */
.bg-primary-subtle {
  background-color: #e0f2fe !important; /* Xanh dương rất nhạt */
}
.nav-link:hover {
  background-color: #f8f9fa;
}
.nav-link.active {
  color: #0d6efd !important;
  font-weight: bold;
}
</style>
