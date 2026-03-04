import axiosClient from "@/api/axiosClient";

const userService = {
  login: async (email: string) => {
    const url = "/users";
    const response = await axiosClient.get(url, {
      params: { email },
    });
    return response.data;
  },

  register: async (userData: any) => {
    const url = "/users";
    const response = await axiosClient.post(url, userData);
    return response.data;
  },

  updateUser: async (userId: number, data: Partial<any>) => {
    const response = await axiosClient.patch(`/users/${userId}`, data);
    return response.data;
  },
};

export default userService;
