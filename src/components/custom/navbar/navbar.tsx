"use server";

import { SignedIn, SignedOut } from "@clerk/nextjs";
// import Logo from "@/assets/icons/logo.svg";
import { NavbarSignedIn } from "./navbar-signed-in";
import { NavbarSignedOut } from "./navbar-signed-out";

export const Navbar = () => {
  return (
    <div className="bg-brand-50 shadow-navbar relative flex h-[88px] items-center justify-between px-[72px]">
      {/* <Logo /> */}
      NextCommerce
      <div className="flex h-full items-center space-x-8">
        <SignedIn>
          <NavbarSignedIn />
        </SignedIn>
        <SignedOut>
          <NavbarSignedOut />
        </SignedOut>
      </div>
    </div>
  );
};
