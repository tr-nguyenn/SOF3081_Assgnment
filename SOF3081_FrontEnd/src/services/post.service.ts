import axiosClient from "@/api/axiosClient";
import type { IPost } from "@/types/Post";

const postService = {
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

  getPostById: async (id: number) => {
    const response = await axiosClient.get<IPost>(`/posts/${id}`, {
      params: {
        _expand: "user",
      },
    });
    return response.data;
  },

  getAllPostByUser: async (userId: number) => {
    const response = await axiosClient.get<IPost[]>("/posts", {
      params: { userId },
    });
    return response.data;
  },

  create: async (data: Omit<IPost, "id">) => {
    const response = await axiosClient.post<IPost>("/posts", data);
    return response.data;
  },

  update: async (id: number, data: Partial<IPost>) => {
    const response = await axiosClient.put<IPost>(`/posts/${id}`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await axiosClient.delete(`/posts/${id}`);
    return response.data;
  },
};

export default postService;
