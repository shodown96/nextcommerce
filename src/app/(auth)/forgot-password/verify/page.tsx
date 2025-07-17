"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { mapErrorToMessage } from "@/lib/auth";
import { OTP_COUNTDOWN_TIME, OTP_LENGTH } from "@/lib/constants/auth";
import { ERROR_MESSAGES, MESSAGES } from "@/lib/constants/messages";
import { PATHS } from "@/lib/constants/paths";
import useToast from "@/lib/hooks/toast";
import { useAuthStore } from "@/lib/stores/auth";
import { cn, formatSeconds, isClerkError } from "@/lib/utils";
import {
  CodeParamsSchema,
  CodeParamsType,
  EmailParamsType,
} from "@/lib/validations/auth";
import { useSignIn } from "@clerk/nextjs";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

export default function CodeVerficationPage() {
  const router = useRouter();
  const store = useAuthStore();
  const [countdown, setCountdown] = useState(OTP_COUNTDOWN_TIME);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const { toast } = useToast()
  const { isLoaded, signIn } = useSignIn();

  // TODO: Move to the auth store
  // Send the password reset code to the user's email
  const sendResetCode = async () => {
    if (!isLoaded || !signIn) {
      return null;
    }
    try {
      const result = await signIn.create({
        identifier: store.resetPasswordParams?.email || "",
        strategy: "reset_password_email_code",
      });
      if (result.status === "needs_first_factor") {
        toast.success(MESSAGES.PasswordResetCodeSent);
        setCountdown(OTP_COUNTDOWN_TIME);
        setIsResendEnabled(false);
      }
    } catch (error) {
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

  // Verify the password reset code to the user's email
  const verifyCode = async (values: CodeParamsType) => {
    if (!isLoaded || !signIn) {
      return null;
    }
    try {
      const result = await signIn.attemptFirstFactor({
        code: values.code,
        strategy: "reset_password_email_code",
      });
      if (result.status === "needs_new_password") {
        toast.success(MESSAGES.Success);
        store.setResetPasswordParams({ code: values.code });
        router.push(PATHS.FORGOT_PASSWORD_RESET);
      }
    } catch (error) {
      if (isClerkError(error)) {
        const message = mapErrorToMessage(error.errors?.[0]?.code);
        toast.error(message);
      }
    }
  };

  const formik = useFormik<CodeParamsType>({
    initialValues: { code: store.resetPasswordParams.code || "" },
    onSubmit: verifyCode,
    validateOnBlur: true,
    validationSchema: CodeParamsSchema,
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

  const handleResendOTP = () => {
    if (isResendEnabled) {
      setIsResendEnabled(false)
      setCountdown(OTP_COUNTDOWN_TIME)
      sendResetCode();
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsResendEnabled(true);
    }
  }, [countdown]);

  return (
    <div>
      <div className="mb-4">
        <Link
          href={PATHS.FORGOT_PASSWORD_EMAIL}
          className="underline"
        >
          Back
        </Link>
      </div>
      <div className="mb-4 text-2xl font-semibold">
        Enter the verification code you received via email
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputOTP
          containerClassName={"justify-between mt-[-10px] mb-8"}
          id="code"
          maxLength={OTP_LENGTH}
          onBlur={handleBlur("code")}
          onChange={handleChange("code")}
          value={values.code}
        >
          {Array.from({ length: OTP_LENGTH }).map((_, index) => (
            <InputOTPGroup key={index}>
              <InputOTPSlot index={index} />
            </InputOTPGroup>
          ))}
        </InputOTP>
        {touched.code && errors.code && (
          <label className={"text-sm text-danger"}>{errors.code}</label>
        )}
        <Button type="submit" size={"lg"} loading={isSubmitting}>
          Verify OTP
        </Button>
        <div className="mt-10 flex items-center justify-between">
          <span
            className={cn(
              "font-medium underline underline-offset-4",
              isResendEnabled ? "text-primary cursor-pointer" : "text-gray-300",
            )}
            onClick={handleResendOTP}
          >
            Send Again
          </span>
          {countdown > 1 ? (
            <span className="text-new-prelink">{formatSeconds(countdown)}</span>
          ) : null}
        </div>
      </form>
    </div>
  );
}
