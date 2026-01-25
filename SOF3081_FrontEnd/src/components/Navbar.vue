<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top py-3">
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
        <div class="d-flex align-items-center gap-2 me-2">
          <RouterLink class="btn btn-outline-light btn-sm px-3 rounded-2" to="login">Đăng nhập</RouterLink>
          <RouterLink class="btn btn-warning btn-sm px-3 rounded-2 fw-semibold" to="register"> Đăng ký </RouterLink>
        </div>
        <!-- form search -->
        <form class="d-flex mt-lg-0 mt-2" role="search">
          <div class="input-group">
            <input type="search" class="form-control form-control-sm" placeholder="Nội dung tìm kiếm..." />
            <button type="submit" class="btn btn-sm btn-success"><i class="bi bi-search"></i></button>
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts"></script>
