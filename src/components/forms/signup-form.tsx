"use client";
import { formatSeconds, mapErrorToMessage } from "@/lib/auth";
import { OTP_COUNTDOWN_TIME, OTP_LENGTH, PLACEHOLDERS } from "@/lib/constants/auth";
import { PATHS } from "@/lib/constants/paths";
import useToast from "@/lib/hooks/toast";
import { cn, isClerkError } from "@/lib/utils";
import { CodeParamsSchema, CodeParamsType, SignUpParamsSchema, SignUpParamsType } from "@/lib/validations/auth";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { PasswordInput } from "../custom/input-password";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { MESSAGES } from "@/lib/constants/messages";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
PasswordInput

export default function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { signIn } = useSignIn();
  const { isLoaded, setActive, signUp } = useSignUp();
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [countdown, setCountdown] = useState(OTP_COUNTDOWN_TIME);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  const handleClerkSubmit = async (values: SignUpParamsType) => {
    if (!isLoaded || !signIn || !signUp) return null;
    setLoading(true)
    try {
      const { email, firstName, lastName, password } = values;
      const completeSignUp = await signUp.create({
        emailAddress: email,
        firstName,
        lastName,
        password,
      });

      if (signUp.status === 'missing_requirements') {
        // Send the user an email with the verification code
        await signUp.prepareEmailAddressVerification({
          strategy: 'email_code',
        })
        setVerifying(true)
        toast.success(MESSAGES.RegistrationCodeSent)
      }

      if (signUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push(PATHS.ONBOARDING);
      }
    } catch (err: any) {
      if (isClerkError(err)) {
        console.log(err.errors?.[0])
        const message = mapErrorToMessage(err.errors?.[0]?.code);
        toast.error(message);
      }
    }
    setLoading(false)
  };

  const verifyCode = async ({ code }: CodeParamsType) => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push(PATHS.ONBOARDING);
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }

  const handleResendOTP = async () => {
    if (!signUp) return null;
    // Send the user an email with the verification code
    await signUp.prepareEmailAddressVerification({
      strategy: 'email_code',
    })
    setVerifying(true)
    setCountdown(OTP_COUNTDOWN_TIME);
    setIsResendEnabled(false);

  }

  const codeformik = useFormik<CodeParamsType>({
    initialValues: { code: "" },
    onSubmit: verifyCode,
    validateOnBlur: true,
    validationSchema: CodeParamsSchema,
  });

  const formik = useFormik<SignUpParamsType>({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    onSubmit: handleClerkSubmit,
    validateOnBlur: true,
    validationSchema: SignUpParamsSchema,
  });

  const { handleBlur, handleChange, handleSubmit, values } = formik;


  useEffect(() => {
    if (verifying) {
      if (countdown > 0) {
        const timer = setInterval(() => {
          setCountdown(countdown - 1);
        }, 1000);
        return () => clearInterval(timer);
      } else {
        setIsResendEnabled(true);
      }
    }
  }, [verifying, countdown]);

  if (verifying) {
    return (
      <div>
        <div className="mb-4">
          <div
            onClick={() => setVerifying(false)}
            className="underline" >
            Back
          </div>
        </div>
        <div className="mb-4 text-2xl font-semibold">
          Enter the verification code you received via email
        </div>
        <form onSubmit={codeformik.handleSubmit} className="flex flex-col gap-4">
          <InputOTP
            containerClassName={"justify-between mt-[-10px] mb-8"}
            id="code"
            maxLength={OTP_LENGTH}
            onBlur={codeformik.handleBlur("code")}
            onChange={codeformik.handleChange("code")}
            value={codeformik.values.code}
          >
            {Array.from({ length: OTP_LENGTH }).map((_, index) => (
              <InputOTPGroup key={index}>
                <InputOTPSlot index={index} />
              </InputOTPGroup>
            ))}
          </InputOTP>
          {codeformik.touched.code && codeformik.errors.code && (
            <label className={"text-sm text-danger"}>{codeformik.errors.code}</label>
          )}
          <Button type="submit" size={"lg"} loading={codeformik.isSubmitting}>
            Verify OTP
          </Button>
          <div className="my-10 flex items-center justify-between">
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
    )
  }
  return (
    <form
      className="mb-7 mt-5 flex flex-col gap-5"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Input
        id="firstName"
        label="Name"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={PLACEHOLDERS.NAME}
        value={values.firstName}
      />
      <Input
        id="lastName"
        label="Surname"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={PLACEHOLDERS.SURNAME}
        value={values.lastName}
      />
      <Input
        id="email"
        label="Email"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={PLACEHOLDERS.EMAIL}
        type="email"
        value={values.email}
      />
      <PasswordInput
        id="password"
        label="Password"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={PLACEHOLDERS.PASSWORD}
        value={values.password}
      />
      <Button type="submit" loading={loading}>Sign Up</Button>
    </form>
  );
}
