import axiosClient from "@/api/axiosClient";
import type { IPost } from "@/types/Post";

const postService = {
  // Lấy danh sách bài viết theo userId (READ)
  getAllPostByUser: async (userId: string) => {
    const response = await axiosClient.get<IPost[]>("/posts", {
      params: { userId },
    });
    return response.data;
  },

  // Tạo bài viết mới (CREATE)
  create: async (data: Omit<IPost, "id">) => {
    const response = await axiosClient.post<IPost>("/posts", data);
    return response.data;
  },

  // Cập nhật bài viết (UPDATE)
  update: async (id: string, data: Partial<IPost>) => {
    const response = await axiosClient.put<IPost>(`/posts/${id}`, data);
    return response.data;
  },

  // Xóa bài viết (DELETE)
  delete: async (id: string) => {
    const response = await axiosClient.delete(`/posts/${id}`);
    return response.data;
  },
};

export default postService;
