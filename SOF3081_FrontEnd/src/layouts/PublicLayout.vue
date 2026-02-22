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

<script setup lang="ts">
import { useRoute } from "vue-router";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
const route = useRoute();
</script>
