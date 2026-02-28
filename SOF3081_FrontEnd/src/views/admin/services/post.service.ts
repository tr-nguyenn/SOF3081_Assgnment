import axiosClient from "@/api/axiosClient";

const postServiceAdmin = {
  getAllUser: async () => {
    const response = await axiosClient.get("http://localhost:2007/posts");
    return response.data;
  },
};

export default postServiceAdmin;
