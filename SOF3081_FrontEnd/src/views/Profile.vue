<template>
  <div class="profile container py-5">
    <div class="profile-header mb-4">
      <h1>Cài đặt hồ sơ</h1>
      <p class="text-muted">Quản lý thông tin cá nhân và thiết lập tài khoản của bạn để đồng bộ với Blog.</p>
    </div>

    <div class="row g-4">
      <div class="col-lg-4">
        <div class="sidebar-card px-4 py-5 d-flex align-items-center text-white flex-column rounded-4 sticky-lg-top">
          <div class="avatar-container mb-4">
            <img
              class="avatar-img rounded-pill"
              src="https://ui-avatars.com/api/?name=T+N&background=random"
              alt="Avatar"
            />
          </div>
          <h4 class="fw-bold mb-1">Nguyễn Trung Nguyên</h4>
          <p class="opacity-75 mb-4">Biên tập viên nội dung cấp cao</p>

          <div class="w-100 border-top border-white border-opacity-25 pt-4">
            <div class="d-flex justify-content-between small mb-2">
              <span>Bài viết:</span>
              <span class="fw-bold">24</span>
            </div>
            <div class="d-flex justify-content-between small">
              <span>Tham gia từ:</span>
              <span class="fw-bold">Tháng 10, 2023</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-8">
        <form action="">
          <div class="card card-custom mb-4">
            <div class="card-header fs-5"><i class="bi bi-person-circle me-2"></i>Thông tin cá nhân</div>
            <div class="card-body p-4">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Họ và tên</label>
                  <input type="text" class="form-control" value="Nguyễn Trung Nguyên" />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Chức danh</label>
                  <input type="text" class="form-control" value="Biên tập viên nội dung cấp cao" />
                </div>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Địa chỉ Email</label>
                <div class="input-group">
                  <span class="input-group-text bg-light border-end-0 text-muted">
                    <i class="bi bi-envelope"></i>
                  </span>
                  <input type="email" class="form-control border-start-0" value="nguyennttd01427@gmail.com" />
                </div>
              </div>

              <div class="mb-3">
                <label for="tieuSu" class="form-label">Tiểu sử ngắn</label>
                <textarea class="form-control" rows="4" placeholder="Viết vài dòng giới thiệu bản thân..."></textarea>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-end gap-3">
            <button type="button" class="btn btn-light px-4 border">Hủy</button>
            <button type="submit" class="btn btn-save shadow-sm">Lưu tất cả thay đổi</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  /* Màu chủ đạo lấy từ Header/Footer của bạn */
  --primary-color: #0d3b44;
  --accent-yellow: #ffc107;
  --bg-body: #f8fafb;
  --text-main: #1e293b;
}

body {
  font-family: "Inter", sans-serif;
  background-color: var(--bg-body);
  color: var(--text-main);
  line-height: 1.6;
}

/* Tinh chỉnh Header */
.profile-header h1 {
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: -0.02em;
}

/* Sidebar Profile */
.sidebar-card {
  background-color: var(--primary-color) !important;
  border: none;
  box-shadow: 0 10px 25px rgba(13, 59, 68, 0.15);
  transition: transform 0.3s ease;
}

.avatar-container {
  position: relative;
  padding: 5px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
}

.avatar-img {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border: 4px solid white;
}

/* Card form */
.card-custom {
  border: none;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-custom .card-header {
  background-color: white;
  border-bottom: 1px solid #edf2f7;
  color: var(--primary-color);
  font-weight: 600;
  padding: 1.25rem;
}

.form-label {
  font-weight: 500;
  font-size: 0.9rem;
  color: #64748b;
}

.form-control {
  padding: 0.75rem 1rem;
  border-color: #e2e8f0;
  border-radius: 8px;
}

.form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(13, 59, 68, 0.1);
}

/* Button đồng bộ với nút "Đăng ký" trong ảnh */
.btn-save {
  background-color: var(--accent-yellow);
  border: none;
  color: #000;
  font-weight: 600;
  padding: 12px 30px;
  border-radius: 8px;
  transition: all 0.2s;
}

.btn-save:hover {
  background-color: #eab308;
  transform: translateY(-1px);
}

.sticky-lg-top {
  top: 6rem;
}
</style>
