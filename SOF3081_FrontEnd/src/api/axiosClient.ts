import axios from "axios";

//Khởi tạo cấu hình mặc định
const axiosClient = axios.create({
  baseURL: "http://localhost:2007",
  headers: {
    "Content-Type": "application/json",
  },
});

// --- PHẦN NÂNG CAO CHO AUTHENTICATION (Y2.1) ---
// Sau này khi làm đăng nhập, bạn sẽ lưu token vào localStorage.
// Đoạn code dưới đây tự động gắn token vào header mỗi khi gọi API.
//  Yêu cầu triển khai hệ thống authentication

axiosClient.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage (nếu có)
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosClient;
