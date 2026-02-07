<script setup>
import { useRoute } from "vue-router";
import Navbar from "@/components/layout/Navbar.vue";
import Footer from "@/components/layout/Footer.vue";

const route = useRoute();
</script>

<template>
  <!-- DEFAULT LAYOUT -->
  <template v-if="route.meta.layout !== 'auth'">
    <Navbar />
    <div class="main-content py-3" style="margin-top: 70px">
      <div class="container">
        <RouterView />
      </div>
    </div>
    <Footer />
  </template>

  <!-- AUTH LAYOUT -->
  <template v-else>
    <RouterView />
  </template>
</template>
