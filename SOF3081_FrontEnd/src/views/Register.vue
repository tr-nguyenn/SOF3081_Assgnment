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
          <h6 to="/" class="fw-bold h5">📘 BlogManager</h6>
        </div>

        <div>
          <h1 class="fw-bold display-5">
            Ghi lại suy nghĩ,
            <br />
            chia sẻ cùng thế giới.
          </h1>
          <p class="mt-4">
            Tham gia cùng hơn
            <strong>50.000</strong>
            người viết đang quản lý nội dung, kết nối với độc giả và phát triển thương hiệu cá nhân.
          </p>
        </div>

        <small>Được tin dùng bởi những người kể chuyện hiện đại.</small>
      </div>

      <!-- RIGHT FORM -->
      <div class="col-md-6 d-flex align-items-center justify-content-center bg-dark text-white">
        <div class="w-75" style="max-width: 400px">
          <RouterLink to="/" class="text-secondary text-decoration-none mb-4 d-inline-block">← Quay lại trang chủ</RouterLink>
          <h2 class="fw-bold mb-2">Tham gia cộng đồng</h2>
          <p class="text-secondary mb-4">Nhập thông tin bên dưới để tạo tài khoản miễn phí.</p>

          <form @submit.prevent="handleRegister">
            <div class="mb-3">
              <label class="form-label fw-bold">Họ và tên</label>
              <input v-model="user.name" type="text" class="form-control bg-dark text-white border-secondary py-2" />
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold">Email</label>
              <input v-model="user.email" type="email" class="form-control bg-dark text-white border-secondary py-2" />
            </div>

            <div class="mb-4">
              <label class="form-label fw-bold">Mật khẩu</label>
              <input v-model="user.password" type="password" class="form-control bg-dark text-white border-secondary py-2" />
            </div>

            <div class="mb-4">
              <label class="form-label fw-bold">Xác nhận mật khẩu</label>
              <input v-model="confirmPassword" type="password" class="form-control bg-dark text-white border-secondary py-2" />
            </div>

            <button type="submit" class="btn btn-primary w-100 py-2">Đăng ký</button>
          </form>

          <p class="text-center mt-4 text-secondary">
            Đã có tài khoản?
            <RouterLink to="login" class="text-primary fw-semibold text-decoration-none">Đăng nhập</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import userService from "@/services/user.service";

const router = useRouter();
const toast = useToast();

const user = ref({
  name: "",
  email: "",
  password: "",
  role: "user",
});

const confirmPassword = ref("");

const handleRegister = async () => {
  if (!user.value.name || !user.value.email || !user.value.password) {
    toast.warning("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  if (user.value.password !== confirmPassword.value) {
    toast.error("Mật khẩu xác nhận không khớp!");
    return;
  }

  if (user.value.password.length < 6) {
    toast.warning("Mật khẩu phải có ít nhất 6 ký tự!");
    return;
  }

  try {
    const existingUsers = await userService.login(user.value.email);
    if (existingUsers && existingUsers.length > 0) {
      toast.error("Email này đã được sử dụng. Vui lòng dùng email khác!");
      return;
    }

    await userService.register(user.value);

    toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
    router.push("/login");
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    toast.error("Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!");
  }
};
</script>
