"use client";
import { mapErrorToMessage } from "@/lib/auth";
import { PLACEHOLDERS } from "@/lib/constants/auth";
import { ERROR_MESSAGES } from "@/lib/constants/messages";
import { PATHS } from "@/lib/constants/paths";
import useToast from "@/lib/hooks/toast";
import { useAuthStore } from "@/lib/stores/auth";
import { isClerkError } from "@/lib/utils";
import { SignInParamsSchema, SignInParamsType } from "@/lib/validations/auth";
import { useSignIn } from "@clerk/nextjs";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { PasswordInput } from "../custom/input-password";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";


export default function SignInForm() {
  const router = useRouter();
  const { isLoaded, setActive, signIn } = useSignIn();
  const { toast } = useToast();
  const { setResetPasswordParams } = useAuthStore()
  // Handle the submission of the sign-in form
  const handleClerkSubmit = async (values: SignInParamsType) => {
    if (!isLoaded) {
      return;
    }

    try {
      const { email, password } = values;
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push(PATHS.LANDING);
      } else {
        toast.error(ERROR_MESSAGES.UnexpectedError);
      }
    } catch (err) {
      if (isClerkError(err)) {
        const message = mapErrorToMessage(err.errors?.[0]?.code);
        toast.error(message);
      } else {
        toast.error(ERROR_MESSAGES.UnexpectedError);
      }
      toast.error(ERROR_MESSAGES.UnexpectedError);
    }
  };


  const handleForgotPassword = () => {
    setResetPasswordParams({ email: values.email });
    router.push(PATHS.FORGOT_PASSWORD_EMAIL);
  };

  const formik = useFormik<SignInParamsType>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleClerkSubmit,
    validateOnBlur: true,
    validationSchema: SignInParamsSchema,
  });


  const { handleBlur, handleChange, handleSubmit, values } = formik;
  return (
    <form
      className="mb-7 mt-5 flex flex-col gap-5"
      onSubmit={(e) => handleSubmit(e)}
    >
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
      <p
        className="text-primary mt-[-6px] w-max px-2 text-sm font-medium underline underline-offset-4 cursor-pointer"
        // href={PATHS.FORGOT_PASSWORD}
        onClick={handleForgotPassword}
      >
        Forgot password?
      </p>
      <div className="mt-1 flex items-center gap-2">
        <Checkbox className="size-5 rounded-[5px] border-2 border-black" />{" "}
        <span>Keep me logged in</span>
      </div>
      <Button type="submit">Sign In</Button>
    </form>
  );
}
