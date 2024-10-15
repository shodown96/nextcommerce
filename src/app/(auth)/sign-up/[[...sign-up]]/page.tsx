"use client";
import { useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import Link from "next/link";
import Google from "@/assets/icons/google.svg";
import { Button } from "@/components/ui/button";
import AuthDivider from "@/components/custom/divider";
import AuthTitle from "@/components/custom/auth-title";
import SignupForm from "@/components/forms/signup-form";
import { PATHS } from "@/lib/constants/paths";

export default function SignUpPage() {
  const { isLoaded, signUp } = useSignUp();

  const signUpWith = (strategy: OAuthStrategy) => {
    if (!isLoaded || !signUp) return null;
    return signUp.authenticateWithRedirect({
      redirectUrl: PATHS.SSO_CALLBACK,
      redirectUrlComplete: PATHS.LANDING,
      strategy,
    });
  };

  if (!signUp) return null;
  return (
    <div className="mt-[100px] w-full">
      <AuthTitle
        description="Sign up to NextCommerce"
        title="Sign up"
      />
      <SignupForm />
      <AuthDivider />
      <div className="flex justify-center">
        <Button
          className="py-6 border font-medium hover:bg-transparent w-full rounded-full text-[16px]"
          onClick={() => signUpWith("oauth_google")}
          size={'auth'}
          variant={"outline"}
        >
          <span>Sign up with Google</span>
          <Google className="ml-2" />
        </Button>
      </div>
      <div className="mt-5 text-lg">
        <span className="text-prelink font-light">
          Already have an account?{" "}
        </span>
        <Link
          className="text-link font-medium underline underline-offset-4"
          href={PATHS.SIGN_IN}
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
