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

    <PostTable :posts="posts" @edit="openUpdate" @delete="handleDeletePost" />
  </div>
  <PostModal ref="modalRef" :mode="mode" @create-post="handleCreatePost" @update-post="handleUpdatePost" />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import PostModal from "@/components/post/PostModal.vue";
import PostTable from "@/components/post/PostTable.vue";
import postService from "@/services/post.service";
import type { IPost } from "@/types/Post";
import type { IUser } from "@/types/User";
import Swal from "sweetalert2";

const toast = useToast();
const router = useRouter();

const modalRef = ref<InstanceType<typeof PostModal> | null>(null);
const mode = ref<"create" | "update">("create");
const posts = ref<IPost[]>([]);
const errorMessage = ref("");
const currentUser = ref<IUser | null>(null);

// Tách riêng hàm fetch data để có thể gọi lại sau khi thêm/sửa/xóa
const fetchPosts = async () => {
  if (!currentUser.value?.id) return;

  try {
    errorMessage.value = "";
    // Service đã return response.data nên ta chỉ cần gán thẳng
    const data = await postService.getAllPostByUser(currentUser.value.id);
    posts.value = data;
  } catch (error: any) {
    errorMessage.value = error?.message || "Không thể kết nối tới server. Vui lòng thử lại sau.";
  }
};

onMounted(async () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    router.replace("/login");
    return; // QUAN TRỌNG: Dừng thực thi code bên dưới nếu chưa đăng nhập
  }
  currentUser.value = JSON.parse(userStr);
  // Gọi hàm lấy dữ liệu
  await fetchPosts();
});

// --- Logic Create ---
const openCreate = () => {
  mode.value = "create";
  modalRef.value?.open();
};

const handleCreatePost = async (data: IPost) => {
  try {
    // Tự động gán userId của người đang đăng nhập vào dữ liệu bài viết
    const postData = { ...data, userId: currentUser.value?.id };

    await postService.create(postData);
    await fetchPosts();
    modalRef.value?.close();
    toast.success("Tạo bài viết thành công!");
  } catch (error: any) {
    toast.error(error?.message || "Có lỗi xảy ra khi tạo bài viết");
  }
};

// --- Logic Update ---
const openUpdate = (post: IPost) => {
  mode.value = "update";
  modalRef.value?.open();
  if (modalRef.value?.setFormData) {
    // Clone data để tránh lỗi bind trực tiếp 2 chiều làm đổi data trên bảng khi chưa bấm Lưu
    modalRef.value.setFormData({ ...post });
  }
};

const handleUpdatePost = async (data: IPost) => {
  try {
    const updateData = { ...data, userId: currentUser.value?.id };
    await postService.update(data.id, updateData);
    await fetchPosts();
    modalRef.value?.close();
    toast.success("Cập nhật bài viết thành công!");
  } catch (error: any) {
    toast.error(error?.message || "Có lỗi xảy ra khi cập nhật bài viết");
  }
};

// --- Logic Delete ---
const handleDeletePost = async (postId: string) => {
  const result = await Swal.fire({
    title: "Bạn có chắc không?",
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
      // Gọi API xóa bài viết theo ID
      await postService.delete(postId);

      toast.success("Xóa bài viết thành công!");

      // Tải lại danh sách bài viết sau khi xóa
      await fetchPosts();
    } catch (error: any) {
      toast.error(error?.message || "Có lỗi xảy ra khi xóa bài viết");
    }
  }
};
</script>
