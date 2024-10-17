import { PATHS } from "@/lib/constants/paths";
import { NavbarItem } from "./navbar-item";
import { UserMenu } from "./user-menu";

export const NavbarSignedIn = () => {

  return (
    <div className="flex items-center gap-2 justify-between">
      <NavbarItem
        href={PATHS.LANDING}
        text={`Home`}
      />
      <NavbarItem
        href={PATHS.EXPLORE}
        text={`Explore`}
      />
      <UserMenu />
    </div>
  );
};
