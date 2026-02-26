<template>
  <div v-if="errorMessage" class="p-3 m-3 bg-danger-subtle border-start border-5 border-primary text-primary rounded mb-3">
    <strong>Lỗi!</strong>
    {{ errorMessage }}
  </div>

  <div class="container-fluid py-4">
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h1 class="h3 mb-0 fw-bold text-dark">Quản lý Người dùng</h1>
          </div>
          <div class="col-md-6 text-md-end mt-3 mt-md-0">
            <button class="btn btn-primary" @click="openCreate">
              <i class="bi bi-person-plus-fill me-2"></i>
              Thêm người dùng
            </button>
          </div>
        </div>
      </div>
    </div>

    <UserTable :users="users" @edit="openUpdate" @delete="handleDeleteUser" />
  </div>

  <UserModal ref="modalRef" :mode="mode" @create-user="handleCreateUser" @update-user="handleUpdateUser" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useToast } from "vue-toastification";
import UserModal from "@/views/admin/user/UserModal.vue"; // Điều chỉnh đường dẫn theo project của bạn
import UserTable from "@/views/admin/user/UserTable.vue";
import userService from "@/views/admin/services/user.service";
import type { IUser } from "@/types/User";
import Swal from "sweetalert2";

const toast = useToast();

const modalRef = ref<InstanceType<typeof UserModal> | null>(null);
const mode = ref<"create" | "update">("create");
const users = ref<IUser[]>([]);
const errorMessage = ref("");

const fetchUsers = async () => {
  try {
    errorMessage.value = "";
    const data = await userService.getAllUsers();
    users.value = data;
  } catch (error: any) {
    errorMessage.value = error?.message || "Không thể tải danh sách người dùng.";
  }
};

onMounted(async () => {
  await fetchUsers();
});

// --- Logic Create ---
const openCreate = () => {
  mode.value = "create";
  modalRef.value?.open();
};

const handleCreateUser = async (data: IUser) => {
  try {
    await userService.create(data);
    await fetchUsers();
    modalRef.value?.close();
    toast.success("Tạo người dùng thành công!");
  } catch (error: any) {
    toast.error(error?.message || "Có lỗi xảy ra khi tạo người dùng");
  }
};

// --- Logic Update ---
const openUpdate = (user: IUser) => {
  mode.value = "update";
  modalRef.value?.open();
  if (modalRef.value?.setFormData) {
    modalRef.value.setFormData({ ...user });
  }
};

const handleUpdateUser = async (data: IUser) => {
  try {
    // Ép kiểu id để đảm bảo an toàn vì IUser.id có thể undefined
    if (!data.id) return;
    await userService.update(data.id, data);
    await fetchUsers();
    modalRef.value?.close();
    toast.success("Cập nhật thành công!");
  } catch (error: any) {
    toast.error(error?.message || "Lỗi khi cập nhật người dùng");
  }
};

// --- Logic Delete ---
const handleDeleteUser = async (userId: string | number) => {
  const result = await Swal.fire({
    title: "Xóa tài khoản này?",
    text: "Hành động này không thể hoàn tác!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  });

  if (result.isConfirmed) {
    try {
      await userService.delete(userId);
      toast.success("Đã xóa người dùng!");
      await fetchUsers();
    } catch (error: any) {
      toast.error(error?.message || "Lỗi khi xóa người dùng");
    }
  }
};
</script>
