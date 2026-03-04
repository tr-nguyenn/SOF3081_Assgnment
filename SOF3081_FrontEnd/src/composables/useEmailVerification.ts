import { ref } from "vue";
import { useToast } from "vue-toastification";
import emailjs from "@emailjs/browser";

export function useEmailVerification() {
  const toast = useToast();
  const isSendingEmail = ref(false);
  const generatedCode = ref("");

  const EMAILJS_SERVICE_ID = "service_0m3cnph";
  const EMAILJS_TEMPLATE_ID = "template_xeluw1q";
  const EMAILJS_PUBLIC_KEY = "pAaqtVZreM_lL4t6Z";

  const sendVerificationEmail = async (name: string, email: string): Promise<boolean> => {
    try {
      isSendingEmail.value = true;
      generatedCode.value = Math.floor(100000 + Math.random() * 900000).toString();
      const templateParams = {
        to_name: name || "Người dùng",
        to_email: email,
        verify_code: generatedCode.value,
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });
      toast.success("Mã xác thực đã được gửi đến email của bạn!");
      return true;
    } catch (error) {
      console.error("Lỗi gửi email:", error);
      toast.error("Không thể gửi email xác nhận. Vui lòng thử lại!");
      return false;
    } finally {
      isSendingEmail.value = false;
    }
  };

  const verifyCode = (inputCode: string): boolean => {
    if (inputCode !== generatedCode.value) {
      toast.error("Mã xác nhận không chính xác!");
      return false;
    }
    return true;
  };
  return {
    isSendingEmail,
    sendVerificationEmail,
    verifyCode,
  };
}
