"use server";

import NewProjectIcon from "@/assets/icons/new-project.svg";
import { PATHS } from "@/lib/constants/paths";
import { cn } from "@/lib/utils";
import { NavbarItem } from "./navbar-item";
import { UserMenu } from "./user-menu";

export const NavbarSignedIn = async () => {

  return (
    <div className="flex items-center justify-between">
      <NavbarItem
        href={PATHS.LANDING}
        text={`Home`}
      />
      <UserMenu />
    </div>
  );
};
