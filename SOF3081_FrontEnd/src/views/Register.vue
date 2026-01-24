<template>
  <div class="container-fluid min-vh-100">
    <div class="row min-vh-100">
      <!-- LEFT CONTENT -->
      <div
        class="col-md-6 d-none d-md-flex flex-column justify-content-between p-5 text-white"
        style="
          background:
            linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
            url(&quot;https://images.unsplash.com/photo-1498050108023-c5249f4df085&quot;) center / cover no-repeat;
        "
      >
        <div>
          <RouterLink to="/" class="fw-bold h5">📘 BlogManager</RouterLink>
        </div>

        <div>
          <h1 class="fw-bold display-5">
            Ghi lại suy nghĩ,<br />
            chia sẻ cùng thế giới.
          </h1>
          <p class="mt-4">
            Tham gia cùng hơn <strong>50.000</strong> người viết đang quản lý nội dung, kết nối với độc giả và phát
            triển thương hiệu cá nhân.
          </p>
        </div>

        <small>Được tin dùng bởi những người kể chuyện hiện đại.</small>
      </div>

      <!-- RIGHT FORM -->
      <div class="col-md-6 d-flex align-items-center justify-content-center bg-dark text-white">
        <div class="w-75" style="max-width: 400px">
          <RouterLink to="/" class="text-secondary text-decoration-none mb-4 d-inline-block">
            ← Quay lại trang chủ
          </RouterLink>
          <h2 class="fw-bold mb-2">Tham gia cộng đồng</h2>
          <p class="text-secondary mb-4">Nhập thông tin bên dưới để tạo tài khoản miễn phí.</p>

          <form>
            <div class="mb-3">
              <label class="form-label fw-bold">Họ và tên</label>
              <input type="text" class="form-control bg-dark text-white border-secondary py-2" />
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Email</label>
              <input type="email" class="form-control bg-dark text-white border-secondary py-2" />
            </div>

            <div class="mb-4">
              <label class="form-label fw-bold">Mật khẩu</label>
              <input type="password" class="form-control bg-dark text-white border-secondary py-2" />
            </div>

            <div class="mb-4">
              <label class="form-label fw-bold">Xác nhận mật khẩu</label>
              <input type="password" class="form-control bg-dark text-white border-secondary py-2" />
            </div>

            <button type="submit" class="btn btn-primary w-100 py-2">Đăng ký</button>
          </form>

          <p class="text-center mt-4 text-secondary">
            Đã có tài khoản?
            <RouterLink to="login" class="text-primary fw-semibold text-decoration-none"> Đăng nhập </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
