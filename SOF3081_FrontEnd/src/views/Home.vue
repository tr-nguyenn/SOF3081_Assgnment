<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section bg-primary m-3">
      <div class="hero-overlay"></div>
      <div class="container position-relative">
        <div class="row align-items-center min-vh-50">
          <div class="col-lg-8 mx-auto text-center text-white">
            <h1 class="display-3 fw-bold mb-4 animate-fade-in fs-1 pt-4">Chia sẻ câu chuyện của bạn</h1>
            <p class="lead mb-5 fs-4">Nơi hàng triệu người viết, đọc và chia sẻ những câu chuyện đáng nhớ</p>
            <div class="d-flex gap-3 justify-content-center flex-wrap">
              <router-link to="/post-manager" class="btn btn-light btn-lg px-5 rounded-pill shadow">
                <i class="bi bi-rocket-takeoff me-2"></i>
                Bắt đầu viết
              </router-link>
              <router-link to="/login" class="btn btn-outline-light btn-lg px-5 rounded-pill">Khám phá ngay</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-wave">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="#ffffff" />
        </svg>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container py-5">
      <div class="row g-4">
        <!-- Main Posts Area -->
        <div class="col-lg-8">
          <!-- Featured Post -->
          <div class="featured-post mb-5">
            <div class="card border-0 shadow-lg overflow-hidden rounded-4">
              <div class="row g-0">
                <div class="col-md-6">
                  <div class="featured-image-wrapper">
                    <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800" class="img-fluid h-100 w-100" style="object-fit: cover" alt="Featured" />
                    <div class="featured-badge">
                      <i class="bi bi-star-fill me-1"></i>
                      Nổi bật
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="card-body p-4 d-flex flex-column h-100">
                    <div class="mb-3">
                      <span class="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                        <i class="bi bi-bookmark-fill me-1"></i>
                        Công nghệ
                      </span>
                    </div>
                    <h2 class="card-title fw-bold mb-3 lh-base">10 mẹo để trở thành lập trình viên giỏi hơn trong năm 2024</h2>
                    <p class="card-text text-muted mb-4 flex-grow-1">Khám phá những bí quyết và thói quen giúp bạn phát triển kỹ năng lập trình một cách hiệu quả và bền vững...</p>
                    <div class="d-flex align-items-center justify-content-between">
                      <div class="d-flex align-items-center">
                        <img src="https://i.pravatar.cc/150?img=12" class="rounded-circle me-2" width="40" height="40" alt="Avatar" />
                        <div>
                          <div class="fw-semibold small">Nguyễn Văn A</div>
                          <div class="text-muted" style="font-size: 0.8rem">
                            <i class="bi bi-clock me-1"></i>
                            5 giờ trước
                          </div>
                        </div>
                      </div>
                      <a href="#" class="btn btn-primary rounded-pill px-4">
                        Đọc ngay
                        <i class="bi bi-arrow-right ms-1"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Posts Grid -->
          <div v-for="post in posts" class="posts-grid" :key="post.id">
            <article class="post-card card border-0 shadow-sm rounded-4 mb-4 hover-lift">
              <div class="row g-0">
                <div class="col-md-4">
                  <div class="post-thumbnail">
                    <img v-if="post.image" :src="post.image" class="img-fluid rounded-start-4 h-100 w-100" style="object-fit: cover" alt="Post" />
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="card-body p-4">
                    <div class="d-flex align-items-center mb-3">
                      <img src="https://i.pravatar.cc/150?img=33" class="rounded-circle me-2" width="32" height="32" alt="Avatar" />
                      <div class="me-auto">
                        <div class="fw-semibold small">{{ post.user?.name }}</div>
                        <div class="text-muted" style="font-size: 0.75rem">2 ngày trước</div>
                      </div>
                      <div class="dropdown">
                        <button class="btn btn-sm btn-light rounded-circle" type="button" data-bs-toggle="dropdown">
                          <i class="bi bi-three-dots"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end shadow">
                          <li>
                            <a class="dropdown-item" href="#">
                              <i class="bi bi-bookmark me-2"></i>
                              Lưu bài viết
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item" href="#">
                              <i class="bi bi-share me-2"></i>
                              Chia sẻ
                            </a>
                          </li>
                          <li><hr class="dropdown-divider" /></li>
                          <li>
                            <a class="dropdown-item text-danger" href="#">
                              <i class="bi bi-flag me-2"></i>
                              Báo cáo
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h3 class="card-title h5 fw-bold mb-2 lh-base">
                      <router-link :to="'post/' + post.id" class="text-decoration-none text-dark stretched-link">{{ post.title }}</router-link>
                    </h3>
                    <p class="card-text card-text-clamp text-muted mb-3" style="font-size: 0.9rem">{{ post.content }}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <!-- Pagination -->
          <nav aria-label="Pagination" class="mt-5">
            <!-- Prev -->
            <ul class="pagination pagination-lg justify-content-center gap-2" :class="{ disabled: page === 1 }">
              <li class="page-item disabled">
                <a @click="changePage(page - 1)" class="page-link rounded-circle" href="#" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center">
                  <i class="bi bi-chevron-left"></i>
                </a>
              </li>
              <!-- Page number -->
              <li class="page-item" v-for="n in totalPages" :key="n" :class="{ active: n === page }">
                <a @click="changePage(n)" class="page-link rounded-circle" href="#" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center">{{ n }}</a>
              </li>
              <!-- Next -->
              <li class="page-item">
                <a @click="changePage(page + 1)" class="page-link rounded-circle" href="#" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center">
                  <i class="bi bi-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4">
          <!-- Sticky Sidebar -->
          <div class="sticky-sidebar" style="position: sticky; top: 100px">
            <!-- Trending Topics -->
            <div class="card border-0 shadow-sm rounded-4 mb-4">
              <div class="card-body p-4">
                <h5 class="card-title fw-bold mb-4 d-flex align-items-center">
                  <i class="bi bi-fire text-danger me-2"></i>
                  Chủ đề thịnh hành
                </h5>
                <div class="d-flex flex-wrap gap-2">
                  <a href="#" class="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 text-decoration-none">
                    <i class="bi bi-hash"></i>
                    Công nghệ
                  </a>
                  <a href="#" class="badge bg-success-subtle text-success rounded-pill px-3 py-2 text-decoration-none">
                    <i class="bi bi-hash"></i>
                    Du lịch
                  </a>
                  <a href="#" class="badge bg-warning-subtle text-warning rounded-pill px-3 py-2 text-decoration-none">
                    <i class="bi bi-hash"></i>
                    Ẩm thực
                  </a>
                  <a href="#" class="badge bg-info-subtle text-info rounded-pill px-3 py-2 text-decoration-none">
                    <i class="bi bi-hash"></i>
                    Lifestyle
                  </a>
                  <a href="#" class="badge bg-danger-subtle text-danger rounded-pill px-3 py-2 text-decoration-none">
                    <i class="bi bi-hash"></i>
                    Thể thao
                  </a>
                  <a href="#" class="badge bg-secondary-subtle text-secondary rounded-pill px-3 py-2 text-decoration-none">
                    <i class="bi bi-hash"></i>
                    Giáo dục
                  </a>
                </div>
              </div>
            </div>

            <!-- Top Authors -->
            <div class="card border-0 shadow-sm rounded-4 mb-4">
              <div class="card-body p-4">
                <h5 class="card-title fw-bold mb-4 d-flex align-items-center">
                  <i class="bi bi-people-fill text-primary me-2"></i>
                  Tác giả nổi bật
                </h5>

                <div class="author-item d-flex align-items-center mb-3 pb-3 border-bottom">
                  <img src="https://i.pravatar.cc/150?img=31" class="rounded-circle me-3" width="50" height="50" alt="Author" />
                  <div class="flex-grow-1">
                    <h6 class="mb-0 fw-semibold">Nguyễn Hoàng Nam</h6>
                    <small class="text-muted">156 bài viết</small>
                  </div>
                  <button class="btn btn-sm btn-primary rounded-pill px-3">
                    <i class="bi bi-plus-lg"></i>
                    Theo dõi
                  </button>
                </div>

                <div class="author-item d-flex align-items-center mb-3 pb-3 border-bottom">
                  <img src="https://i.pravatar.cc/150?img=27" class="rounded-circle me-3" width="50" height="50" alt="Author" />
                  <div class="flex-grow-1">
                    <h6 class="mb-0 fw-semibold">Trần Minh Anh</h6>
                    <small class="text-muted">203 bài viết</small>
                  </div>
                  <button class="btn btn-sm btn-primary rounded-pill px-3">
                    <i class="bi bi-plus-lg"></i>
                    Theo dõi
                  </button>
                </div>

                <div class="author-item d-flex align-items-center mb-3 pb-3 border-bottom">
                  <img src="https://i.pravatar.cc/150?img=48" class="rounded-circle me-3" width="50" height="50" alt="Author" />
                  <div class="flex-grow-1">
                    <h6 class="mb-0 fw-semibold">Lê Thị Hương</h6>
                    <small class="text-muted">89 bài viết</small>
                  </div>
                  <button class="btn btn-sm btn-primary rounded-pill px-3">
                    <i class="bi bi-plus-lg"></i>
                    Theo dõi
                  </button>
                </div>

                <div class="author-item d-flex align-items-center">
                  <img src="https://i.pravatar.cc/150?img=56" class="rounded-circle me-3" width="50" height="50" alt="Author" />
                  <div class="flex-grow-1">
                    <h6 class="mb-0 fw-semibold">Phạm Đức Thành</h6>
                    <small class="text-muted">124 bài viết</small>
                  </div>
                  <button class="btn btn-sm btn-primary rounded-pill px-3">
                    <i class="bi bi-plus-lg"></i>
                    Theo dõi
                  </button>
                </div>

                <div class="text-center mt-4">
                  <a href="#" class="text-primary text-decoration-none fw-semibold">
                    Xem tất cả
                    <i class="bi bi-arrow-right ms-1"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import type { IPost } from "@/types/Post";
import postService from "@/services/post.service";
import { RouterLink } from "vue-router";

const toast = useToast();
const page = ref(1);
const limit = 5;
const totalPages = ref(0);
const posts = ref<IPost[]>([]);

const fetchPost = async () => {
  try {
    const res = await postService.getAllPostPagination(page.value, limit);
    posts.value = res.data;
    totalPages.value = Math.ceil(res.total / limit);
  } catch (error: any) {
    toast.error(error.message || "Có lỗi xảy ra tải dữ liệu");
  }
};

const changePage = (newPage: number) => {
  if (newPage < 1 || newPage > totalPages.value) return;
  page.value = newPage;
  fetchPost();
};

//   gọi API khi component được mount
onMounted(() => {
  fetchPost();
});
</script>

<style scoped>
.card-text-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-overflow: ellipsis;

  line-height: 1.6;
  max-height: calc(1.6em * 3);
}
</style>
