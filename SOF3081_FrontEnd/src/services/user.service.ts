import axiosClient from "@/api/axiosClient";

const userService = {
  login: async (email: string) => {
    const url = "/users";
    const response = await axiosClient.get(url, {
      params: { email },
    });
    return response.data;
  },
};

export default userService;
