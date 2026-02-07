import axiosClient from "@/api/axiosClient";
import type { IPost } from "@/types/Post";

class PostService {
  getAll() {
    return axiosClient.get<IPost[]>("/posts");
  }

  create(data: Omit<IPost, "id">) {
    return axiosClient.post<IPost>("/posts", data);
  }
}

export default new PostService();
