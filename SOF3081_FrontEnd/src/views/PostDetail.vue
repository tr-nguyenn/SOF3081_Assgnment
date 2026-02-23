<template>
  <div class="container py-5">
    <div class="row g-5">
      <div class="col-lg-8">
        <nav aria-label="breadcrumb" class="mb-4">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <RouterLink to="/" class="text-decoration-none text-muted">Trang chủ</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Bài viết</li>
          </ol>
        </nav>

        <article>
          <h1 class="display-5 fw-bold mb-3 article-title">{{ post?.title }}</h1>

          <div class="d-flex align-items-center mb-4 text-muted small border-bottom pb-3">
            <div class="d-flex align-items-center me-4">
              <img src="https://ui-avatars.com/api/?name=Admin&background=0d3b44&color=fff" class="rounded-circle me-2" width="32" alt="avatar" />
              <span>
                Tác giả:
                <strong>{{ post?.user?.name }}</strong>
              </span>
            </div>
            <div class="me-4">
              <i class="bi bi-calendar3 me-1"></i>
              {{ post?.creationDate }}
            </div>
            <div>
              <i class="bi bi-chat-dots me-1"></i>
              {{ comments.length }} bình luận
            </div>
          </div>

          <div class="mb-4">
            <img src="https://picsum.photos/id/180/900/500" class="img-fluid rounded-4 shadow-sm" alt="post thumbnail" />
          </div>

          <div class="post-content fs-5">
            <blockquote class="blockquote border-start border-4 border-warning ps-4 my-4 bg-light py-3">
              <p class="mb-0">{{ post?.content }}</p>
            </blockquote>
          </div>
        </article>

        <div class="comments-section mt-5 mb-5">
          <h4 class="fw-bold mb-4">Bình luận ({{ comments.length }})</h4>

          <div class="d-flex gap-3 mb-5">
            <img src="https://ui-avatars.com/api/?name=You&background=random" class="rounded-circle shadow-sm" width="48" height="48" alt="avatar" />
            <div class="flex-grow-1">
              <textarea v-model="commentText" class="form-control mb-2 rounded-3 bg-light border-0" rows="3" placeholder="Viết bình luận của bạn..."></textarea>
              <div class="d-flex justify-content-end">
                <button @click="submitComment" class="btn btn-primary rounded-pill px-4 fw-medium" :disabled="!commentText.trim()">Gửi bình luận</button>
              </div>
            </div>
          </div>

          <div class="comment-list" v-for="item in comments" :key="comments.id">
            <div class="d-flex gap-3 mb-4">
              <img src="https://ui-avatars.com/api/?name=Nguyen+Van+A" class="rounded-circle shadow-sm" width="48" height="48" alt="avatar" />
              <div class="flex-grow-1 bg-light p-3 rounded-4">
                <div class="d-flex justify-content-between align-items-center mb-1">
                  <h6 class="fw-bold mb-0 text-primary-dark">{{ item.userName }}</h6>
                  <small class="text-muted">
                    <i class="bi bi-clock me-1"></i>
                    2 giờ trước
                  </small>
                </div>
                <p class="mb-0 text-dark">{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center border-top mt-5 pt-4">
          <RouterLink to="/" class="btn btn-link text-decoration-none p-0 text-primary-dark fw-bold">
            <i class="bi bi-arrow-left me-2"></i>
            Quay lại trang chủ
          </RouterLink>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="sticky-top" style="top: 2rem">
          <div class="card border-0 bg-light rounded-4 mb-4">
            <div class="card-body p-4">
              <h5 class="fw-bold mb-3">Tìm kiếm bài viết</h5>
              <div class="input-group">
                <input type="text" class="form-control border-0 shadow-none" placeholder="Nhập từ khóa..." />
                <button class="btn btn-warning"><i class="bi bi-search"></i></button>
              </div>
            </div>
          </div>

          <div class="card border-0 mb-4">
            <div class="card-body p-0">
              <h5 class="fw-bold mb-3">Bài viết mới nhất</h5>
              <div class="d-flex gap-3 mb-3 align-items-center">
                <img src="https://picsum.photos/id/1/80/80" class="rounded-3" alt="thumb" />
                <a href="#" class="text-decoration-none text-dark small fw-bold">Cách sử dụng Bootstrap 5 hiệu quả trong 2024</a>
              </div>
              <div class="d-flex gap-3 mb-3 align-items-center">
                <img src="https://picsum.photos/id/2/80/80" class="rounded-3" alt="thumb" />
                <a href="#" class="text-decoration-none text-dark small fw-bold">Lộ trình học Frontend cho người mới bắt đầu</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import type { IPost } from "@/types/Post";
import postService from "@/services/post.service";
import commentService from "@/services/comment.service";
import { JsxEmit } from "typescript";

const route = useRoute();
const toast = useToast();
const post = ref<IPost>();

const commentText = ref("");
const comments = ref([]);
const currentUser = ref(null);
const id = route.params.id as string;

//Lấy chi tiết bài viết
const fetchPostById = async (id: string) => {
  try {
    const res = await postService.getPostById(id);
    post.value = res;
  } catch (error: any) {
    toast.error(error.message || "Có lỗi xảy ra tải dữ liệu");
  }
};

//Lấy danh sách bình luận của bài viết này
const fetchComments = async () => {
  try {
    comments.value = await commentService.getCommentsByPostId(id);
  } catch (error) {
    toast.error("Lỗi khi tải bình luận: " + error);
  }
};

//Gửi bình luận
const submitComment = async () => {
  if (!commentText.value.trim()) {
    toast.error("Bình luận không được bỏ trống");
    return;
  } else if (!currentUser.value) {
    toast.error("Vui lòng đăng nhập trước khi bình luận!");
    return;
  }

  const newComment = {
    postId: id,
    userId: currentUser.value.id,
    userName: currentUser.value.name,
    content: commentText.value,
    createAt: new Date().toLocaleString("vi-VN"),
  };
  try {
    await commentService.createComment(newComment);
    toast.success("Đã gửi bình luận");
    commentText.value = "";
    fetchComments();
  } catch (error) {
    toast.error("Lỗi khi gửi bình luận");
  }
};
onMounted(() => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    currentUser.value = JSON.parse(userStr);
  }

  fetchPostById(id);
  fetchComments();
});
</script>

<style scoped>
.text-primary-dark {
  color: #0d3b44;
}

.article-title {
  color: #0d3b44;
  line-height: 1.2;
}

.post-content {
  color: #2d3436;
  text-align: justify;
}

.post-content p {
  line-height: 1.9;
  margin-bottom: 1.5rem;
}

.post-content h4 {
  color: #0d3b44;
}

.col-lg-4 a:hover {
  color: #ffc107 !important;
}

.breadcrumb-item + .breadcrumb-item::before {
  content: "›";
  font-size: 1.2rem;
}
</style>
