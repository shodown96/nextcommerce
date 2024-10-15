"use client";
import { changePassword } from "@/actions/auth/change-password";
import { verifyPassword } from "@/actions/auth/verify-password";
import CloseIcon from "@/assets/icons/close.svg";
import { mapErrorToMessage } from "@/lib/auth";
import {
  CHANGE_PASSWORD_BTN_TEXTS,
  CHANGE_PASSWORD_TEXTS,
  FORM_STEPS,
  PLACEHOLDERS,
} from "@/lib/constants/auth";
import { ERROR_MESSAGES, MESSAGES } from "@/lib/constants/messages";
import { PATHS } from "@/lib/constants/paths";
import useToast from "@/lib/hooks/toast";
import {
  ChangePasswordParamsSchema,
  ChangePasswordParamsType,
  EmailParamsSchema,
  EmailParamsType,
  PasswordParamsSchema,
  PasswordParamsType,
} from "@/lib/validations/auth";
import { useSignIn } from "@clerk/nextjs";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { isClerkError } from "@/lib/utils";
import AuthTitle from "../custom/auth-title";
import { PasswordInput } from "../custom/input-password";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
export default function ChangePasswordForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoaded, signIn } = useSignIn();
  const [step, setStep] = useState(FORM_STEPS.CURRENT_PASSWORD);
  const [hasReset, setHasReset] = useState(false);

  const handleClerkSubmit = async (values: ChangePasswordParamsType) => {
    try {
      const result = await changePassword({
        currentPassword: passwordformik.values.currentPassword,
        newPassword: values.newPassword,
      });
      if (step === FORM_STEPS.NEW_PASSWORD_STEP) {
        if (result?.userId) {
          toast.success(MESSAGES.PasswordChangedSuccessfully);
          setHasReset(true);
          formik.resetForm();
          setTimeout(() => {
            router.push(PATHS.LANDING);
          }, 2000);
        } else if (result?.error) {
          const message = mapErrorToMessage(result.error);
          toast.error(message);
        }
      } else {
        router.push(PATHS.LANDING);
      }
    } catch (err: unknown) {
      if (isClerkError(err)) {
        const message = mapErrorToMessage(err.errors?.[0]?.code);
        toast.error(message);
      }
    }
  };

  const handlePasswordVerification = async (values: PasswordParamsType) => {
    try {
      const result = await verifyPassword({ password: values.currentPassword });
      if (result?.verified) {
        setStep(FORM_STEPS.NEW_PASSWORD_STEP);
      } else if (result?.error) {
        const message = mapErrorToMessage(result.error);
        toast.error(message);
      }
    } catch (err: unknown) {
       if (isClerkError(err)) {
        const message = mapErrorToMessage(err.errors?.[0]?.code);
        toast.error(message);
      }
    }
  };

  const sendConfirmationEmail = async () => {
    if (!isLoaded || !signIn) {
      return null;
    }
    try {
      // Resend Confirmation Email
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

  const emailformik = useFormik<EmailParamsType>({
    initialValues: { email: "" },
    onSubmit: sendConfirmationEmail,
    validateOnBlur: true,
    validationSchema: EmailParamsSchema,
  });

  const formik = useFormik<ChangePasswordParamsType>({
    initialValues: {
      confirmPassword: "",
      newPassword: "",
    },
    onSubmit: handleClerkSubmit,
    validateOnBlur: true,
    validationSchema: ChangePasswordParamsSchema,
  });

  const { handleBlur, handleChange, handleSubmit, values } = formik;

  const passwordformik = useFormik<PasswordParamsType>({
    initialValues: { currentPassword: "" },
    onSubmit: handlePasswordVerification,
    validateOnBlur: true,
    validationSchema: PasswordParamsSchema,
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={
        step === FORM_STEPS.CURRENT_PASSWORD
          ? passwordformik.handleSubmit
          : step === FORM_STEPS.PASSWORD_CHANGED
            ? emailformik.handleSubmit
            : handleSubmit
      }
    >
      <div
        className={step === FORM_STEPS.PASSWORD_CHANGED ? "mt-[-55px]" : ""}
      ></div>
      <AuthTitle
        description={CHANGE_PASSWORD_TEXTS[step]}
        descriptionMargin="mb-4"
        title={
          step === FORM_STEPS.PASSWORD_CHANGED
            ? "Your password was successfully changed!"
            : "Change password"
        }
      />
      {/* Current Password */}
      {step === FORM_STEPS.CURRENT_PASSWORD ? (
        <PasswordInput
          id="currentPassword"
          label="Current Password"
          onBlur={passwordformik.handleBlur}
          onChange={passwordformik.handleChange}
          placeholder={PLACEHOLDERS.PASSWORD}
          value={passwordformik.values.currentPassword}
        />
      ) : null}
      {/* New Password */}
      {step === FORM_STEPS.NEW_PASSWORD_STEP ? (
        <>
          <PasswordInput
            id="newPassword"
            label="New Password"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={PLACEHOLDERS.NEW_PASSWORD}
            value={values.newPassword}
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirm New Password"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={PLACEHOLDERS.NEW_PASSWORD}
            value={values.confirmPassword}
          />
        </>
      ) : null}
      {/* Confirmation */}
      {step === FORM_STEPS.PASSWORD_CHANGED ? (
        <>
          <Link
            className="absolute right-8 top-8"
            href={PATHS.LANDING}
          >
            <CloseIcon />
          </Link>
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
        </>
      ) : null}
      <Button disabled={hasReset} type="submit">
        {CHANGE_PASSWORD_BTN_TEXTS[step]}
      </Button>
      {step !== FORM_STEPS.PASSWORD_CHANGED ? (
        <div className="mt-2 text-center">
          <Link
            className="text-primary font-light underline underline-offset-8"
            href={PATHS.LANDING}
          >
            Cancel
          </Link>
        </div>
      ) : null}
    </form>
  );
}
