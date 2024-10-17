"use server";

import { SignedIn, SignedOut } from "@clerk/nextjs";
// import Logo from "@/assets/icons/logo.svg";
import { NavbarSignedIn } from "./navbar-signed-in";
import { NavbarSignedOut } from "./navbar-signed-out";

export const Navbar = () => {
  return (
    <div className="bg-primary text-white shadow-navbar relative flex h-[75px] items-center justify-between px-[72px]">
      {/* <Logo /> */}
      <div className="text-xl">NextCommerce</div>
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
