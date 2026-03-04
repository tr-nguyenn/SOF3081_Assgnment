<template>
  <div class="container-fluid min-vh-100">
    <div class="row min-vh-100">
      <div
        class="col-md-6 d-none d-md-flex flex-column justify-content-between p-5 text-white"
        style="
          background:
            linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
            url(&quot;https://images.unsplash.com/photo-1498050108023-c5249f4df085&quot;) center / cover no-repeat;
        ">
        <div>
          <h6 class="fw-bold h5">📘 BlogManager</h6>
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

      <div class="col-md-6 d-flex align-items-center justify-content-center bg-dark text-white">
        <div class="w-75" style="max-width: 400px">
          <RouterLink to="/" class="text-secondary text-decoration-none mb-4 d-inline-block">← Quay lại trang chủ</RouterLink>

          <div v-if="!isVerifying">
            <h2 class="fw-bold mb-2">Tham gia cộng đồng</h2>
            <p class="text-secondary mb-4">Nhập thông tin bên dưới để tạo tài khoản miễn phí.</p>

            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label class="form-label fw-bold">Họ và tên</label>
                <input v-model="user.name" type="text" class="form-control bg-dark text-white border-secondary py-2" required />
              </div>

              <div class="mb-3">
                <label class="form-label fw-bold">Email</label>
                <input v-model="user.email" type="email" class="form-control bg-dark text-white border-secondary py-2" required />
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold">Mật khẩu</label>
                <input v-model="user.password" type="password" class="form-control bg-dark text-white border-secondary py-2" required />
              </div>

              <div class="mb-4">
                <label class="form-label fw-bold">Xác nhận mật khẩu</label>
                <input v-model="confirmPassword" type="password" class="form-control bg-dark text-white border-secondary py-2" required />
              </div>

              <button type="submit" class="btn btn-primary w-100 py-2" :disabled="isSendingEmail || isLoading">
                {{ isSendingEmail ? "Đang gửi mã..." : "Đăng ký" }}
              </button>
            </form>

            <p class="text-center mt-4 text-secondary">
              Đã có tài khoản?
              <RouterLink to="/login" class="text-primary fw-semibold text-decoration-none">Đăng nhập</RouterLink>
            </p>
          </div>

          <div v-else>
            <h2 class="fw-bold mb-2">Xác thực Email</h2>
            <p class="text-secondary mb-4">
              Chúng tôi đã gửi mã xác thực gồm 6 chữ số đến
              <strong>{{ user.email }}</strong>
              .
            </p>

            <form @submit.prevent="handleVerify">
              <div class="mb-4">
                <label class="form-label fw-bold">Mã xác nhận</label>
                <input v-model="inputCode" type="text" maxlength="6" class="form-control bg-dark text-white border-secondary py-2 text-center fs-4 tracking-widest" placeholder="------" required />
              </div>

              <button type="submit" class="btn btn-success w-100 py-2" :disabled="isLoading">
                {{ isLoading ? "Đang xử lý..." : "Xác nhận & Hoàn tất" }}
              </button>

              <button type="button" @click="isVerifying = false" class="btn btn-link text-secondary w-100 mt-2 text-decoration-none">Quay lại sửa thông tin</button>
            </form>
          </div>
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
import { useEmailVerification } from "@/composables/useEmailVerification"; // Import composable

const router = useRouter();
const toast = useToast();

const user = ref({
  name: "",
  email: "",
  password: "",
  role: "user",
});
const confirmPassword = ref("");
const isLoading = ref(false); // Trạng thái loading khi call API Backend (Kiểm tra email tồn tại, lưu user)
const isVerifying = ref(false); // Trạng thái chuyển đổi UI
const inputCode = ref("");

// Sử dụng Composable
const { isSendingEmail, sendVerificationEmail, verifyCode } = useEmailVerification();

const handleRegister = async () => {
  if (user.value.password !== confirmPassword.value) {
    toast.error("Mật khẩu xác nhận không khớp!");
    return;
  }

  if (user.value.password.length < 6) {
    toast.warning("Mật khẩu phải có ít nhất 6 ký tự!");
    return;
  }

  try {
    isLoading.value = true;

    // Kiểm tra email đã tồn tại chưa
    const existingUsers = await userService.login(user.value.email);
    if (existingUsers && existingUsers.length > 0) {
      toast.error("Email này đã được sử dụng. Vui lòng dùng email khác!");
      return;
    }
  } catch (error) {
    toast.error("Lỗi kiểm tra dữ liệu từ máy chủ.");
    return;
  } finally {
    isLoading.value = false;
  }

  // Gọi hàm gửi email từ Composable
  const isSuccess = await sendVerificationEmail(user.value.name, user.value.email);

  // Nếu gửi thành công thì mới chuyển sang form nhập mã
  if (isSuccess) {
    isVerifying.value = true;
  }
};

const handleVerify = async () => {
  // Gọi hàm kiểm tra mã từ Composable
  const isValid = verifyCode(inputCode.value);
  if (!isValid) return;

  try {
    isLoading.value = true;
    await userService.register(user.value);
    toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
    router.push("/login");
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    toast.error("Có lỗi xảy ra khi lưu tài khoản. Vui lòng thử lại!");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.tracking-widest {
  letter-spacing: 0.5em;
}
</style>
