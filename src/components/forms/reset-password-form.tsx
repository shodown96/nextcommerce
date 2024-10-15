"use client";
import { formatSeconds, mapErrorToMessage } from "@/lib/auth";
import {
  FORGOT_PASSWORD_BTN_TEXTS,
  FORGOT_PASSWORD_TEXTS,
  FORM_STEPS,
  OTP_COUNTDOWN_TIME,
  PLACEHOLDERS,
} from "@/lib/constants/auth";
import { ERROR_MESSAGES, MESSAGES } from "@/lib/constants/messages";
import { PATHS } from "@/lib/constants/paths";
import useToast from "@/lib/hooks/toast";
import { cn, isClerkError } from "@/lib/utils";
import {
  CodeParamsSchema,
  CodeParamsType,
  EmailParamsSchema,
  EmailParamsType,
  ResetPasswordParamsSchema,
  ResetPasswordParamsType,
} from "@/lib/validations/auth";
import { useSignIn } from "@clerk/nextjs";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthTitle from "../custom/auth-title";
import { PasswordInput } from "../custom/input-password";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";


export default function ResetPasswordForm() {
  const { toast } = useToast();
  const { isLoaded, signIn } = useSignIn();
  const [step, setStep] = useState(FORM_STEPS.EMAIL_STEP);
  const router = useRouter();
  const [countdown, setCountdown] = useState(OTP_COUNTDOWN_TIME);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [hasReset, setHasReset] = useState(false);

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
        setStep(FORM_STEPS.OTP_STEP);
        setCountdown(OTP_COUNTDOWN_TIME);
        setIsResendEnabled(false);
        toast.success(MESSAGES.PasswordResetCodeSent);
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
        setStep(FORM_STEPS.NEW_PASSWORD_STEP);
      }
    } catch (error) {
      if (isClerkError(error)) {
        const message = mapErrorToMessage(error.errors?.[0]?.code);
        toast.error(message);
      }
    }
  };

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
        setHasReset(true);
        // Delay this
        setTimeout(() => {
          router.push(PATHS.SIGN_IN);
        }, 2000);
      }
    } catch (error) {
      if (isClerkError(error)) {
        const message = mapErrorToMessage(error.errors?.[0]?.code);
        toast.error(message);
      }
    }
  };

  const emailformik = useFormik<EmailParamsType>({
    initialValues: { email: "" },
    onSubmit: sendResetCode,
    validateOnBlur: true,
    validationSchema: EmailParamsSchema,
  });

  const codeformik = useFormik<CodeParamsType>({
    initialValues: { code: "" },
    onSubmit: verifyCode,
    validateOnBlur: true,
    validationSchema: CodeParamsSchema,
  });

  const formik = useFormik<ResetPasswordParamsType>({
    initialValues: {
      confirmPassword: "",
      newPassword: "",
    },
    onSubmit: resetPassword,
    validateOnBlur: true,
    validationSchema: ResetPasswordParamsSchema,
  });

  const handleResendOTP = () => {
    if (isResendEnabled) {
      sendResetCode({ email: emailformik.values.email });
    }
  };

  useEffect(() => {
    if (step === FORM_STEPS.OTP_STEP) {
      if (countdown > 0) {
        const timer = setInterval(() => {
          setCountdown(countdown - 1);
        }, 1000);
        return () => clearInterval(timer);
      } else {
        setIsResendEnabled(true);
      }
    }
  }, [step, countdown]);

  const { handleBlur, handleChange, handleSubmit, values } = formik;

  return (
    <form
      onSubmit={
        step === FORM_STEPS.EMAIL_STEP
          ? emailformik.handleSubmit
          : step === FORM_STEPS.OTP_STEP
            ? codeformik.handleSubmit
            : handleSubmit
      }
    >
      <div className={step !== FORM_STEPS.EMAIL_STEP ? "mt-[-60px]" : ""}></div>
      <AuthTitle
        description={FORGOT_PASSWORD_TEXTS[step]}
        title={
          step === FORM_STEPS.OTP_STEP
            ? "Enter Verification Code"
            : "Forgot Password"
        }
      />
      {step === FORM_STEPS.EMAIL_STEP ? (
        <Input
          containerClass="mb-5"
          id="email"
          label="Email"
          onBlur={emailformik.handleBlur}
          onChange={emailformik.handleChange}
          placeholder={PLACEHOLDERS.EMAIL}
          type="email"
          value={emailformik.values.email}
        />
      ) : null}
      {step === FORM_STEPS.OTP_STEP ? (
        <InputOTP
          containerClassName={"justify-between mt-[-10px] mb-8"}
          id="code"
          maxLength={6}
          onBlur={codeformik.handleBlur("code")}
          onChange={codeformik.handleChange("code")}
          value={codeformik.values.code}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <InputOTPGroup key={index}>
              <InputOTPSlot index={index} />
            </InputOTPGroup>
          ))}
        </InputOTP>
      ) : null}
      {step == FORM_STEPS.NEW_PASSWORD_STEP ? (
        <>
          <div className="mb-5 flex flex-col gap-5">
            <PasswordInput
              id="newPassword"
              label="New password"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={PLACEHOLDERS.NEW_PASSWORD}
              value={values.newPassword}
            />
            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder={PLACEHOLDERS.NEW_PASSWORD}
              value={values.confirmPassword}
            />
          </div>
        </>
      ) : null}
      <Button disabled={hasReset} type="submit">
        {FORGOT_PASSWORD_BTN_TEXTS[step]}
      </Button>
      {step === FORM_STEPS.OTP_STEP ? (
        <div className="mt-10 flex items-center justify-between">
          <span
            className={cn(
              " font-medium underline underline-offset-4",
              isResendEnabled
                ? "text-primary cursor-pointer"
                : "text-disabled",
            )}
            onClick={handleResendOTP}
          >
            Send Again
          </span>
          {countdown > 1 ? (
            <span className="text-prelink">{formatSeconds(countdown)}</span>
          ) : null}
        </div>
      ) : null}
      <div className="mt-8">
        Already have an account?{" "}
        <Link
          className="text-primary underline underline-offset-4"
          href={PATHS.SIGN_IN}
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}
