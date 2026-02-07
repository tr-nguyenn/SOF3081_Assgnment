<template>
  <!-- Alter -->
  <div v-if="errorMessage" class="p-3 m-3 bg-danger-subtle border-start border-5 border-primary text-primary rounded mb-3">
    <strong>Lỗi!</strong>
    {{ errorMessage }}
  </div>
  <div class="container-fluid py-4">
    <!-- Header Section -->
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h1 class="h3 mb-0 fw-bold text-dark">Quản lý bài viết</h1>
          </div>
          <div class="col-md-6 text-md-end mt-3 mt-md-0">
            <button class="btn btn-primary btn-add-post" @click="openCreate">
              <i class="bi bi-plus-circle me-2"></i>
              Thêm bài viết
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Posts Table -->
    <div class="p-3 bg-white rounded-3 shadow-sm mb-3">
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
                <button class="btn btn-sm btn-outline-warning mx-1" @click="openUpdate" title="Sửa">
                  <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger mx-1" title="Xóa">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Modal -->
  <PostModal ref="modalRef" :mode="mode" @create-post="handleCreatePost" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import PostModal from "@/components/post/PostModal.vue";
import type { IPost } from "@/types/Post";
import postService from "@/services/post.service";
import { useToast } from "vue-toastification";

const modalRef = ref<InstanceType<typeof PostModal> | null>(null);
const mode = ref<"create" | "update">("create");
const posts = ref<IPost[]>([]);
const errorMessage = ref("");
const toast = useToast();
//get all post
const fetchPost = async () => {
  try {
    const response = await postService.getAll();
    posts.value = response.data as IPost[];
  } catch (error: any) {
    errorMessage.value = error?.message || "Không thể kết nối tới server. Vui lòng thử lại sau.";
  }
};
onMounted(fetchPost);

//Create post
const openCreate = () => {
  mode.value = "create";
  modalRef.value?.open();
};

const handleCreatePost = async (data: IPost) => {
  try {
    await postService.create(data);
    await fetchPost();
    modalRef.value?.close();
    toast.success("Tạo bài viết thành công!");
  } catch (error: any) {
    toast.error(error?.message || "Có lỗi xảy ra khi tạo bài viết");
  }
};

const openUpdate = () => {
  mode.value = "update";
  modalRef.value?.open();
};
</script>
