<template>
  <table class="table table-bordered">
    <thead>
      <tr class="text-center text-white">
        <th class="bg-primary text-white" scope="col">ID</th>
        <th class="bg-primary text-white" scope="col">Tiêu đề</th>
        <th class="bg-primary text-white" scope="col">Nội dung</th>
        <th class="bg-primary text-white" scope="col">Hành động</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="post in posts">
        <th class="text-center">{{ post.id }}</th>
        <td>{{ post.title }}</td>
        <td>{{ post.content }}</td>
        <td class="text-center">
          <div class="btn-group">
            <button class="btn btn-sm btn-outline-warning mx-1" @click="$emit('edit', post)" title="Sửa">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button class="btn btn-sm btn-outline-danger mx-1" @click="$emit('delete', post.id)" title="Xóa">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { IPost } from "@/types/Post";

defineProps<{
  posts: IPost[];
}>();

defineEmits(["delete", "edit"]);
</script>
