"use client";
import { PATHS } from "@/lib/constants/paths";
import { useAuthStore } from "@/lib/stores/auth";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function Layout({ children }: PropsWithChildren) {
  const resetPasswordParams = useAuthStore((s) => s.resetPasswordParams);
  const router = useRouter();

  useEffect(() => {
    if (resetPasswordParams.email && resetPasswordParams.code) {
      router.push(PATHS.FORGOT_PASSWORD_RESET);
    } else {
      router.push(PATHS.FORGOT_PASSWORD_EMAIL);
    }
  }, []);

  return children;
}
