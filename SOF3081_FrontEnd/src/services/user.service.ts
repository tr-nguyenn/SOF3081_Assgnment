import axiosClient from "@/api/axiosClient";

const userService = {
  login: async (email: string) => {
    const url = "/users";
    const response = await axiosClient.get(url, {
      params: { email },
    });
    return response.data;
  },

  // Thêm mới user vào JSON Server
  register: async (userData: any) => {
    const url = "/users";
    const response = await axiosClient.post(url, userData);
    return response.data;
  },
};

export default userService;
