"use client";
import { mapErrorToMessage } from "@/lib/auth";
import { PLACEHOLDERS } from "@/lib/constants/auth";
import { PATHS } from "@/lib/constants/paths";
import useToast from "@/lib/hooks/toast";
import { isClerkError } from "@/lib/utils";
import { SignUpParamsSchema, SignUpParamsType } from "@/lib/validations/auth";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordInput } from "../custom/input-password";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// Without verification, needs to be disabled from Clerk Dashboard.
export default function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { signIn } = useSignIn();
  const { isLoaded, setActive, signUp } = useSignUp();
  const [loading, setLoading] = useState(false)

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

      if (signUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push(PATHS.ONBOARDING);
      }
    } catch (err) {
      if (isClerkError(err)) {
        console.log(err.errors?.[0])
        const message = mapErrorToMessage(err.errors?.[0]?.code);
        toast.error(message);
      }
    }
    setLoading(false)
  };



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
