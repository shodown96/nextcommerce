"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mapErrorToMessage } from "@/lib/auth";
import { PLACEHOLDERS } from "@/lib/constants/auth";
import { MESSAGES } from "@/lib/constants/messages";
import { PATHS } from "@/lib/constants/paths";
import { useAuthStore } from "@/lib/stores/auth";
import { isClerkError } from "@/lib/utils";
import {
  ResetPasswordParamsSchema,
  ResetPasswordParamsType,
} from "@/lib/validations/auth";
import { useSignIn } from "@clerk/nextjs";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const store = useAuthStore();
  const { isLoaded, signIn } = useSignIn();

  // Verify the password reset code to the user's email
  const resetPassword = async (values: ResetPasswordParamsType) => {
    if (!isLoaded || !signIn) {
      return null;
    }
    try {
      const result = await signIn.resetPassword({
        password: values.newPassword,
      });
      if (result.status === "needs_second_factor") {
        // Handle 2FA
      } else if (result.status === "complete") {
        toast.success(MESSAGES.ResetPasswordSuccessfully);
        formik.resetForm();
        store.setResetPasswordParams({ email: "", code: "" });
        router.push(PATHS.SIGN_IN);
      }
    } catch (error) {
      if (isClerkError(error)) {
        const message = mapErrorToMessage(error.errors?.[0]?.code);
        toast.error(message);
      }
    }
  };

  const formik = useFormik<ResetPasswordParamsType>({
    initialValues: {
      confirmPassword: "",
      newPassword: "",
    },
    onSubmit: resetPassword,
    validateOnBlur: true,
    validationSchema: ResetPasswordParamsSchema,
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
      <div className="mb-4">
        <Link
          href={PATHS.FORGOT_PASSWORD_VERIFY}
          className="underline"
        >
          Back
        </Link>
      </div>
      <div className="mb-4 text-2xl font-semibold">Enter your new password</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="password"
          id="newPassword"
          label="New password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.newPassword}
          error={errors.newPassword}
          touched={touched.newPassword}
          placeholder={PLACEHOLDERS.NEW_PASSWORD}
        />
        <Input
          type="password"
          id="confirmPassword"
          label="Confirm Password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.confirmPassword}
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
          placeholder={PLACEHOLDERS.NEW_PASSWORD}
        />
        <Button type="submit" size={"lg"} loading={isSubmitting}>
          Reset Password
        </Button>
      </form>
    </div>
  );
}
