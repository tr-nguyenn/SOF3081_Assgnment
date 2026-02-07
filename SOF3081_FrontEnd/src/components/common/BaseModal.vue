<template>
  <div class="modal fade" ref="modalEl" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Modal } from "bootstrap";
import { onMounted, onUnmounted, ref } from "vue";

const modalEl = ref<HTMLElement | null>(null);
let instance: any | null = null;

onMounted(() => {
  if (modalEl.value) {
    instance = new Modal(modalEl.value, {
      backdrop: "static",
      keyboard: false,
    });
  }
});

onUnmounted(() => {
  instance?.dispose();
});

const open = () => instance?.show();
const close = () => instance?.hide();

defineExpose({ open, close });
</script>
