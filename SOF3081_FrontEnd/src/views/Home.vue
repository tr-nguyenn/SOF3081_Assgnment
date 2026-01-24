<template>
  <!-- Hero -->
  <section class="bg-primary text-white py-5">
    <div class="container text-center">
      <h1 class="fw-bold mb-3">Vue Blog</h1>
      <p class="lead mb-4">Nơi chia sẻ kiến thức, bài viết và kinh nghiệm học tập Vue.js</p>
      <RouterLink to="/post/1" class="btn btn-warning btn-lg rounded-pill px-4"> Xem bài viết </RouterLink>
    </div>
  </section>

  <!-- Featured Posts -->
  <section class="py-5">
    <div class="container">
      <h3 class="fw-bold mb-4 text-center">Bài viết nổi bật</h3>

      <div class="row g-4">
        <div class="col-md-4" v-for="post in 3" :key="post">
          <div class="card h-100 shadow-sm">
            <img src="https://picsum.photos/400/250" class="card-img-top" alt="post" />
            <div class="card-body">
              <h5 class="card-title">Bài viết Vue {{ post }}</h5>
              <p class="card-text text-muted small">
                Giới thiệu kiến thức cơ bản và thực hành Vue.js cho người mới bắt đầu.
              </p>
              <RouterLink :to="`/post/${post}`" class="btn btn-outline-primary btn-sm"> Đọc tiếp </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- About -->
  <section class="bg-light py-5">
    <div class="container text-center">
      <h3 class="fw-bold mb-3">Về Vue Blog</h3>
      <p class="text-muted w-75 mx-auto">
        Đây là project frontend sử dụng Vue 3 + Bootstrap, phục vụ môn học SOF3081 – Xây dựng giao diện. Website mô
        phỏng trang blog học tập.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
