import { PATHS } from "@/lib/constants/paths";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  return <AuthenticateWithRedirectCallback
    signInFallbackRedirectUrl={PATHS.LANDING}
    signUpFallbackRedirectUrl={PATHS.ONBOARDING} />;
}
