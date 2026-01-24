<script setup lang="ts">
import Footer from "./components/Footer.vue";
import Navbar from "./components/Navbar.vue";
import LoginModal from "./views/LoginModal.vue";
import RegisterModal from "./views/RegisterModal.vue";
</script>

<template>
  <Navbar />
  <RegisterModal />
  <LoginModal />
  <div class="main-content py-3" style="margin-top: 70px">
    <div class="container">
      <RouterView />
    </div>
  </div>

  <Footer />
</template>
