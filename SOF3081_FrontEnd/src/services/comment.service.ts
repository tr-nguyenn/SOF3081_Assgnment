import axiosClient from "@/api/axiosClient";

const commentService = {
  // Lấy danh sách bình luận theo ID bài viết
  getCommentsByPostId: async (postId: string) => {
    const response = await axiosClient.get("/comments", {
      params: { postId },
    });
    return response.data;
  },

  // Gửi bình luận mới
  createComment: async (data: any) => {
    const response = await axiosClient.post("/comments", data);
    return response.data;
  },
};

export default commentService;
