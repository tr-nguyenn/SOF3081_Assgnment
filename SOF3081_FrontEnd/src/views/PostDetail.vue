<template>
  <div class="container py-5">
    <!-- Title -->
    <h1 class="fw-bold mb-3">Giới thiệu Vue 3 cơ bản</h1>

    <!-- Meta -->
    <div class="text-muted small mb-4">
      <span>✍ Tác giả: Admin</span>
      <span class="mx-2">|</span>
      <span>📅 12/01/2026</span>
    </div>

    <!-- Thumbnail -->
    <img src="https://picsum.photos/900/400" class="img-fluid rounded mb-4" alt="post thumbnail" />

    <!-- Content -->
    <div class="post-content">
      <p>
        Vue 3 là một framework JavaScript hiện đại, dễ học và mạnh mẽ, được sử dụng để xây dựng giao diện người dùng.
      </p>

      <p>
        Với Vue 3, lập trình viên có thể dễ dàng tổ chức code theo component, sử dụng Composition API và xây dựng ứng
        dụng SPA chuyên nghiệp.
      </p>

      <h4>🚀 Vì sao nên học Vue 3?</h4>
      <ul>
        <li>Dễ học, cú pháp rõ ràng</li>
        <li>Hiệu năng cao</li>
        <li>Cộng đồng lớn</li>
      </ul>

      <p>
        Đây là trang chi tiết bài viết mô phỏng cho assignment frontend, tập trung vào thiết kế giao diện và trải nghiệm
        người dùng.
      </p>
    </div>

    <!-- Back -->
    <div class="mt-5">
      <RouterLink to="/" class="btn btn-outline-primary"> ← Quay lại trang chủ </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.post-content p {
  line-height: 1.8;
  margin-bottom: 1rem;
}

.post-content h4 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
</style>
