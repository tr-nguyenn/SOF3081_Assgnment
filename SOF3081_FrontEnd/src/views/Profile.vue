<template>
  <div class="profile container py-5">
    <div class="row g-4">
      <div class="col-lg-4">
        <div class="sidebar-card px-4 py-5 d-flex align-items-center text-white flex-column rounded-4 sticky-lg-top">
          <div class="avatar-wrapper mb-3" @click="triggerAvatarUpload" title="Nhấn để thay đổi ảnh">
            <div class="avatar-container">
              <img class="avatar-img rounded-circle" :src="currentAvatarUrl" alt="Avatar" />

              <div class="avatar-overlay rounded-circle">
                <i class="bi bi-camera-fill fs-4"></i>
                <span class="small mt-1">Thay ảnh</span>
              </div>
            </div>
          </div>

          <div v-if="uploadError" class="text-danger small text-center mb-2 fw-bold">
            {{ uploadError }}
          </div>

          <input ref="avatarInput" type="file" accept="image/jpeg,image/png,image/webp" class="d-none" @change="handleImageUpload" />

          <h4 class="fw-bold mb-1">{{ user?.name }}</h4>
          <div class="w-100 border-top border-white border-opacity-25 pt-4">
            <div class="d-flex justify-content-between small mb-2">
              <span>
                <i class="bi bi-file-earmark-text me-1"></i>
                Tổng bài viết:
              </span>
              <span class="fw-bold badge bg-warning text-dark">{{ totalPosts ?? "—" }}</span>
            </div>
            <div class="d-flex justify-content-between small">
              <span>
                <i class="bi bi-calendar3 me-1"></i>
                Tham gia từ:
              </span>
              <span class="fw-bold">Tháng 10, 2023</span>
            </div>
          </div>

          <div class="w-100 mt-4 d-flex flex-column gap-2">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              class="tab-btn d-flex align-items-center gap-2 px-3 py-2 rounded-3 text-start"
              :class="{ active: activeTab === tab.key }"
              @click="activeTab = tab.key">
              <i :class="tab.icon"></i>
              {{ tab.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="col-lg-8">
        <div v-if="activeTab === 'info'" class="card card-custom mb-4">
          <div class="card-header">
            <i class="bi bi-person-circle me-2"></i>
            Thông tin cá nhân
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="saveProfile">
              <div class="mb-3">
                <label class="form-label">Họ và tên</label>
                <input type="text" class="form-control" v-model="formInfo.name" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Phân quyền</label>
                <input type="text" class="form-control" v-model="formInfo.role" disabled />
              </div>
              <div class="d-flex justify-content-end gap-3 mt-4">
                <button type="button" class="btn btn-light px-4 border" @click="resetInfo">Hủy</button>
                <button type="submit" class="btn btn-save shadow-sm">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>

        <div v-if="activeTab === 'email'" class="card card-custom mb-4">
          <div class="card-header">
            <i class="bi bi-envelope-check me-2"></i>
            Thay đổi địa chỉ Email
          </div>
          <div class="card-body p-4">
            <div class="alert alert-info py-2 mb-4">
              Email hiện tại:
              <strong>{{ user?.email }}</strong>
            </div>

            <form v-if="!isVerifyingEmail" @submit.prevent="handleRequestEmailChange">
              <div class="mb-3">
                <label class="form-label">Email mới</label>
                <input type="email" class="form-control" v-model="formEmail.newEmail" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Mật khẩu xác thực</label>
                <div class="input-group">
                  <input :type="showEmailPwd ? 'text' : 'password'" class="form-control" v-model="formEmail.currentPassword" required />
                  <button type="button" class="input-group-text btn-eye" @click="showEmailPwd = !showEmailPwd">
                    <i :class="showEmailPwd ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                </div>
              </div>
              <div class="d-flex justify-content-end gap-3 mt-4">
                <button type="button" class="btn btn-light px-4 border" @click="resetEmail">Hủy</button>
                <button type="submit" class="btn btn-save shadow-sm" :disabled="!formEmail.newEmail || isSendingEmail">
                  {{ isSendingEmail ? "Đang gửi mã..." : "Xác thực & Cập nhật" }}
                </button>
              </div>
            </form>

            <form v-else @submit.prevent="handleConfirmEmailChange">
              <div class="alert alert-success py-2 mb-3 small">
                Mã xác nhận 6 số đã được gửi đến:
                <b>{{ formEmail.newEmail }}</b>
              </div>
              <div class="mb-4">
                <label class="form-label fw-bold">Mã xác nhận</label>
                <input v-model="emailVerifyCode" type="text" maxlength="6" class="form-control text-center fs-4 tracking-widest" placeholder="------" required />
              </div>
              <div class="d-flex flex-column gap-2 mt-4">
                <button type="submit" class="btn btn-success py-2 w-100">Xác nhận đổi Email</button>
                <button type="button" class="btn btn-link text-secondary text-decoration-none w-100" @click="isVerifyingEmail = false">Quay lại</button>
              </div>
            </form>
          </div>
        </div>

        <div v-if="activeTab === 'password'" class="card card-custom mb-4">
          <div class="card-header">
            <i class="bi bi-shield-lock me-2"></i>
            Thay đổi mật khẩu
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="savePassword">
              <div class="mb-3">
                <label class="form-label">Mật khẩu hiện tại</label>
                <div class="input-group">
                  <input :type="showPwd.current ? 'text' : 'password'" class="form-control" v-model="formPwd.current" required />
                  <button type="button" class="input-group-text btn-eye" @click="showPwd.current = !showPwd.current">
                    <i :class="showPwd.current ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Mật khẩu mới</label>
                <div class="input-group">
                  <input :type="showPwd.new ? 'text' : 'password'" class="form-control" v-model="formPwd.newPwd" required minlength="6" />
                  <button type="button" class="input-group-text btn-eye" @click="showPwd.new = !showPwd.new">
                    <i :class="showPwd.new ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Xác nhận mật khẩu mới</label>
                <div class="input-group">
                  <input
                    :type="showPwd.confirm ? 'text' : 'password'"
                    class="form-control"
                    v-model="formPwd.confirm"
                    required
                    :class="{ 'is-invalid': formPwd.confirm && formPwd.newPwd !== formPwd.confirm }" />
                  <button type="button" class="input-group-text btn-eye" @click="showPwd.confirm = !showPwd.confirm">
                    <i :class="showPwd.confirm ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                  <div class="invalid-feedback">Mật khẩu xác nhận không khớp.</div>
                </div>
              </div>
              <div class="d-flex justify-content-end gap-3 mt-4">
                <button type="button" class="btn btn-light px-4 border" @click="resetPwd">Hủy</button>
                <button type="submit" class="btn btn-save shadow-sm" :disabled="formPwd.newPwd !== formPwd.confirm || !formPwd.current">Đổi mật khẩu</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import type { IUser } from "@/types/User";
import type { IPost } from "@/types/Post";
import { useImageUpload } from "@/composables/useImageUpload";
import { useEmailVerification } from "@/composables/useEmailVerification";
import postService from "@/services/post.service";
import userService from "@/services/user.service";

const router = useRouter();
const toast = useToast();
const user = ref<IUser | null>(null);
const totalPosts = ref<number | undefined>(undefined);
const activeTab = ref("info");

const avatarInput = ref<HTMLInputElement | null>(null);

const showEmailPwd = ref(false);
const formInfo = reactive({ name: "", role: "" });
const formEmail = reactive({ newEmail: "", currentPassword: "" });
const formPwd = reactive({ current: "", newPwd: "", confirm: "" });
const showPwd = reactive({ current: false, new: false, confirm: false });

const defaultAvatar = computed(() => `https://ui-avatars.com/api/?name=${encodeURIComponent(user.value?.name || "U")}&background=0d3b44&color=fff&size=160`);

const { imageBase64, uploadError, handleImageUpload, resetImage } = useImageUpload();

const isVerifyingEmail = ref(false);
const emailVerifyCode = ref("");
const { isSendingEmail, sendVerificationEmail, verifyCode } = useEmailVerification();

const currentAvatarUrl = computed(() => {
  if (imageBase64.value) return imageBase64.value;
  if (user.value?.avatar) return user.value.avatar;
  return defaultAvatar.value;
});

const tabs = [
  { key: "info", label: "Thông tin cá nhân", icon: "bi bi-person" },
  { key: "email", label: "Thay đổi Email", icon: "bi bi-envelope" },
  { key: "password", label: "Thay đổi mật khẩu", icon: "bi bi-shield-lock" },
];

onMounted(async () => {
  const userString = localStorage.getItem("user");
  if (!userString) return router.replace("/login");

  const currentUser = JSON.parse(userString) as IUser;
  user.value = currentUser;
  formInfo.name = currentUser.name;
  formInfo.role = currentUser.role;

  totalPosts.value = await fetchTotalPost();
});

const fetchTotalPost = async () => {
  if (!user.value?.id) return;
  const listPost: IPost[] = await postService.getAllPostByUser(user.value.id);
  return listPost.length;
};

const saveProfile = async () => {
  if (!user.value) return;
  try {
    const updateUser = await userService.updateUser(user.value.id, {
      name: formInfo.name,
    });
    user.value = updateUser;
    localStorage.setItem("user", JSON.stringify(updateUser));
    toast.success("Cập nhật thông tin cá nhân thành công");
  } catch (error) {
    toast.error("Cập nhật thông tin cá nhân thất bại");
  }
};
const resetInfo = () => (formInfo.name = user.value?.name || "");

const handleRequestEmailChange = async () => {
  if (!user.value || !formEmail.newEmail || !formEmail.currentPassword) return;
  if (formEmail.newEmail === user.value.email) {
    toast.warning("Email mới không được giống email hiện tại!");
    return;
  }
  if (formEmail.currentPassword !== user.value.password) {
    toast.error("Mật khẩu xác thực không chính xác!");
    return;
  }

  try {
    const existingUsers = await userService.login(formEmail.newEmail);
    if (existingUsers && existingUsers.length > 0) {
      toast.error("Email này đã được sử dụng bởi tài khoản khác!");
      return;
    }
    const isSuccess = await sendVerificationEmail(user.value.name, formEmail.newEmail);
    if (isSuccess) {
      isVerifyingEmail.value = true;
    }
  } catch (error) {
    toast.error("Có lỗi xảy ra khi kiểm tra email.");
  }
};

const handleConfirmEmailChange = async () => {
  if (!user.value) return;
  const isValid = verifyCode(emailVerifyCode.value);
  if (!isValid) return;

  try {
    const updatedUser = await userService.updateUser(user.value.id, {
      email: formEmail.newEmail,
    });
    user.value = updatedUser;
    localStorage.setItem("user", JSON.stringify(updatedUser));
    toast.success("Email đã được thay đổi thành công!");
    resetEmail();
  } catch (error) {
    toast.error("Cập nhật email thất bại. Vui lòng thử lại!");
  }
};

const resetEmail = () => {
  formEmail.newEmail = "";
  formEmail.currentPassword = "";
  emailVerifyCode.value = "";
  isVerifyingEmail.value = false;
};

const savePassword = async () => {
  if (formPwd.newPwd !== formPwd.confirm || !user.value) return;
  if (formPwd.current !== user.value.password) {
    toast.error("Mật khẩu hiện tại không chính xác!");
    return;
  }
  try {
    const updateUser = await userService.updateUser(user.value.id, {
      password: formPwd.newPwd,
    });
    user.value = updateUser;
    localStorage.setItem("user", JSON.stringify(updateUser));
    toast.success("Mật khẩu đã được thay đổi thành công!");
    resetPwd();
  } catch (error) {
    toast.error("Có lỗi khi thay đổi mật khẩu");
  }
};
const resetPwd = () => {
  formPwd.current = "";
  formPwd.newPwd = "";
  formPwd.confirm = "";
};

// --- LOGIC AVATAR ---
const triggerAvatarUpload = () => avatarInput.value?.click();

const saveAvatar = async () => {
  if (!user.value || !imageBase64.value) return;

  try {
    const updatedUser = await userService.updateUser(user.value.id, {
      avatar: imageBase64.value,
    });
    user.value = updatedUser;
    localStorage.setItem("user", JSON.stringify(updatedUser));
    toast.success("Ảnh đại diện đã được cập nhật!");

    if (avatarInput.value) avatarInput.value.value = "";
    resetImage();
  } catch (error) {
    toast.error("Cập nhật ảnh đại diện thất bại!");
  }
};

watch(imageBase64, (newValue) => {
  if (newValue) {
    saveAvatar();
  }
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap");

:root {
  --primary-color: #0d3b44;
  --accent-yellow: #ffc107;
  --bg-body: #f0f4f8;
  --text-main: #1e293b;
}

.profile {
  font-family: "Be Vietnam Pro", sans-serif;
}
.profile-header h1 {
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: -0.02em;
}

.sidebar-card {
  background: linear-gradient(155deg, #0d3b44 0%, #0f5260 100%) !important;
  border: none;
  box-shadow: 0 12px 30px rgba(13, 59, 68, 0.2);
}

.avatar-wrapper {
  cursor: pointer;
  position: relative;
  display: inline-block;
}
.avatar-container {
  position: relative;
  width: 140px;
  height: 140px;
  margin: 0 auto;
}
.avatar-img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border: 4px solid white;
  display: block;
}
.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.25s ease;
  cursor: pointer;
}
.avatar-wrapper:hover .avatar-overlay {
  opacity: 1;
}

/* Tabs */
.tab-btn {
  background: rgba(255, 255, 255, 0.08);
  border: none;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.88rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
}
.tab-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: white;
}
.tab-btn.active {
  background: var(--accent-yellow);
  color: #000;
  font-weight: 600;
}

/* Forms & Cards */
.card-custom {
  border: none;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
}
.card-custom .card-header {
  background: white;
  border-bottom: 1px solid #edf2f7;
  color: var(--primary-color);
  font-weight: 600;
  padding: 1.1rem 1.5rem;
}
.form-label {
  font-weight: 500;
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.4rem;
}
.form-control {
  padding: 0.7rem 1rem;
  border-color: #e2e8f0;
  border-radius: 8px;
  font-size: 0.92rem;
}
.form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(13, 59, 68, 0.1);
}
.input-group-text {
  background: #f8fafc;
  border-color: #e2e8f0;
  color: #94a3b8;
}

.btn-eye {
  cursor: pointer;
  border-left: 1px solid #e2e8f0 !important;
}
.btn-eye:hover {
  background: #edf2f7;
  color: var(--primary-color);
}

.btn-save {
  background-color: var(--accent-yellow);
  border: none;
  color: #000;
  font-weight: 600;
  padding: 10px 28px;
  border-radius: 8px;
  transition: all 0.2s;
  font-size: 0.92rem;
}
.btn-save:hover:not(:disabled) {
  background-color: #eab308;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(234, 179, 8, 0.4);
}
.btn-save:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.sticky-lg-top {
  top: 5rem;
}
</style>
