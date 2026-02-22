<template>
  <div class="d-flex" style="min-height: 100vh; background-color: #f4f6f9">
    <AdminSidebar />

    <div class="flex-grow-1 d-flex flex-column overflow-hidden">
      <AdminHeader />

      <main class="flex-grow-1 overflow-auto px-4 pb-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AdminSidebar from "@/components/admin/AdminSidebar.vue";
import AdminHeader from "@/components/admin/AdminHeader.vue";
</script>
