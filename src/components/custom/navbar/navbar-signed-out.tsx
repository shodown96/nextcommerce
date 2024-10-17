import { PATHS } from "@/lib/constants/paths";
import { NavbarItem } from "./navbar-item";

export const NavbarSignedOut = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <NavbarItem
          className="w-[66px]" // Fix the shift on hover (font-weight)
          href={PATHS.LANDING}
          text="Home"
        />
        <NavbarItem
          className="w-[59px]" // Fix the shift on hover
          href={PATHS.ABOUT}
          text="About"
        />
        <NavbarItem
          className="w-[75px]" // Fix the shift on hover
          href={PATHS.CONTACT}
          text="Contact"
        />
      </div>
      <NavbarItem
        className="w-[196px]"
        href={PATHS.SIGN_IN}
        text="Sign In"
        type="button"
      />
    </>
  );
};
