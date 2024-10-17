"use client";

import { usePathname } from "next/navigation";
// import Logo from "@/assets/icons/logo.svg";
import { PATHS } from "@/lib/constants/paths";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname.includes(PATHS.SSO_CALLBACK)) {
    return <div>{children}</div>;
  }

  return (
    <div className="grid h-full grid-cols-10 gap-4">
      <div className="col-span-4 min-h-[90vh] max-lg:col-span-full">
        <div className="flex justify-start p-8">
          {/* <Logo /> */}
          NextCommerce
        </div>
        <div className="px-10 pb-20 lg:px-20">{children}</div>
      </div>
      <div className="col-span-6 min-h-screen p-3 max-lg:hidden">
        <div className="bg-primary rounded-xs animate-background-change-auth h-full grow bg-cover bg-center rounded-lg"></div>
      </div>
    </div>
  );
}
