<template>
  <BaseModal ref="baseModalRef">
    <div class="modal-header">
      <h5 class="modal-title">
        {{ mode === "create" ? "Thêm mới Người dùng" : "Cập nhật Người dùng" }}
      </h5>
      <button type="button" class="btn-close" @click="close"></button>
    </div>

    <div class="modal-body">
      <div class="mb-3">
        <label class="form-label text-black">Email:</label>
        <input v-model="email" type="email" class="form-control" :class="{ 'is-invalid': emailError }" />
        <div class="invalid-feedback">Vui lòng nhập email hợp lệ.</div>
      </div>

      <div class="mb-3" v-if="mode === 'create'">
        <label class="form-label text-black">Mật khẩu:</label>
        <input v-model="password" type="password" class="form-control" :class="{ 'is-invalid': passwordError }" />
        <div class="invalid-feedback">Vui lòng nhập mật khẩu.</div>
      </div>

      <div class="mb-3">
        <label class="form-label text-black">Vai trò:</label>
        <select v-model="role" class="form-select">
          <option value="user">Người dùng</option>
          <option value="admin">Quản trị viên</option>
        </select>
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-danger" @click="close">Hủy</button>
      <button type="button" class="btn btn-primary" @click="handleSubmitForm">
        {{ mode === "create" ? "Tạo tài khoản" : "Lưu thay đổi" }}
      </button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseModal from "@/components/common/BaseModal.vue";
import type { IUser } from "@/types/User";

const props = defineProps<{
  mode: "create" | "update";
}>();

const emit = defineEmits(["create-user", "update-user"]);

const baseModalRef = ref<InstanceType<typeof BaseModal> | null>(null);

const userId = ref<number | string>("");
const email = ref("");
const password = ref("");
const role = ref("user");

const emailError = ref(false);
const passwordError = ref(false);

const setFormData = (user: IUser) => {
  userId.value = user.id || "";
  email.value = user.email || "";
  role.value = user.role || "user";
  password.value = ""; // Không hiển thị mật khẩu khi edit

  emailError.value = false;
  passwordError.value = false;
};

const resetForm = () => {
  userId.value = "";
  email.value = "";
  password.value = "";
  role.value = "user";
  emailError.value = false;
  passwordError.value = false;
};

const handleSubmitForm = () => {
  emailError.value = !email.value.trim() || !email.value.includes("@");
  if (props.mode === "create") {
    passwordError.value = !password.value.trim();
  }

  if (emailError.value || (props.mode === "create" && passwordError.value)) return;

  if (props.mode === "create") {
    emit("create-user", {
      email: email.value,
      password: password.value,
      role: role.value,
    });
  } else {
    emit("update-user", {
      id: userId.value,
      email: email.value,
      role: role.value,
      // Không gửi password nếu không đổi
    });
  }
};

const open = () => {
  if (props.mode === "create") resetForm();
  baseModalRef.value?.open();
};

const close = () => {
  baseModalRef.value?.close();
  resetForm();
};

defineExpose({ open, close, setFormData });
</script>
