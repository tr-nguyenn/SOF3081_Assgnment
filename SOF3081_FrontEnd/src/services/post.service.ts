import axiosClient from "@/api/axiosClient";
import type { IPost } from "@/types/Post";

const postService = {
  // Lấy tất cả bài viết có phân trang
  getAllPostPagination: async (page: number = 1, limit: number = 5) => {
    const url = "/posts";
    const response = await axiosClient.get(url, {
      params: {
        _page: page,
        _limit: limit,
        _expand: "user",
      },
    });

    return {
      data: response.data,
      total: parseInt(response.headers["x-total-count"] || "0", 10),
    };
  },

  //Lấy ra chi tiết bài viết theo id bài viết
  getPostById: async (id: number) => {
    const response = await axiosClient.get<IPost>(`/posts/${id}`, {
      params: {
        _expand: "user",
      },
    });
    return response.data;
  },

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
