<template>
  <BaseModal ref="baseModalRef">
    <div class="modal-header">
      <h5 class="modal-title">
        {{ mode === "create" ? "Thêm mới bài viết" : "Cập nhật bài viết" }}
      </h5>
      <button type="button" class="btn-close" @click="close"></button>
    </div>
    <div class="modal-body">
      <div class="mb-4">
        <label class="form-label text-black">Tiêu đề:</label>
        <input v-model="title" type="text" class="form-control" :class="{ 'is-invalid': titleError }" />
        <div class="invalid-feedback">Vui lòng nhập tiêu đề.</div>
      </div>

      <div class="mb-3">
        <label class="form-label text-black">Nội dung:</label>
        <textarea v-model="content" rows="3" type="text" class="form-control" :class="{ 'is-invalid': contentError }"></textarea>
        <div class="invalid-feedback">Vui lòng nhập nội dung</div>
      </div>
      <p>
        Mode hiện tại:
        <strong>{{ mode }}</strong>
      </p>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-danger" @click="close">Hủy</button>
      <button type="button" class="btn btn-primary" @click="handleSubmitForm">{{ mode === "create" ? "Tạo bài viết" : "Cập nhật bài viết" }}</button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseModal from "@/components/common/BaseModal.vue";

const props = defineProps<{
  mode: "create" | "update";
}>();

const baseModalRef = ref<InstanceType<typeof BaseModal> | null>(null);
const title = ref("");
const content = ref("");
const titleError = ref(false);
const contentError = ref(false);
const emitCreate = defineEmits(["create-post"]);

const handleSubmitForm = () => {
  //Check input
  titleError.value = !title.value;
  contentError.value = !content.value;
  if (titleError.value || contentError.value) return;

  //create
  if (props.mode === "create") {
    emitCreate("create-post", {
      title: title.value,
      content: content.value,
    });
  }
};

const open = () => baseModalRef.value?.open();
const close = () => baseModalRef.value?.close();

defineExpose({ open, close });
</script>
