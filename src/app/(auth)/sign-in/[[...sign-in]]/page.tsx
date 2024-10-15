"use client";
import Google from "@/assets/icons/google.svg";
import AuthTitle from "@/components/custom/auth-title";
import AuthDivider from "@/components/custom/divider";
import SignInForm from "@/components/forms/signin-form";
import { Button } from "@/components/ui/button";
import { mapErrorToMessage } from "@/lib/auth";
import { PATHS } from "@/lib/constants/paths";
import useToast from "@/lib/hooks/toast";
import { isClerkError } from "@/lib/utils";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import Link from "next/link";

export default function SignInPage() {
  const { setActive, signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { toast } = useToast();

  const signInWith = (strategy: OAuthStrategy) => {
    if (!signIn) return null;
    return signIn.authenticateWithRedirect({
      redirectUrl: PATHS.SSO_CALLBACK,
      redirectUrlComplete: PATHS.LANDING,
      strategy,
    });
  };

  const handleSSO = async (strategy: OAuthStrategy) => {
    if (!signIn || !signUp) return null;
    try {
      // If the user has an account in your application, but does not yet
      // have an OAuth account connected to it, you can transfer the OAuth
      // account to the existing user account.
      const userExistsButNeedsToSignIn =
        signUp.verifications.externalAccount.status === "transferable" &&
        signUp.verifications.externalAccount.error?.code ===
        "external_account_exists";

      if (userExistsButNeedsToSignIn) {
        const res = await signIn.create({ transfer: true });

        if (res.status === "complete") {
          setActive({
            session: res.createdSessionId,
          });
        }
      }

      // If the user has an OAuth account but does not yet
      // have an account in your app, you can create an account
      // for them using the OAuth information.
      const userNeedsToBeCreated =
        signIn.firstFactorVerification.status === "transferable";

      if (userNeedsToBeCreated) {
        const res = await signUp.create({
          transfer: true,
        });

        if (res.status === "complete") {
          setActive({
            session: res.createdSessionId,
          });
        }
      } else {
        // If the user has an account in your application
        // and has an OAuth account connected to it, you can sign them in.
        signInWith(strategy);
      }
    } catch (err: any) {
      if (isClerkError(err)) {
        const message = mapErrorToMessage(err.errors?.[0]?.code);
        toast.error(message);
      }
    }
  };


  return (
    <div className="mt-[148px] w-full">
      <AuthTitle
        description="Sign in to NextCommerce"
        title="Sign in"
      />
      <SignInForm />
      <AuthDivider />
      <Button
        className="py-6 border font-medium hover:bg-transparent w-full rounded-full text-[16px]"
        onClick={() => handleSSO("oauth_google")}
        size={'auth'}
        variant={"outline"}
      >
        <span>Sign in with Google</span>
        <Google className="ml-2" />
      </Button>
      <div className="mt-5 text-lg">
        <span className="text-prelink font-light">Need an account? </span>
        <Link
          className="text-link font-medium underline underline-offset-4"
          href={PATHS.SIGN_UP}
        >
          Create one
        </Link>
      </div>
    </div>
  );
}
