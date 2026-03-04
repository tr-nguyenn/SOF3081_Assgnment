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
        ">
        <div>
          <h5 class="fw-bold">📘 BlogManager</h5>
        </div>

        <div>
          <h1 class="fw-bold display-5">Chào mừng trở lại!</h1>
          <p class="mt-4">Đăng nhập để tiếp tục viết bài, quản lý nội dung và kết nối với cộng đồng.</p>
        </div>

        <small>Nơi những ý tưởng được chia sẻ.</small>
      </div>

      <!-- RIGHT FORM -->
      <div class="col-md-6 d-flex align-items-center justify-content-center bg-dark text-white">
        <div class="w-75" style="max-width: 400px">
          <!-- BACK HOME -->
          <RouterLink to="/" class="text-secondary text-decoration-none mb-4 d-inline-block">← Quay lại trang chủ</RouterLink>

          <h2 class="fw-bold mb-2">Đăng nhập</h2>
          <p class="text-secondary mb-4">Nhập thông tin tài khoản của bạn</p>

          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="email" type="email" class="mb-1 form-control bg-dark text-white border-secondary py-2" />
              <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
            </div>

            <div class="mb-3">
              <label class="form-label">Mật khẩu</label>
              <input v-model="password" type="password" class="mb-1 form-control bg-dark text-white border-secondary py-2" />
              <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
            </div>

            <div class="d-flex justify-content-between align-items-center mb-4">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" />
                <label class="form-check-label">Ghi nhớ tôi</label>
              </div>

              <RouterLink to="/forgot-password" class="text-primary text-decoration-none">Quên mật khẩu?</RouterLink>
            </div>

            <button type="submit" class="btn btn-primary w-100 py-2">Đăng nhập</button>
          </form>

          <p class="text-center mt-4 text-secondary">
            Chưa có tài khoản?
            <RouterLink to="/register" class="text-primary fw-semibold text-decoration-none">Đăng ký ngay</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import userService from "@/services/user.service";
import type { IUser } from "@/types/User";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { ref } from "vue";

const toast = useToast();
const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const handleLogin = async () => {
  errorMessage.value = "";
  try {
    const users = (await userService.login(email.value)) as IUser[];
    const user = users[0];
    if (!users.length || user?.password !== password.value) {
      errorMessage.value = "Email hoặc mật khẩu không chính xác!";
      return;
    }
    localStorage.setItem("user", JSON.stringify(user));
    toast.success("Đăng nhập thành công!");
    router.replace("/");
  } catch (error) {
    toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
  }
};
</script>
