<template>
  <BaseModal ref="baseModalRef">
    <div class="modal-header">
      <h5 class="modal-title">
        {{ mode === "create" ? "Thêm mới bài viết" : "Cập nhật bài viết" }}
      </h5>
      <button type="button" class="btn-close" @click="close"></button>
    </div>
    <div class="modal-body">
      <p>Form nhập liệu ở đây...</p>
      <p>
        Mode hiện tại:
        <strong>{{ mode }}</strong>
      </p>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" @click="close">Hủy</button>
      <button type="button" class="btn btn-primary">Lưu</button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseModal from "@/components/common/BaseModal.vue";

defineProps<{
  mode: "create" | "update";
}>();

const baseModalRef = ref<InstanceType<typeof BaseModal> | null>(null);

const open = () => baseModalRef.value?.open();
const close = () => baseModalRef.value?.close();

defineExpose({ open, close });
</script>
