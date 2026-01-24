<template>
  <div class="modal fade" id="registerModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title">Đăng ký tài khoản</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="form-label">Họ và tên</label>
              <input type="text" class="form-control" placeholder="Nguyễn Văn A" />
            </div>

            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" class="form-control" placeholder="abc@gmail.com" />
            </div>

            <div class="mb-3">
              <label class="form-label">Mật khẩu</label>
              <input type="password" class="form-control" />
            </div>

            <div class="mb-3">
              <label class="form-label">Nhập lại mật khẩu</label>
              <input type="password" class="form-control" />
            </div>

            <button type="button" class="btn btn-success w-100">Đăng ký</button>
          </form>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <small class="text-muted">
            Đã có tài khoản?
            <a href="#" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#loginModal"> Đăng nhập </a>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
