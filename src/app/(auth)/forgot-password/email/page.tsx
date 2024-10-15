"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mapErrorToMessage } from "@/lib/auth";
import { PLACEHOLDERS } from "@/lib/constants/auth";
import { ERROR_MESSAGES, MESSAGES } from "@/lib/constants/messages";
import { PATHS } from "@/lib/constants/paths";
import useToast from "@/lib/hooks/toast";
import { useAuthStore } from "@/lib/stores/auth";
import { isClerkError } from "@/lib/utils";
import {
  EmailParamsSchema,
  EmailParamsType
} from "@/lib/validations/auth";
import { useSignIn } from "@clerk/nextjs";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

export default function EmailPage() {
  const router = useRouter();
  const store = useAuthStore();
  const { toast } = useToast()
  const { isLoaded, signIn } = useSignIn();
  // Send the password reset code to the user's email
  const sendResetCode = async (values: EmailParamsType) => {
    if (!isLoaded || !signIn) {
      return null;
    }
    try {
      const result = await signIn.create({
        identifier: values.email,
        strategy: "reset_password_email_code",
      });
      if (result.status === "needs_first_factor") {
        router.push(PATHS.FORGOT_PASSWORD_VERIFY)
        toast.success(MESSAGES.PasswordResetCodeSent);
      }
    } catch (error: any) {
      if (isClerkError(error)) {
        let message;
        message = mapErrorToMessage(error.errors?.[0]?.code);
        if (
          error.errors?.[0]?.message.includes(
            "reset_password_email_code is not allowed",
          )
        ) {
          message = ERROR_MESSAGES.PasswordNotSet;
        } 
        toast.error(message);
      }
    }
  };

  const formik = useFormik<EmailParamsType>({
    initialValues: { email: store.resetPasswordParams.email || "" },
    onSubmit: sendResetCode,
    validateOnBlur: true,
    validationSchema: EmailParamsSchema,
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    values,
    isSubmitting,
  } = formik;

  return (
    <div>
      <div className="mb-4 text-2xl font-semibold">
        Please put in your email so that we can send an otp for verification.
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="email"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          type="email"
          value={values.email}
          error={errors.email}
          touched={touched.email}
          placeholder={PLACEHOLDERS.EMAIL}
        />
        <Button type="submit" size={"lg"} loading={isSubmitting}>
          Send OTP
        </Button>
      </form>
    </div>
  );
}
