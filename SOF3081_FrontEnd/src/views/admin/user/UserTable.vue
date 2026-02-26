<template>
  <table class="table table-bordered align-middle">
    <thead>
      <tr class="text-center text-white">
        <th class="bg-primary text-white" scope="col" style="width: 10%">ID</th>
        <th class="bg-primary text-white" scope="col" style="width: 40%">Email</th>
        <th class="bg-primary text-white" scope="col" style="width: 25%">Vai trò</th>
        <th class="bg-primary text-white" scope="col" style="width: 25%">Hành động</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <th class="text-center">{{ user.id }}</th>
        <td>{{ user.email }}</td>
        <td class="text-center">
          <span class="badge" :class="user.role === 'admin' ? 'bg-danger' : 'bg-success'">
            {{ user.role === "admin" ? "Quản trị viên" : "Người dùng" }}
          </span>
        </td>
        <td class="text-center">
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-warning mx-1" @click="$emit('edit', user)" title="Sửa">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger mx-1" @click="$emit('delete', user.id)" title="Xóa">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>

      <tr v-if="users.length === 0">
        <td colspan="4" class="text-center text-muted py-4">Chưa có người dùng nào.</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { IUser } from "@/types/User";

defineProps<{
  users: IUser[];
}>();

defineEmits(["delete", "edit"]);
</script>
