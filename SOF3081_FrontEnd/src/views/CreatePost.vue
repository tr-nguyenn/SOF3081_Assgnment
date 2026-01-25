<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="d-flex align-items-center mb-4">
          <RouterLink to="/dashboard" class="btn btn-outline-secondary btn-sm rounded-circle me-3">
            <i class="bi bi-arrow-left"></i>
          </RouterLink>
          <h2 class="fw-bold mb-0 text-primary-dark">Tạo bài viết mới</h2>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="row g-4">
            <div class="col-md-8">
              <div class="card border-0 shadow-sm rounded-4 p-4">
                <div class="mb-4">
                  <label class="form-label fw-bold text-muted small uppercase">Tiêu đề bài viết</label>
                  <input
                    v-model="post.title"
                    type="text"
                    class="form-control form-control-lg border-0 bg-light rounded-3"
                    placeholder="Nhập tiêu đề hấp dẫn tại đây..."
                    required
                  />
                </div>

                <div class="mb-4">
                  <label class="form-label fw-bold text-muted small uppercase">Tóm tắt ngắn</label>
                  <textarea
                    v-model="post.excerpt"
                    class="form-control border-0 bg-light rounded-3"
                    rows="3"
                    placeholder="Viết một đoạn giới thiệu ngắn cho bài viết..."
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label class="form-label fw-bold text-muted small uppercase">Nội dung bài viết</label>
                  <textarea
                    v-model="post.content"
                    class="form-control border-0 bg-light rounded-3"
                    rows="12"
                    placeholder="Bắt đầu viết nội dung kiến thức của bạn..."
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
                <h6 class="fw-bold mb-3">Thông tin bổ sung</h6>

                <div class="mb-3">
                  <label class="form-label small text-muted">Chuyên mục</label>
                  <select v-model="post.category" class="form-select border-0 bg-light">
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="design">UI/UX Design</option>
                    <option value="others">Khác</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label class="form-label small text-muted">Ảnh bìa (URL)</label>
                  <input
                    v-model="post.thumbnail"
                    type="text"
                    class="form-control border-0 bg-light"
                    placeholder="Link ảnh: https://..."
                  />
                  <div v-if="post.thumbnail" class="mt-2">
                    <img :src="post.thumbnail" class="img-fluid rounded-3 border" alt="Preview" />
                  </div>
                </div>

                <div class="mb-3">
                  <label class="form-label small text-muted">Trạng thái</label>
                  <div class="form-check form-switch mt-1">
                    <input v-model="post.isPublished" class="form-check-input" type="checkbox" id="publishSwitch" />
                    <label class="form-check-label" for="publishSwitch">Xuất bản ngay</label>
                  </div>
                </div>
              </div>

              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-warning fw-bold py-3 shadow-sm text-dark">
                  <i class="bi bi-send-fill me-2"></i> Lưu bài viết
                </button>
                <button type="button" class="btn btn-light py-2 border">Lưu bản nháp</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const post = ref({
  title: "",
  excerpt: "",
  content: "",
  category: "frontend",
  thumbnail: "",
  isPublished: true,
});

const handleSubmit = () => {
  console.log("Dữ liệu bài viết mới:", post.value);
  alert("Đã lưu bài viết thành công! (Xem console log)");
};
</script>

<style scoped>
.text-primary-dark {
  color: #0d3b44;
}

.bg-light {
  background-color: #f1f5f9 !important;
}

.form-label.uppercase {
  letter-spacing: 0.05em;
  font-size: 0.75rem;
  text-transform: uppercase;
}

/* Tùy chỉnh thanh gạt switch màu vàng giống logo bài của bạn */
.form-check-input:checked {
  background-color: #ffc107;
  border-color: #ffc107;
}

.form-control:focus,
.form-select:focus {
  box-shadow: 0 0 0 0.25rem rgba(13, 59, 68, 0.1);
  background-color: #fff !important;
  border: 1px solid #0d3b44 !important;
}

/* Nút quay lại tròn */
.btn-outline-secondary {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
</style>
