import axiosClient from "@/api/axiosClient";
import type { IUser } from "@/types/User";

const userService = {
  getAllUsers: async () => {
    // Giả sử API trả về trực tiếp mảng user qua axiosClient
    const response = await axiosClient.get("/users"); // Nếu đã cấu hình baseURL trong axiosClient thì không cần http://localhost:2007
    return response.data;
  },

  create: async (data: any) => {
    const response = await axiosClient.post("/users", data);
    return response.data;
  },

  update: async (id: number | string, data: any) => {
    const response = await axiosClient.put(`/users/${id}`, data);
    return response.data;
  },

  delete: async (id: number | string) => {
    const response = await axiosClient.delete(`/users/${id}`);
    return response.data;
  },
};

export default userService;
