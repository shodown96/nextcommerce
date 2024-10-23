import { PATHS } from "@/lib/constants/paths";
import { NavbarItem } from "./navbar-item";
import { UserMenu } from "./user-menu";
import { CartSummaryNav } from "./cart-summary-nav";

export const NavbarSignedIn = () => {

  return (
    <div className="flex items-center gap-2 justify-between">
      <NavbarItem
        href={PATHS.LANDING}
        text={`Home`}
        className="max-md:hidden"
      />
      <NavbarItem
        href={PATHS.EXPLORE}
        text={`Explore`}
        className="max-md:hidden"
      />
      <div className="max-md:hidden">
        <CartSummaryNav />
      </div>
      <UserMenu />
    </div>
  );
};
