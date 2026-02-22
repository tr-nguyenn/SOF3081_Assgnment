<template>
  <div class="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center px-2">
    <div class="mb-4">
      <i class="bi bi-shield-lock text-danger" style="font-size: 5rem"></i>
    </div>
    <h1 class="display-1 fw-bold text-dark mb-2">403</h1>
    <h3 class="fw-semibold text-secondary mb-3">Truy cập bị từ chối</h3>
    <p class="text-muted mb-4" style="max-width: 400px">Xin lỗi, tài khoản của bạn không có quyền quản trị viên để truy cập vào khu vực này.</p>
    <router-link to="/" class="btn btn-primary rounded-pill px-4 py-2 fw-medium shadow-sm">
      <i class="bi bi-arrow-left me-2"></i>
      Quay về Trang chủ
    </router-link>
  </div>
</template>
