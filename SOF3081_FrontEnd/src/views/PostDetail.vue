<template>
  <div class="container py-5">
    <div class="row g-5">
      <div class="col-lg-8">
        <nav aria-label="breadcrumb" class="mb-4">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <RouterLink to="/" class="text-decoration-none text-muted">Trang chủ</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Bài viết</li>
          </ol>
        </nav>

        <article>
          <h1 class="display-5 fw-bold mb-3 article-title">Giới thiệu Vue 3 cơ bản</h1>

          <div class="d-flex align-items-center mb-4 text-muted small border-bottom pb-3">
            <div class="d-flex align-items-center me-4">
              <img
                src="https://ui-avatars.com/api/?name=Admin&background=0d3b44&color=fff"
                class="rounded-circle me-2"
                width="32"
                alt="avatar"
              />
              <span>Tác giả: <strong>Admin</strong></span>
            </div>
            <div class="me-4"><i class="bi bi-calendar3 me-1"></i> 12/01/2026</div>
            <div><i class="bi bi-chat-dots me-1"></i> 15 bình luận</div>
          </div>

          <div class="mb-4 position-relative">
            <img
              src="https://picsum.photos/id/180/900/500"
              class="img-fluid rounded-4 shadow-sm"
              alt="post thumbnail"
            />
            <span class="badge bg-warning text-dark position-absolute top-0 start-0 m-3 px-3 py-2">Học thuật</span>
          </div>

          <div class="post-content fs-5">
            <p class="lead">
              Vue 3 là một framework JavaScript hiện đại, dễ học và mạnh mẽ, được sử dụng để xây dựng giao diện người
              dùng linh hoạt.
            </p>

            <p>
              Với Vue 3, lập trình viên có thể dễ dàng tổ chức code theo component, sử dụng
              <strong>Composition API</strong> và xây dựng ứng dụng SPA chuyên nghiệp. Đây là bước tiến lớn giúp quản lý
              logic ứng dụng tốt hơn so với các phiên bản cũ.
            </p>

            <h4 class="fw-bold mt-5 mb-3 text-primary-dark">🚀 Vì sao nên học Vue 3 ngay bây giờ?</h4>
            <ul class="list-group list-group-flush mb-4">
              <li class="list-group-item bg-transparent border-0 ps-0">
                <i class="bi bi-check-circle-fill text-success me-2"></i> Dễ học, cú pháp rõ ràng và thân thiện.
              </li>
              <li class="list-group-item bg-transparent border-0 ps-0">
                <i class="bi bi-check-circle-fill text-success me-2"></i> Hiệu năng cao nhờ Virtual DOM tối ưu.
              </li>
              <li class="list-group-item bg-transparent border-0 ps-0">
                <i class="bi bi-check-circle-fill text-success me-2"></i> Hệ sinh thái (Vuex, Pinia, Vue Router) cực kỳ
                mạnh mẽ.
              </li>
            </ul>

            <blockquote class="blockquote border-start border-4 border-warning ps-4 my-4 bg-light py-3">
              <p class="mb-0">"Vue 3 không chỉ là một công cụ, nó là một trải nghiệm lập trình hạnh phúc."</p>
            </blockquote>

            <p>
              Đây là trang chi tiết bài viết mô phỏng cho assignment frontend, tập trung vào việc tối ưu hóa khả năng
              đọc và trải nghiệm người dùng trên mọi thiết bị.
            </p>
          </div>
        </article>

        <div class="d-flex justify-content-between align-items-center border-top mt-5 pt-4">
          <RouterLink to="/" class="btn btn-link text-decoration-none p-0 text-primary-dark fw-bold">
            <i class="bi bi-arrow-left me-2"></i>Quay lại trang chủ
          </RouterLink>
          <div class="share-buttons">
            <span class="small text-muted me-2">Chia sẻ:</span>
            <button class="btn btn-sm btn-outline-primary rounded-circle me-2"><i class="bi bi-facebook"></i></button>
            <button class="btn btn-sm btn-outline-info rounded-circle"><i class="bi bi-twitter"></i></button>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="sticky-top" style="top: 2rem">
          <div class="card border-0 bg-light rounded-4 mb-4">
            <div class="card-body p-4">
              <h5 class="fw-bold mb-3">Tìm kiếm bài viết</h5>
              <div class="input-group">
                <input type="text" class="form-control border-0 shadow-none" placeholder="Nhập từ khóa..." />
                <button class="btn btn-warning"><i class="bi bi-search"></i></button>
              </div>
            </div>
          </div>

          <div class="card border-0 mb-4">
            <div class="card-body p-0">
              <h5 class="fw-bold mb-3">Bài viết mới nhất</h5>
              <div class="d-flex gap-3 mb-3 align-items-center">
                <img src="https://picsum.photos/id/1/80/80" class="rounded-3" alt="thumb" />
                <a href="#" class="text-decoration-none text-dark small fw-bold"
                  >Cách sử dụng Bootstrap 5 hiệu quả trong 2024</a
                >
              </div>
              <div class="d-flex gap-3 mb-3 align-items-center">
                <img src="https://picsum.photos/id/2/80/80" class="rounded-3" alt="thumb" />
                <a href="#" class="text-decoration-none text-dark small fw-bold"
                  >Lộ trình học Frontend cho người mới bắt đầu</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Màu chủ đạo đồng bộ với các trang trước */
.text-primary-dark {
  color: #0d3b44;
}

.article-title {
  color: #0d3b44;
  line-height: 1.2;
}

.post-content {
  color: #2d3436;
  text-align: justify;
}

.post-content p {
  line-height: 1.9; /* Khoảng cách dòng rộng rãi để dễ đọc */
  margin-bottom: 1.5rem;
}

.post-content h4 {
  color: #0d3b44;
}

/* Hiệu ứng rê chuột cho sidebar link */
.col-lg-4 a:hover {
  color: #ffc107 !important;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: "›";
  font-size: 1.2rem;
}
</style>
