<template>
  <div class="py-4">
    <h3 class="fw-bold text-dark mb-4">Tổng quan (Dashboard)</h3>

    <div class="row g-4 mb-4">
      <div class="col-md-6">
        <div class="card border-0 shadow-sm rounded-4 h-100">
          <div class="card-body p-4 d-flex align-items-center">
            <div class="bg-primary-subtle text-primary rounded-circle d-flex justify-content-center align-items-center me-4" style="width: 64px; height: 64px">
              <i class="bi bi-file-earmark-text fs-2"></i>
            </div>
            <div>
              <p class="text-muted mb-1 fw-medium fs-5">Tổng bài viết</p>
              <h2 class="fw-bold mb-0">{{ totalPosts }}</h2>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card border-0 shadow-sm rounded-4 h-100">
          <div class="card-body p-4 d-flex align-items-center">
            <div class="bg-warning-subtle text-warning rounded-circle d-flex justify-content-center align-items-center me-4" style="width: 64px; height: 64px">
              <i class="bi bi-chat-dots fs-2"></i>
            </div>
            <div>
              <p class="text-muted mb-1 fw-medium fs-5">Tổng bình luận</p>
              <h2 class="fw-bold mb-0">{{ totalComments }}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm rounded-4 h-100">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="fw-bold mb-0">Hoạt động 7 ngày qua</h5>
            </div>
            <div style="height: 300px">
              <canvas ref="barChartRef"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 h-100">
          <div class="card-body p-4">
            <h5 class="fw-bold mb-4">Phân bổ nội dung</h5>
            <div class="d-flex justify-content-center" style="height: 220px">
              <canvas ref="doughnutChartRef"></canvas>
            </div>
            <div class="d-flex justify-content-center gap-3 mt-4">
              <div class="d-flex align-items-center small">
                <span class="badge bg-primary rounded-circle p-1 me-2"></span>
                Bài viết
              </div>
              <div class="d-flex align-items-center small">
                <span class="badge rounded-circle p-1 me-2" style="background-color: #e2e8f0"></span>
                Khác
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import axiosClient from "@/api/axiosClient";

// 1. CHỈ GIỮ LẠI 2 BIẾN CƠ BẢN
const totalPosts = ref(0);
const totalComments = ref(0);

const barChartRef = ref<HTMLCanvasElement | null>(null);
const doughnutChartRef = ref<HTMLCanvasElement | null>(null);

// 2. HÀM GỌI API ĐƠN GIẢN HÓA
const fetchDashboardData = async () => {
  try {
    // Lấy tổng số bài viết
    const postsRes = await axiosClient.get("/posts");
    totalPosts.value = postsRes.data.length;

    // Lấy tổng số bình luận
    const commentsRes = await axiosClient.get("/comments");
    totalComments.value = commentsRes.data.length;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu Dashboard:", error);
  }
};

onMounted(() => {
  fetchDashboardData();

  // 3. CẤU HÌNH BIỂU ĐỒ CƠ BẢN (Chỉ để 1 cột dữ liệu)
  if (barChartRef.value) {
    new Chart(barChartRef.value, {
      type: "bar",
      data: {
        labels: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
        datasets: [
          {
            label: "Số lượng bài mới", // Đổi tên label
            data: [5, 8, 12, 7, 10, 15, 9], // Dữ liệu giả
            backgroundColor: "#0d6efd",
            borderRadius: 6,
            barPercentage: 0.6,
          },
          // Đã xóa dataset thứ 2 (màu vàng)
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } }, // Ẩn chú thích cho gọn
        scales: { y: { beginAtZero: true, grid: { borderDash: [5, 5] } }, x: { grid: { display: false } } },
      },
    });
  }

  // Biểu đồ tròn giữ nguyên để trang trí
  if (doughnutChartRef.value) {
    new Chart(doughnutChartRef.value, {
      type: "doughnut",
      data: {
        labels: ["Bài viết", "Khác"],
        datasets: [{ data: [75, 25], backgroundColor: ["#0d6efd", "#e2e8f0"], borderWidth: 0, cutout: "75%" }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } },
    });
  }
});
</script>

<style scoped>
/* Giữ lại các màu nền phụ trợ nếu cần dùng sau này */
.bg-primary-subtle {
  background-color: #e0f2fe !important;
}
.bg-warning-subtle {
  background-color: #fef3c7 !important;
}
</style>
