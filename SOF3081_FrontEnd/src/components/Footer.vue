<template>
  <footer class="bg-dark text-light pt-5 pb-3 mt-5">
    <div class="container">
      <div class="row">
        <!-- Logo / About -->
        <div class="col-md-4 mb-4">
          <h5 class="fw-bold">Vue Blog</h5>
          <p class="small text-muted">Nền tảng chia sẻ kiến thức, bài viết và học tập với Vue.js.</p>
        </div>

        <!-- Menu -->
        <div class="col-md-4 mb-4">
          <h6 class="fw-semibold">Điều hướng</h6>
          <ul class="list-unstyled small">
            <li><RouterLink to="/" class="footer-link">Trang chủ</RouterLink></li>
            <li><RouterLink to="/post/1" class="footer-link">Bài viết</RouterLink></li>
            <li><a href="#" class="footer-link">Giới thiệu</a></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="col-md-4 mb-4">
          <h6 class="fw-semibold">Liên hệ</h6>
          <p class="small mb-1">Email: support@vueblog.com</p>
          <p class="small">Hotline: 0123 456 789</p>
        </div>
      </div>

      <hr class="border-secondary" />

      <div class="text-center small text-muted">© 2026 Vue Blog | SOF3081 – FPT Polytechnic</div>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer-link {
  color: #adb5bd;
  text-decoration: none;
}

.footer-link:hover {
  color: #ffffff;
}
</style>
