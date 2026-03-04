import { ref } from "vue";

export function useImageUpload() {
  const imageBase64 = ref<string>("");
  const imageFile = ref<File | null>(null);
  const uploadError = ref<string>("");

  const handleImageUpload = (event: Event) => {
    uploadError.value = "";
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      uploadError.value = "Chỉ chấp nhận file ảnh định dạng JPG, PNG, WEBP.";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      uploadError.value = "Kích thước ảnh không được vượt quá 2MB.";
      return;
    }

    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imageBase64.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const resetImage = () => {
    imageBase64.value = "";
    imageFile.value = null;
    uploadError.value = "";
  };

  const setImage = (existingImageUrl: string) => {
    imageBase64.value = existingImageUrl;
  };

  return {
    imageBase64,
    imageFile,
    uploadError,
    handleImageUpload,
    resetImage,
    setImage,
  };
}
