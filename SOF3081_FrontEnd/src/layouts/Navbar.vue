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
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse pt-3 pt-lg-0" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Trang chủ</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/post/1">Bài viết</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/post-manager">Quản lý bài viết</RouterLink>
          </li>
        </ul>

        <!-- form search -->
        <form class="d-flex mt-lg-0 mt-2" role="search">
          <div class="input-group">
            <input type="search" class="form-control rounded-1 form-control-sm" style="max-height: 42px; margin-right: -1px" placeholder="Tìm kiếm..." />
            <button type="submit" class="btn btn-sm btn-success"><i class="bi bi-search"></i></button>
          </div>
        </form>

        <!-- Auth -->
        <div class="d-flex align-items-center justify-content-center justify-content-lg-end ms-5 ms-lg-3 mt-2 mt-lg-0 ms-auto">
          <template v-if="!user">
            <RouterLink class="btn btn-outline-light px-3 rounded-2 me-2" to="/login">Đăng nhập</RouterLink>
            <RouterLink class="btn btn-warning px-3 rounded-2 fw-semibold" to="/register">Đăng ký</RouterLink>
          </template>

          <template v-else>
            <div class="dropdown">
              <button class="btn btn-light btn-sm dropdown-toggle d-flex align-items-center gap-2 py-1 px-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="https://i.pravatar.cc/30" class="rounded-circle flex-shrink-0" width="28" height="28" alt="avatar" />
              </button>
              <ul class="dropdown-menu dropdown-menu-end shadow-sm" style="min-width: 200px">
                <li class="px-3 py-2 border-bottom">
                  <div class="d-flex align-items-center gap-2">
                    <img src="https://i.pravatar.cc/40" class="rounded-circle" width="36" height="36" alt="avatar" />
                    <div class="overflow-hidden">
                      <div class="fw-semibold text-truncate small">{{ user.name }}</div>
                      <div class="text-muted text-truncate" style="font-size: 0.75rem">{{ user.email }}</div>
                    </div>
                  </div>
                </li>

                <li>
                  <RouterLink class="dropdown-item d-flex align-items-center gap-2 py-2" to="/profile">
                    <i class="bi bi-person text-secondary"></i>
                    Trang cá nhân
                  </RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item d-flex align-items-center gap-2 py-2" to="/post-manager">
                    <i class="bi bi-file-earmark-text text-secondary"></i>
                    Quản lý bài viết
                  </RouterLink>
                </li>
                <li v-if="user.role === 'admin'">
                  <RouterLink class="dropdown-item d-flex align-items-center gap-2 py-2" to="/admin">
                    <i class="bi bi-shield-lock text-secondary"></i>
                    Trang quản trị
                  </RouterLink>
                </li>
                <li><hr class="dropdown-divider my-1" /></li>
                <li>
                  <button class="dropdown-item d-flex align-items-center gap-2 py-2 text-danger" @click="logout">
                    <i class="bi bi-box-arrow-right"></i>
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const user = computed(() => {
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
});

function logout() {
  localStorage.removeItem("user");
  router.push("/login");
}
</script>
