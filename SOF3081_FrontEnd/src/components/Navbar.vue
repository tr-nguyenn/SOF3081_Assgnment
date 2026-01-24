<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div class="container">
      <a class="navbar-brand fw-bold" href="#">Blog</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Trang chủ</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="post/1">Bài viết</RouterLink>
          </li>
        </ul>
        <div class="d-flex align-items-center gap-2">
          <button
            class="btn btn-outline-light btn-sm px-3 rounded-pill"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
          >
            Đăng nhập
          </button>
          <button
            class="btn btn-warning btn-sm px-3 rounded-pill fw-semibold"
            data-bs-toggle="modal"
            data-bs-target="#registerModal"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>
