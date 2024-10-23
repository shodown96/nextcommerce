"use server";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { LogOutIcon } from "lucide-react";
import { UserMenuItem } from "./user-menu-item";
import { UserMenuTrigger } from "./user-menu-trigger";
import { redirect } from "next/navigation";
import { PATHS } from "@/lib/constants/paths";

export const UserMenu = async () => {
  const user = await currentUser();

  if (!user) return null;

  const { emailAddresses, firstName, imageUrl, lastName } = user;
  const emailAddress = emailAddresses[0].emailAddress;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='[&[data-state="open"]>div>span#name]:underline outline-none'>
        <UserMenuTrigger
          firstName={firstName}
          imageUrl={imageUrl}
          lastName={lastName}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[270px] rounded-[8px] p-0">
        <UserMenuItem text={emailAddress} />
        <div className="mx-2 border-b" />
        <a href={PATHS.PROFILE}><UserMenuItem text="Profile" /></a>
        <a href={PATHS.CHANGE_PASSWORD}><UserMenuItem text="Change Password" /></a>
        <a href={PATHS.NEW_PRODUCT}><UserMenuItem text="New Product" /></a>
        <div className="mx-2 border-b" />
        <a href={PATHS.LANDING} className="md:hidden"><UserMenuItem text="Home" /></a>
        <a href={PATHS.EXPLORE} className="md:hidden"><UserMenuItem text="Explore" /></a>
        <div className="mx-2 border-b" />
        <SignOutButton>
          <UserMenuItem icon={<LogOutIcon />} text="Sign out" />
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
