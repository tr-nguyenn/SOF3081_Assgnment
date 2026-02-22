<template>
  <header class="header bg-white shadow-sm p-3 mb-4 rounded-4 d-flex justify-content-between align-items-center mx-4 mt-3">
    <div class="position-relative" style="cursor: pointer">
      <i class="bi bi-bell fs-5 text-dark"></i>
      <span class="position-absolute top-0 start-100 translate-middle p-1 bg-primary border border-light rounded-circle">
        <span class="visually-hidden">New alerts</span>
      </span>
    </div>

    <div class="d-flex align-items-center gap-3">
      <button class="btn btn-primary rounded-pill px-4 fw-medium">{{ user }}</button>
      <img src="https://i.pravatar.cc/150?img=11" alt="avatar" class="rounded-circle" width="40" height="40" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

const user = ref("");
const userStr = localStorage.getItem("user");
if (userStr) {
  const userObj = JSON.parse(userStr);
  user.value = userObj.name;
}
</script>
