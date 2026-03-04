import axiosClient from "@/api/axiosClient";

const commentService = {
  getCommentsByPostId: async (postId: number) => {
    const response = await axiosClient.get("/comments", {
      params: { postId },
    });
    return response.data;
  },

  createComment: async (data: any) => {
    const response = await axiosClient.post("/comments", data);
    return response.data;
  },
};

export default commentService;
